import '../App.css';
import './buttonsAddAndPlay.css';
import whitePlay from "../images/play.png";
import React, {useContext} from "react";
import whitePlus from "../images/WhitePlus.png";
import {CardGameContext} from "../context/CardGameContext";

function ButtonsAddAndPlay() {
    let localStorageCardsObject = JSON.parse(window.localStorage.getItem('cards_object'));
    const {
        openEmptyCardEditing,
        startTheGame,
    } = useContext(CardGameContext);

    return (
        <div className="buttonsContainer">
            <div className="button" title='Start game'>
                <img className="bottomWhitePlay" src={whitePlay} alt="" onClick={() => {
                    startTheGame()
                }}/>
            </div>
            <div className="button" title='Add new card'>
                <img src={whitePlus} alt="" onClick={() => {
                    openEmptyCardEditing()
                }}/>
            </div>
        </div>
    );
}

export default ButtonsAddAndPlay;
