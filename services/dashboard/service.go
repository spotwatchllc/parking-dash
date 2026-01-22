package main

import (
    "context"
    "log"
    "gorm.io/gorm"
    pb "github.com/spotwatchllc/parking-dash/protos"
)

type server struct {
    pb.UnimplementedParkingServiceServer
    db *gorm.DB 
}

// Rename this to match your .proto: UpdateBoxAvailability
func (s *server) UpdateBoxAvailability(ctx context.Context, req *pb.UpdateBoxRequest) (*pb.Box, error) {
    // 1. Create the model instance using your .proto fields (box_id, availability)
    update := ParkingUpdate{
        SpotID:   string(req.BoxId), // Assuming your DB uses strings for IDs
        Occupied: req.Availability == 1,
    }

    // 2. Save to Postgres
    if err := s.db.Create(&update).Error; err != nil {
        return nil, err
    }
    
    log.Printf("Successfully updated status for Box: %d", req.BoxId)

    // 3. Return the 'Box' message as defined in your proto
    return &pb.Box{
        BoxId:        req.BoxId,
        Availability: req.Availability,
    }, nil
}