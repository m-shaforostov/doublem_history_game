import './modalWriteCardWindow.css'
import '../App.css'
import React, { useContext, useEffect, useState } from "react";
import _ from "lodash";
import {CardGameContext} from "../context/CardGameContext";

// {, setActive, x, y, weekNumb, cellsObject, funcSetCellText, funcSetCellValitidy} // 7

function ModalWriteCardWindow({}) {

    const { modalGameStartChoiceActive, setModalGameStartChoiceActive, } = useContext(CardGameContext);

    let localStorageCardsObject = JSON.parse(window.localStorage.getItem('cards_object'));


    useEffect(() => {
        document.addEventListener('keypress', (event) => {
            const keyName = event.key;
            console.log(modalCardActive)
            if (keyName === "Enter"){
                checkModalActive();
            }
        });
    }, [])



    function cancelEditing() {
        setModalCardActive(false);
    }





    return (
        modalCardActive &&
        <div className="modalCardOverlay" id="menu" onClick={() => {cancelEditing()}}>
            <div className="modalCardContent" onClick={(event) => {event.stopPropagation()}}>
                <div className="cardHeader">
                    <h1>Заповніть нову картку</h1>
                </div>
                <div className="cardBody">
                    <form action="src">
                        <label htmlFor="getEvent">Подія:</label>
                        <input className="cardEnter" id="getEvent" value={modalCardEventText} autoComplete={"off"} onChange={changeFieldTextEvent}  type="text" placeholder="День народження Адміна" />
                        <label htmlFor="getEvent" className={errorTextLabel}>*Поле має містити текст*</label>
                    </form>
                    <form action="src">
                        <label htmlFor="getDate">Дата:</label>
                        <input className="cardEnter" id="getDate" value={modalCardEventDate} autoComplete={"off"} onChange={changeFieldTextDate}  type="text" placeholder="27.10.2005"/>
                        <label htmlFor="getDate" className={errorDateLabel}>*Дата введена некоректно*</label>
                    </form>
                </div>
                <div className="cardFooter">
                    <div className="leftButton">
                        <button className="cancel" onClick={() => {cancelEditing()}}>
                            <h1>Відмінити</h1>
                        </button>
                    </div>
                    <div className="rightButton">
                        <button className="save" onClick={() => {submitCardText()}}>
                            <h1>Зберегти</h1>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalWriteCardWindow;