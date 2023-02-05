import '../App.css';
import './historyYearBlock.css';
import plusWhite from "../images/plusWhite.png";
import selectionTick from "../images/tick-icon.png";
import React, { useContext, useState } from "react";
import Weekdays from "../calendar/weekDays";
import CalendarContent from "../calendar/calendarContent";
import {CardGameContext} from "../context/CardGameContext";

function HistoryYearBlock({ year }) {
    let localStorageCardsObject = JSON.parse(window.localStorage.getItem('cards_object'));

    const {modalCardActive, setModalCardActive,
        selectionTicksActive, setSelectionTicksActive,
        modalCardEventText, setModalCardEventText,
        modalCardEventDate, setModalCardEventDate,
        modalCardEventYear, setModalCardEventYear,
        modalCardEventIndex, setModalCardEventIndex,
        localStorageCardsSave, } = useContext(CardGameContext);

    async function openCardEditing(i) {
        setModalCardEventText(localStorageCardsObject[year][i].event);
        setModalCardEventDate(localStorageCardsObject[year][i].date);
        setModalCardEventYear(year);
        setModalCardEventIndex(i);
        setModalCardActive(true);
    }

    return (
        <div className="specialYear">
            <div className="yearEmblem">
                <img src={selectionTick} alt="" className={`tickIcon groupTick offTick ${selectionTicksActive ? "shown" : ""}`}/>
                <h1>{year}</h1>
            </div>
            <div className="cardsCollection">
                {
                    localStorageCardsObject &&
                    Object.keys(localStorageCardsObject[year]).map((x, i) => //[x]
                        <div className="basicCard card" onClick={() => {openCardEditing(i)}}>
                            <img src={selectionTick} alt="" className={`tickIcon individualTick offTick ${selectionTicksActive ? "shown" : ""}`} />
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