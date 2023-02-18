import '../App.css';
import './historyGameField.css';
import GameCard from "./gameCard";
import FlippableBlock from "./testingFile";

import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import testingFile from "./testingFile";

function HistoryGameField() {
    let localStorageCardsObject = JSON.parse(window.localStorage.getItem('cards_object'));
    let localStorageSelectedCardsArray = JSON.parse(window.localStorage.getItem('selected_cards_array'));

    const [cardsRemaining, setCardsRemaining] = useState(localStorageSelectedCardsArray.length);
    const [wronglyAnswered, setWronglyAnswered] = useState(0);
    const [correctlyAnswered, setCorrectlyAnswered] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        if (cardsRemaining === 0){
            // alert("the end!")
        }
    }, [cardsRemaining])

    function changeScore(){
        setCardsRemaining(cardsRemaining - 1);
    }

    function wrongButtonClicked(){
        changeScore();
        setWronglyAnswered(wronglyAnswered + 1);
    }

    function rightButtonClicked(){
        changeScore();
        setCorrectlyAnswered(correctlyAnswered + 1);
    }

    function deleteButtonClicked(){
        changeScore();
    }

    function replayButtonClicked(){
        setCardsRemaining(localStorageSelectedCardsArray.length)
        setWronglyAnswered(0);
        setCorrectlyAnswered(0);
    }

    function leaveButtonClicked(){
        navigate("/History");
    }

    return (
        <div className={"mainBlock"}>
            <div className={"mainGameTable"}>
                <div className={"scorePlace"}>
                    <div className={"wronglyAnsweredCardsNumber"}><p>Правильно: {wronglyAnswered}</p></div>
                    <div className={"cardsRemainingNumber"}><p>Залишилось карт: {cardsRemaining}</p></div>
                    <div className={"correctlyAnsweredCardsNumber"}><p>Неправильно: {correctlyAnswered}</p></div>
                </div>
                <div className={"centerCardsPlace"}>
                    <div className={`${cardsRemaining ? "emptiness" : "emptiness"}`}>
                        <GameCard index={1}/>
                        {/*<GameCard index={2}/>*/}
                    </div>
                </div>
                <div className={"buttonsPlace"}>
                    <div className={"topButtons"}>
                        <div className={`wronglyAnsweredButton gameButtons ${cardsRemaining ? "" : "inactiveButton"}`} onClick={() => {wrongButtonClicked()}}><p><b>Wrong</b></p></div>
                        <div className={`correctlyAnsweredButton gameButtons ${cardsRemaining ? "" : "inactiveButton"}`} onClick={() => {rightButtonClicked()}}><p><b>Right</b></p></div>

                        <div className={`replayButton gameButtons ${cardsRemaining ? "inactiveButton" : ""}`} onClick={() => {replayButtonClicked()}}><p><b>Replay</b></p></div>
                    </div>
                    <div className={"bottomButtons"}>
                        <div className={`deleteCardButton gameButtons ${cardsRemaining ? "" : "inactiveButton"}`} onClick={() => {deleteButtonClicked()}}><p><b>Delete</b></p></div>

                        <div className={`leaveButton gameButtons`} onClick={() => {leaveButtonClicked()}}><p><b>Leave Game</b></p></div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default HistoryGameField;
