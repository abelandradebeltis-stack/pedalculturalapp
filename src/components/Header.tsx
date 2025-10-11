
'use client';

import { Navigation } from './Navigation';
import ThemeSwitcher from './ThemeSwitcher';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-cinza-asfalto/80 backdrop-blur-sm shadow-md">
      <div className="container mx-auto px-4 flex justify-between items-center py-4">
        <div className="text-2xl font-bold text-white tracking-wider">
          <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
            Pedal Cultural
          </a>
        </div>
        <div className="flex items-center space-x-4">
          <Navigation />
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  );
};

export default Header;
