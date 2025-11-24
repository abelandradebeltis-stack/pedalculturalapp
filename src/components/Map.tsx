'use client';

import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// --- Configuração dos Ícones ---
// Corrige o caminho para os ícones para funcionar após o build e deploy.
// O Next.js servirá esses arquivos da pasta /public.
const defaultIcon = L.icon({ 
    iconUrl: "/leaflet/marker-icon.png", // Caminho a partir da pasta /public
    iconRetinaUrl: "/leaflet/marker-icon-2x.png", // Para telas de alta resolução
    shadowUrl: "/leaflet/marker-shadow.png", // Sombra do ícone
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

const eventIcon = L.icon({ 
    iconUrl: "/leaflet/marker-icon-yellow.png", // Ícone amarelo personalizado
    iconRetinaUrl: "/leaflet/marker-icon-2x.png",
    shadowUrl: "/leaflet/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

// Define o ícone padrão para todos os marcadores (solução para um bug comum do Leaflet com Webpack)
L.Marker.prototype.options.icon = defaultIcon;
// --- Fim da Configuração dos Ícones ---

// Interface para os itens da agenda
interface AgendaItem {
  date: string;
  title: string;
  description: string;
  lat?: number;
  lng?: number;
}

// Interface para as props do mapa
interface MapProps {
  agendaItems: AgendaItem[];
}

const Map = ({ agendaItems }: MapProps) => {
  // Filtra os eventos da agenda que possuem coordenadas
  const eventsWithLocation = agendaItems.filter(item => item.lat && item.lng);

  return (
    <>
      <h2 className="text-3xl font-bold text-center text-cinza-urbano dark:text-gray-200 mb-12">
        Mapa de Eventos
      </h2>
      <MapContainer center={[-23.55052, -46.633308]} zoom={12} style={{ height: '400px', width: '100%' }} className="rounded-lg shadow-lg z-0">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        {/* Marcadores dinâmicos para eventos da agenda */}
        {eventsWithLocation.map((event, index) => (
          <Marker key={`event-${index}`} position={[event.lat!, event.lng!]} icon={eventIcon}>
            <Popup>
              <strong>{event.title}</strong><br/>
              {new Date(event.date).toLocaleDateString('pt-BR', {timeZone: 'UTC'})}<br/>
              {event.description}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </>
  );
};

export default Map;
