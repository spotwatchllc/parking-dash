package main

import (
    "log"
    "net"
    "google.golang.org/grpc"
    pb "github.com/spotwatchllc/parking-dash/protos/parking" // Your generated proto path
)

func main() {
    // 1. Create a TCP listener on port 50051
    lis, err := net.Listen("tcp", ":50051")
    if err != nil {
        log.Fatalf("failed to listen: %v", err)
    }

    // 2. Initialize the gRPC server instance
    grpcServer := grpc.NewServer()

    // 3. Register your service implementation
    // 'server' is a struct we will define in service.go
    pb.RegisterParkingServiceServer(grpcServer, &server{})

    log.Printf("Dashboard Service listening at %v", lis.Addr())
    
    // 4. Start serving requests
    if err := grpcServer.Serve(lis); err != nil {
        log.Fatalf("failed to serve: %v", err)
    }
}
