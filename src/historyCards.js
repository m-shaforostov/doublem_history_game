import './App.css';
import './historyCards.css';
import React, {useContext, useEffect, useState} from "react";
import HistoryYearBlock from "./historyYearBlock";
import ModalWriteCardWindow from "./modalWriteCardWindow";
import NoCardsExist from "./noCardsExist";
import {CardGameContext} from "./context/CardGameContext";

function HistoryCards() {
    let localStorageCardsObject = JSON.parse(window.localStorage.getItem('cards_object'));

    const {modalActive, setModalActive,
        modalEventText, setModalEventText,
        modalEventDate, setModalEventDate,
        modalEventYear, setModalEventYear,
        modalEventIndex, setModalEventIndex,
        cardsObject, setCardsOdject,} = useContext(CardGameContext);

    useEffect(() => {
        localStorageCardsSave(cardsOdj);
    }, [])

    const cardsOdj = {
        1939: [{
            event: "Пакт Молотова-Ріббентропа",
            date: "23 серпня 1939р",
        }]
    };



    function localStorageCardsSave(value) {
        setCardsOdject(value);
        window.localStorage.setItem('cards_object', JSON.stringify(value));
    }

    // localStorageCardsSave(cardsOdj);

    return (
        <div className={localStorageCardsObject ? "cardTable" : "noData cardTable"}>
            <ModalWriteCardWindow localStorageCardsSave={localStorageCardsSave} />
            {
                localStorageCardsObject ? <HistoryYearBlock year={1939} cardsOdj={cardsOdj} localStorageCardsSave={localStorageCardsSave} /> : <NoCardsExist/>
            }
        </div>
    );
}

export default HistoryCards;
