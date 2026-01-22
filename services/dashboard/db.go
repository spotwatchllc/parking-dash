package main

import (
    "log"
    "os"
    "gorm.io/driver/postgres"
    "gorm.io/gorm"
    "github.com/joho/godotenv"
    "time"
)

// ParkingUpdate matches your Prisma 'ParkingUpdate' table
type ParkingUpdate struct {
    ID         uint      `gorm:"primaryKey"`
    SpotID     string    `gorm:"index"`
    Occupied   bool
    Confidence float32
    CreatedAt  time.Time `gorm:"autoCreateTime"`
}

// InitDB now returns the database instance so it can be injected
// services/dashboard/db.go
func InitDB() *gorm.DB {
    // 1. Load the local .env file
    if err := godotenv.Load(); err != nil {
        log.Println("No .env file found in current directory")
    }

    dsn := os.Getenv("DATABASE_URL")
    
    // 2. Open connection with PreferSimpleProtocol to bypass TLS/parameter issues
    db, err := gorm.Open(postgres.New(postgres.Config{
        DSN: dsn,
        PreferSimpleProtocol: true, 
    }), &gorm.Config{})

    if err != nil {
        log.Fatalf("Failed to connect to database: %v", err)
    }

    log.Println("Successfully connected to shared Postgres database")
    return db
}