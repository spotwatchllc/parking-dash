package main

import (
    "context"
    "errors"
    "log"
    "time"

    "gorm.io/gorm"

    pb "github.com/spotwatchllc/parking-dash/protos"
    "google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
	"google.golang.org/protobuf/types/known/timestamppb"
)

// DB model for Prisma "boxes" table.
// This is NOT the protobuf Box. It's just how GORM talks to Postgres.
type BoxRow struct {
	ID           int32     `gorm:"column:id;primaryKey"`
	ImageID      int32     `gorm:"column:image_id;index"`
	BoxID        int32     `gorm:"column:box_id;index"`
	X1           int32     `gorm:"column:x1"`
	Y1           int32     `gorm:"column:y1"`
	X2           int32     `gorm:"column:x2"`
	Y2           int32     `gorm:"column:y2"`
	X3           int32     `gorm:"column:x3"`
	Y3           int32     `gorm:"column:y3"`
	X4           int32     `gorm:"column:x4"`
	Y4           int32     `gorm:"column:y4"`
	Availability int32     `gorm:"column:availability"`
	UpdatedAt    time.Time `gorm:"column:updated_at"`
}

func (BoxRow) TableName() string { return "boxes" }

type server struct {
    pb.UnimplementedParkingServiceServer
    db *gorm.DB 
}

// Rename this to match your .proto: UpdateBoxAvailability
func (s *server) UpdateBoxAvailability(ctx context.Context, req *pb.UpdateBoxRequest) (*pb.Box, error) {
    // simple error checking
    if req == nil {
		return nil, status.Error(codes.InvalidArgument, "missing request")
	}
	if req.Availability != 0 && req.Availability != 1 {
		return nil, status.Error(codes.InvalidArgument, "availability must be 0 or 1")
	}

    // 1) Find the box row by composite key (image_id, box_id)
    var row BoxRow
    err := s.db.WithContext(ctx).
        Where("image_id = ? AND box_id = ?", req.ImageId, req.BoxId).
        First(&row).Error

    if errors.Is(err, gorm.ErrRecordNotFound) {
		return nil, status.Error(codes.NotFound, "box not found for (image_id, box_id); seed coords first")
    }

    if err != nil {
		return nil, status.Errorf(codes.Internal, "db read error: %v", err)
	}

	// 2) Update availability only (updated_at is handled automatically by Prisma/@updatedAt)
	if err := s.db.WithContext(ctx).
        Model(&BoxRow{}).
        Where("image_id = ? AND box_id = ?", req.ImageId, req.BoxId).
        Updates(map[string]interface{}{
            "availability": req.Availability,
            "updated_at":   time.Now(),
        }).Error; err != nil {
        return nil, status.Errorf(codes.Internal, "db update error: %v", err)
    }


	// 3) Reread to return fresh updated_at + availability
	if err := s.db.WithContext(ctx).
		Where("image_id = ? AND box_id = ?", req.ImageId, req.BoxId).
		First(&row).Error; err != nil {
		return nil, status.Errorf(codes.Internal, "db reread error: %v", err)
	}

	log.Printf("Updated (image_id=%d, box_id=%d) availability=%d", req.ImageId, req.BoxId, req.Availability)

	// 4) Convert DB row -> protobuf Box for RPC response
	return &pb.Box{
		Id:           row.ID,
		BoxId:        row.BoxID,
		X1:           row.X1,
		Y1:           row.Y1,
		X2:           row.X2,
		Y2:           row.Y2,
		X3:           row.X3,
		Y3:           row.Y3,
		X4:           row.X4,
		Y4:           row.Y4,
		Availability: row.Availability,
		UpdatedAt:    timestamppb.New(row.UpdatedAt),
	}, nil
}