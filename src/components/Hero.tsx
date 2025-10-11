
'use client';

import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <motion.section 
      // Add padding top to account for the fixed header
      className="text-center pt-32 pb-20 px-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* The main title is now in the Header. This section can introduce the page's purpose */}
      <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 tracking-tighter">
        Cultura, Comunidade e Sustentabilidade
      </h1>
      <p className="text-lg md:text-xl text-cinza-urbano max-w-3xl mx-auto">
        Transpondo as barreiras da sala de aula para um futuro mais consciente e conectado.
      </p>
    </motion.section>
  );
};

export default Hero;
