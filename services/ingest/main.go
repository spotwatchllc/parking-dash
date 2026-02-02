package main

import (
	"context"
	"encoding/json"
	"log"
	"net/http"
	"os"
	"strconv"
	"time"

	pb "github.com/spotwatchllc/parking-dash/protos/parking"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
)

type job struct {
	uplink TTNUplink
}

// Ingest listens for TTN webhooks (HTTP/JSON), converts payloads into protobuf,
// then calls the dashboard service (gRPC) to persist/broadcast updates.
func main() {
	// Get the HTTP address for ingest, and dashboard
	httpAddr := getenv("INGEST_HTTP_ADDR", ":8081")
	dashboardAddr := getenv("DASHBOARD_GRPC_ADDR", "localhost:50051")

	// Connection to TTN and processing POST request
	workers := getenvInt("INGEST_WORKERS", 20)
	queueSize := getenvInt("INGEST_QUEUE_SIZE", 1000)

	// connect to dashboard gRPC
	dialContext, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	conn, err := grpc.DialContext(
		dialContext, // timeout
		dashboardAddr,
		grpc.WithTransportCredentials(insecure.NewCredentials()), // local dev, without TLS
		grpc.WithBlock(), // fast failure on startup if dashboard isn't available
	)
	if err != nil {
		log.Fatalf("dial dashboard gRPC: %v", err)
	}
	defer conn.Close()
	client := pb.NewParkingServiceClient(conn)

	// Bounded queue for backpressure - job channels
	jobs := make(chan job, queueSize) 

	// Worker pool: parsing -> protobuf conv -> gRPC
	for i := 0; i < workers; i++ {
		go func(workerID int) {
			for j := range jobs { // consume job channel
				processUplink(client, j.uplink)
			}
		}(i)
	}

	mux := http.NewServeMux()

	mux.HandleFunc("/healthz", func(w http.ResponseWriter, _ *http.Request) {
		w.WriteHeader(http.StatusOK)
		_, _ = w.Write([]byte("ok"))
	})

	mux.HandleFunc("/ttn/uplink", func(w http.ResponseWriter, r *http.Request) {
		if r.Method != http.MethodPost {
			http.Error(w, "POST only", http.StatusMethodNotAllowed)
			return
		}

		// parse TTN JSON
		var uplink TTNUplink
		if err := json.NewDecoder(r.Body).Decode(&uplink); err != nil {
			http.Error(w, "invalid json: "+err.Error(), http.StatusBadRequest)
			return
		}

		// Backpressure => if full, reject
		select {
		case jobs <- job{uplink: uplink}:
			w.Header().Set("Content-Type", "application/json")
			w.WriteHeader(http.StatusOK)
			_, _ = w.Write([]byte(`{"ok":true}`))
		default:
			http.Error(w, "ingest overloaded", http.StatusServiceUnavailable)
		}
	})

	log.Printf("ingest listening on %s (workers=%d queue=%d) -> dashboard grpc %s",
		httpAddr, workers, queueSize, dashboardAddr,
	)
	log.Fatal(http.ListenAndServe(httpAddr, mux))
}

// processUplink runs in the worker pool
func processUplink(client pb.ParkingServiceClient, uplink TTNUplink) {
	boxes, err := ParseBoxes(uplink.UplinkMessage.FRMPayload)
	if err != nil {
		log.Printf("bad frm_payload (device=%s): %v", uplink.EndDeviceIDs.DeviceID, err)
		return
	}
	if len(boxes) == 0 {
		return
	}

	for _, b := range boxes {
		ctx, cancel := context.WithTimeout(context.Background(), 2*time.Second)

		req := &pb.UpdateBoxRequest{
			ImageId:      b.ImageID,
			BoxId:        b.BoxID,
			Availability: b.Availability,
		}

		_, rpcErr := client.UpdateBoxAvailability(ctx, req)
		cancel()

		if rpcErr != nil {
			log.Printf("UpdateBoxAvailability failed (device=%s image=%d box=%d): %v", uplink.EndDeviceIDs.DeviceID, b.ImageID, b.BoxID, rpcErr,)
			return
		}
	}
}

func getenv(k, def string) string {
	v := os.Getenv(k)
	if v == "" {
		return def
	}
	return v
}

func getenvInt(k string, def int) int {
	v := os.Getenv(k)
	if v == "" {
		return def
	}
	n, err := strconv.Atoi(v)
	if err != nil || n <= 0 {
		return def
	}
	return n
}