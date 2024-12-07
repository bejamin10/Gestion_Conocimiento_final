import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import { Report } from '../types/Report';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface MapProps {
  reports: Report[];
  onLocationSelect: (location: { lat: number; lng: number }) => void;
}

function LocationSelector({ onLocationSelect }: { onLocationSelect: (location: { lat: number; lng: number }) => void }) {
  useMapEvents({
    click(e) {
      onLocationSelect({ lat: e.latlng.lat, lng: e.latlng.lng });
    },
  });
  return null;
}

export default function Map({ reports, onLocationSelect }: MapProps) {
  // Cercado de Lima coordinates
  const center = [-12.0464, -77.0428];

  return (
    <MapContainer
      center={center}
      zoom={14}
      style={{ height: '500px', width: '100%' }}
      className="rounded-lg shadow-md"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationSelector onLocationSelect={onLocationSelect} />
      
      {reports.map((report) => (
        <Marker
          key={report.id}
          position={[report.location.lat, report.location.lng]}
        >
          <Popup>
            <div className="p-2">
              <p className="font-semibold">Fecha: {new Date(report.date).toLocaleDateString()}</p>
              <p className="mt-2">{report.description}</p>
              <p className="mt-2 text-sm text-gray-600">
                Estado: {report.status === 'pending' ? 'Pendiente' : 
                        report.status === 'investigating' ? 'En investigación' : 'Resuelto'}
              </p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}