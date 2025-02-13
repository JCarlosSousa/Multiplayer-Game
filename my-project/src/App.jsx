import React, { useState } from 'react';
import GameBoard from './components/GameBoard';
import ScoreBoard from './components/ScoreBoard';

const App = () => {
  const [scores, setScores] = useState({ player1: 0, player2: 0 });
  const [currentPlayer, setCurrentPlayer] = useState('player1');
  const [winner, setWinner] = useState(null); // Estado para armazenar o vencedor

  const cardImages = [
    '🍎', '🍌', '🍇', '🍊', '🍓', '🍉',
    '🍎', '🍌', '🍇', '🍊', '🍓', '🍉',
  ];

  const [cards, setCards] = useState(() =>
    cardImages.sort(() => Math.random() - 0.5).map((value, index) => ({
      id: index,
      value,
      flipped: false,
      matched: false,
    }))
  );

  const handleMatch = () => {
    setScores((prevScores) => ({
      ...prevScores,
      [currentPlayer]: prevScores[currentPlayer] + 10, // Incrementa 10 pontos
    }));
  };

  const checkWinner = () => {
    if (!cards.some((card) => !card.matched)) {
      // Verifica se ainda há cartas não correspondidas
      if (scores.player1 > scores.player2) {
        setWinner('Jogador 1');
      } else if (scores.player2 > scores.player1) {
        setWinner('Jogador 2');
      } else {
        setWinner('Empate'); // Caso os scores sejam iguais
      }
    }
  };

  return (
    <div className="app">
      <h1>Jogo da Memória Multiplayer</h1>
      {/* Exibe a mensagem de vitória */}
      {winner && (
        <div className="winner-message">
          {winner === 'Empate'
            ? 'O jogo terminou em empate!'
            : `Parabéns, ${winner}! Você venceu!`}
        </div>
      )}
      <ScoreBoard scores={scores} currentPlayer={currentPlayer} />
      <GameBoard
        cards={cards}
        setCards={setCards}
        onMatch={handleMatch}
        currentPlayer={currentPlayer}
        setCurrentPlayer={setCurrentPlayer}
        checkWinner={checkWinner} // Passa a função para verificar o vencedor
      />
    </div>
  );
};

export default App;