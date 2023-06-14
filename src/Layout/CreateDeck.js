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
          <div>
            <label htmlFor="deckName">Name</label>
          </div>
          <div className="mb-2">
            <input
              type="text"
              id="deckName"
              value={deckName}
              onChange={handleDeckNameChange}
              required
              placeholder="Deck Name"
              className="form-control"
            />
          </div>
        </div>
        <div>
          <div>
            <label htmlFor="deckDescription">Description</label>
          </div>
          <div className="mb-2">
            <textarea
              id="deckDescription"
              value={deckDescription}
              onChange={handleDeckDescriptionChange}
              required
              placeholder="Deck Description"
              className="form-control"
            />
          </div>
        </div>
        <Link to="/" className="btn btn-secondary mr-1">
          Cancel
        </Link>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default CreateDeck;
