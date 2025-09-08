import { NextResponse } from "next/server";
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const boxes = await prisma.box.findMany({
            select: {
                boxId: true, 
                x1: true, 
                y1: true, 
                x2: true, 
                y2: true 
            },
            orderBy: { boxId: 'asc' },
        });

        return NextResponse.json(
            boxes.map(b => ({ 
                box_id: b.boxId, 
                x1: b.x1, 
                y1: b.y1, 
                x2: b.x2, 
                y2: b.y2 
            }))
        );
    } catch (error) {
        console.error('Error fetching boxes: ', error);
        return NextResponse.json(
            { error: 'Failed to fetch boxes' },
            { status: 500 }
        );
    }
}