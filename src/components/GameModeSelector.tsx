/**
 * Componente de seleção do modo de jogo.
 * 
 * Este é o primeiro componente que o usuário interage, onde ele escolhe:
 * 1. Jogar contra outro jogador (modo "2-players")
 * 2. Jogar contra a IA (modo "ai")
 * 
 * Detalhes de implementação:
 * - Layout responsivo que se adapta ao tamanho da tela
 *   - Mobile: botões empilhados verticalmente
 *   - Desktop: botões lado a lado horizontalmente
 * - Animações suaves na entrada dos botões
 * - Usa a classe game-button para estilo consistente
 * - Labels de acessibilidade para leitores de tela
 * 
 * Estilos importantes:
 * - flex-col sm:flex-row: Muda layout baseado no breakpoint
 * - gap-4: Espaçamento consistente entre botões
 * - animate-fade-in: Fade suave na montagem
 * - animate-scale-in: Escala suave nos botões
 * 
 * Props:
 * @prop {(mode: GameMode) => void} onSelectMode - Callback chamado com o modo selecionado
 *        mode pode ser '2-players' para dois jogadores ou 'ai' para jogar contra IA
 */
import React from 'react';
import { GameMode } from '../types/game';

interface GameModeSelectorProps {
  onSelectMode: (mode: GameMode) => void;
}

export const GameModeSelector: React.FC<GameModeSelectorProps> = ({ onSelectMode }) => {
  return (
    // Container com layout responsivo
    <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
      {/* Botão para modo 2 jogadores */}
      <button
        className="game-button animate-scale-in"
        onClick={() => onSelectMode('2-players')}
        aria-label="Jogar contra outro jogador"
      >
        2 Jogadores
      </button>

      {/* Botão para modo contra IA */}
      <button
        className="game-button animate-scale-in"
        onClick={() => onSelectMode('ai')}
        aria-label="Jogar contra a IA"
      >
        Contra IA
      </button>
    </div>
  );
};
