import React, { useState, useEffect } from "react";
import { listDecks, deleteDeck } from "../utils/api/index";
import DeckDetail from "./DeckDetail";
import { Link } from "react-router-dom";

function ListOfDecks() {
  const [decks, setDecks] = useState([]);

  useEffect(() => listDecks().then(setDecks), []);

  const handleDeleteClick = (deckId) => {
    console.log("Delete button clicked");
    const confirmDelete = window.confirm(
      "Delete this deck? You will not be able to recover it."
    );
    if (confirmDelete) {
      deleteDeck(deckId)
        .then(() => {
          listDecks().then(setDecks);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div>
      <Link to="/decks/new" className="btn btn-secondary">
        + Create Deck
      </Link>
      <div>
        {decks.map((deck) => (
          <div key={deck.id}>
            <DeckDetail deck={deck} />
            <Link to={`/decks/${deck.id}`}>View</Link>
            <Link to={`/decks/${deck.id}/study`}>Study</Link>
            <button
              onClick={() => handleDeleteClick(deck.id)}
              className="btn btn-danger"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListOfDecks;
