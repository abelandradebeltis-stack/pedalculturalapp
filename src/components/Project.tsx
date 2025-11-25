
'use client';

import { motion } from 'framer-motion';

export const Project = () => {
  return (
    <motion.div
      className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-3xl mx-auto text-center">
        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">Sobre o Projeto</h3>
        <div className="space-y-4 text-gray-600 dark:text-gray-300 text-left md:text-justify">
          <p>
            O projeto Pedal Cultural da Universidade São Judas Tadeu - USJT tem por objetivo transpor as barreiras da sala de aula engajando nossos alunos em ações extensionistas recreativas, culturais e sociais, bem como a comunidade por meio do incentivo ao uso da bicicleta como meio de transporte alternativo, integrativo, saudável e sustentável para melhoria da mobilidade urbana na cidade de São Paulo.
          </p>
          <p>
            Liderado pelo Professor Antonio Sérgio Brejão, o projeto busca criar uma ponte entre a teoria acadêmica e a prática cidadã, promovendo um impacto positivo e duradouro na comunidade.
          </p>
        </div>
      </div>
    </motion.div>
  );
};
