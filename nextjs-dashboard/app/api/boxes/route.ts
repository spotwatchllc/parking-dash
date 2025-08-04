import { NextResponse } from "next/server";
import { BoxDatabase, ensureInitialized } from "@/lib/database";

export async function GET() {
    try {
        await ensureInitialized();
        const boxes = await BoxDatabase.getBoxes();
        return NextResponse.json(boxes);
    } catch (error) {
        console.error('Error fetching boxes: ', error);
        return NextResponse.json(
            { error: 'Failed to fetch boxes' },
            { status: 500 }
        );
    }
}