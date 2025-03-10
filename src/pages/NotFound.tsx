
import React from 'react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="text-center">
        <h1 className="text-4xl font-bold">404</h1>
        <p className="mt-2 text-gray-400">Página não encontrada</p>
        <a href="/" className="mt-4 inline-block text-[#42e076] hover:underline">
          Voltar para a página inicial
        </a>
      </div>
    </div>
  );
}
