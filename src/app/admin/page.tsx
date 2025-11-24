
export const dynamic = 'force-dynamic';
'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { PlusCircle } from 'lucide-react';

interface Event {
  id: string;
  title: string;
  description: string;
}

const AdminDashboard = () => {
  const router = useRouter();
  const [events, setEvents] = useState<Event[]>([]);

  const fetchEvents = async () => {
    try {
        const response = await fetch('/api/events');
        if (!response.ok) throw new Error('Failed to fetch events.');
        const data = await response.json();
        setEvents(data);
    } catch (error) {
        console.error(error);
        // Optionally, set an error state to show in the UI
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Tem a certeza que deseja remover este evento?')) {
      try {
        const response = await fetch(`/api/events/${id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Falha ao remover o evento.');
        }

        fetchEvents(); // Refresh the list

      } catch (error) {
        console.error(error);
        alert('Ocorreu um erro ao remover o evento.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center mb-8"
        >
          <h1 className="text-3xl font-bold text-cinza-urbano">Gestão de Eventos</h1>
          <button 
            onClick={() => handleNavigate('/admin/events/new')}
            className="flex items-center bg-jardim-noturno text-white px-4 py-2 rounded-lg shadow-md hover:bg-opacity-90 transition-colors"
          >
            <PlusCircle className="w-5 h-5 mr-2" />
            Adicionar Evento
          </button>
        </motion.div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <ul className="divide-y divide-gray-200">
            {events.map((event) => (
              <li key={event.id} className="p-4 flex justify-between items-center hover:bg-gray-50 transition-colors">
                <div className="flex-1 min-w-0 mr-4">
                  <p className="font-semibold text-lg text-cinza-urbano truncate">{event.title}</p>
                  <p className="text-sm text-gray-500 truncate">{event.description}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <button 
                    onClick={() => handleNavigate(`/admin/events/${event.id}/edit`)}
                    className="text-blue-500 hover:text-blue-700 font-medium transition-colors"
                  >
                    Editar
                  </button>
                  <button 
                    onClick={() => handleDelete(event.id)}
                    className="text-red-500 hover:text-red-700 font-medium transition-colors"
                  >
                    Remover
                  </button>
                </div>
              </li>
            ))}
          </ul>
          {events.length === 0 && (
              <p className="p-6 text-center text-gray-500">Nenhum evento encontrado. Clique em &quot;Adicionar Evento&quot; para começar.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
