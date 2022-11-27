import './App.css';
import './historyCards.css';
import React, {useContext, useEffect, useState} from "react";
import ModalWriteCardWindow from "./modalWriteCardWindow";
import NoCardsExist from "./noCardsExist";
import {CardGameContext} from "./context/CardGameContext";
import HistoryInventory from "./historyInventory";

function HistoryCards() {
    let localStorageCardsObject = JSON.parse(window.localStorage.getItem('cards_object'));

    const { localStorageCardsSave } = useContext(CardGameContext);

    // useEffect(() => {
    //     localStorageCardsSave(cardsOdj);
    // }, [])
    //
    // const cardsOdj = {
    //     1939: [{
    //         event: "Пакт Молотова-Ріббентропа",
    //         date: "23.08.1939",
    //     }]
    // };

    return (
        <div className={localStorageCardsObject ? "cardTable" : "noData cardTable"}>
            <ModalWriteCardWindow />
            {
                localStorageCardsObject ? <HistoryInventory/> : <NoCardsExist/>
            }
        </div>
    );
}

export default HistoryCards;
