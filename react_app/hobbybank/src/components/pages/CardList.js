import React, { useState } from 'react';
import Collection from './components/pages/Collection';

function CardList() {
    const [cards, setCards] = useState([]);


    const addCards = card =>{
        if(!cards.text || /^\s*$/.test(cards.text)) { //All this does is helps correct input of cards
            return;
        };

        const newCards = [card, ...cards];

        setCards(newCards);
        console.log(...cards);
    };

    return (
        <div>
            <h1>My Collection</h1>
            <Collection onSubmit={addCards} />              
        </div> 
    );
}

export default CardList;
