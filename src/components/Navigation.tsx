'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '#project', label: 'O Projeto' },
  { href: '#gallery', label: 'Eventos' },
  { href: '#map', label: 'Mapa' },
  { href: '#agenda', label: 'Agenda' },
  { href: '#cultural-matter', label: 'Acervo' },
  { href: '#groups-and-stores', label: 'Apoiadores' },
  { href: '/dashboard', label: 'Painel' },
];

// Este componente será usado para os links da navegação
const NavLink = ({ href, label, onClick }: { href: string; label: string; onClick: () => void; }) => {
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  const isAnchorLink = href.startsWith('#');

  // Estilo base para os links
  const className = "block py-2 px-3 text-white rounded hover:bg-jardim-noturno lg:hover:bg-transparent lg:border-0 lg:hover:text-jardim-noturno lg:p-0 transition-colors duration-300";

  // Se não for um link âncora, usa o Link do Next.js diretamente
  if (!isAnchorLink) {
    return <Link href={href} onClick={onClick} className={className}>{label}</Link>;
  }

  // Se for um link âncora na página inicial, usa scroll suave
  if (isHomePage) {
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
      onClick(); // Fecha o menu mobile se estiver aberto
    };
    return <a href={href} onClick={handleClick} className={className}>{label}</a>;
  } else {
    // Se for um link âncora em outra página, navega para a home e depois scrolla
    return <Link href={`/${href}`} onClick={onClick} className={className}>{label}</Link>;
  }
};



export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Trava o scroll da página quando o menu mobile está aberto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  return (
    <nav>
      {/* Menu para Desktop */}
      <div className="hidden lg:flex lg:items-center lg:space-x-6">
        {navLinks.map(link => (
          <NavLink key={link.href} href={link.href} label={link.label} onClick={() => setIsOpen(false)} />
        ))}
      </div>

      {/* Botão do Menu Mobile (Hamburger) */}
      <div className="lg:hidden">
        <button
          onClick={() => setIsOpen(true)}
          className="inline-flex items-center justify-center p-2 w-10 h-10 text-white rounded-lg hover:bg-jardim-noturno focus:outline-none focus:ring-2 focus:ring-gray-700"
          aria-label="Abrir menu principal"
        >
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
          </svg>
        </button>
      </div>
      
      {/* Menu Mobile (Overlay em tela cheia) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-cinza-asfalto/95 backdrop-blur-sm z-50 flex flex-col items-center justify-center"
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-5 right-5 p-2 text-white rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
              aria-label="Fechar menu principal"
            >
              <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="flex flex-col items-center space-y-8">
              {navLinks.map(link => (
                 <NavLink key={link.href} href={link.href} label={link.label} onClick={() => setIsOpen(false)} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
