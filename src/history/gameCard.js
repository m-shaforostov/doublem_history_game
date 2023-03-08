import '../App.css';
import './gameCard.css';
import React, {useContext, useState} from "react";

function GameCard({cardsRemaining, cardsArray, isFlipped, setIsFlipped}) {


    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    return (
        Boolean(cardsRemaining) &&
        <div className={`gameCard`} id={`${isFlipped ? 'flipped' : ''}`} onClick={handleFlip}>
            <div className="frontText">{cardsArray[cardsRemaining-1]?.event}</div>
            <div className="backText">{cardsArray[cardsRemaining-1]?.date}</div>
        </div>
    );
}

export default GameCard;
