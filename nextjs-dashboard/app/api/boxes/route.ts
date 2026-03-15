/**
 * Boxes API - Returns parking spots in below format
 * Format: {id, coordinates: [[x1,y1], [x2,y2], [x3,y3], [x4,y4]], availability: 0/1}
 */
import { NextResponse } from "next/server";
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const boxes = await prisma.box.findMany({
            select: {
                imageId: true,
                boxId: true,
                x1: true, y1: true,
                x2: true, y2: true,
                x3: true, y3: true,
                x4: true, y4: true,
                availability: true
            },
            orderBy: [{ imageId: 'asc' }, { boxId: 'asc' }],
        });

        return NextResponse.json(
            boxes.map(b => ({
                imageId: b.imageId,
                id: b.boxId,
                coordinates: [
                    [b.x1, b.y1],
                    [b.x2, b.y2], 
                    [b.x3, b.y3],
                    [b.x4, b.y4]
                ],
                availability: b.availability
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