from fastapi import FastAPI, Request, HTTPException
import struct
import uvicorn
import base64

app = FastAPI()

@app.post("/ttn-webhook")
async def receive_ttn_uplink(request: Request):
    try:
        body = await request.json()
    except: 
        raise HTTPException(status_code=400, detail="Invalid JSON")

    up = body.get("uplink_message", {})
    raw = up.get("frm_payload", "")
    boxes = parse_bboxes(raw)

    # testing
    print(up)
   
    print("TTN Webhook received:")
    if up:
        print("Decoded coords: ", boxes)

    return {"success": True, "coords": boxes}

# Parse the raw json to get the [box_id, x1, y1, x2, y2] bounding box values (each box 10 bytes)
def parse_bboxes(raw_b64: str):
    if not raw_b64:
        return []
    try:
        # decode the base64 -> raw bytes -> utf-8 string
        data = base64.b64decode(raw_b64).decode('utf-8')
    except:
        return []
    
    if data.startswith('bbox:'):
        data = data[len('bbox:'):]

    boxes = []
    # split into segments and parse ints
    for seg in data.split(';'):
        if not seg:
            continue
        parts = seg.split(',')
        if len(parts) != 5:
            continue

        box_id, x1, y1, x2, y2 = map(int, parts)

        boxes.append({
            "box_id": box_id,
            "x1": x1,
            "y1": y1,
            "x2": x2,
            "y2": y2,
        })
    
    return boxes

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)