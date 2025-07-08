# TTN Webhook with Ngrok Static URL Setup

This will guide you through setting up a static ngrok URL for The Things Network (TTN) webhook on your local machine. **Important:** Each collaborator must have their own reserved static ngrok subdomain and update the TTN console with that URL for the webhook to work on their setup.

---

## Prerequisites

- **Ngrok account** with a free reserved static subdomain (ngrok-free.app)
- **Ngrok CLI** installed and configured with your auth token
- **Python 3.8+**
- Access to your **TTN Console** or **TTN HTTP Webhook API** credentials

---

## 1. Get a Static Ngrok Subdomain and configure ngrok CLI

1. Log in to your ngrok dashboard at [https://dashboard.ngrok.com](https://dashboard.ngrok.com).
2. Go to [https://dashboard.ngrok.com/get-started/setup/](ngrok setup insturctions) and follow the instructions under Connect to configure ngrok on your machine.
3. Under the Connect bar, there is a Ephemeral Domain and Static Domain, we will need the Static Domain.

---

## 2. Run Your Local Python Webhook Server

Ensure your webhook service is running locally on port `8000` (or your chosen port). For example:

```bash
uvicorn app:app --host localhost --port 8000
# or
python webhook_server.py
```

---

## 3. Start Ngrok with Your Static Domain

In a new terminal, run:

```bash
ngrok http 8000 --domain=my-webhook.ngrok-free.app
```

- `8000` should match the port your Python server listens on.
- `my-webhook.ngrok-free.app` is your reserved static URL.

Once started, ngrok will display a status indicating the tunnel is live and forwarding to your local port.

---

## 4. Update TTN Console

1. Log in to your TTN Console and navigate to your application:
   - **Integrations → HTTP Webhooks**
2. Create a new webhook integration with the static ngrok url:
   - **Base URL**: `https://my-webhook.ngrok-free.app`
   - **Configuration**: Enable uplink message with the "/ttn-webhook" folder
3. Save the integration.

> **Note:** Every collaborator must repeat steps 2-3 using *their* own reserved static ngrok subdomain, with *their* new TTN webhook endpoint in TTN console accordingly.

---

## 6. Verify & Test

Simulate an uplink message in the TTN console.
This is on [https://nam1.cloud.thethings.network/console/applications/parking-e5-app/devices/parking-e5-device/messaging/uplink] this link.

Check your Python server logs to ensure the payload arrives correctly.

---

### Troubleshooting

- **URL not reachable?** Ensure ngrok and your Python server are both running.
- **Incorrect domain?** Verify you’re using *your* reserved ngrok subdomain.
- **Webhook still stale?** In the TTN console, clear the stale state or wait for TTN to detect the healthy endpoint.

---