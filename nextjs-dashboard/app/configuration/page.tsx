'use client';

import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { Button } from '@/components/ui/button';

mapboxgl.accessToken = 'pk.eyJ1IjoiYXJ1bG1rMTciLCJhIjoiY2x5eWphY2VsMmEwejJqcHlyMTBpNTA5YSJ9.awhbH-MC409jQiIcp9K1Ig';

export default function ImageMapLinker() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [clickedImageCoords, setClickedImageCoords] = useState<{ x: number; y: number } | null>(null);
  const [linkedPoints, setLinkedPoints] = useState<{ image: { x: number; y: number }; map: [number, number] }[]>([]);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/satellite-streets-v12',
      center: [-74.5, 40],
      zoom: 9,
      preserveDrawingBuffer: true,
    });

    mapRef.current = map;

    return () => map.remove();
  }, []);

  useEffect(() => {
    if (!mapRef.current) return;

    // Remove existing markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    // Add updated markers with labels
    linkedPoints.forEach((point, idx) => {
      const el = document.createElement('div');
      el.style.background = 'red';
      el.style.color = 'white';
      el.style.fontSize = '12px';
      el.style.fontWeight = 'bold';
      el.style.borderRadius = '9999px';
      el.style.width = '24px';
      el.style.height = '24px';
      el.style.display = 'flex';
      el.style.alignItems = 'center';
      el.style.justifyContent = 'center';
      el.style.pointerEvents = 'none';
      el.style.transform = 'translate(-50%, -50%)';
      el.style.position = 'absolute';
      el.innerText = String(idx + 1);

      const marker = new mapboxgl.Marker({ element: el, anchor: 'center' })
        .setLngLat(point.map)
        .addTo(mapRef.current!);

      markersRef.current.push(marker);
    });
  }, [linkedPoints]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImageSrc(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = (e: React.MouseEvent<HTMLImageElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setClickedImageCoords({ x, y });
  };

  const handleMapClick = (e: mapboxgl.MapMouseEvent & mapboxgl.EventData) => {
    if (clickedImageCoords) {
      const newLink = {
        image: clickedImageCoords,
        map: [e.lngLat.lng, e.lngLat.lat],
      };
      setLinkedPoints((prev) => [...prev, newLink]);
      setClickedImageCoords(null);
    }
  };

  useEffect(() => {
    mapRef.current?.on('click', handleMapClick);
    return () => {
      mapRef.current?.off('click', handleMapClick);
    };
  }, [clickedImageCoords]);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Image upload and preview area */}
      <div className="w-1/2 p-4 border-r border-gray-300 flex flex-col items-center justify-center relative">
        <label htmlFor="image-upload" className="mb-4">
          <Button variant="default" asChild>
            <span>Upload Image</span>
          </Button>
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </label>
        {imageSrc && (
          <div className="relative">
            <img
              src={imageSrc}
              alt="Uploaded"
              onClick={handleImageClick}
              className="max-w-full max-h-[80vh] cursor-crosshair"
            />
            {linkedPoints.map((point, idx) => (
              <div
                key={idx}
                className="absolute w-6 h-6 bg-red-500 text-white text-xs font-bold flex items-center justify-center rounded-full"
                style={{ left: point.image.x - 12, top: point.image.y - 12 }}
              >
                {idx + 1}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Map display area */}
      <div className="w-1/2 h-full relative">
        <div className="absolute inset-0" ref={mapContainerRef}></div>
      </div>
    </div>
  );
}
