import './modalWriteCardWindow.css'
import './App.css'
import React, { useContext, useEffect, useState } from "react";
import _ from "lodash";
import {CardGameContext} from "./context/CardGameContext";

// {, setActive, x, y, weekNumb, cellsObject, funcSetCellText, funcSetCellValitidy} // 7

function ModalWriteCardWindow({ localStorageCardsSave, }) {
    // let taskText = document.getElementsByClassName("taskEnter");
    // const cellText = cellsObject[weekNumb][y].text[x];
    // const cellValidity = cellsObject[weekNumb][y].validity[x];
    //
    // const [text, setText] = useState(cellText);
    //
    // const validityButtonClass = !cellValidity ? "startedTask" : "endedTask";
    // const validityButtonTextName = !cellValidity ? "Завершити" : "Повернути";
    //
    // function changeFieldText(event) {
    //     setText(event.target.value);
    // }
    // useEffect(() => {
    //     const textarea = document.querySelector("textarea");
    //     textarea.focus();
    // })

    const {modalActive, setModalActive,
        modalEventText, setModalEventText,
        modalEventDate, setModalEventDate,
        modalEventYear, setModalEventYear,
        modalEventIndex, setModalEventIndex,} = useContext(CardGameContext);



    const handleKeyPress = (event) => {
        if(event.charCode === 27){
            alert('enter press here! ')
        }
    }

    // const [textEvent, setTextEvent] = useState("");
    // const [textDate, setTextDate] = useState("");
    //
    // useEffect(() => {
    //     setTextEvent(modalEventText);
    //     setTextDate(modalEventDate);
    // }, [])
    let localStorageCardsObject = JSON.parse(window.localStorage.getItem('cards_object'));

    function changeFieldTextEvent(event) {
        setModalEventText(event.target.value);
    }

    function changeFieldTextDate(event) {
        setModalEventDate(event.target.value);
    }

    function submitCardText(){
        localStorageCardsObject[modalEventYear][modalEventIndex].event = modalEventText;
        localStorageCardsObject[modalEventYear][modalEventIndex].date = modalEventDate;
        localStorageCardsSave(localStorageCardsObject);
    }

    return (
        modalActive &&
        <div className="modalCardOverlay" id="menu" onClick={() => {setModalActive(false)}}>
            {/*onClick={() => {setActive(false)}}*/}
            <div className="modalCardContent" onKeyPress={handleKeyPress} onClick={(event) => {event.stopPropagation()}}>
                <div className="cardHeader">
                    <h1>Заповніть нову картку</h1>
                </div>
                <div className="cardBody">
                    <form action="">
                        <label htmlFor="getEvent">Подія:</label>
                        <input className="cardEnter" id="getEvent" value={modalEventText} autoComplete={"off"} onChange={changeFieldTextEvent}  type="text" placeholder="День народження Адміна" />
                    </form>
                    <form action="">
                        <label htmlFor="getDate">Дата:</label>
                        <input className="cardEnter" id="getDate" value={modalEventDate} onChange={changeFieldTextDate}  type="text" placeholder="27.10.2005"/>
                    </form>
                </div>
                <div className="cardFooter">
                    <div className="leftButton">
                        <button className="cancel" onClick={() => {setModalActive(false)}}>
                            <h1>Відмінити</h1>
                        </button>
                    </div>
                    <div className="rightButton">
                        <button className="save" onClick={() => {setModalActive(false); submitCardText()}}>
                            <h1>Зберегти</h1>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalWriteCardWindow;