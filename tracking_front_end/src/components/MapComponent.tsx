'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

interface MapComponentProps {
  latitude: number;
  longitude: number;
}

export default function MapComponent({ latitude, longitude }: MapComponentProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Fix for Leaflet marker icons not showing in Next.js
    delete (L.Icon.Default.prototype as any)._getIconUrl;

    L.Icon.Default.mergeOptions({
      iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png').default?.src || require('leaflet/dist/images/marker-icon-2x.png'),
      iconUrl: require('leaflet/dist/images/marker-icon.png').default?.src || require('leaflet/dist/images/marker-icon.png'),
      shadowUrl: require('leaflet/dist/images/marker-shadow.png').default?.src || require('leaflet/dist/images/marker-shadow.png'),
    });
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const position: [number, number] = [latitude, longitude];

  return (
    <div className="h-[400px] w-full rounded-xl overflow-hidden shadow-md">
      <MapContainer center={position} zoom={13} scrollWheelZoom={false} className="h-full w-full">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            Position actuelle du colis
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
