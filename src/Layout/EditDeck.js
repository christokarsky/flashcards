import React, { useEffect, useState } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { readDeck, updateDeck } from "../utils/api";

function EditDeck() {
  const { deckId } = useParams();
  const [deck, setDeck] = useState({});
  const [deckName, setDeckName] = useState("");
  const [deckDescription, setDeckDescription] = useState("");
  const history = useHistory();

  const handleDeckNameChange = (event) => {
    setDeckName(event.target.value);
  };

  const handleDeckDescriptionChange = (event) => {
    setDeckDescription(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const updatedDeck = { ...deck, name: deckName, description: deckDescription };
    updateDeck(updatedDeck)
      .then(() => {
        history.push(`/decks/${deckId}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    readDeck(deckId).then(setDeck);
  }, [deckId]);

  console.log(deckName);
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
          <li className="breadcrumb-item active">{deck.name}</li>
        </ol>
      </nav>
      <h1>Edit Deck</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="deckName">Name</label>
          <input
            type="text"
            id="deckName"
            value={deck.name}
            onChange={handleDeckNameChange}
            placeholder={deck.name}
            required
          />
        </div>
        <div>
          <label htmlFor="deckDescription">Description</label>
          <input
            id="deckDescription"
            value={deck.description}
            onChange={handleDeckDescriptionChange}
            placeholder={deck.description}
            required
          />
        </div>
        <Link to={`/decks/${deckId}`}>Cancel</Link>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default EditDeck;


