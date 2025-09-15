/**
 * TTN (The Things Network) Webhook Handler
 * 
 * This endpoint receives data from TTN when IoT devices send parking spot information.
 * 
 * Data Flow:
 * 1. IoT Device → TTN Console → This Webhook → Database
 * 2. Receives base64-encoded payload containing bounding box coordinates and availability
 * 3. Stores first-time coordinates permanently, updates only availability for existing boxes
 * 
 * Expected TTN payload format:
 * {
 *   "uplink_message": {
 *     "frm_payload": "base64_encoded_string"
 *   }
 * }
 * 
 * Decoded payload format: "bbox:1,100,200,150,250,0;2,300,400,350,450,1"
 * Where each segment is: box_id,x1,y1,x2,y2,availability
 */

import { NextRequest, NextResponse } from "next/server";
import { prisma } from '@/lib/prisma';

// Type definition for parsed bounding box data from TTN
type ParsedBox = { 
    box_id: number;       // Unique identifier for the parking spot
    x1: number;           // Top-left X coordinate  
    y1: number;           // Top-left Y coordinate
    x2: number;           // Bottom-right X coordinate
    y2: number;           // Bottom-right Y coordinate
    availability: number; // 0 = available, 1 = occupied
};

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
        /**
         * Database Storage Strategy:
         * - FIRST TIME: Store complete bounding box coordinates + availability
         * - SUBSEQUENT: Only update availability, preserve original coordinates
         * 
         * This ensures parking spot locations remain consistent while
         * availability updates in real-time from IoT sensors
         */
        for (const b of boxes) {
            await prisma.box.upsert({
                where: { boxId: b.box_id },
                create: {
                    // If it's the first time seeing this box, store coordinates and availability
                    boxId: b.box_id,
                    x1: b.x1, y1: b.y1,
                    x2: b.x2, y2: b.y2,
                    x3: b.x3, y3: b.y3,
                    x4: b.x4, y4: b.y4,
                    availability: b.availability,
                },
                update: {
                    // If the box exists only update availability, keep original coordinates
                    availability: b.availability,
                    updatedAt: new Date(),
                },
            });
        }
        
        return NextResponse.json({ success: true, boxes: boxes});
    } catch(error) {
        console.error('Database error while storing parking data:', error);
        return NextResponse.json(
            { error: "Failed to store parking data in database" },
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

    // Remove optional "bbox:" prefix if present
    if (data.startsWith('bbox:')) {
        data = data.slice(5);
    }

    // Parse and return array of parking spots with 4-corner coordinates
    // Expected format: box_id,x1,y1,x2,y2,x3,y3,x4,y4,availability
    return data
        .split(';')
        .filter(Boolean)
        .map(seg => seg.split(',').map(Number))
        .filter(parts =>
            parts.length === 10 && parts.every(n => !isNaN(n))
        )
        .map(([box_id, x1, y1, x2, y2, x3, y3, x4, y4, availability]) => ({
            box_id,
            x1, y1, x2, y2, x3, y3, x4, y4,
            availability
        }));
}