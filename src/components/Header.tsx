
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  return (
    <header className="bg-jardim-noturno text-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="text-2xl font-bold">
            Pedal Cultural
          </Link>

          {/* Botão de Menu para Dispositivos Móveis */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'}></path>
              </svg>
            </button>
          </div>

          {/* Navegação Principal */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/#project" className="hover:text-rosa-carinho">O Projeto</Link>
            <Link href="/#gallery" className="hover:text-rosa-carinho">Galeria</Link>
            <Link href="/#map" className="hover:text-rosa-carinho">Mapa</Link>
            <Link href="/#agenda" className="hover:text-rosa-carinho">Agenda</Link>
            <Link href="/#cultural-matter" className="hover:text-rosa-carinho">Matéria Cultural</Link>
            <Link href="/#groups-and-stores" className="hover:text-rosa-carinho">Grupos e Lojas</Link>
            <Link href="/dashboard" className="hover:text-rosa-carinho">Dados da Pesquisa</Link>
            
            {/* Seletor de Tema */}
            <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="focus:outline-none">
              {theme === 'dark' ? <SunIcon className="w-6 h-6" /> : <MoonIcon className="w-6 h-6" />}
            </button>
          </nav>
        </div>

        {/* Menu Móvel */}
        {isOpen && (
          <nav className="md:hidden pt-4 pb-2">
            <Link href="/#project" className="block py-2 hover:text-rosa-carinho" onClick={() => setIsOpen(false)}>O Projeto</Link>
            <Link href="/#gallery" className="block py-2 hover:text-rosa-carinho" onClick={() => setIsOpen(false)}>Galeria</Link>
            <Link href="/#map" className="block py-2 hover:text-rosa-carinho" onClick={() => setIsOpen(false)}>Mapa</Link>
            <Link href="/#agenda" className="block py-2 hover:text-rosa-carinho" onClick={() => setIsOpen(false)}>Agenda</Link>
            <Link href="/#cultural-matter" className="block py-2 hover:text-rosa-carinho" onClick={() => setIsOpen(false)}>Matéria Cultural</Link>
            <Link href="/#groups-and-stores" className="block py-2 hover:text-rosa-carinho" onClick={() => setIsOpen(false)}>Grupos e Lojas</Link>
            <Link href="/dashboard" className="block py-2 hover:text-rosa-carinho" onClick={() => setIsOpen(false)}>Dados da Pesquisa</Link>
            
            <div className="pt-4">
              <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="focus:outline-none flex items-center">
                {theme === 'dark' ? <SunIcon className="w-6 h-6 mr-2" /> : <MoonIcon className="w-6 h-6 mr-2" />}
                Mudar Tema
              </button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
