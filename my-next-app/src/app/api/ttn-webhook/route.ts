import { NextRequest, NextResponse } from 'next/server';

let latestAvailability: number | null = null; // In-memory store (for dev/testing)

export async function POST(req: NextRequest) {
  const body = await req.json();
  const availability = body.uplink_message?.decoded_payload?.availability;

  console.log("Received TTN webhook data:", body);

  if (typeof availability === 'number') {
    latestAvailability = availability;
  }

  return NextResponse.json({ status: 'ok' });
}

export async function GET() {
  return NextResponse.json({ availability: latestAvailability });
}
