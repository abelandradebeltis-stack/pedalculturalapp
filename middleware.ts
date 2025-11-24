import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Este middleware é executado para todas as rotas definidas no 'matcher' abaixo.
export function middleware(request: NextRequest) {
  // Extrai o token de autenticação dos cookies da requisição.
  // O nome 'firebase-token' é um exemplo; ajuste se você usar um nome diferente.
  const authToken = request.cookies.get('firebaseIdToken')?.value;

  // Se não houver token e o usuário estiver tentando acessar a página de admin...
  if (!authToken) {
    // ...redireciona o usuário para a página de login.
    // A URL completa é necessária para o redirecionamento.
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Se o token existir, permite que a requisição continue para a página de admin.
  return NextResponse.next();
}

// O 'matcher' define em quais rotas o middleware deve ser aplicado.
// Neste caso, ele será executado apenas para a rota '/admin'.
export const config = {
  matcher: '/admin',
}; 
