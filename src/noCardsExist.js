import './App.css';
import './noCardsExist.css';
import React, {useEffect, useState, useContext} from "react";
import plusWhite from "./images/plusWhite.png";
import {CardGameContext} from "./context/CardGameContext";

function NoCardsExist() {

    const { openEmptyCardEditing } = useContext(CardGameContext);

    return (
        <div className="noCardMessage">
            <div>Add your first card</div>
            <div className="addFirstCard-btn" title='Add new card'>
                <img src={plusWhite} alt="" onClick={() => {openEmptyCardEditing()}}/>
            </div>
        </div>
    );
}

export default NoCardsExist;
