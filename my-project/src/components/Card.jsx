import React from 'react';

const Card = ({ card, flipCard }) => {
  const handleClick = () => {
    flipCard(card.id);
  };

  return (
    <div
      className={`card ${card.flipped ? 'flipped' : ''} ${
        card.matched ? 'matched' : ''
      }`}
      onClick={handleClick}
    >
      <div className="card-inner">
        <div className="card-front">?</div>
        <div className="card-back">{card.value}</div>
      </div>
    </div>
  );
};

export default Card;