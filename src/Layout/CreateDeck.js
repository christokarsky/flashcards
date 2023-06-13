import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { createDeck } from "../utils/api/index";

function CreateDeck() {
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
    const newDeck = {
      name: deckName,
      description: deckDescription,
    };

    createDeck(newDeck)
      .then(() => {
        history.push("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <nav>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active">Create Deck</li>
        </ol>
      </nav>
      <h1>Create Deck</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="deckName">Name</label>
          <input
            type="text"
            id="deckName"
            value={deckName}
            onChange={handleDeckNameChange}
            required
          />
          <label htmlFor="deckDescription">Description</label>
          <textarea
            id="deckDescription"
            value={deckDescription}
            onChange={handleDeckDescriptionChange}
            required
            />
        </div>
        <Link to="/">Cancel</Link>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default CreateDeck;
