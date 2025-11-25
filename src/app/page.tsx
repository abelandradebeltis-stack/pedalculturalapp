"use client";

import { useState, useEffect } from 'react';
import { db } from '@/firebase/config';
import { collection, onSnapshot, addDoc, doc, deleteDoc } from 'firebase/firestore';
import { motion } from 'framer-motion';
import { Agenda } from '@/components/Agenda';
import { CulturalMatter } from '@/components/CulturalMatter';
import Hero from '@/components/Hero';
import HowItWorks from '@/components/HowItWorks';
import { Project } from '@/components/Project';
import EventGallery from '@/components/EventGallery';
import { GroupsAndStores } from '@/components/GroupsAndStores';
import dynamic from 'next/dynamic';

const Map = dynamic(() => import('@/components/Map'), { ssr: false });

// Definição do tipo para cada item da agenda
export interface AgendaItem {
  id: string;
  title: string;
  date: string;
  time: string;
  description: string;
  lat?: number;
  lng?: number;
}

// Componente principal da página
export default function Home() {
  const [agendaItems, setAgendaItems] = useState<AgendaItem[]>([]);

  // Efeito para buscar e ouvir os eventos do Firestore em tempo real
  useEffect(() => {
    const q = collection(db, 'events');
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let itemsArr: AgendaItem[] = [];
      querySnapshot.forEach((doc) => {
        itemsArr.push({ ...doc.data(), id: doc.id } as AgendaItem);
      });
      itemsArr.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      setAgendaItems(itemsArr);
    });

    return () => unsubscribe();
  }, []);

  // Função para adicionar um novo evento ao Firestore
  const addEvent = async (event: Omit<AgendaItem, 'id'>) => {
    try {
      await addDoc(collection(db, 'events'), event);
    } catch (error) {
      console.error("Erro ao adicionar evento: ", error);
    }
  };

  // Função para deletar um evento do Firestore
  const deleteEvent = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'events', id));
    } catch (error) {
      console.error("Erro ao deletar evento: ", error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      
      <section id="hero">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-grow flex flex-col items-center justify-center text-center p-4 md:p-8"
        >
          <Hero />
        </motion.div>
      </section>

      <section id="como-funciona">
        <HowItWorks />
      </section>

      <section id="projeto">
        <Project />
      </section>
      
      <section id="mapa">
        <Map agendaItems={agendaItems} />
      </section>

      <section id="galeria">
        <EventGallery />
      </section>

      <section id="grupos">
        <GroupsAndStores />
      </section>

      <section id="agenda">
        <Agenda agendaItems={agendaItems} onAddEvent={addEvent} onDeleteEvent={deleteEvent} />
      </section>

      <section id="cultura-importa">
        <CulturalMatter />
      </section>
    </div>
  );
}
