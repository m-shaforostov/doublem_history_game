import '../App.css';
import './historyMainPage.css';
import React, {useContext} from "react";
import ModalWriteCardWindow from "./modalWriteCardWindow";
import NoCardsExist from "./noCardsExist";
import {CardGameContext} from "../context/CardGameContext";
import HistoryInventory from "./historyInventory";
import _ from "lodash";

function HistoryMainPage() {
    const { cardsObject } = useContext(CardGameContext);

    // let localStorageCardsObject = JSON.parse(window.localStorage.getItem('cards_object'));
    let isFull = !_.isEmpty(cardsObject)
    return (
        <div className={isFull ? "cardTable" : "noData cardTable"}>
            <ModalWriteCardWindow />
            {
                isFull ? <HistoryInventory/> : <NoCardsExist/>
            }
        </div>
    );
}

export default HistoryMainPage;
