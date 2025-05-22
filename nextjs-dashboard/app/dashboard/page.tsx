import { Card } from '@/app/ui/dashboard/cards';
import SpotChart from '@/app/ui/dashboard/spot-chart'; // Consider renaming this to spot-chart.tsx
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import { lusitana } from '@/app/ui/fonts';
import { fetchspots } from '@/app/lib/data';

export default async function Page() {
  const spots = await fetchspots();

  const totalSpots = spots.length;
  const availableCount = spots.filter((spot) => spot.availability === 1).length;
  const vacantCount = totalSpots - availableCount;

  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      
      {/* Summary cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card title="Total Spots" value={totalSpots.toString()} type="total_spots" />
        <Card title="Available" value={availableCount.toString()} type="available" />
        <Card title="Vacant" value={vacantCount.toString()} type="vacant" />
      </div>
    </main>
  );
}
