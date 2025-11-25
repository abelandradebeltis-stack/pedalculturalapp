
'use client';

import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <motion.section 
      className="relative text-center pt-24 pb-16 md:pt-32 md:pb-20 px-4 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/banner.jpg')" }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Content container */}
      <div className="relative z-10">
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-white mb-4 tracking-tighter">
          Cultura, Comunidade e Sustentabilidade
        </h1>
        <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto">
          Transpondo as barreiras da sala de aula para um futuro mais consciente e conectado.
        </p>
      </div>
    </motion.section>
  );
};

export default Hero;
