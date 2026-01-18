package main

import (
    "context"
    pb "github.com/spotwatch/protos/parking"
)

type server struct {
    pb.UnimplementedParkingServiceServer // Forward compatibility
}

// ReportStatus is called by your Ingest Service
func (s *server) ReportStatus(ctx context.Context, req *pb.StatusRequest) (*pb.StatusResponse, error) {
    // 1. Logic to save 'req.Occupied' and 'req.SpotId' to Postgres
    // 2. Broadcast this update to any connected dashboards
    
    return &pb.StatusResponse{Success: true}, nil
}