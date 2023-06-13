import React, { useEffect, useState } from 'react';
import { readDeck, createCard } from '../utils/api';
import { useParams, useHistory, Link } from 'react-router-dom';

function AddCard() {
  const { deckId } = useParams();
  const [deck, setDeck] = useState({});
  const [front, setFront] = useState('');
  const [back, setBack] = useState('');
  const history = useHistory();

  useEffect(() => {
    readDeck(deckId).then(setDeck);
  }, [deckId]);

  const handleFrontChange = (event) => {
    setFront(event.target.value);
  };

  const handleBackChange = (event) => {
    setBack(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newCard = {
      front,
      back,
    };
    createCard(deckId, newCard)
      .then(() => {
        setFront('');
        setBack('');
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
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="cardFront">Front</label>
          <textarea
            id="cardFront"
            value={front}
            onChange={handleFrontChange}
            required
            placeholder="Front side of card"
          />
        </div>
        <div>
          <label htmlFor="cardBack">Back</label>
          <textarea
            id="cardBack"
            value={back}
            onChange={handleBackChange}
            required
            placeholder="Back side of card"
          />
        </div>
        <button onClick={handleDone}>Done</button>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default AddCard;