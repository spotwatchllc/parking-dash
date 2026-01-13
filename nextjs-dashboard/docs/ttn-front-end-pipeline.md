# TTN Front End Pipeline (Webhook → Postgres → Boxes API → Overlay)

This document explains how parking spot bounding boxes and availability move through the system, from TTN uplinks to the `/boxes` UI overlay. It documents the expected payload formats, storage strategy, and how to verify everything locally.

---

## Purpose

We want to display stable parking spot coordinates on the frontend while updating availability in real time.

- **Geometry should not drift** after the initial detection, so the overlay remains consistent.
- **Availability should update frequently** as sensors report new states.

This is implemented by storing coordinates once and updating only availability afterward.

---

## Components and responsibilities

### 1) TTN Webhook: `POST /api/ttn-webhook`
**File:** `app/api/ttn-webhook/route.ts`

Receives TTN uplink messages containing a base64 payload. The handler:
1. Reads JSON from the request body
2. Extracts `uplink_message.frm_payload`
3. Base64-decodes the payload into a UTF-8 string
4. Parses the string into a list of boxes (polygons + availability)
5. Upserts each box into Postgres using Prisma

On success, the endpoint returns `{ success: true, boxes: [...] }`.
On failure (database errors), it returns HTTP `500` with `{ error: "Failed to store parking data in database" }`.

---

### 2) Boxes API: `GET /api/boxes`
**File:** `app/api/boxes/route.ts`

Reads the latest box records from Postgres and returns them in a frontend-friendly shape:

```json
[
  {
    "id": 1,
    "coordinates": [[x1,y1],[x2,y2],[x3,y3],[x4,y4]],
    "availability": 0
  }
]
