import React, { useEffect, useState } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { readDeck, readCard, updateCard } from "../utils/api";
import CardForm from "./CardForm";

function EditCard() {
  const { deckId, cardId } = useParams();
  const [deck, setDeck] = useState({});
  const [card, setCard] = useState({});
  const [cardFront, setCardFront] = useState("");
  const [cardBack, setCardBack] = useState("");
  const history = useHistory();

  const handleSubmit = (newCard) => {
    const updatedCard = {
      ...card,
      ...newCard,
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

  const handleCancel = (event) => {
    event.preventDefault();
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
          <li className="breadcrumb-item active">Edit Card {cardId}</li>
        </ol>
      </nav>
      <h1>Edit Card {cardId}</h1>
      {cardFront && cardBack && (
        <CardForm
          handleSubmit={handleSubmit}
          handleCancel={handleCancel}
          cardFront={cardFront}
          cardBack={cardBack}
        />
      )}
    </div>
  );
}

export default EditCard;
