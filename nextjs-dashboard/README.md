## Live URL

[https://spotwatchllc.vercel.app/](https://spotwatchllc.vercel.app/)

> You can view incoming TTN webhook requests and decoded coordinates in Vercel Function logs under **Functions → Production Logs**.

---

## Getting Started

### Prerequisites

* Node.js v18+
* pnpm (or npm/yarn)
* A TTN application with HTTP Webhook integration

### Install & Run Locally

```bash
# Clone the repo
git clone https://github.com/spotwatchllc/parking-dash.git
cd parking-dash/nextjs-dashboard

# Install dependencies
pnpm install

# Start dev server
pnpm dev
```

Your app will be available at [http://localhost:3000](http://localhost:3000).

### Expose Locally for TTN

```bash
# (Optional) Reserve a static ngrok subdomain first:
ngrok http 3000 --domain=<your-name>.ngrok-free.app
```

Then point the parking-app/parking-e5-device TTN webhook to:

```
https://<your-name>.ngrok-free.app/api/ttn-webhook
```

---

## Local Development (Developer Instructions)

1. **Start the dev server**

   ```bash
   pnpm dev
   ```

2. **Receive TTN payloads locally**

   * In your TTN Console, configure the HTTP Webhook endpoint to (Note: must expose the URL):

     ```
     http://localhost:3000/api/ttn-webhook
     ```

3. **View incoming messages**

   * Monitor your terminal where `pnpm dev` is running, you’ll see decoded coordinates printed for each POST.

4. **Test with curl**
   Simulate an uplink to verify parsing:

   ```bash
   curl -X POST http://localhost:3000/api/ttn-webhook \
     -H "Content-Type: application/json" \
     -d '{
       "uplink_message": {
         "frm_payload": "<your-base64-payload>"
       }
     }'
   ```

5. **Build & preview production**

   ```bash
   pnpm build
   pnpm start
   ```

---

## API Endpoints

### `POST /api/ttn-webhook`

Receives TTN uplinks:

* **Request Body** (JSON):

  ```json
  {
    "uplink_message": {
      "frm_payload": "<base64‑encoded bbox data>"
    }
  }
  ```
* **Response**:

  ```json
  { "success": true, "coords": [ { "box_id":1, "x1":..., ... }, … ] }
  ```

---

## Deploying to Vercel

1. Push to GitHub under the `main` branch.
2. Make sure you're the authorized user who made the commit.
3. Vercel will auto‑build the production URLs:

   * Webhook: `https://spotwatchllc.vercel.app/api/ttn-webhook`

