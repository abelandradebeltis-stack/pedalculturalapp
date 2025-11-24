'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebase/config'; // Nossa configuração do Firebase
import { useAuth } from '@/contexts/AuthContext'; // Nosso hook de autenticação

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { user } = useAuth();

  // Se o usuário já estiver logado, redireciona para a página inicial
  if (user) {
    router.push('/');
    return null; // Evita renderizar o formulário de login brevemente
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
        setError("Por favor, preencha o e-mail e a senha.");
        return;
    }

    try {
      // Tenta fazer o login com o Firebase Auth
      await signInWithEmailAndPassword(auth, email, password);
      // Se o login for bem-sucedido, redireciona para a página inicial
      router.push('/');
    } catch (error) {
      // Trata os erros de login mais comuns
      setError("Credenciais inválidas. Verifique seu e-mail e senha.");
      console.error("Erro de autenticação:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md dark:bg-cinza-carbono">
        <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white">Login do Administrador</h1>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              E-mail
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 mt-1 text-gray-900 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-cinza-asfalto dark:border-gray-600 dark:text-white"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Senha
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 mt-1 text-gray-900 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-cinza-asfalto dark:border-gray-600 dark:text-white"
            />
          </div>

          {error && (
            <p className="text-sm text-center text-red-500">{error}</p>
          )}

          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Entrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
