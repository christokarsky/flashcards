import React, { useState, useEffect } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { readDeck, deleteDeck, deleteCard } from "../utils/api";

function ViewDeck() {
  const { deckId } = useParams();
  const [deck, setDeck] = useState({});
  const history = useHistory();

  useEffect(() => {
    readDeck(deckId).then(setDeck);
  }, [deckId]);

  const handleDeckDelete = (deckId) => {
    const confirmDelete = window.confirm(
      "Delete this deck? You will not be able to recover it."
    );
    if (confirmDelete) {
      deleteDeck(deckId)
        .then(() => {
          history.push("/");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleCardDelete = (cardId) => {
    const confirmDelete = window.confirm(
      "Delete this card? You will not be able to recover it."
    );
    if (confirmDelete) {
      deleteCard(cardId)
        .then(() => {
          readDeck(deckId).then(setDeck);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const cards = deck.cards;

  if (deck.id) {
    return (
      <div>
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item active">{deck.name}</li>
          </ol>
        </nav>
        <h2>{deck.name}</h2>
        <p>{deck.description}</p>
        <Link to={`/decks/${deckId}/edit`}>
          <button className="btn btn-primary mr-1" >Edit</button>
        </Link>
        <Link to={`/decks/${deckId}/study`}>
          <button className="btn btn-primary mr-1">Study</button>
        </Link>
        <Link to={`/decks/${deckId}/cards/new`}>
          <button className="btn btn-primary mr-1">Add Cards</button>
        </Link>
        <button className="btn btn-danger mr-1" onClick={() => handleDeckDelete(deckId)}>Delete</button>
        <h1>Cards</h1>
        {cards.map((card) => (
          <div key={card.id}>
            <p>
            {card.front}
            </p>
            <p>
            {card.back}
            </p>
            <Link to={`/decks/${deckId}/cards/${card.id}/edit`}>
                <button className="btn btn-primary mr-1">edit</button>
                </Link>
            <button className="btn btn-danger" onClick={() => handleCardDelete(card.id)}>delete</button>
          </div>
        ))}
      </div>
    );
  }
  return <p>Loading...</p>;
}

export default ViewDeck;
