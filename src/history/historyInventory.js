import '../App.css';
import './historyInventory.css';
import React from "react";
import YearBlock from "./yearBlock";

function HistoryInventory() {
    let localStorageCardsObject = JSON.parse(window.localStorage.getItem('cards_object'));

    return (
        <div className={"mainInventory"}>
            {
                Object.keys(localStorageCardsObject).map((x, i) => //[x]
                    <YearBlock year={x}/>
                )
            }
        </div>
    );
}

export default HistoryInventory;
