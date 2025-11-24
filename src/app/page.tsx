'use client';

import { useState, useEffect } from 'react';
import { collection, addDoc, deleteDoc, onSnapshot, doc } from 'firebase/firestore';
import { db } from '@/firebase/config'; // Nossa instância do Firestore

import Hero from "../components/Hero";
import { Project } from "../components/Project";
import { Agenda } from "../components/Agenda";
import { CulturalMatter } from "../components/CulturalMatter";
import { GroupsAndStores } from "../components/GroupsAndStores";
import { Gallery } from "../components/Gallery";
import dynamic from 'next/dynamic';

const Map = dynamic(() => import('../components/Map'), {
  ssr: false,
});

// Interface para o item da agenda, agora com um `id` opcional
export interface AgendaItem {
  id?: string; // O ID do documento no Firestore
  date: string;
  title: string;
  description: string;
  lat?: number;
  lng?: number;
}

export default function Home() {
  const [agendaItems, setAgendaItems] = useState<AgendaItem[]>([]);

  // Efeito para buscar e ouvir os eventos do Firestore em tempo real
  useEffect(() => {
    const q = collection(db, 'events'); // Aponta para a coleção 'events'
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let itemsArr: AgendaItem[] = [];
      querySnapshot.forEach((doc) => {
        itemsArr.push({ ...doc.data(), id: doc.id } as AgendaItem);
      });
      // Ordena os itens por data (opcional, mas recomendado)
      itemsArr.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      setAgendaItems(itemsArr);
    });

    // Retorna a função de limpeza para parar de ouvir quando o componente desmontar
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
    if (!id) {
      console.error("ID do evento é inválido");
      return;
    }
    try {
      await deleteDoc(doc(db, 'events', id));
    } catch (error) {
      console.error("Erro ao deletar evento: ", error);
    }
  };

  return (
    <>
      <Hero />
      
      <section id="project" className="py-16 sm:py-24 bg-jardim-noturno">
        <div className="container mx-auto px-4">
          <Project />
        </div>
      </section>

      <section id="gallery" className="py-16 sm:py-24">
        <div className="container mx-auto px-4">
          <Gallery />
        </div>
      </section>

      <section id="map" className="py-16 sm:py-24 bg-gray-100">
        <div className="container mx-auto px-4">
          <Map agendaItems={agendaItems} /> 
        </div>
      </section>

      <section id="agenda" className="py-16 sm:py-24 bg-uniforme-escolar">
        <div className="container mx-auto px-4">
          <Agenda 
            agendaItems={agendaItems} 
            onAddEvent={addEvent} 
            onDeleteEvent={deleteEvent} 
          />
        </div>
      </section>

      <section id="cultural-matter" className="py-16 sm:py-24">
        <div className="container mx-auto px-4">
          <CulturalMatter />
        </div>
      </section>

      <section id="groups-and-stores" className="py-16 sm:py-24 bg-jardim-noturno">
        <div className="container mx-auto px-4">
          <GroupsAndStores />
        </div>
      </section>

    </>
  );
}
