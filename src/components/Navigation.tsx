
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { href: '#project', label: 'O Projeto' },
  { href: '#gallery', label: 'Eventos' },
  { href: '#agenda', label: 'Agenda' },
  { href: '#cultural-matter', label: 'Acervo' },
  { href: '#groups-and-stores', label: 'Apoiadores' },
];

const NavLink = ({ href, label, onClick }: { href: string; label: string; onClick: () => void; }) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
    onClick();
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className="block py-2 px-3 text-cinza-urbano rounded hover:bg-jardim-noturno md:hover:bg-transparent md:border-0 md:hover:text-rosa-carinho md:p-0 transition-colors duration-300"
    >
      {label}
    </a>
  );
};

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav>
      <div className="flex items-center">
         {/* Desktop Menu */}
        <div className="hidden md:flex md:items-center md:space-x-8">
          {navLinks.map(link => (
            <NavLink key={link.href} href={link.href} label={link.label} onClick={() => setIsOpen(false)} />
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden inline-flex items-center justify-center p-2 w-10 h-10 text-cinza-urbano rounded-lg hover:bg-jardim-noturno focus:outline-none focus:ring-2 focus:ring-gray-700"
          aria-controls="navbar-default"
          aria-expanded={isOpen}
        >
          <span className="sr-only">Open main menu</span>
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
          </svg>
        </button>
      </div>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-16 left-0 right-0 md:hidden bg-cinza-asfalto shadow-lg z-50"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
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
