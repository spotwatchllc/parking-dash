package main

import (
    "log"
    "net"
    "google.golang.org/grpc"
    pb "github.com/spotwatchllc/parking-dash/protos"
)

func main() {
    // 1. Initialize the DB first
    database := InitDB()

    lis, err := net.Listen("tcp", ":50051")
    if err != nil {
        log.Fatalf("failed to listen: %v", err)
    }

    // 2. Inject the DB into your server instance
    s := &server{db: database}

    grpcServer := grpc.NewServer()
    pb.RegisterParkingServiceServer(grpcServer, s)

    log.Printf("Dashboard Service listening at %v", lis.Addr())
    
    if err := grpcServer.Serve(lis); err != nil {
        log.Fatalf("failed to serve: %v", err)
    }
}