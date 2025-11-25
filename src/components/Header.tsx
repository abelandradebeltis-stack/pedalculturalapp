
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const renderThemeChanger = () => {
    if (!isMounted) {
      return null;
    }
    return (
      <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="focus:outline-none">
        {theme === 'dark' ? <SunIcon className="w-6 h-6" /> : <MoonIcon className="w-6 h-6" />}
      </button>
    );
  };

  const renderMobileThemeChanger = () => {
    if (!isMounted) {
        return null;
    }
    return (
        <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="focus:outline-none flex items-center">
          {theme === 'dark' ? <SunIcon className="w-6 h-6 mr-2" /> : <MoonIcon className="w-6 h-6 mr-2" />}
          Mudar Tema
        </button>
    )
}

  return (
    <header className="bg-jardim-noturno text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link href="/#hero" className="text-2xl font-bold">
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
            <Link href="/#como-funciona" className="hover:text-rosa-carinho">Como Funciona</Link>
            <Link href="/#projeto" className="hover:text-rosa-carinho">O Projeto</Link>
            <Link href="/#mapa" className="hover:text-rosa-carinho">Mapa</Link>
            <Link href="/#galeria" className="hover:text-rosa-carinho">Galeria</Link>
            <Link href="/#agenda" className="hover:text-rosa-carinho">Agenda</Link>
            <Link href="/#cultura-importa" className="hover:text-rosa-carinho">A Cultura Importa</Link>
            <Link href="/#grupos" className="hover:text-rosa-carinho">Grupos e Lojas</Link>
            <Link href="/dashboard" className="hover:text-rosa-carinho">Dados da Pesquisa</Link>
            
            {/* Seletor de Tema */}
            {renderThemeChanger()}
          </nav>
        </div>

        {/* Menu Móvel */}
        {isOpen && (
          <nav className="md:hidden pt-4 pb-2">
            <Link href="/#como-funciona" className="block py-2 hover:text-rosa-carinho" onClick={() => setIsOpen(false)}>Como Funciona</Link>
            <Link href="/#projeto" className="block py-2 hover:text-rosa-carinho" onClick={() => setIsOpen(false)}>O Projeto</Link>
            <Link href="/#mapa" className="block py-2 hover:text-rosa-carinho" onClick={() => setIsOpen(false)}>Mapa</Link>
            <Link href="/#galeria" className="block py-2 hover:text-rosa-carinho" onClick={() => setIsOpen(false)}>Galeria</Link>
            <Link href="/#agenda" className="block py-2 hover:text-rosa-carinho" onClick={() => setIsOpen(false)}>Agenda</Link>
            <Link href="/#cultura-importa" className="block py-2 hover:text-rosa-carinho" onClick={() => setIsOpen(false)}>A Cultura Importa</Link>
            <Link href="/#grupos" className="block py-2 hover:text-rosa-carinho" onClick={() => setIsOpen(false)}>Grupos e Lojas</Link>
            <Link href="/dashboard" className="block py-2 hover:text-rosa-carinho" onClick={() => setIsOpen(false)}>Dados da Pesquisa</Link>
            
            <div className="pt-4">
              {renderMobileThemeChanger()}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
