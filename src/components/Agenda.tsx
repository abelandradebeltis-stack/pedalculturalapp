'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { AgendaItem } from '@/app/page'; // Importa a interface de /app/page.tsx

// A interface AgendaItem agora é importada, não definida aqui

// Interface para as props do componente Agenda atualizada
interface AgendaProps {
  agendaItems: AgendaItem[];
  onAddEvent: (item: Omit<AgendaItem, 'id'>) => void;
  onDeleteEvent: (id: string) => void; // Espera um ID (string)
}

export const Agenda = ({ agendaItems, onAddEvent, onDeleteEvent }: AgendaProps) => {
  const { user } = useAuth();
  const [isModalOpen, setModalOpen] = useState(false);
  const [date, setDate] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newEvent = {
      date,
      title,
      description,
      lat: lat ? parseFloat(lat) : undefined,
      lng: lng ? parseFloat(lng) : undefined,
    };
    onAddEvent(newEvent);
    setModalOpen(false);
    // Limpa os campos do formulário
    setDate('');
    setTitle('');
    setDescription('');
    setLat('');
    setLng('');
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Próximos Eventos</h3>
        {user && (
          <button onClick={() => setModalOpen(true)} className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">Adicionar Evento</button>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <motion.div initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-2xl w-full max-w-lg">
            <h3 className="text-2xl font-bold mb-4">Novo Evento</h3>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Inputs do formulário... */}
                <input type="date" placeholder="Data" value={date} onChange={e => setDate(e.target.value)} className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600" required />
                <input type="text" placeholder="Título" value={title} onChange={e => setTitle(e.target.value)} className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600" required />
                <textarea placeholder="Descrição" value={description} onChange={e => setDescription(e.target.value)} className="p-2 border rounded md:col-span-2 dark:bg-gray-700 dark:border-gray-600" required />
                <input type="text" placeholder="Latitude" value={lat} onChange={e => setLat(e.target.value)} className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600" />
                <input type="text" placeholder="Longitude" value={lng} onChange={e => setLng(e.target.value)} className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600" />
                <p className="text-sm text-gray-500 md:col-span-2">
                    Dica: Para obter as coordenadas, <a href="https://www.google.com/maps" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">abra o Google Maps</a>, clique com o botão direito no local e copie os números.
                </p>
              <div className="md:col-span-2 flex justify-end gap-4">
                <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Cancelar</button>
                <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Adicionar</button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      <div className="space-y-6">
        {agendaItems.map((item, index) => (
          <motion.div key={item.id || index} className="relative p-4 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-md" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }}>
            {user && item.id && (
              <button onClick={() => onDeleteEvent(item.id!)} className="absolute top-2 right-2 text-red-500 hover:text-red-700">✖</button>
            )}
            <h4 className="font-bold text-green-600 dark:text-green-400">{new Date(item.date).toLocaleDateString('pt-BR', {timeZone: 'UTC'})}</h4>
            <h5 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mt-1">{item.title}</h5>
            <p className="text-gray-600 dark:text-gray-300 mt-2">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
