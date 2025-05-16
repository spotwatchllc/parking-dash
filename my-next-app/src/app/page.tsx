'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [availability, setAvailability] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/ttn-webhook');
      const json = await res.json();
      setAvailability(json.availability);
    };

    fetchData();
    const interval = setInterval(fetchData, 5000); // poll every 5s

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-6 p-12">
      <h1 className="text-xl font-semibold">Live TTN Webhook Data</h1>
      {availability !== null ? (
        <div className="text-4xl font-bold bg-gray-100 p-6 rounded">
          {availability}
        </div>
      ) : (
        <p>Waiting for data...</p>
      )}
    </main>
  );
}
