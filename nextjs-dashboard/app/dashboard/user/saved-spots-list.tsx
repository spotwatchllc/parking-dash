'use client';

import { useState } from 'react';

type SpotItem = {
  id: number;
  imageId: number;
  boxId: number;
  name: string | null;
  availability: number | null;
};

export function SavedSpotsList({ initialSpots }: { initialSpots: SpotItem[] }) {
  const [spots, setSpots] = useState(initialSpots);

  async function remove(id: number) {
    try {
      const res = await fetch(`/api/user/saved-spots?id=${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setSpots((prev) => prev.filter((s) => s.id !== id));
      }
    } catch {
      // ignore
    }
  }

  if (spots.length === 0) {
    return (
      <div className="rounded-lg border border-gray-200 bg-gray-50 p-8 text-center text-gray-500">
        You have no saved spots yet. Use the map to find a spot and save it for
        quick access.
      </div>
    );
  }

  return (
    <ul className="space-y-3">
      {spots.map((spot) => (
        <li
          key={spot.id}
          className="flex items-center justify-between rounded-lg border border-gray-200 bg-white px-4 py-3 shadow-sm"
        >
          <div>
            <span className="font-medium text-gray-900">
              {spot.name ?? `Spot ${spot.boxId} (image ${spot.imageId})`}
            </span>
            <span className="ml-2 text-sm text-gray-500">
              {spot.availability === 1 ? (
                <span className="text-red-600">Occupied</span>
              ) : spot.availability === 0 ? (
                <span className="text-green-600">Available</span>
              ) : (
                '—'
              )}
            </span>
          </div>
          <button
            type="button"
            onClick={() => remove(spot.id)}
            className="rounded px-2 py-1 text-sm text-red-600 hover:bg-red-50"
          >
            Remove
          </button>
        </li>
      ))}
    </ul>
  );
}
