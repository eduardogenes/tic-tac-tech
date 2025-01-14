/**
 * Hook personalizado que gerencia toda a lógica do jogo da velha.
 * Inclui gerenciamento de estado, verificação de vitória, e movimentos da IA.
 */
import { useState, useCallback } from 'react';
import { Cell, GameMode, GameState } from '../types/game';
import { getBestMove } from '../ai/gameAI';

/** Estado inicial do jogo */
const initialState: GameState = {
  board: Array(9).fill(null),
  currentPlayer: 'X',
  winner: null,
  scores: { X: 0, O: 0 },
  gameMode: null,
};

/**
 * Verifica se há um vencedor no tabuleiro atual
 * @param board - Tabuleiro atual do jogo
 * @returns O jogador vencedor, 'DRAW' para empate, ou null se o jogo continua
 */
const checkWinner = (board: Cell[]): Cell | 'DRAW' | null => {
  // Combinações possíveis de vitória
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontais
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Verticais
    [0, 4, 8], [2, 4, 6], // Diagonais
  ];

  // Verifica cada linha por um vencedor
  for (const [a, b, c] of lines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }

  // Verifica empate (tabuleiro cheio)
  if (board.every(cell => cell !== null)) {
    return 'DRAW';
  }

  return null;
};

export function useGame() {
  const [gameState, setGameState] = useState<GameState>(initialState);

  /**
   * Realiza um movimento no tabuleiro
   * @param index - Índice da célula clicada (0-8)
   */
  const makeMove = useCallback((index: number) => {
    if (gameState.winner || gameState.board[index]) return;

    setGameState(prev => {
      const newBoard = [...prev.board];
      newBoard[index] = prev.currentPlayer;

      const winner = checkWinner(newBoard);
      const newScores = { ...prev.scores };

      // Atualiza o placar se houver vencedor
      if (winner && winner !== 'DRAW') {
        newScores[winner]++;
      }

      return {
        ...prev,
        board: newBoard,
        currentPlayer: prev.currentPlayer === 'X' ? 'O' : 'X',
        winner,
        scores: newScores,
      };
    });
  }, [gameState.winner, gameState.board]);

  /**
   * Realiza o movimento da IA usando o algoritmo minimax
   */
  const makeAIMove = useCallback(() => {
    const bestMove = getBestMove(gameState.board);
    if (bestMove !== null) {
      makeMove(bestMove);
    }
  }, [gameState.board, makeMove]);

  /**
   * Define o modo de jogo (2 jogadores ou contra IA)
   */
  const setGameMode = useCallback((mode: GameMode) => {
    setGameState(prev => ({
      ...prev,
      gameMode: mode,
    }));
  }, []);

  /**
   * Reinicia o jogo mantendo o placar
   */
  const resetGame = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      board: Array(9).fill(null),
      currentPlayer: 'X',
      winner: null,
    }));
  }, []);

  return {
    gameState,
    makeMove,
    makeAIMove,
    setGameMode,
    resetGame,
  };
}
