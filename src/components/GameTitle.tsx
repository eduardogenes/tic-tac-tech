/**
 * Componente que renderiza o título estilizado do jogo.
 * 
 * Este componente cria um cabeçalho visual atraente para o jogo, combinando:
 * 1. Um título com efeito de gradiente usando as cores dos jogadores
 * 2. Ícones representativos abaixo do título
 * 
 * Detalhes de implementação:
 * - Usa text-transparent com bg-clip-text para criar o efeito de gradiente no texto
 * - O gradiente vai do rosa (cor do X) ao azul (cor do O)
 * - Os ícones são SVGs customizados para manter consistência visual
 * - Animação fade-in suave na montagem do componente
 * 
 * Classes Tailwind importantes:
 * - flex flex-col: Organiza elementos verticalmente
 * - items-center: Centraliza horizontalmente
 * - gap-1: Pequeno espaçamento entre título e ícones
 * - text-2xl: Tamanho do título
 * - bg-gradient-to-r: Direção do gradiente (esquerda para direita)
 */
import React from 'react';

export const GameTitle: React.FC = () => {
  return (
    // Container principal com animação
    <div className="flex flex-col items-center gap-1 animate-fade-in">
      {/* Título com efeito de gradiente */}
      <h1 className="
        text-2xl font-bold
        bg-gradient-to-r from-x-color to-o-color
        bg-clip-text text-transparent
        relative
      ">
        TicTacTech
      </h1>

      {/* Ícones dos jogadores com "vs" no meio */}
      <div className="flex items-center gap-2 text-sm text-dark-300">
        {/* Ícone do X */}
        <svg className="w-4 h-4 text-x-color" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M6 6l12 12M6 18L18 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        
        {/* Texto "vs" entre os ícones */}
        <span>vs</span>
        
        {/* Ícone do O */}
        <svg className="w-4 h-4 text-o-color" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <circle cx="12" cy="12" r="8" />
        </svg>
      </div>
    </div>
  );
};
