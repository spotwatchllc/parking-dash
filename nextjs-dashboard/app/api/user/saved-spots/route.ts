import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const spots = await prisma.savedSpot.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(spots);
  } catch (error) {
    console.error('Error fetching saved spots:', error);
    return NextResponse.json(
      { error: 'Failed to fetch saved spots' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { imageId, boxId, name } = body;
    if (
      typeof imageId !== 'number' ||
      typeof boxId !== 'number'
    ) {
      return NextResponse.json(
        { error: 'imageId and boxId are required numbers' },
        { status: 400 }
      );
    }

    const spot = await prisma.savedSpot.upsert({
      where: {
        userId_imageId_boxId: {
          userId: session.user.id,
          imageId,
          boxId,
        },
      },
      create: {
        userId: session.user.id,
        imageId,
        boxId,
        name: typeof name === 'string' ? name : null,
      },
      update: { name: typeof name === 'string' ? name : undefined },
    });
    return NextResponse.json(spot);
  } catch (error) {
    console.error('Error saving spot:', error);
    return NextResponse.json(
      { error: 'Failed to save spot' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json(
        { error: 'id query parameter required' },
        { status: 400 }
      );
    }

    await prisma.savedSpot.deleteMany({
      where: {
        id: parseInt(id, 10),
        userId: session.user.id,
      },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting saved spot:', error);
    return NextResponse.json(
      { error: 'Failed to delete saved spot' },
      { status: 500 }
    );
  }
}
