import React, { useState, useEffect } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { readDeck, deleteDeck, deleteCard } from "../utils/api";
import {Trash, Book, Pencil} from 'react-bootstrap-icons';

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
            <li className="breadcrumb-item">
              <Link to={`/decks/${deckId}`}>{deck.name}</Link>
            </li>
            <li className="breadcrumb-item active">View Deck</li>
          </ol>
        </nav>
        <h2 className="mb-3">Cards</h2>
        <div className="d-flex">
          <div className="mr-1">
            <Link to={`/decks/${deckId}/edit`}>
              <button className="btn btn-secondary mr-1 mb-2">Edit <Pencil /></button>
            </Link>
          </div>
          <div className="mr-1">
            <Link to={`/decks/${deckId}/study`}>
              <button className="btn btn-primary mr-1 mb-2">Study <Book /></button>
            </Link>
          </div>
          <div className="mr-1">
            <Link to={`/decks/${deckId}/cards/new`}>
              <button className="btn btn-primary mr-1 mb-2">Add Cards +</button>
            </Link>
          </div>
          <div className="ml-auto">
            <button
              className="btn btn-danger mb-2 ml-auto"
              onClick={() => handleDeckDelete(deckId)}
            >
              Delete
              <Trash />
            </button>
          </div>
        </div>
        {cards.map((card) => (
          <div key={card.id} className="border p-3 mb-3">
            <div className="row">
              <div className="col-md-6">
                <p>{card.front}</p>
              </div>
              <div className="col-md-6">
                <p>{card.back}</p>
                <div className="d-flex justify-content-end">
                  <Link to={`/decks/${deckId}/cards/${card.id}/edit`}>
                    <button className="btn btn-primary mr-1">edit <Pencil /></button>
                  </Link>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleCardDelete(card.id)}
                  >
                    delete <Trash />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
  return <p>Loading...</p>;
}

export default ViewDeck;
