
'use client';

import { motion } from 'framer-motion';

const agendaItems = [
  {
    date: '24/09',
    title: 'Acolhimento e Planejamento',
    description: 'Acolhimento dos alunos entrantes, exposição e debates sobre os conceitos do Pedal Cultural, e divisão das atividades.',
  },
  {
    date: 'A definir',
    title: 'Passeio da Pedalada PRIMAVERA',
    description: 'Um passeio ciclístico para celebrar a chegada da primavera.',
  },
  {
    date: 'A definir',
    title: 'Reunião Pós-Pedalada',
    description: 'Recolhimento das fotos e registros da Pedalada da Primavera.',
  },
  {
    date: 'Outubro',
    title: 'Passeio da Pedalada Outubro Rosa',
    description: 'Em parceria com o Instituto Quimioterapia e Beleza.',
  },
  {
    date: 'A definir',
    title: 'Apresentação dos Estudos',
    description: 'Apresentação sobre os levantamentos do estudo do meio por meio de fotos e vídeos registrados nos passeios.',
  },
  {
    date: 'A definir',
    title: 'Organização do Terceiro Passeio',
    description: 'Reunião para organizar o terceiro passeio sociocultural.',
  },
  {
    date: 'A definir',
    title: 'Terceiro Passeio Sociocultural',
    description: 'Um passeio pela cidade de São Paulo com foco em aspectos socioculturais.',
  },
  {
    date: 'A definir',
    title: 'Roda de Conversa',
    description: 'Reunião para ouvir as experiências dos alunos.',
  },
  {
    date: 'Contínuo',
    title: 'Postagens dos Alunos',
    description: 'Os alunos irão partilhar as imagens e histórias da Pedalada Cultural nas redes sociais.',
  },
];

export const Agenda = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Agenda de Ações e Alinhamentos</h3>
      <div className="space-y-6">
        {agendaItems.map((item, index) => (
          <motion.div 
            key={index} 
            className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <h4 className="font-bold text-green-600 dark:text-green-400">{item.date}</h4>
            <h5 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mt-1">{item.title}</h5>
            <p className="text-gray-600 dark:text-gray-300 mt-2">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
