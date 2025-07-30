'use client';

import { useEffect, useRef, useState } from 'react';
import mapboxgl, { GeolocateControl, Marker } from 'mapbox-gl';
import { cn } from '@/lib/utils'; // combines class names
//import 'mapbox-gl/dist/mapbox-gl.css';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from '@/components/ui/navigation-menu';

import TypingHero from './Typing';
import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
import "mapbox-gl/dist/mapbox-gl.css";

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
  const [mapStyle, setMapStyle] = useState(
    'mapbox://styles/mapbox/satellite-streets-v12'
  );
  const [searchQuery, setSearchQuery] = useState('');

  const geolocateControlRef = useRef<GeolocateControl | null>(null);

  useEffect(() => {
    fetch('/parking.json')
      .then((res) => res.json())
      .then(setSpots);
  }, []);

  useEffect(() => {
    if (!mapContainerRef.current || spots.length === 0) return;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: mapStyle,
      center: spots[0].coordinates[0],
      zoom: 16,
    });

    mapRef.current = map;

    const geolocateControl = new GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      trackUserLocation: true,
      showUserHeading: true,
      fitBoundsOptions: { maxZoom: 15 },
    });

    mapRef.current.addControl(geolocateControl, 'bottom-left');
    geolocateControlRef.current = geolocateControl;


    mapRef.current.on("load", () => {
      geolocateControl.trigger();

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
  }, [spots, mapStyle]);

  const toggleMapStyle = () => {
    if (!mapRef.current) return;

    const currentCenter = mapRef.current.getCenter();
    const currentZoom = mapRef.current.getZoom();

    const newStyle =
      mapStyle === 'mapbox://styles/mapbox/streets-v12'
        ? 'mapbox://styles/mapbox/satellite-streets-v12'
        : 'mapbox://styles/mapbox/streets-v12';

    setMapStyle(newStyle);

    mapRef.current.setStyle(newStyle);
    mapRef.current.on('style.load', () => {
      mapRef.current?.setCenter(currentCenter);
      mapRef.current?.setZoom(currentZoom);
    });
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery) return;

    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          searchQuery
        )}.json?access_token=${mapboxgl.accessToken}`
      );
      const data = await response.json();

      if (data.features && data.features.length > 0) {
        const [lng, lat] = data.features[0].center;
        mapRef.current?.flyTo({ center: [lng, lat], zoom: 15 });
      } else {
        alert('Location not found. Please try a different search.');
      }
    } catch (error) {
      console.error('Error searching for location:', error);
    }
  };

  return (
    <div className="relative w-screen h-screen">
      {/* Map container */}
      <div ref={mapContainerRef} className="absolute inset-0 z-0" style={{
            width: "100%",
            height: "100%",
            border: "1px solid black",
            }} />

      {/* Buttons on map (top-right corner) */}
      <div className="absolute top-4 right-20 z-20 space-y-2 w-64">
        <form onSubmit={handleSearch} className="flex flex-row gap-2">
          <input
            type="text"
            placeholder="Search here"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={cn(buttonVariants({ variant: 'outline' }), 'flex-1')}
          />
          <button
            type="submit"
            className={buttonVariants({ variant: 'outline' })}
          >
            Search
          </button>
        </form>
      </div>
      <div className="absolute top-[72px] right-10 z-20">
        <button
        onClick={toggleMapStyle}
        className={buttonVariants({ variant: 'outline' })}
        >
        Toggle Map Style
      </button>
      </div>

      {/* Navigation Menu (Top-left corner) */}
      <div className="absolute top-4 left-4 z-20">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Menu</NavigationMenuTrigger>
              <NavigationMenuContent className="p-4 bg-white rounded shadow max-h-[400px] overflow-y-auto flex flex-col gap-2">
                <Link
                  href="/dashboard"
                  className={buttonVariants({ variant: 'outline' })}
                >
                  Dashboard
                </Link>
                <Link
                  href="/configuration"
                  className={buttonVariants({ variant: 'outline' })}
                >
                  Configuration
                </Link>
                <Link
                  href="/about"
                  className={buttonVariants({ variant: 'outline' })}
                >
                  About Us
                </Link>

                <Link
                  href="/boxes"
                  className={buttonVariants({ variant: 'outline' })}
                >
                  Show Boxes
                </Link>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>


      {/* Map Overlay Text (centered at top) */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
        <TypingHero />
      </div>

      <img
        src="/SPOTWATCH_logo.png"
        alt="Logo"
        className="absolute bottom-4 right-4 w-20 h-auto z-20 rounded shadow opacity-70"
      />
    </div>
  );
}
