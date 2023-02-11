import '../App.css';
import './yearBlock.css';
import plusWhite from "../images/plusWhite.png";
import selectionTick from "../images/tick-icon.png";
import React, { useContext, useState } from "react";
import Weekdays from "../calendar/weekDays";
import CalendarContent from "../calendar/calendarContent";
import {CardGameContext} from "../context/CardGameContext";

function YearBlock({ year }) {
    let localStorageCardsObject = JSON.parse(window.localStorage.getItem('cards_object'));

    const {modalCardActive, setModalCardActive,
        selectionTicksOpen, setSelectionTicksOpen,
        modalCardEventText, setModalCardEventText,
        modalCardEventDate, setModalCardEventDate,
        modalCardEventYear, setModalCardEventYear,
        modalCardEventIndex, setModalCardEventIndex,
        localStorageCardsSave, selectionTickClick, } = useContext(CardGameContext);

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
                <img src={selectionTick} alt="" className={`tickIcon groupTick ${localStorageCardsObject[year][0].tickIsActive ? "" : "offTick"} ${selectionTicksOpen ? "shown" : ""}`} onClick={() => {selectionTickClick(`groupTick`, year,0)}} /> {/*show color under another circumstance*/}
                <h1>{year}</h1>
            </div>
            <div className="cardsCollection">
                {
                    localStorageCardsObject &&
                    Object.keys(localStorageCardsObject[year]).map((x, i) => {//[x]

                        return (
                        <div className="basicCard card" onClick={() => {openCardEditing(i)}}>
                            <img src={selectionTick}  className={`tickIcon individualTick ${localStorageCardsObject[year][i].tickIsActive ? "" : "offTick"} ${selectionTicksOpen ? "shown" : ""}`} onClick={(event) => {event.stopPropagation(); selectionTickClick(`individualTick`, year, i)}} />
                            <p>{localStorageCardsObject[year][i].event}</p>
                            <b><p>{localStorageCardsObject[year][i].date}</p></b>
                        </div>
                    )})
                }
            </div>
        </div>
    );
}

export default YearBlock;