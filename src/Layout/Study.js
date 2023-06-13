import React, { useState, useEffect } from "react";
import { readDeck } from "../utils/api/index";
import { useParams } from "react-router-dom";
import StudyNotEnough from "./StudyNotEnough";
import StudyCard from "./StudyCard";

function Study() {
  const { deckId } = useParams();
  const [deck, setDeck] = useState({});

  useEffect(() => readDeck(deckId).then(setDeck), [deckId]);

  if (deck === null || deck.cards === undefined) {
    return <p>Loading...</p>;
  }

  const deckLength = deck.cards.length;

  return deckLength < 3 ? (
    <StudyNotEnough deck={deck} deckLength={deckLength} />
  ) : (
    <StudyCard deck={deck} deckId={deckId} />
  );
}

export default Study;