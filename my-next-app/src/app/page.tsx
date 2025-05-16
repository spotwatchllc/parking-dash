'use client';

import Image from "next/image";
import { useEffect, useState } from "react";

type DataType = {
  parking_id: number;
  coordinates: number[];
  availability: number;
};

export default function Home() {
  const [data, setData] = useState<DataType | null>(null);

  useEffect(() => {
    fetch('/parking.json')
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error("Failed to load JSON:", err));
  }, []);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={1000}
          height={38}
          priority
        />
        <ol className="list-inside list-decimal text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2 tracking-[-.01em]">
            Get started by editing{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-[family-name:var(--font-geist-mono)] font-semibold">
              src/app/page.tsx
            </code>
            .
          </li>
          <li className="tracking-[-.01em]">
            Save and see your changes instantly.
          </li>
        </ol>

        {/* ✅ Individual JSON Fields Display */}
        <div className="flex flex-col gap-4 mt-4 text-sm w-full max-w-md">
          <h2 className="font-bold text-base">Loaded JSON Fields:</h2>
          {data ? (
            <>
              <label className="flex flex-col gap-1">
                <span className="font-medium">Parking ID:</span>
                <input
                  type="number"
                  value={data.parking_id}
                  readOnly
                  className="border border-gray-300 p-2 rounded"
                />
              </label>

              <label className="flex flex-col gap-1">
                <span className="font-medium">Coordinates:</span>
                <input
                  type="text"
                  value={data.coordinates.join(', ')}
                  readOnly
                  className="border border-gray-300 p-2 rounded"
                />
              </label>

              <label className="flex flex-col gap-1">
                <span className="font-medium">Availability:</span>
                <textarea
                  value={data.availability}
                  readOnly
                  className="border border-gray-300 p-2 rounded min-h-[80px]"
                />
              </label>
            </>
          ) : (
            <p>Loading...</p>
          )}
        </div>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          {/* Buttons remain unchanged */}
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        {/* Footer links remain unchanged */}
      </footer>
    </div>
  );
}
