# SpotWatch Dashboard

SpotWatch is an IoT-based parking detection system. It uses computer vision and hardware sensors to monitor parking spot availability in real-time, delivering data via gRPC to a centralized dashboard.

## 🏗 Project Structure

This is a Go and Next.js monorepo structured to scale with multiple microservices:

* **/protos**: Shared Protocol Buffer definitions (`.proto`) and generated Go code. This is the source of truth for all service communication.
* **/services/dashboard**: Go gRPC backend service that updates parking spot availability in Postgres and serves the dashboard API, containing business logic.
- **/services/ingest**: Go HTTP ingest service that receives TTN webhook JSON (uplinks), parses payloads, and forwards updates to dashboard via gRPC.
* **/nextjs-dashboard**: The frontend application built with Next.js, Tailwind CSS, and TypeScript.
* **/docker-compose.yml**: Orchestrates local development for databases and services.

## 🛠 Prerequisites

Ensure you have the following installed:
* **Go** (v1.24+ recommended)
* **Node.js** (v18+) & **pnpm**
* **Protocol Buffer Compiler (`protoc`)**
* **Go Plugins** for protoc: `protoc-gen-go` and `protoc-gen-go-grpc v1.6.0`
* **Docker & Docker Compose**
* **PostGres Sql Client** 

## 🚀 Getting Started

### 0. Start Postgres

From repo root:

```bash
docker compose up -d
```

### .5 Start Prisma
Local Database up to sync
```bash
cd nextjs-dashboard
npx prisma migrate dev
```

### 1. Seed the Database (Boxes)
This seeds `(image_id, box_id)` rows into `boxes` for local testing:

```bash
chmod +x nextjs-dashboard/scripts/seed_boxes.sh
./scripts/seed_boxes.sh
```

To see the database visually in Prisma GUI, use the below command:
```bash
npx prisma studio
```

### 2. Protocol Buffers (Common Logic)
Before running the services, generate the latest Go code from the proto definitions:

```bash
cd protos
# Generate Go code from parking.proto
protoc --go_out=. --go_opt=paths=source_relative \
    --go-grpc_out=. --go-grpc_opt=paths=source_relative \
    parking.proto
```

If you change protos/parking.proto, re-run the command and commit both the .proto and generated .pb.go files.

### 3. Run Backend Services
#### Dashboard (gRPC, port 50051)
The dashboard service uses a local `replace` directive in `go.mod` to reference the generated protos.

```bash
cd services/dashboard
go mod tidy
go run .
```

#### Ingest (HTTP webhook, port 8081)
Open another terminal to run the ingest service...
```bash 
cd services/ingest
go mod tidy
go run .
```

Ingest endpoints:

`GET /healthz`

`POST /ttn/uplink` (TTN JSON uplink webhook)


### 4. Frontend (Next.js)

```bash
cd nextjs-dashboard
pnpm install
pnpm dev
```
Dashboard: http://localhost:3000

## 📡 Testing TTN Webhooks Locally

To receive **live TTN uplinks** on your local machine, use **ngrok**.

There are two ways to use **ngrok**:

## Option A: Quick Test (URL changes every time)

Start ngrok:

```bash
ngrok http 8081
```

This generates a new URL each time you start ngrok, so you must update the TTN webhook endpoint on every run to:

```
https://<your-ngrok-id>.ngrok-free.app/api/ttn-webhook
```

---

## Option B: Recommended (Static ngrok dev domain)

Using an ngrok dev domain (static domain) allows you to configure the TTN webhook once and never change it again, as long as you start ngrok with the same domain.

### One-time setup

1. **Get a dev domain in the ngrok dashboard**
   
   Example:
   ```
   <your-ngrok-dev-domain>.ngrok-free.app
   ```

2. **Authenticate ngrok locally** (required for dev domains):
   
   ```bash
   ngrok config add-authtoken <YOUR_NGROK_AUTHTOKEN>
   ```

3. **Set the TTN webhook endpoint ONCE** in TTN Console → HTTP Webhook endpoint to:
   
   ```
   https://<your-ngrok-dev-domain>.ngrok-free.app/ttn/uplink
   ```

### Each time you want to test locally

1. **Start the dashboard:**
   
   ```bash
   pnpm dev
   ```

2. **Start ngrok using the dev domain:**
   
   ```bash
   ngrok http --domain=<your-ngrok-dev-domain>.ngrok-free.app 8081
   ```

As long as you use the same dev domain, you don't need to update the TTN webhook endpoint again.

---

### Common mistake

```
Correct: --domain=<your-ngrok-dev-domain>.ngrok-free.app
Incorrect: --domain=https://<your-ngrok-dev-domain>.ngrok-free.app/
```

## 🔬 Manual Test (Mock Uplink)

Ingest expects uplink_message.frm_payload to be base64 of:

`bbox:<image_id>,<box_id>,<availability>;<image_id>,<box_id>,<availability>;...`


You can manually test the webhook endpoint using `curl`:

```bash
PAYLOAD_B64=$(echo -n 'bbox:12,101,1;12,102,0;' | base64)

curl -X POST http://localhost:8081/ttn/uplink \
  -H "Content-Type: application/json" \
  -d '{
    "end_device_ids": { "device_id": "test-device" },
    "uplink_message": { "frm_payload": "'"$PAYLOAD_B64"'" }
  }'
```

## 🧪 Development Workflow
### Modifying the API
1. Edit `protos/parking.proto`
2. Run `protoc` command to update the generated code
3. Commit both the `.proto` and the `.pb.go` files to ensure other services stay in sync
4. Edit README.md documentation or pull request to comment on items done

