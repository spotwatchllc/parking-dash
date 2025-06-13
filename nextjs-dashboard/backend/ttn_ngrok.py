# Automate the TTN webhook configuration with ngrok

import os
import time
import requests
from pyngrok import ngrok
from dotenv import load_dotenv

load_dotenv()

API_KEY=os.environ.get("TTN_API_KEY")
APP_ID=os.environ.get("TTN_APP_ID")
WEBHOOK_ID=os.environ.get("TTN_WEBHOOK_ID")
REGION=os.environ.get("TTN_REGION", "nam1")
PORT=int(os.environ.get("PORT", 8000))

# check for 3 critical info
if not all([API_KEY, APP_ID, WEBHOOK_ID]):
    raise EnvironmentError("Set TTN_API_KEY, TTN_APP_ID, and TTN_WEBHOOK_ID in your .env")

# # base API endpoint for ttl integrations
BASE    = f"https://{REGION}.cloud.thethings.network/api/v3/as/webhooks/{APP_ID}"
HEADERS = {
    "Grpc-Metadata-Authorization": f"Bearer {API_KEY}",
    "Content-Type": "application/json",
}

# start ngrok tunnel
print(f"Starting ngrok tunnel on port {PORT}...")
tunnel = ngrok.connect(PORT, bind_tls=True)
public_url = tunnel.public_url.rstrip('/')
print(f"Public URL: {public_url}")

# give time for ngrok
time.sleep(1)

# # clean up stale ngrok webhooks
resp = requests.get(BASE, headers=HEADERS)
resp.raise_for_status()
for wh in resp.json().get("webhooks", []):
    wh_id  = wh["ids"]["webhook_id"]
    url    = wh.get("base_url", "")
    if wh_id != WEBHOOK_ID and "ngrok-free.app" in url and url != public_url:
        del_r = requests.delete(f"{BASE}/{wh_id}", headers=HEADERS)
        del_r.raise_for_status()

# update webhook's base url
update_url = f"{BASE}/{WEBHOOK_ID}"
params = {"field_mask": "base_url"}
body = {
    "webhook": {
        "base_url": public_url
    },
    "field_mask": "base_url",
    "enable": True,
}
print(f"Updating webhook '{WEBHOOK_ID}' → {public_url}")
put_r = requests.put(update_url, json=body, headers=HEADERS)
print("↳ Request URL:", put_r.request.url)
print("↳ Request body:", put_r.request.body)
put_r.raise_for_status()

print("Webhook updated to:", public_url)
