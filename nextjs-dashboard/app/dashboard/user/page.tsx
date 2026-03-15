import { auth } from '@/auth';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { SavedSpotsList } from './saved-spots-list';

export default async function UserPage() {
  const session = await auth();
  if (!session?.user?.id) return null;

  const savedSpots = await prisma.savedSpot.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: 'desc' },
  });

  // Fetch current availability for each spot from boxes
  const spotKeys = savedSpots.map((s) => ({ imageId: s.imageId, boxId: s.boxId }));
  const boxes = await prisma.box.findMany({
    where: {
      OR: spotKeys.map((k) => ({ imageId: k.imageId, boxId: k.boxId })),
    },
    select: { imageId: true, boxId: true, availability: true },
  });
  const availabilityMap = new Map(
    boxes.map((b) => [`${b.imageId}-${b.boxId}`, b.availability])
  );

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">My saved spots</h1>
      <p className="text-gray-600">
        Your saved parking spots. Open the map to find and save more.
      </p>
      <Link
        href="/dashboard/Map"
        className="inline-block rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
      >
        View map
      </Link>
      <SavedSpotsList
        initialSpots={savedSpots.map((s) => ({
          id: s.id,
          imageId: s.imageId,
          boxId: s.boxId,
          name: s.name,
          availability: availabilityMap.get(`${s.imageId}-${s.boxId}`) ?? null,
        }))}
      />
    </div>
  );
}
