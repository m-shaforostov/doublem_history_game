import '../App.css';
import './noCardsExist.css';
import React, {useContext} from "react";
import plusWhite from "../images/plusWhite.png";
import {CardGameContext} from "../context/CardGameContext";

function NoCardsExist() {

    const { openEmptyCardEditing } = useContext(CardGameContext);

    return (
        <div className="noCardMessage">
            <div>Add your first card</div>
            <div className="addFirstCard-btn" title='Add new card' onClick={() => {openEmptyCardEditing()}}>
                <img src={plusWhite} alt="" />
            </div>
        </div>
    );
}

export default NoCardsExist;
