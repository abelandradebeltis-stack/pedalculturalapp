
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EventCard } from './EventCard';
import { EventDetail } from './EventDetail';
import events from '@/data/events.json'; // Import from the new JSON file

export const EventGallery = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedEvent = events.find(event => event.id === selectedId);

  return (
    <div className="bg-gray-50 dark:bg-gray-900 px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight">
          Nossos Eventos
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Reviva os momentos e descubra o impacto de cada iniciativa. Clique em um evento para ver os detalhes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {events.map(event => (
          <EventCard 
            key={event.id}
            title={event.title}
            description={event.description}
            imageUrl={event.featuredImage} // Use featuredImage from the JSON
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

export default EventGallery;
