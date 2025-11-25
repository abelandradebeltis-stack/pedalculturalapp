'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { AgendaItem } from '@/app/page';

interface AgendaProps {
  agendaItems: AgendaItem[];
  onAddEvent: (item: Omit<AgendaItem, 'id'>) => void;
  onDeleteEvent: (id: string) => void;
}

export const Agenda = ({ agendaItems, onAddEvent, onDeleteEvent }: AgendaProps) => {
  const { user } = useAuth();
  const [isModalOpen, setModalOpen] = useState(false);
  const [date, setDate] = useState('');
  const [time, setTime] = useState(''); // Adicionado estado para a hora
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newEvent = {
      date,
      time,
      title,
      description,
      lat: lat ? parseFloat(lat) : undefined,
      lng: lng ? parseFloat(lng) : undefined,
    };
    onAddEvent(newEvent);
    setModalOpen(false);
    // Limpa os campos do formulário
    setDate('');
    setTime('');
    setTitle('');
    setDescription('');
    setLat('');
    setLng('');
  };

  return (
    <motion.div 
      className="bg-gray-50 dark:bg-gray-900 py-16 px-4 sm:px-6 lg:px-8"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Próximos Eventos</h3>
            {user && (
              <button 
                onClick={() => setModalOpen(true)} 
                className="mt-4 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-300 shadow-md hover:shadow-lg"
              >
                Adicionar Evento
              </button>
            )}
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
            <motion.div 
              initial={{ y: -50, opacity: 0 }} 
              animate={{ y: 0, opacity: 1 }} 
              className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-2xl w-full max-w-lg"
            >
              <h3 className="text-2xl font-bold mb-6 text-center">Novo Evento</h3>
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input type="date" placeholder="Data" value={date} onChange={e => setDate(e.target.value)} className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600 w-full" required />
                  <input type="time" placeholder="Hora" value={time} onChange={e => setTime(e.target.value)} className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600 w-full" required />
                  <input type="text" placeholder="Título" value={title} onChange={e => setTitle(e.target.value)} className="p-2 border rounded md:col-span-2 dark:bg-gray-700 dark:border-gray-600 w-full" required />
                  <textarea placeholder="Descrição" value={description} onChange={e => setDescription(e.target.value)} className="p-2 border rounded md:col-span-2 dark:bg-gray-700 dark:border-gray-600 w-full" required />
                  <input type="text" placeholder="Latitude" value={lat} onChange={e => setLat(e.target.value)} className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600 w-full" />
                  <input type="text" placeholder="Longitude" value={lng} onChange={e => setLng(e.target.value)} className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600 w-full" />
                  <p className="text-sm text-gray-500 md:col-span-2">
                      Dica: Para obter as coordenadas, <a href="https://www.google.com/maps" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">abra o Google Maps</a>, clique com o botão direito no local e copie os números.
                  </p>
                <div className="md:col-span-2 flex justify-end gap-4 mt-4">
                  <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 bg-gray-300 dark:bg-gray-600 rounded hover:bg-gray-400 dark:hover:bg-gray-500">Cancelar</button>
                  <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Adicionar</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}

        <div className="space-y-6">
          {agendaItems.length > 0 ? (
            agendaItems.map((item, index) => (
              <motion.div 
                key={item.id || index} 
                className="relative p-5 bg-white dark:bg-gray-800 border-l-4 border-green-500 rounded-r-lg shadow-sm hover:shadow-lg transition-shadow duration-300"
                initial={{ opacity: 0, x: -20 }} 
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {user && item.id && (
                  <button onClick={() => onDeleteEvent(item.id!)} className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-2xl font-bold">&times;</button>
                )}
                <p className="font-bold text-green-600 dark:text-green-400">{new Date(item.date).toLocaleDateString('pt-BR', {timeZone: 'UTC', day: '2-digit', month: 'long', year: 'numeric'})}</p>
                <h4 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mt-1">{item.title}</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">{item.time}</p>
                <p className="text-gray-600 dark:text-gray-300 mt-2">{item.description}</p>
              </motion.div>
            ))
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400">Nenhum evento agendado no momento.</p>
          )}
        </div>
      </div>
    </motion.div>
  );
};
