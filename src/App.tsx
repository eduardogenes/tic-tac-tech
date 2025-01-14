/**
 * Componente principal da aplicação do jogo da velha.
 * Gerencia o estado do jogo e coordena todos os outros componentes.
 * 
 * Funcionalidades:
 * - Renderiza o título do jogo
 * - Permite selecionar o modo de jogo (2 jogadores ou contra IA)
 * - Mostra o tabuleiro e gerencia as jogadas
 * - Exibe o placar e o banner de vitória
 * - Permite reiniciar o jogo e trocar o modo
 */
import { useEffect } from 'react';
import { Board } from './components/Board';
import { ScoreBoard } from './components/ScoreBoard';
import { GameModeSelector } from './components/GameModeSelector';
import { WinnerBanner } from './components/WinnerBanner';
import { GameTitle } from './components/GameTitle';
import { useGame } from './hooks/useGame';

function App() {
  // Hook personalizado que gerencia toda a lógica do jogo
  const { gameState, makeMove, makeAIMove, setGameMode, resetGame } = useGame();

  // Efeito que controla os movimentos da IA
  useEffect(() => {
    if (gameState.gameMode === 'ai' && gameState.currentPlayer === 'O' && !gameState.winner) {
      const timeoutId = setTimeout(makeAIMove, 500); // Pequeno delay para melhor UX
      return () => clearTimeout(timeoutId);
    }
  }, [gameState.gameMode, gameState.currentPlayer, gameState.winner, makeAIMove]);

  // Handler para cliques nas células do tabuleiro
  const handleCellClick = (index: number) => {
    if (gameState.gameMode === 'ai' && gameState.currentPlayer === 'O') return;
    makeMove(index);
  };

  return (
    <main className="h-full flex flex-col items-center justify-center p-2 gap-2">
      <GameTitle />

      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-[min(60vh,360px)] gap-2">
        {/* Seletor de modo de jogo ou tabuleiro do jogo */}
        {!gameState.gameMode ? (
          <GameModeSelector onSelectMode={setGameMode} />
        ) : (
          <>
            {/* Container do tabuleiro com banner de vitória condicional */}
            <div className="relative w-full">
              <Board
                board={gameState.board}
                onCellClick={handleCellClick}
                disabled={!!gameState.winner}
              />
              {gameState.winner && (
                <WinnerBanner
                  winner={gameState.winner}
                  onPlayAgain={resetGame}
                />
              )}
            </div>

            <ScoreBoard scores={gameState.scores} />

            {/* Botão para alternar entre modos de jogo */}
            <button
              onClick={() => setGameMode(gameState.gameMode === '2-players' ? 'ai' : '2-players')}
              className="game-button text-sm mt-auto"
              aria-label="Trocar modo de jogo"
            >
              Trocar para {gameState.gameMode === '2-players' ? 'Contra IA' : '2 Jogadores'}
            </button>
          </>
        )}
      </div>
    </main>
  );
}

export default App;
