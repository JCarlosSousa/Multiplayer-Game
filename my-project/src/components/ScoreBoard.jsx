import React from 'react';

const ScoreBoard = ({ scores, currentPlayer }) => {
  return (
    <div className="score-board">
      <div>
        <strong>Jogador 1:</strong> {scores.player1} pontos
      </div>
      <div>
        <strong>Jogador 2:</strong> {scores.player2} pontos
      </div>
      <div>Vez do Jogador: {currentPlayer === 'player1' ? 'Jogador 1' : 'Jogador 2'}</div>
    </div>
  );
};

export default ScoreBoard;