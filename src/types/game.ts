/**
 * Tipos relacionados ao estado e funcionamento do jogo
 */

/** Representa uma célula no tabuleiro (X, O ou vazia) */
export type Cell = 'X' | 'O' | null;

/** Modos de jogo disponíveis */
export type GameMode = '2-players' | 'ai' | null;

/** Estado completo do jogo */
export interface GameState {
  /** Tabuleiro atual (array de 9 posições) */
  board: Cell[];
  /** Jogador atual (X sempre começa) */
  currentPlayer: 'X' | 'O';
  /** Modo de jogo selecionado */
  gameMode: GameMode;
  /** Vencedor atual (null se jogo em andamento) */
  winner: Cell | 'DRAW' | null;
  /** Placar do jogo */
  scores: {
    X: number;
    O: number;
  };
}
