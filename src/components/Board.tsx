/**
 * Componente que renderiza o tabuleiro interativo do jogo da velha.
 * 
 * Este componente é responsável por:
 * 1. Renderizar o grid 3x3 do tabuleiro
 * 2. Gerenciar interações com as células
 * 3. Exibir os símbolos X e O com animações
 * 4. Implementar estados visuais (hover, disabled, etc)
 * 
 * Detalhes de implementação:
 * - Usa CSS Grid para criar o layout 3x3
 * - Cada célula é um botão interativo
 * - Símbolos são SVGs para melhor qualidade visual
 * - Animações suaves para feedback visual
 * - Estados de hover e focus para melhor UX
 * - Suporte a acessibilidade com aria-labels
 * 
 * Estilos importantes:
 * - Fundo translúcido com blur para efeito de vidro
 * - Sombras suaves para profundidade
 * - Animações de escala nos símbolos
 * - Efeitos de hover nas células vazias
 * - Estados disabled quando jogo termina
 * 
 * Props:
 * @prop {Cell[]} board - Array de 9 posições com o estado do tabuleiro (X, O, ou null)
 * @prop {(index: number) => void} onCellClick - Callback chamado quando uma célula é clicada
 * @prop {boolean} [disabled] - Se true, desabilita interações com o tabuleiro
 */
import React from 'react';
import { Cell } from '../types/game';

interface BoardProps {
  board: Cell[];
  onCellClick: (index: number) => void;
  disabled?: boolean;
}

export const Board: React.FC<BoardProps> = ({ board, onCellClick, disabled = false }) => {
  /**
   * Renderiza uma célula individual do tabuleiro
   * 
   * Características:
   * - Botão interativo com estados hover/focus
   * - Animação de escala ao mostrar símbolo
   * - Feedback visual ao passar mouse
   * - Desabilitado quando ocupado ou jogo termina
   * 
   * @param index - Posição da célula no tabuleiro (0-8)
   */
  const renderCell = (index: number) => {
    const value = board[index];
    
    return (
      <button
        key={index}
        className={`
          aspect-square w-full
          bg-dark-800/60 backdrop-blur-sm
          rounded-lg shadow-soft
          transition-all duration-200
          flex items-center justify-center
          text-3xl font-bold
          ${disabled ? 'cursor-not-allowed opacity-80' : 'hover:shadow-strong hover:translate-y-[-1px]'}
          ${!value && !disabled ? 'hover:bg-dark-700/60' : ''}
          focus:outline-none focus:ring-2 focus:ring-dark-600
          p-1
        `}
        onClick={() => !disabled && onCellClick(index)}
        disabled={disabled || value !== null}
        aria-label={`Célula ${index + 1}${value ? ` com ${value}` : ' vazia'}`}
      >
        {/* Renderiza X ou O com animação quando presente */}
        {value && (
          <span
            className={`
              inline-flex items-center justify-center
              w-full h-full
              ${value === 'X' ? 'text-x-color' : 'text-o-color'}
              animate-scale-in
            `}
          >
            {/* SVG do X */}
            {value === 'X' ? (
              <svg className="w-4/5 h-4/5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M6 6l12 12M6 18L18 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ) : (
              /* SVG do O */}
              <svg className="w-4/5 h-4/5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="12" cy="12" r="8" />
              </svg>
            )}
          </span>
        )}
      </button>
    );
  };

  return (
    // Container principal mantendo proporção quadrada
    <div className="w-full aspect-square">
      {/* Grid do tabuleiro com efeito de vidro */}
      <div className="
        h-full w-full
        grid grid-cols-3 gap-2
        p-2
        bg-dark-800/40 backdrop-blur-sm
        rounded-lg shadow-strong
        animate-fade-in
      ">
        {/* Renderiza as 9 células do tabuleiro */}
        {board.map((_, index) => renderCell(index))}
      </div>
    </div>
  );
};
