
---
# 🅿️ SpotWatch Dashboard

Frontend dashboard for monitoring real-time parking availability.

This app is part of the **parking-dash** monorepo. The backend services (dashboard gRPC + ingest webhook for TTN) are documented in the **root `README.md`**.

---

## 🚀 Getting Started (Frontend Only)

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

## TTN Webhooks (Testing Locally)

TTN uplinks are handled by the ingest service (Go), not the Next.js app.

Ingest endpoint: `POST /ttn/uplink` (local port 8081)

* See the **root README.md** for:

* ngrok setup

   * TTN webhook configuration

   * mock uplink payload examples

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
