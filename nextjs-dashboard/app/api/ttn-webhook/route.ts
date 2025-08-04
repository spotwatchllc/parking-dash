// app/api/ttn-webhook/route.ts
import { NextRequest, NextResponse } from "next/server";
import { BoxDatabase, ensureInitialized, Box } from "@/lib/database";

// Handle POST requests sent to the TTN webhook
export async function POST(request: NextRequest) {
    let body: any;

    // Parse the incoming request as json
    try {
        body = await request.json();
    } catch {
        return NextResponse.json({error: "Invalid JSON"}, {status: 400});
    }

    // Extract the message and decode
    const up = body.uplink_message || {};
    const raw = up.frm_payload || '';
    const boxes = parseBboxes(raw);

    // Debugging logs
    console.log(up);
    console.log("TTN Webhook received:")
    if (up) {
        console.log("Decoded coords: ", boxes)
    }

    try {
        await ensureInitialized();
        await BoxDatabase.setBoxes(boxes);
        return NextResponse.json({"success": true, "coords": boxes});
    } catch(error) {
        console.error('Error storing boxes: ', error);
        return NextResponse.json(
            { error: "Failed to store boxes" },
            { status: 500 },
        )
    }
}

// Function to parse base64-encoded data from the payload
function parseBboxes(rawB64: string) {
    if (!rawB64) return [];

    let data: string;
    try {
        // Decode base64 string to a UTF-8 string
        data = Buffer.from(rawB64, 'base64').toString('utf-8');
    } catch {
        return [];
    }

    if (data.startsWith('bbox:')) {
        data = data.slice(5);
    }

    // Parse and return an array of valid bounding box objects
    const boxes: Box[] = data
        .split(';')
        .filter(Boolean)
        .map(seg => seg.split(',').map(Number))
        .filter(parts =>
            parts.length === 5 && parts.every(n  => !isNaN(n))
        )
        .map(([box_id, x1, y1, x2, y2]) => ({
            box_id,
            x1, 
            y1,
            x2,
            y2
        }));
    
    return boxes;
}