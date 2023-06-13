import React, { useEffect, useState } from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
import { readDeck, readCard, updateCard } from '../utils/api';

function EditCard() {
  const { deckId, cardId } = useParams();
  const [deck, setDeck] = useState({});
  const [card, setCard] = useState({});
  const [cardFront, setCardFront] = useState('');
  const [cardBack, setCardBack] = useState('');
  const history = useHistory();

  const handleCardFrontChange = (event) => {
    setCardFront(event.target.value);
  };

  const handleCardBackChange = (event) => {
    setCardBack(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const updatedCard = {
      ...card,
      front: cardFront,
      back: cardBack,
    };
    updateCard(updatedCard)
      .then(() => {
        history.push(`/decks/${deckId}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    Promise.all([readDeck(deckId), readCard(cardId)])
      .then(([deckData, cardData]) => {
        setDeck(deckData);
        setCard(cardData);
        setCardFront(cardData.front);
        setCardBack(cardData.back);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [deckId, cardId]);

  return (
    <div>
      <nav>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>{deck.name}</Link>
          </li>
          <li className="breadcrumb-item active">Edit Card {cardId}</li>
        </ol>
      </nav>
      <h1>Edit Card {cardId}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="cardFront">Front</label>
          <textarea
            id="cardFront"
            value={cardFront}
            onChange={handleCardFrontChange}
            required
            placeholder="Front side of card"
          />
        </div>
        <div>
          <label htmlFor="cardBack">Back</label>
          <textarea
            id="cardBack"
            value={cardBack}
            onChange={handleCardBackChange}
            required
            placeholder="Back side of card"
          />
        </div>
        <Link to={`/decks/${deckId}`}>Cancel</Link>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default EditCard;