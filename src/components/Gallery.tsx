
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EventCard } from './EventCard';
import { EventDetail } from './EventDetail'; // Import the new component

// Mock data for events
const events = [
  {
    id: 'pedalada-rosa-2024',
    title: '9ª Pedalada Rosa',
    description: 'Um dia de conscientização e comunidade, unindo esporte e solidariedade na luta contra o câncer de mama.',
    featuredImage: '/images/3.jpg',
    images: [
      { src: "/images/2.jpg", alt: "Ciclistas na chuva." },
      { src: "/images/3.jpg", alt: "Foto em grupo." },
      { src: "/images/4.jpg", alt: "Conversa com agentes de trânsito." },
      { src: "/images/6.jpg", alt: "Bicicleta na carrinha." },
    ],
    fullDescription: 'A nona edição da Pedalada Rosa foi um sucesso, reunindo centenas de participantes apesar do tempo chuvoso. O evento, que visa a conscientização sobre o câncer de mama, transformou as ruas da cidade em um mar de rosa. A energia e o espírito de comunidade foram contagiantes, mostrando a força da união por uma causa nobre. Agradecemos a todos os envolvidos, desde os participantes e voluntários até as forças de segurança que garantiram um percurso tranquilo.'
  },
];

export const Gallery = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedEvent = events.find(event => event.id === selectedId);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-extrabold text-white mb-4 tracking-tight">
          Nossos Eventos
        </h2>
        <p className="text-lg text-cinza-urbano max-w-3xl mx-auto">
          Reviva os momentos e descubra o impacto de cada iniciativa. Clique em um evento para ver os detalhes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.map(event => (
          <EventCard 
            key={event.id}
            title={event.title}
            description={event.description}
            imageUrl={event.featuredImage}
            onClick={() => setSelectedId(event.id)}
          />
        ))}
      </div>

      <AnimatePresence>
        {selectedEvent && (
          <EventDetail 
            key={selectedEvent.id}
            title={selectedEvent.title}
            fullDescription={selectedEvent.fullDescription}
            images={selectedEvent.images}
            onClose={() => setSelectedId(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
