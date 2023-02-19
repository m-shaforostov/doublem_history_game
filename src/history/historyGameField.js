import '../App.css';
import './historyGameField.css';
import GameCard from "./gameCard";
import {CardGameContext} from "../context/CardGameContext";
import React, {useContext, useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";

function HistoryGameField() {
    const {localStorageSelectedCardsSave, localStorageCardsSave,} = useContext(CardGameContext);

    let localStorageCardsObject = JSON.parse(window.localStorage.getItem('cards_object'));
    let localStorageSelectedCardsArray = JSON.parse(window.localStorage.getItem('selected_cards_array'));

    const [cardsRemaining, setCardsRemaining] = useState(localStorageSelectedCardsArray.length); // number of cards which have not been seen
    const [wronglyAnswered, setWronglyAnswered] = useState(0);// number of wrongly answered cards
    const [correctlyAnswered, setCorrectlyAnswered] = useState(0);// number of correctly answered cards
    const [randomArray, setRandomArray] = useState(localStorageSelectedCardsArray.sort(() => Math.random() - 0.5)) // randomise an array of selected cards
    const navigate = useNavigate();

    function changeScore(){ // change number of cards which have not been seen
        setCardsRemaining(cardsRemaining - 1);
    }

    function wrongButtonClicked(){ // if "wrongButton" have been pushed
        changeScore();
        setWronglyAnswered(wronglyAnswered + 1);
    }

    function correctButtonClicked(){ // if "correctButton" have been pushed
        changeScore();
        setCorrectlyAnswered(correctlyAnswered + 1);
    }

    function deleteButtonClicked(){ // if "deleteButton" have been pushed
        let randomArrayCopy = randomArray;
        removeTickSelection(cardsRemaining-1, randomArrayCopy) // remove selection of a relative tick
        randomArrayCopy.splice(cardsRemaining-1, 1);//delete card from the array
        setRandomArray(randomArrayCopy); // change relative state
        localStorageSelectedCardsSave(randomArrayCopy); // change local storage data
        changeScore();
    }

    function removeTickSelection(k, randomArrayCopy) {
        let year = parseInt(randomArrayCopy[k].year);
        let id = parseInt(randomArrayCopy[k].id);
        localStorageCardsObject[year][id].tickIsActive = false;
        localStorageCardsSave(localStorageCardsObject);
    }


    function replayButtonClicked(){ // if "replayButton" have been pushed
        setRandomArray(localStorageSelectedCardsArray.sort(() => Math.random() - 0.5));// again randomise an array of selected cards
        setCardsRemaining(localStorageSelectedCardsArray.length) // rewrite number of cards which have not been seen
        if (!localStorageSelectedCardsArray.length){
            leaveButtonClicked();
            alert("На жаль, карточок для гри не залишилось. Оберіть нову підбірку.");
        }
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
                    <div className={"emptyCardPlace"}>
                        <div className={cardsRemaining > 1 ? `backGameCard` : `hidden`}>
                            {randomArray[cardsRemaining-2]?.link.event}
                        </div>
                        <GameCard cardsRemaining={cardsRemaining} cardsArray={randomArray}/>
                    </div>
                </div>
                <div className={"buttonsPlace"}>
                    <div className={"topButtons"}>
                        <div className={`wronglyAnsweredButton gameButtons ${cardsRemaining ? "" : "inactiveButton"}`} onClick={() => {wrongButtonClicked()}}><p><b>Wrong</b></p></div>
                        <div className={`correctlyAnsweredButton gameButtons ${cardsRemaining ? "" : "inactiveButton"}`} onClick={() => {correctButtonClicked()}}><p><b>Correct</b></p></div>

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
