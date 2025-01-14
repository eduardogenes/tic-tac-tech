/**
 * Componente que exibe o placar do jogo.
 * 
 * Este componente mostra a pontuação atual de cada jogador:
 * - Jogador X (rosa) à esquerda
 * - Jogador O (azul) à direita
 * - Divisor vertical no centro
 * 
 * Detalhes de implementação:
 * - Layout flexível com espaçamento entre elementos
 * - Ícones SVG consistentes com o resto do jogo
 * - Fundo translúcido com efeito de vidro
 * - Animação deslizante na entrada
 * - Cores específicas para cada jogador
 * 
 * Estrutura visual:
 * [Ícone X] [Pontos X] | [Pontos O] [Ícone O]
 * 
 * Estilos importantes:
 * - backdrop-blur-sm: Efeito de vidro fosco
 * - shadow-strong: Sombra pronunciada
 * - animate-slide-up: Animação de entrada
 * - gap-4: Espaçamento entre elementos
 * - text-2xl: Tamanho dos números
 * 
 * Props:
 * @prop {Object} scores - Objeto contendo as pontuações
 * @prop {number} scores.X - Pontuação do jogador X (rosa)
 * @prop {number} scores.O - Pontuação do jogador O (azul)
 */
import React from 'react';

interface ScoreBoardProps {
  scores: {
    X: number;
    O: number;
  };
}

export const ScoreBoard: React.FC<ScoreBoardProps> = ({ scores }) => {
  return (
    // Container principal com animação
    <div className="w-full animate-slide-up">
      {/* Card do placar com efeito de vidro */}
      <div className="
        bg-dark-800/60 backdrop-blur-sm
        rounded-lg shadow-strong
        p-2
        flex justify-between items-center
        gap-4
      ">
        {/* Lado do jogador X */}
        <div className="flex items-center gap-2">
          {/* Ícone X */}
          <svg className="w-6 h-6 text-x-color" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M6 6l12 12M6 18L18 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {/* Pontuação X */}
          <span className="text-2xl font-bold text-dark-100">
            {scores.X}
          </span>
        </div>

        {/* Divisor vertical */}
        <div className="h-8 w-px bg-dark-600/50" />

        {/* Lado do jogador O */}
        <div className="flex items-center gap-2">
          {/* Pontuação O */}
          <span className="text-2xl font-bold text-dark-100">
            {scores.O}
          </span>
          {/* Ícone O */}
          <svg className="w-6 h-6 text-o-color" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <circle cx="12" cy="12" r="8" />
          </svg>
        </div>
      </div>
    </div>
  );
};
