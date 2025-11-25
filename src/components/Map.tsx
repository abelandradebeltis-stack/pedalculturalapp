'use client';

import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// --- Configuração dos Ícones ---
const defaultIcon = L.icon({ 
    iconUrl: "/leaflet/marker-icon.png",
    iconRetinaUrl: "/leaflet/marker-icon-2x.png",
    shadowUrl: "/leaflet/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

const eventIcon = L.icon({ 
    iconUrl: "/leaflet/marker-icon-yellow.png",
    iconRetinaUrl: "/leaflet/marker-icon-2x.png", 
    shadowUrl: "/leaflet/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = defaultIcon;
// --- Fim da Configuração dos Ícones ---

interface AgendaItem {
  date: string;
  time: string;
  title: string;
  description: string;
  lat?: number;
  lng?: number;
}

interface MapProps {
  agendaItems: AgendaItem[];
}

const Map = ({ agendaItems }: MapProps) => {
  const eventsWithLocation = agendaItems.filter(item => item.lat && item.lng);

  return (
    <div className="bg-gray-50 dark:bg-gray-900 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                    Mapa de Eventos e Locais
                </h2>
                 <p className="mt-4 text-gray-600 dark:text-gray-400">
                    Explore os locais dos próximos eventos e pontos de encontro importantes para a comunidade ciclista.
                </p>
            </div>
            <div className="h-96 md:h-[500px] w-full rounded-lg shadow-xl overflow-hidden z-0">
              <MapContainer 
                center={[-23.55052, -46.633308]} 
                zoom={12} 
                style={{ height: '100%', width: '100%' }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                
                {eventsWithLocation.map((event, index) => (
                  <Marker key={`event-${index}`} position={[event.lat!, event.lng!]} icon={eventIcon}>
                    <Popup>
                      <strong>{event.title}</strong><br/>
                      {new Date(event.date).toLocaleDateString('pt-BR', {timeZone: 'UTC'})} - {event.time}<br/>
                      {event.description}
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
        </div>
    </div>
  );
};

export default Map;
