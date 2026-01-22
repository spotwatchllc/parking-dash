# SpotWatch Dashboard

SpotWatch is an IoT-based parking detection system. It uses computer vision and hardware sensors to monitor parking spot availability in real-time, delivering data via gRPC to a centralized dashboard.

## 🏗 Project Structure

This is a Go and Next.js monorepo structured to scale with multiple microservices:

* **/protos**: Shared Protocol Buffer definitions (`.proto`) and generated Go code. This is the source of truth for all service communication.
* **/services/dashboard**: The Go-based gRPC backend service that manages business logic and database interactions via Prisma.
* **/nextjs-dashboard**: The frontend application built with Next.js, Tailwind CSS, and TypeScript.
* **/docker-compose.yml**: Orchestrates local development for databases and services.

## 🛠 Prerequisites

Ensure you have the following installed:
* **Go** (v1.24+ recommended)
* **Node.js** (v18+) & **pnpm**
* **Protocol Buffer Compiler (`protoc`)**
* **Go Plugins** for protoc: `protoc-gen-go v1.6.0` and `protoc-gen-go-grpc v3.12.4`
* **Docker & Docker Compose**

## 🚀 Getting Started

### 1. Protocol Buffers (Common Logic)
Before running the services, generate the latest Go code from the proto definitions:

```bash
cd protos
# Generate Go code from parking.proto
protoc --go_out=. --go_opt=paths=source_relative \
    --go-grpc_out=. --go-grpc_opt=paths=source_relative \
    parking.proto
```
### 2. Backend Service (Go)
The dashboard service uses a local `replace` directive in `go.mod` to reference the generated protos.

```bash
cd services/dashboard
go mod tidy
go run main.go
```

### 3. Frontend (Next.js)

```bash
cd nextjs-dashboard
pnpm install
pnpm dev
```

## 🧪 Development Workflow
### Modifying the API
1. Edit `protos/parking.proto`
2. Run `protoc` command to update the generated code
3. Commit both the `.proto` and the `.pb.go` files to ensure other services stay in sync
4. Edit README.md documentation or pull request to comment on items done

