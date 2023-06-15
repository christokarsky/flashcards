import React, { useState, useEffect } from "react";
import { listDecks, deleteDeck } from "../utils/api/index";
import DeckDetail from "./DeckDetail";
import { Link } from "react-router-dom";
//import {Trash, Eye, Book} from 'react-bootstrap-icons';


function ListOfDecks() {
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    listDecks().then(setDecks);
  }, [decks]);

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
      <Link to="/decks/new" className="btn btn-secondary mb-3">
        + Create Deck
      </Link>
      <div>
        {decks.map((deck) => (
          <div key={deck.id} className="border p-3 mb-3">
            <DeckDetail deck={deck} />
            <div className="d-flex justify-content-between">
              <div>
                <Link
                  to={`/decks/${deck.id}`}
                  className="btn btn-secondary mr-1"
                >
                  View
                  
                </Link>
                <Link
                  to={`/decks/${deck.id}/study`}
                  className="btn btn-primary"
                >
                  Study
                  
                </Link>
              </div>
              <button
                onClick={() => handleDeleteClick(deck.id)}
                className="btn btn-danger"
              >
                Delete
               
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListOfDecks;
