# 🚗 SpotWatch Parking Dashboard

**Live URL:** [https://spotwatchllc.vercel.app](https://spotwatchllc.vercel.app)

Monitor and visualize parking space occupancy data received from **The Things Network (TTN)** via HTTP Webhooks.

---

## 📋 Quick Start

**Prerequisites**
- Node.js v18+
- pnpm (or npm/yarn)
- TTN application with **HTTP Webhook** integration

```bash
# Clone the repository
git clone https://github.com/spotwatchllc/parking-dash.git
cd parking-dash/nextjs-dashboard

# Install dependencies
pnpm install

# Start the dev server
pnpm dev
```

Your app will be available at:
http://localhost:3000

---
### Local Development Server
1. Run the Local Dev Server
```bash
pnpm dev
```

Direct Local Testing 
In the TTN Console, you can temporarily set the webhook to:
```bash
http://localhost:3000/api/ttn-webhook
```
* This should work, update: took out the ngrok info since we are using a live website hosted with vercel


### View Incoming LORA Messages with TTN 
API Reference
POST `/api/ttn-webhook`
Recieves uplink data from TTN

Request body:
```json
{
  "uplink_message": {
    "frm_payload": "<base64-encoded bbox data>"
  }
}
```

Response
```json
{
  "success": true,
  "coords": [
    { "box_id": 1, "x1": 0, "y1": 0, "x2": 0, "y2": 0 }
  ]
}
```
--- 
### 🚀 Deploying to Vercel
0. Clean up process of the build and
1. Have someone review your pull request
2. Ensure you have approval from Faizan
3. Commit and push to the main branch on GitHub.
4. Vercel will auto-build and deploy to live site

Optional to testout:
Webhook endpoint: https://spotwatchllc.vercel.app/api/ttn-webhook
Production logs: Found under Functions → Production Logs in Vercel.

---
### Useful Links
TTN Console (Anyone can use): [HERE](https://console.thethingsnetwork.org)  
Vercel (For admin & leads): [HERE](https://vercel.com)
