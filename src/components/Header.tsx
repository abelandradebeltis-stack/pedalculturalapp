'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Navigation } from './Navigation';
import ThemeSwitcher from './ThemeSwitcher';
import { useAuth } from '@/contexts/AuthContext';
import { auth } from '@/firebase/config';
import { signOut } from 'firebase/auth';

const Header = () => {
  const { user } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-cinza-asfalto/80 backdrop-blur-sm shadow-md">
      <div className="container mx-auto px-4 flex justify-between items-center py-4">
        <div className="text-2xl font-bold text-white tracking-wider">
          <Link href="/">
            Pedal Cultural
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <Navigation />
          <ThemeSwitcher />
          
          <div className="flex items-center space-x-2 ml-4">
            {user ? (
              // Se o usuário estiver logado, mostra o link para o Painel e o botão de Logout
              <>
                <Link href="/admin" legacyBehavior>
                  <a className="px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
                    Painel Admin
                  </a>
                </Link>
                <button 
                  onClick={handleLogout} 
                  className="px-3 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
                >
                  Sair
                </button>
              </>
            ) : (
              // Se não estiver logado, mostra o link para a página de Login
              <Link href="/login" legacyBehavior>
                <a className="px-3 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700">
                  Admin Login
                </a>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
