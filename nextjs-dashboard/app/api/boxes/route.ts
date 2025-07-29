import { NextResponse } from "next/server";
import { getBoxes } from "@/lib/boxStore";

export async function GET() {
    return NextResponse.json(getBoxes());
}