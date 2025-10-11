
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nova Vida Sustentável - O seu guia para um futuro mais verde",
  description: "Pergunte, aprenda e aja para um futuro mais sustentável com o nosso assistente de IA.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt" suppressHydrationWarning>
      <body 
        className={`${inter.className} bg-patativa dark:bg-cinza-asfalto text-cinza-urbano transition-colors duration-300`}>
        <Providers>
          <Header />
          <main>
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
