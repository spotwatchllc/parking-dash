from fastapi import FastAPI, Request, HTTPException
import uvicorn

app = FastAPI()

@app.post("/ttn-status")
async def receive_ttn_status(request: Request):
    try:
        body = await request.json()
    except: 
        raise HTTPException(status_code=400, detail="Invalid JSON")
    
    # high level fields
    event_name = body.get("name")
    received_time = body.get("time")
    unique_id = body.get("unique_id")

    # identifiers -> gateway_ids
    identifiers = body.get("identifiers", [])
    gateway_info = {}
    if identifiers:
        gw = identifiers[0].get("gateway_ids", {})
        gateway_info["gateway_id"] = gw.get("gateway_id")
        gateway_info["eui"] = gw.get("eui")
    
    # data
    data = body.get("data", {})
    gateway_status_time = data.get("time")

    versions = data.get("versions", {})
    server_version = versions.get("ttn-lw-gateway-server")

    ip_list = data.get("ip", [])
    primary_ip = ip_list[0] if ip_list else None

    metrics = data.get("metrics", {})
    rxfw = metrics.get("rxfw")
    ackr = metrics.get("ackr")
    txok = metrics.get("txok")
    rxok = metrics.get("rxok")

    # misc; rest of the json
    correlation_ids = body.get("correlation_ids", [])
    origin = body.get("origin")
    tenant_id = body.get("context", {}).get("tenant-id")
    rights = body.get("visibility", {}).get("rights", [])

    print(f"Event: {event_name} at {received_time}")
    print(f"Gateway: {gateway_info.get('gateway_id')} (EUI={gateway_info.get('eui')})")
    print(f"Status Time: {gateway_status_time}, Server Version: {server_version}")
    print(f"IP: {primary_ip}, Metrics → RXFW={rxfw}, ACKR={ackr}, TXOK={txok}, RXOK={rxok}")
    print(f"Correlation IDs: {correlation_ids}, Origin: {origin}, Tenant: {tenant_id}")
    print(f"Visibility Rights: {rights}")
    print(f"Unique ID: {unique_id}")

    return {"success": True, "parsed": {
      "event_name": event_name,
      "gateway_id": gateway_info.get("gateway_id"),
      "gateway_eui": gateway_info.get("eui"),
      "status_time": gateway_status_time,
      "server_version": server_version,
      "primary_ip": primary_ip,
      "metrics": {"rxfw": rxfw, "ackr": ackr, "txok": txok, "rxok": rxok},
      "unique_id": unique_id
    }}

    # example json that TTN sends
    # {
    #     "name": "gs.status.receive",
    #     "time": "2025-06-04T23:28:14.052053229Z",
    #     "identifiers": [
    #         {
    #         "gateway_ids": {
    #             "gateway_id": "eecs473-lora-gateway",
    #             "eui": "AC1F09FFFE03E251"
    #         }
    #         }
    #     ],
    #     "data": {
    #         "@type": "type.googleapis.com/ttn.lorawan.v3.GatewayStatus",
    #         "time": "2025-06-04T23:28:13Z",
    #         "versions": {
    #         "ttn-lw-gateway-server": "3.34.1-rc4-SNAPSHOT-a2f5306ed9"
    #         },
    #         "ip": [
    #         "68.56.147.155"
    #         ],
    #         "metrics": {
    #         "rxfw": 0,
    #         "ackr": 100,
    #         "txin": 0,
    #         "txok": 0,
    #         "rxin": 0,
    #         "rxok": 0
    #         }
    #     },
    #     "correlation_ids": [
    #         "gs:status:01JWYMC6Q4WM8K50V37GZFDMPK"
    #     ],
    #     "origin": "ip-10-101-12-57.us-west-1.compute.internal",
    #     "context": {
    #         "tenant-id": "CgN0dG4="
    #     },
    #     "visibility": {
    #         "rights": [
    #         "RIGHT_GATEWAY_STATUS_READ"
    #         ]
    #     },
    #     "unique_id": "01JWYMC6Q441XRY0PRVCRHZGH0"
    # }

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)