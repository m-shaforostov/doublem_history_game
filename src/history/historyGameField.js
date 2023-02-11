import '../App.css';
import './historyGameField.css';
import React from "react";

function HistoryGameField() {
    let localStorageCardsObject = JSON.parse(window.localStorage.getItem('cards_object'));

    return (
        <div className={"mainBlock"}>
            <div className={"mainGameTable"}>
                <div className={"scorePlace"}>
                    <div className={"cardsRemainingNumber"}><p>Залишилось карт:{}</p></div>
                    <div className={"wronglyAnsweredCardsNumber"}><p>Правильно:{}</p></div>
                    <div className={"correctlyAnsweredCardsNumber"}><p>Неправильно:{}</p></div>
                </div>
                <div className={"cardsPlace"}>
                    <div className={"cards"}></div>
                </div>
                <div className={"buttonsPlace"}>
                    <div className={"topButtons"}>
                        <div className={"wronglyAnsweredButton gameButtons"}><p><b>Wrong</b></p></div>
                        <div className={"correctlyAnsweredButton gameButtons"}><p><b>Right</b></p></div>
                    </div>
                    <div className={"bottomButtons"}>
                        <div className={"deleteCardButton gameButtons"}><p><b>Delete</b></p></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HistoryGameField;
