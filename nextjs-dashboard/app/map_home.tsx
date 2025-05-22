'use client';

import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from '@/components/ui/navigation-menu';

mapboxgl.accessToken = 'pk.eyJ1IjoiYXJ1bG1rMTciLCJhIjoiY2x5eWphY2VsMmEwejJqcHlyMTBpNTA5YSJ9.awhbH-MC409jQiIcp9K1Ig';

type ParkingSpot = {
  parking_id: number;
  coordinates: [number, number][];
  availability: number;
};

export default function Map() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const [spots, setSpots] = useState<ParkingSpot[]>([]);

  useEffect(() => {
    fetch('/parking.json')
      .then((res) => res.json())
      .then(setSpots);
  }, []);

  useEffect(() => {
    if (!mapContainerRef.current || spots.length === 0) return;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/satellite-streets-v12',
      center: spots[0].coordinates[0],
      zoom: 16,
    });

    mapRef.current = map;

    map.on('load', () => {
      spots.forEach((spot, i) => {
        const geojson: GeoJSON.FeatureCollection = {
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              geometry: {
                type: 'Polygon',
                coordinates: [[...spot.coordinates, spot.coordinates[0]]],
              },
              properties: {
                color: spot.availability === 1 ? '#ff0000' : '#00ff00',
              },
            },
          ],
        };

        map.addSource(`parking-${i}`, {
          type: 'geojson',
          data: geojson,
        });

        map.addLayer({
          id: `layer-${i}`,
          type: 'fill',
          source: `parking-${i}`,
          paint: {
            'fill-color': ['get', 'color'],
            'fill-opacity': 0.5,
          },
        });

        map.addLayer({
          id: `border-${i}`,
          type: 'line',
          source: `parking-${i}`,
          paint: {
            'line-color': '#000',
            'line-width': 1,
          },
        });
      });
    });

    return () => map.remove();
  }, [spots]);

  return (
    <div className="relative w-screen h-screen">
      {/* Map container */}
      <div ref={mapContainerRef} className="absolute inset-0 z-0" />

      {/* Navigation Menu (Top-left corner) */}
      <div className="absolute top-4 left-4 z-20">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger> Menu </NavigationMenuTrigger>
              <NavigationMenuContent className="p-4 bg-white rounded shadow max-h-[400px] overflow-y-auto">
                {spots.map((spot) => (
                  <div
                    key={spot.parking_id}
                    className={`p-2 rounded mb-2 text-sm ${
                      spot.availability === 1 ? 'bg-red-100' : 'bg-green-100'
                    }`}
                  >
                    <p className="font-semibold">Spot #{spot.parking_id}</p>
                    <p>Status: {spot.availability === 1 ? 'Unavailable' : 'Available'}</p>
                  </div>
                ))}
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      {/* Map Overlay Text (centered at top) */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 px-6 py-4 rounded-xl bg-white bg-opacity-70 text-black text-5xl font-bold tracking-wide shadow-md">
        Welcome To SpotWatch
      </div>
      <img
        src="/SPOTWATCH_logo.png"
        alt="Logo"
        className="absolute bottom-4 right-4 w-20 h-auto z-20 rounded shadow opacity-70"
      />
    </div>
  );
}
