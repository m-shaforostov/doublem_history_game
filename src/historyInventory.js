import './App.css';
import './historyInventory.css';
import React from "react";
import HistoryYearBlock from "./historyYearBlock";

function HistoryInventory() {
    let localStorageCardsObject = JSON.parse(window.localStorage.getItem('cards_object'));

    return (
        <div className={"mainInventory"}>
            {
                Object.keys(localStorageCardsObject).map((x, i) => //[x]
                    <HistoryYearBlock year={x}/>
                )
            }
        </div>
    );
}

export default HistoryInventory;
