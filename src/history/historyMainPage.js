import '../App.css';
import './historyMainPage.css';
import React, {useContext, useEffect} from "react";
import ModalWriteCardWindow from "./modalWriteCardWindow";
import NoCardsExist from "./noCardsExist";
import {CardGameContext} from "../context/CardGameContext";
import HistoryInventory from "./historyInventory";
import _ from "lodash";

function HistoryMainPage() {
    const { cardsObject, selectionTicksOpen, setSelectionTicksOpen, clearSelectedTicks } = useContext(CardGameContext);

    useEffect(() => {
        const listener = event => {
            if (event.code === "Escape") { // leave card selection
                event.preventDefault();
                if (selectionTicksOpen){
                    clearSelectedTicks();
                    setSelectionTicksOpen(false);
                }
            }
        };
        document.addEventListener("keydown", listener);
        return () => {
            document.removeEventListener("keydown", listener);
        };
    }, [selectionTicksOpen])

    let isFull = !_.isEmpty(cardsObject)
    return (
        <div className={isFull ? "cardTable" : "noData emptyCardTable"}>
            <ModalWriteCardWindow />
            {
                isFull ? <HistoryInventory/> : <NoCardsExist/>
            }
        </div>
    );
}

export default HistoryMainPage;
