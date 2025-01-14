import { Cell } from '../types/game';

/** Cache para armazenar estados já calculados e melhorar performance */
const stateCache = new Map<string, number>();

/** Combinações que resultam em vitória */
const WINNING_COMBINATIONS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontais
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Verticais
  [0, 4, 8], [2, 4, 6]             // Diagonais
];

/**
 * Avalia o estado atual do tabuleiro
 * @param board - Estado atual do tabuleiro
 * @returns Pontuação do estado (-1 para vitória de X, 1 para O, 0 para empate)
 */
function evaluateBoard(board: Cell[]): number {
  const cacheKey = board.join('');
  if (stateCache.has(cacheKey)) {
    return stateCache.get(cacheKey)!;
  }

  // Verifica vitória
  for (const [a, b, c] of WINNING_COMBINATIONS) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      const score = board[a] === 'O' ? 1 : -1;
      stateCache.set(cacheKey, score);
      return score;
    }
  }

  // Empate ou jogo em andamento
  const score = board.every(cell => cell !== null) ? 0 : null;
  if (score !== null) stateCache.set(cacheKey, score);
  return score ?? 0;
}

/**
 * Implementação do algoritmo Minimax com poda Alpha-Beta
 * @param board - Estado atual do tabuleiro
 * @param depth - Profundidade atual da recursão
 * @param isMaximizing - Se está maximizando (true para O, false para X)
 * @param alpha - Melhor valor encontrado para O
 * @param beta - Melhor valor encontrado para X
 * @returns Melhor pontuação possível para o jogador atual
 */
function minimax(
  board: Cell[],
  depth: number,
  isMaximizing: boolean,
  alpha: number = -Infinity,
  beta: number = Infinity
): number {
  // Avalia estado atual
  const score = evaluateBoard(board);
  if (score !== 0 || depth === 0) return score;

  // Verifica se o jogo acabou
  if (board.every(cell => cell !== null)) return 0;

  if (isMaximizing) {
    let maxScore = -Infinity;
    // Tenta todas as jogadas possíveis
    for (let i = 0; i < 9; i++) {
      if (!board[i]) {
        board[i] = 'O';
        const score = minimax(board, depth - 1, false, alpha, beta);
        board[i] = null;
        maxScore = Math.max(maxScore, score);
        alpha = Math.max(alpha, score);
        if (beta <= alpha) break; // Poda Alpha
      }
    }
    return maxScore;
  } else {
    let minScore = Infinity;
    // Tenta todas as jogadas possíveis
    for (let i = 0; i < 9; i++) {
      if (!board[i]) {
        board[i] = 'X';
        const score = minimax(board, depth - 1, true, alpha, beta);
        board[i] = null;
        minScore = Math.min(minScore, score);
        beta = Math.min(beta, score);
        if (beta <= alpha) break; // Poda Beta
      }
    }
    return minScore;
  }
}

/**
 * Encontra a melhor jogada possível para a IA
 * @param board - Estado atual do tabuleiro
 * @returns Índice da melhor jogada ou null se não houver jogadas possíveis
 */
export function getBestMove(board: Cell[]): number | null {
  let bestScore = -Infinity;
  let bestMove: number | null = null;

  // Tenta todas as jogadas possíveis
  for (let i = 0; i < 9; i++) {
    if (!board[i]) {
      board[i] = 'O';
      const score = minimax(board, 6, false);
      board[i] = null;

      // Atualiza a melhor jogada se encontrar uma pontuação maior
      if (score > bestScore) {
        bestScore = score;
        bestMove = i;
      }
    }
  }

  return bestMove;
}
