import { CalendarIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import { Spots } from '@/app/lib/definitions';

export default async function SpotChart({
  spots,
}: {
  spots: Spots[];
}) {
  const chartHeight = 350;

  if (!spots || spots.length === 0) {
    return <p className="mt-4 text-gray-400">No data available.</p>;
  }

  const totalSpots = spots.length;
  const availableCount = spots.filter((spot) => spot.availability === 1).length;
  const vacantCount = totalSpots - availableCount;
  const topValue = Math.max(totalSpots, availableCount, vacantCount);

  const data = [
    { label: 'Total', value: totalSpots },
    { label: 'Available', value: availableCount },
    { label: 'Vacant', value: vacantCount },
  ];

  return (
    <div className="w-full md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Parking Spot Summary
      </h2>

      <div className="rounded-xl bg-gray-50 p-4">
        <div className="sm:grid-cols-13 mt-0 grid grid-cols-12 items-end gap-2 rounded-md bg-white p-4 md:gap-4">
          <div
            className="mb-6 hidden flex-col justify-between text-sm text-gray-400 sm:flex"
            style={{ height: `${chartHeight}px` }}
          >
            {[topValue, Math.round(topValue / 2), 0].map((label) => (
              <p key={label}>{label}</p>
            ))}
          </div>

          {data.map((d) => (
            <div key={d.label} className="flex flex-col items-center gap-2 col-span-4">
              <div
                className="w-full rounded-md bg-blue-400"
                style={{
                  height: `${(chartHeight / topValue) * d.value}px`,
                }}
              ></div>
              <p className="text-sm text-gray-600">{d.label}</p>
            </div>
          ))}
        </div>
        <div className="flex items-center pb-2 pt-6">
          <CalendarIcon className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500">Live Availability</h3>
        </div>
      </div>
    </div>
  );
}
