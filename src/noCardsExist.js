import './App.css';
import './noCardsExist.css';
import React, {useEffect, useState} from "react";
import plusWhite from "./images/plusWhite.png";

function NoCardsExist() {

    return (
        <div className="noCardMessage">
            <div>Add your first card</div>
            <div className="addFirstCard-btn" title='Add new card'>
                <img src={plusWhite} alt=""/>
            </div>
        </div>
    );
}

export default NoCardsExist;
