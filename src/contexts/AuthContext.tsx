'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../firebase/config'; // Importa a configuração do Firebase

// Define a forma do contexto de autenticação
interface AuthContextType {
  user: User | null;
  loading: boolean;
}

// Cria o Contexto de Autenticação com um valor padrão
const AuthContext = createContext<AuthContextType>({ user: null, loading: true });

// Cria o Provedor de Autenticação
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        // Usuário fez login. Pega o token de ID e armazena em um cookie.
        const token = await user.getIdToken();
        // Define o cookie para ser acessível em todo o site ('path=/') e com duração de 1 hora.
        document.cookie = `firebaseIdToken=${token}; path=/; max-age=3600`;
      } else {
        // Usuário fez logout. Remove o cookie ao definir sua data de expiração para o passado.
        document.cookie = 'firebaseIdToken=; path=/; max-age=0';
      }
      setLoading(false);
    });

    // Limpa o "ouvinte" quando o componente é desmontado
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Hook customizado para facilitar o uso do contexto
export const useAuth = () => useContext(AuthContext);
