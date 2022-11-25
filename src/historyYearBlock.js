import './App.css';
import './historyYearBlock.css';
import plusWhite from "./images/plusWhite.png";
import React, { useContext, useState } from "react";
import Weekdays from "./weekDays";
import CalendarContent from "./calendarContent";
import {CardGameContext} from "./context/CardGameContext";

function HistoryYearBlock({ year, cardsOdj, }) {
    let localStorageCardsObject = JSON.parse(window.localStorage.getItem('cards_object'));

    const {modalActive, setModalActive,
        modalEventText, setModalEventText,
        modalEventDate, setModalEventDate,
        modalEventYear, setModalEventYear,
        modalEventIndex, setModalEventIndex,
        localStorageCardsSave, } = useContext(CardGameContext);

    function openModalWindow(i) {
        setModalEventText(localStorageCardsObject[year][i].event);
        setModalEventDate(localStorageCardsObject[year][i].date);
        setModalEventYear(year);
        setModalEventIndex(i);
        setModalActive(true);
    }

    return (
        <div className="specialYear">
            <div className="yearEmblem">
                <h1>{year}</h1>
            </div>
            <div className="cardsCollection">
                {
                    localStorageCardsObject &&
                    Object.keys(localStorageCardsObject[year]).map((x, i) => //[x]
                        <div className="basicCard card" onClick={() => {openModalWindow(i)}}>
                            <p>{localStorageCardsObject[year][i].event}</p>
                            <b><p>{localStorageCardsObject[year][i].date}</p></b>
                        </div>
                    )
                }
            </div>
        </div>
    );
}

export default HistoryYearBlock;