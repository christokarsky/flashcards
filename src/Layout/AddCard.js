import React, { useEffect, useState } from 'react';
import { readDeck, createCard } from '../utils/api';
import { useParams, useHistory, Link } from 'react-router-dom';
import CardForm from "./CardForm";

function AddCard() {
  const { deckId } = useParams();
  const [deck, setDeck] = useState({});
  const history = useHistory();

  const [cardFront, setCardFront] = useState('');
  const [cardBack, setCardBack] = useState('');

  useEffect(() => {
    readDeck(deckId).then(setDeck);
  }, [deckId]);

  const handleSubmit = (newCard) => {
    createCard(deckId, newCard)
      .then(() => {
        history.push(`/decks/${deckId}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDone = () => {
    history.push(`/decks/${deckId}`);
  };

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
          <li className="breadcrumb-item active">Add Card</li>
        </ol>
      </nav>
      <h2>{deck.name}: Add Card</h2>
      <CardForm handleSubmit={handleSubmit} handleDone={handleDone} cardFront={cardFront} cardBack={cardBack} setCardFront={setCardFront} setCardBack={setCardBack} />
    </div>
  );
}

export default AddCard;