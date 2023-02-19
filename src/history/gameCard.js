import '../App.css';
import './gameCard.css';
import React, {useContext, useState} from "react";

function GameCard({cardsRemaining, cardsArray}) {
    const [isFlipped, setIsFlipped] = useState(false);

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    return (
        Boolean(cardsRemaining) &&
        <div className={`gameCard ${isFlipped ? 'flipped' : ''}`} onClick={handleFlip}>
            <div className="frontText">{cardsArray[cardsRemaining-1].link.event}</div>
            <div className="backText">{cardsArray[cardsRemaining-1].link.date}</div>
        </div>
    );
}

export default GameCard;
