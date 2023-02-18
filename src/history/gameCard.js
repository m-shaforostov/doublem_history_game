import '../App.css';
import './gameCard.css';
import React, {useContext, useState} from "react";

function GameCard({index}) {
    const [isFlipped, setIsFlipped] = useState(false);

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    return (
        <div className={`gameCard ${isFlipped ? 'flipped' : ''}`} onClick={handleFlip}>
            <div className="frontText">Front Content</div>
            <div className="backText">Back Content</div>
        </div>
    );
}

export default GameCard;
