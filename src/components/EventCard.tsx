
'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

interface EventCardProps {
  title: string;
  description: string;
  imageUrl: string;
  onClick: () => void;
}

export const EventCard = ({ title, description, imageUrl, onClick }: EventCardProps) => {
  return (
    <motion.div
      onClick={onClick}
      className="cursor-pointer rounded-lg overflow-hidden shadow-lg bg-jardim-noturno hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
      layoutId={`card-container-${title}`}
    >
      <div className="relative h-56">
        <Image
          src={imageUrl}
          alt={`Imagem de destaque para ${title}`}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
      </div>
      <div className="p-6">
        <motion.h3 
          className="text-2xl font-bold text-white mb-2 tracking-tight"
          layoutId={`card-title-${title}`}
        >
          {title}
        </motion.h3>
        <motion.p 
          className="text-cinza-urbano leading-relaxed"
          layoutId={`card-description-${title}`}
        >
          {description}
        </motion.p>
      </div>
    </motion.div>
  );
};
