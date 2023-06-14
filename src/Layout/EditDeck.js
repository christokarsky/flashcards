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
    readDeck(deckId)
      .then((fetchedDeck) => {
        setDeck((prevDeck) => ({ ...prevDeck, ...fetchedDeck }));
      })
      .catch((error) => {
        console.log(error);
      });
  }, [deckId]);

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
      <div className="container">
        <div className="row">
          <div className="col">
            <h1>Edit Deck</h1>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="deckName" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  id="deckName"
                  value={deckName}
                  onChange={handleDeckNameChange}
                  className="form-control"
                  placeholder={deck.name}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="deckDescription" className="form-label">
                  Description
                </label>
                <textarea
                  id="deckDescription"
                  value={deckDescription}
                  onChange={handleDeckDescriptionChange}
                  className="form-control"
                  placeholder={deck.description}
                  required
                />
              </div>
              <Link to={`/decks/${deckId}`} className="btn btn-secondary mr-2">
                Cancel
              </Link>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditDeck;
