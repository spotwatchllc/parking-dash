'use client';

import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';

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
      .then(res => res.json())
      .then(setSpots);
  }, []);

  useEffect(() => {
    if (!mapContainerRef.current || spots.length === 0) return;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/satellite-streets-v12',
      center: spots[0].coordinates[0], // center on first box
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

  return <div ref={mapContainerRef} className="fixed inset-0 w-screen h-screen z-0" />;
}
