import React, { useState } from "react";

function CardForm({ handleSubmit, handleDone, handleCancel, cardFront, cardBack }) {
  const [front, setFront] = useState(cardFront);
  const [back, setBack] = useState(cardBack);

  const handleFrontChange = (event) => {
    setFront(event.target.value);
  };

  const handleBackChange = (event) => {
    setBack(event.target.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    const newCard = { front, back };
    handleSubmit(newCard);
    setFront("");
    setBack("");
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <div className="mb-3">
        <label htmlFor="cardFront" className="form-label">
          Front
        </label>
        <textarea
          id="cardFront"
          value={front}
          onChange={handleFrontChange}
          required
          placeholder="Front side of card"
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="cardBack" className="form-label">
          Back
        </label>
        <textarea
          id="cardBack"
          value={back}
          onChange={handleBackChange}
          required
          placeholder="Back side of card"
          className="form-control"
        />
      </div>
      {handleDone && (
        <button onClick={handleDone} className="btn btn-secondary mr-2">
          Done
        </button>
      )}
      {handleCancel && (
        <button onClick={handleCancel} className="btn btn-secondary mr-2">
          Cancel
        </button>
      )}
      <button type="submit" className="btn btn-primary">
        Save
      </button>
    </form>
  );
}

export default CardForm;
