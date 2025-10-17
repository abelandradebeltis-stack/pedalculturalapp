'use client';

import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Corrige o problema do ícone padrão do marcador, que pode não aparecer.
const icon = L.icon({ iconUrl: "/marker-icon.png" });

const center: [number, number] = [-23.55052, -46.633308];

const locations = [
  { lat: -23.5489, lng: -46.6388, name: "Evento 1: Centro de São Paulo" },
  { lat: -23.5613, lng: -46.6565, name: "Evento 2: Avenida Paulista" },
  { lat: -23.5865, lng: -46.6826, name: "Evento 3: Parque Ibirapuera" }
];

const Map = () => {
  return (
    <>
      <h2 className="text-3xl font-bold text-center text-cinza-urbano mb-12">
        Mapa de Eventos
      </h2>
      <MapContainer center={center} zoom={12} style={{ height: '400px', width: '100%' }} className="rounded-lg shadow-lg">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {locations.map((location, index) => (
          <Marker key={index} position={[location.lat, location.lng]} icon={icon}>
            <Popup>
              {location.name}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </>
  );
};

export default Map;
