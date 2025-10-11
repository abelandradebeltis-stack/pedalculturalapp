
'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface ImageInfo {
  src: string;
  alt: string;
}

interface EventDetailProps {
  title: string;
  fullDescription: string;
  images: ImageInfo[];
  onClose: () => void;
}

export const EventDetail = ({ title, fullDescription, images, onClose }: EventDetailProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        layoutId={`card-container-${title}`}
        className="relative w-full max-w-4xl max-h-[90vh] bg-cinza-asfalto rounded-2xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        <div className="absolute top-0 right-0 p-3 z-20">
          <button 
            onClick={onClose} 
            className="text-white bg-black/50 rounded-full p-2 hover:bg-black transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <div className="overflow-y-auto max-h-[90vh] p-8 sm:p-12">
            {/* Content Header */}
            <motion.h3 
              layoutId={`card-title-${title}`}
              className="text-4xl sm:text-5xl font-extrabold text-white mb-4 tracking-tight"
            >
              {title}
            </motion.h3>
            <motion.p 
              layoutId={`card-description-${title}`}
              className="text-cinza-urbano text-lg mb-8 leading-relaxed"
            >
              {fullDescription}
            </motion.p>

            {/* Image Gallery */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {images.map((image, index) => (
                <div key={index} className="relative h-64 w-full rounded-lg overflow-hidden shadow-md">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
