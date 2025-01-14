/**
 * Componente que exibe o banner de fim de jogo.
 * 
 * Este componente é mostrado quando:
 * 1. Um jogador vence (X ou O)
 * 2. O jogo termina em empate
 * 
 * Detalhes de implementação:
 * - Overlay que cobre todo o tabuleiro
 * - Fundo escuro com blur para destacar o banner
 * - Banner central com gradiente e sombra
 * - Animações suaves de fade e escala
 * - Ícones grandes para o resultado
 * - Botão para reiniciar o jogo
 * 
 * 
 * Estilos importantes:
 * - inset-0: Cobre toda a área do pai
 * - backdrop-blur-sm: Desfoque do fundo
 * - bg-gradient-to-r: Gradiente no banner
 * - shadow-strong: Sombra pronunciada
 * - max-w-[280px]: Largura máxima do banner
 * 
 * Props:
 * @prop {Cell | 'DRAW'} winner - O resultado do jogo:
 *        - 'X' para vitória do X
 *        - 'O' para vitória do O
 *        - 'DRAW' para empate
 * @prop {() => void} onPlayAgain - Callback para reiniciar o jogo
 */
import React from 'react';
import { Cell } from '../types/game';

interface WinnerBannerProps {
  winner: Cell | 'DRAW';
  onPlayAgain: () => void;
}

export const WinnerBanner: React.FC<WinnerBannerProps> = ({ winner, onPlayAgain }) => {
  return (
    // Overlay que cobre o tabuleiro
    <div className="absolute inset-0 flex items-center justify-center p-4 animate-fade-in">
      {/* Fundo escuro com blur */}
      <div className="absolute inset-0 bg-dark-950/60 backdrop-blur-sm" />
      
      {/* Banner central com gradiente */}
      <div className="
        relative
        bg-gradient-to-r from-dark-800/90 via-dark-800/95 to-dark-800/90
        rounded-xl shadow-strong
        p-6
        flex flex-col items-center
        gap-4
        max-w-[280px]
        animate-scale-in
      ">
        {/* Ícones do resultado */}
        {winner === 'DRAW' ? (
          // Layout para empate: X e O lado a lado
          <div className="flex items-center justify-center gap-3">
            <svg className="w-8 h-8 text-x-color opacity-80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M6 6l12 12M6 18L18 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <svg className="w-8 h-8 text-o-color opacity-80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="12" cy="12" r="8" />
            </svg>
          </div>
        ) : (
          // Layout para vitória: ícone único maior
          <div className="text-4xl">
            {winner === 'X' ? (
              <svg className="w-12 h-12 text-x-color" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M6 6l12 12M6 18L18 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ) : (
              <svg className="w-12 h-12 text-o-color" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="12" cy="12" r="8" />
              </svg>
            )}
          </div>
        )}

        {/* Texto do resultado */}
        <p className="text-xl font-bold text-dark-100 text-center">
          {winner === 'DRAW' ? 'Empate!' : 'Vencedor!'}
        </p>

        {/* Botão de reiniciar */}
        <button
          onClick={onPlayAgain}
          className="
            game-button
            bg-gradient-to-r from-dark-700/80 to-dark-700/80
            hover:from-dark-600/80 hover:to-dark-600/80
            w-full
          "
          aria-label="Jogar novamente"
        >
          Jogar Novamente
        </button>
      </div>
    </div>
  );
};
