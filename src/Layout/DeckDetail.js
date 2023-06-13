import React from 'react';

function DeckDetail ({deck}) {
    
    return(
        <div>
            <p>{deck.cards.length} cards</p>
            <h3>{deck.name}</h3>
            <p>{deck.description}</p>
        </div>
    )
}

export default DeckDetail