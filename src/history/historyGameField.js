import '../App.css';
import './historyGameField.css';
import GameCard from "./gameCard";
import {CardGameContext} from "../context/CardGameContext";
import React, {useContext, useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";

function HistoryGameField() {
    const {localStorageCardsSave, getSelectedCardsArray, clearSelectedTicks, } = useContext(CardGameContext);

    let localStorageCardsObject = JSON.parse(window.localStorage.getItem('cards_object'));
    let selectedCardsArray = getSelectedCardsArray();
    console.log(selectedCardsArray)
    const [cardsRemaining, setCardsRemaining] = useState(selectedCardsArray.length); // number of cards which have not been seen
    const [wronglyAnswered, setWronglyAnswered] = useState(0);// number of wrongly answered cards
    const [correctlyAnswered, setCorrectlyAnswered] = useState(0);// number of correctly answered cards
    const [randomArray, setRandomArray] = useState(selectedCardsArray.sort(() => Math.random() - 0.5)) // randomise an array of selected cards
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

    function deleteButtonClicked(k){ // if "deleteButton" have been pushed
        const year = parseInt(randomArray[k].year);
        const id = parseInt(randomArray[k].id);
        console.log(randomArray)
        localStorageCardsObject[year][id].tickIsActive = false;
        localStorageCardsSave(localStorageCardsObject);
        console.log(localStorageCardsObject)
        changeScore();
    }

    function replayButtonClicked(){ // if "replayButton" have been pushed
        selectedCardsArray = getSelectedCardsArray();
        console.log(selectedCardsArray, 1)
        setRandomArray(selectedCardsArray.sort(() => Math.random() - 0.5));// again randomise an array of selected cards
        setCardsRemaining(selectedCardsArray.length) // rewrite number of cards which have not been seen
        console.log(randomArray, 2)

        if (!selectedCardsArray.length){
            leaveButtonClicked();
            alert("На жаль, карточок для гри не залишилось. Оберіть нову підбірку.");
        }
        setWronglyAnswered(0);
        setCorrectlyAnswered(0);
    }

    function leaveButtonClicked(){
        navigate("/History");
        clearSelectedTicks();
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
                            {randomArray[cardsRemaining-2]?.event}
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
                        <div className={`deleteCardButton gameButtons ${cardsRemaining ? "" : "inactiveButton"}`} onClick={() => {deleteButtonClicked(cardsRemaining-1)}}><p><b>Delete</b></p></div>

                        <div className={`leaveButton gameButtons`} onClick={() => {leaveButtonClicked()}}><p><b>Leave Game</b></p></div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default HistoryGameField;
