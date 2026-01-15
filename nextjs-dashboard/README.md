
---
# 🅿️ SpotWatch Dashboard

A **Next.js dashboard** for monitoring **real-time parking availability** via **TTN (The Things Network)** IoT sensors.

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- **Docker & Docker Compose**  
  _(Required for the local PostgreSQL database)_
- **Node.js v18+**
- **pnpm** _(preferred package manager)_

---

## 📦 Setup

### 1️⃣ Clone & Configure Environment

Clone the repository and prepare your local environment variables:

```bash
git clone https://github.com/spotwatchllc/parking-dash.git
cd parking-dash/nextjs-dashboard
cp .env.example .env.local
````

Ensure `.env.local` contains the correct **`DATABASE_URL`** pointing to your Docker PostgreSQL container (see `.env.example`).

---

### 2️⃣ Launch Infrastructure & Sync Database

This command:

* Spins up the PostgreSQL container
* Applies all Prisma migrations
* Ensures your local schema is fully up to date

```bash
pnpm run db:sync
```

---

### 3️⃣ Run the Development Server

```bash
pnpm dev
```

The dashboard will be available at:

👉 **[http://localhost:3000](http://localhost:3000)**

---

## 🛠 Developer Workflow

### 🗄 Managing the Database

**Sync Schema**
Run after pulling new code or updating Prisma models:

```bash
pnpm run db:sync
```

**Visual Inspector (Prisma Studio)**
Open a GUI to view and edit local database records:

```bash
npx prisma studio
```

**Infrastructure Control**

```bash
pnpm run infra:up    # Start PostgreSQL container
docker compose down  # Stop PostgreSQL container
```

---

## 📡 Testing TTN Webhooks Locally

To receive **live TTN uplinks** on your local machine, use **ngrok**.

There are two ways to use **ngrok**:

## Option A: Quick Test (URL changes every time)

Start ngrok:

```bash
ngrok http 3000
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
   https://<your-ngrok-dev-domain>.ngrok-free.app/api/ttn-webhook
   ```

### Each time you want to test locally

1. **Start the dashboard:**
   
   ```bash
   pnpm dev
   ```

2. **Start ngrok using the dev domain:**
   
   ```bash
   ngrok http --domain=<your-ngrok-dev-domain>.ngrok-free.app 3000
   ```

As long as you use the same dev domain, you don't need to update the TTN webhook endpoint again.

---

## Common mistake

```
Correct: --domain=<your-ngrok-dev-domain>.ngrok-free.app
Incorrect: --domain=https://<your-ngrok-dev-domain>.ngrok-free.app/
```


### 🔬 Manual Test (Mock Uplink)

You can manually test the webhook endpoint using `curl`:

```bash
curl -X POST http://localhost:3000/api/ttn-webhook \
  -H "Content-Type: application/json" \
  -d '{
    "uplink_message": {
      "frm_payload": "AQIDBA==" 
    }
  }'
```

---

## 🏗 Deployment

This project is configured for **independent hosting** using a **standalone Next.js output**.

### Build Standalone

Generates a minimal production bundle:

```bash
pnpm build
```

Output is generated in:

```
.next/standalone
```

---

### 🐳 Docker Production

Use the provided production `Dockerfile` to deploy to any VPS:
(not implemented yet)
* DigitalOcean
* AWS
* Fly.io
* Hetzner
* etc.

---
