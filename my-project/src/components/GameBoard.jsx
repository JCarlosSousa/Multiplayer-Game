import React, { useState } from 'react';
import Card from './Card';

const GameBoard = ({ cards, setCards, onMatch, currentPlayer, setCurrentPlayer, checkWinner }) => {
  const [flippedCards, setFlippedCards] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false); // Bloqueio temporário

  const flipCard = (id) => {
    if (flippedCards.length === 2 || cards.find((card) => card.id === id)?.matched || isProcessing) return;

    const updatedCards = cards.map((card) =>
      card.id === id ? { ...card, flipped: true } : card
    );
    setCards(updatedCards);

    setFlippedCards((prev) => [...prev, updatedCards.find((card) => card.id === id)]);
  };

  React.useEffect(() => {
    if (flippedCards.length === 2 && !isProcessing) {
      setIsProcessing(true); // Ativa o bloqueio

      const [firstCard, secondCard] = flippedCards;

      if (firstCard.value === secondCard.value) {
        // Marca as cartas como correspondidas
        setCards((prevCards) =>
          prevCards.map((card) =>
            card.id === firstCard.id || card.id === secondCard.id
              ? { ...card, matched: true }
              : card
          )
        );

        // Chama a função onMatch para incrementar o score
        onMatch();

        // Verifica se há um vencedor após marcar as cartas como correspondidas
        setTimeout(() => {
          checkWinner(); // Verifica o vencedor aqui
          setFlippedCards([]); // Limpa as cartas viradas
          setIsProcessing(false); // Libera o bloqueio
        }, 1000);
      } else {
        // Se as cartas não corresponderem, passa a vez para o próximo jogador
        setCurrentPlayer((prevPlayer) => (prevPlayer === 'player1' ? 'player2' : 'player1'));

        // Desvira as cartas após 1 segundo
        setTimeout(() => {
          setCards((prevCards) =>
            prevCards.map((card) =>
              !card.matched ? { ...card, flipped: false } : card
            )
          );
          setFlippedCards([]); // Limpa as cartas viradas
          setIsProcessing(false); // Libera o bloqueio
        }, 1000);
      }
    }
  }, [flippedCards, onMatch, setCurrentPlayer, checkWinner, isProcessing]);

  return (
    <div className="game-board">
      {cards.map((card) => (
        <Card key={card.id} card={card} flipCard={flipCard} />
      ))}
    </div>
  );
};

export default GameBoard;