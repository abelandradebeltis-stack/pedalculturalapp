
'use client';

import { useState, useRef, useEffect } from 'react';
import { BrainCircuit, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  text: string;
  isUser: boolean;
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = { text: input, isUser: true };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const userInterests = localStorage.getItem('userInterests');

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          prompt: input, 
          history: messages,
          interests: userInterests ? JSON.parse(userInterests) : [],
        }),
      });

      if (!response.ok) {
        throw new Error('A resposta da rede não foi boa');
      }

      const data = await response.json();
      const aiMessage: Message = { text: data.text, isUser: false };
      setMessages(prev => [...prev, aiMessage]);

    } catch (error) {
      console.error("Erro ao buscar resposta da IA:", error);
      const errorMessage: Message = { text: "Desculpe, algo deu errado. Tente novamente.", isUser: false };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[600px] max-w-2xl mx-auto border rounded-lg shadow-lg bg-white dark:bg-gray-800">
      <div className="flex-1 p-4 overflow-y-auto">
        <AnimatePresence initial={false}>
          <div className="space-y-4">
            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex items-start gap-3 ${message.isUser ? 'justify-end' : ''}`}>
                {!message.isUser && (
                  <div className="w-8 h-8 rounded-full bg-green-500 dark:bg-green-400 flex items-center justify-center text-white flex-shrink-0" aria-label="Avatar da IA">
                    <BrainCircuit size={20} />
                  </div>
                )}
                <div
                  className={`p-3 rounded-lg max-w-xs md:max-w-md ${message.isUser
                      ? 'bg-blue-600 text-white rounded-br-none'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-200 rounded-bl-none'
                    }`}>
                  {message.text}
                </div>
                {message.isUser && (
                  <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white flex-shrink-0" aria-label="Seu avatar">
                    <User size={20} />
                  </div>
                )}
              </motion.div>
            ))}
            {isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-green-500 dark:bg-green-400 flex items-center justify-center text-white flex-shrink-0" aria-label="Avatar da IA">
                  <BrainCircuit size={20} />
                </div>
                <div className="p-3 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-200">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse [animation-delay:0.2s]"></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse [animation-delay:0.4s]"></div>
                    <span className="ml-2 text-sm">Pensando...</span>
                  </div>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </AnimatePresence>
      </div>
      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Pergunte algo sobre sustentabilidade..."
            className="flex-1 p-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            autoFocus
            aria-label="Sua mensagem"
          />
          <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50" disabled={isLoading || !input.trim()} aria-label="Enviar mensagem">
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
};

export default Chat;
