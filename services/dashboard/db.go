package main

import (
    "log"
    "os"
    "gorm.io/driver/postgres"
    "gorm.io/gorm"
    "github.com/joho/godotenv"
)

var DB *gorm.DB

func InitDB() {
    // Load existing Next.js .env variables
    if err := godotenv.Load(); err != nil {
        log.Println("No .env file found, using system variables")
    }

    // Connect using the exact same Postgres connection string
    dsn := os.Getenv("DATABASE_URL")
    var err error
    DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
    if err != nil {
        log.Fatalf("Failed to connect to database: %v", err)
    }
    log.Println("Successfully connected to shared Postgres database")
}