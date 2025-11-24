
export const dynamic = 'force-dynamic';
'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { motion } from 'framer-motion';

const EditEventPage = () => {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [fullDescription, setFullDescription] = useState('');
  const [featuredImage, setFeaturedImage] = useState('');
  const [images, setImages] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchEvent = async () => {
      try {
        const response = await fetch(`/api/events/${id}`);
        if (!response.ok) throw new Error('Evento não encontrado.');
        
        const data = await response.json();
        setTitle(data.title);
        setDescription(data.description);
        setFullDescription(data.fullDescription);
        setFeaturedImage(data.featuredImage);
        setImages(data.images.map((img: { src: string }) => img.src).join(', '));

      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const updatedEvent = {
      title,
      description,
      fullDescription,
      featuredImage,
      images: images.split(',').map(item => ({ src: item.trim(), alt: '' })),
    };

    try {
      const response = await fetch(`/api/events/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedEvent),
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.message || 'Falha ao atualizar o evento.');
      }

      router.push('/admin');

    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <div className="p-8 text-center">A carregar dados do evento...</div>;
  }

  if (error && !isSubmitting) {
    return <div className="p-8 text-center text-red-500">Erro: {error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold text-cinza-urbano mb-6"
        >
          Editar Evento
        </motion.h1>

        <form onSubmit={handleSubmit} className="space-y-6">
           <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Título</label>
            <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-jardim-noturno focus:border-jardim-noturno" required />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descrição Curta</label>
            <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} rows={2} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-jardim-noturno focus:border-jardim-noturno"></textarea>
          </div>

          <div>
            <label htmlFor="fullDescription" className="block text-sm font-medium text-gray-700">Descrição Completa</label>
            <textarea id="fullDescription" value={fullDescription} onChange={(e) => setFullDescription(e.target.value)} rows={5} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-jardim-noturno focus:border-jardim-noturno"></textarea>
          </div>

          <div>
            <label htmlFor="featuredImage" className="block text-sm font-medium text-gray-700">URL da Imagem de Destaque</label>
            <input type="text" id="featuredImage" value={featuredImage} onChange={(e) => setFeaturedImage(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-jardim-noturno focus:border-jardim-noturno" />
          </div>

          <div>
            <label htmlFor="images" className="block text-sm font-medium text-gray-700">URLs das Imagens da Galeria (separadas por vírgula)</label>
            <input type="text" id="images" value={images} onChange={(e) => setImages(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-jardim-noturno focus:border-jardim-noturno" />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="flex justify-end space-x-4">
            <button type="button" onClick={() => router.back()} className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50">Cancelar</button>
            <button type="submit" disabled={isSubmitting} className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-jardim-noturno hover:bg-opacity-90 disabled:bg-gray-400">
              {isSubmitting ? 'A guardar...' : 'Guardar Alterações'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEventPage;
