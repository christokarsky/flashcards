import React from "react";
import { Link } from "react-router-dom";

function StudyNotEnough({ deck, deckLength }) {
  return (
    <div>
      <h1>{deck.name}</h1>
      <h2>Not enough cards.</h2>
      <p>
        You need at least 3 cards to study. There are {deckLength} cards in this
        deck.
      </p>
      <Link to={`/decks/${deck.id}/cards/new`}>+ Add Cards</Link>
    </div>
  );
}

export default StudyNotEnough;