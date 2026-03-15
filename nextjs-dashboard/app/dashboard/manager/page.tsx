import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function ManagerPage() {
  const session = await auth();
  if (session?.user?.role !== 'manager') {
    redirect('/dashboard');
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">
        Parking Manager
      </h1>
      <p className="text-gray-600">
        Manage parking spots, view occupancy, and configure the lot.
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        <Link
          href="/boxes"
          className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition hover:border-blue-300 hover:shadow-md"
        >
          <h2 className="text-lg font-medium text-gray-900">Boxes overlay</h2>
          <p className="mt-1 text-sm text-gray-500">
            View live parking spot availability (bounding boxes).
          </p>
        </Link>
        <Link
          href="/configuration"
          className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition hover:border-blue-300 hover:shadow-md"
        >
          <h2 className="text-lg font-medium text-gray-900">Configuration</h2>
          <p className="mt-1 text-sm text-gray-500">
            Configure map and parking lot settings.
          </p>
        </Link>
        <Link
          href="/dashboard/Map"
          className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition hover:border-blue-300 hover:shadow-md"
        >
          <h2 className="text-lg font-medium text-gray-900">Map</h2>
          <p className="mt-1 text-sm text-gray-500">
            Open the dashboard map view.
          </p>
        </Link>
      </div>
    </div>
  );
}
