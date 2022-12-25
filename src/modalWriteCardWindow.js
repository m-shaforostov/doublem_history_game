import './modalWriteCardWindow.css'
import './App.css'
import React, { useContext, useEffect, useState } from "react";
import _ from "lodash";
import {CardGameContext} from "./context/CardGameContext";

// {, setActive, x, y, weekNumb, cellsObject, funcSetCellText, funcSetCellValitidy} // 7

function ModalWriteCardWindow({}) {
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


    // const [textEvent, setTextEvent] = useState("");
    // const [textDate, setTextDate] = useState("");
    //
    // useEffect(() => {
    //     setTextEvent(modalEventText);
    //     setTextDate(modalEventDate);
    // }, [])

    const {modalCardActive, setModalCardActive,
        modalCardEventText, setModalCardEventText,
        modalCardEventDate, setModalCardEventDate,
        modalCardEventYear, setModalCardEventYear,
        modalCardEventIndex, setModalCardEventIndex,
        localStorageCardsSave, } = useContext(CardGameContext);

    const [ errorTextLabel, setErrorTextLabel ] = useState("errorLabelOff");
    const [ errorDateLabel, setErrorDateLabel ] = useState("errorLabelOff");

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

    function checkModalActive() {
        console.log(modalCardActive)
        if (modalCardActive === true){
            alert('enter press here! ')
            submitCardText();
        }
    }

    function changeFieldTextEvent(event) {
        setModalCardEventText(event.target.value);
    }

    function changeFieldTextDate(event) {
        setModalCardEventDate(event.target.value);
    }

    function saveCardText(){
        const year = modalCardEventDate.slice(-4);
        if (modalCardEventYear){ //if user creates a new card

        }

        let index;
        if (!localStorageCardsObject){
            localStorageCardsObject = {};
            localStorageCardsObject[year] = [];
        }
        else if (!localStorageCardsObject[year]){
            localStorageCardsObject[year] = [];
        }
        index = localStorageCardsObject[year].length;
        localStorageCardsObject[year][index] = {};
        localStorageCardsObject[year][index].event = modalCardEventText;
        localStorageCardsObject[year][index].date = modalCardEventDate;

        // else if (modalCardEventYear == year){//if user opens a card and saves it without changing its year
        //     console.log(modalCardEventYear, year)
        //     localStorageCardsObject[modalCardEventYear][modalCardEventIndex].event = modalCardEventText;
        //     localStorageCardsObject[modalCardEventYear][modalCardEventIndex].date = modalCardEventDate;
        // }
        // else {//if user opens a card and changes its year
        //     localStorageCardsObject[modalCardEventYear][modalCardEventIndex].event = modalCardEventText;
        //     localStorageCardsObject[modalCardEventYear][modalCardEventIndex].date = modalCardEventDate;
        // }
        localStorageCardsSave(localStorageCardsObject);
        setModalCardActive(false);
    }

    function cancelEditing() {
        setErrorDateLabel("errorLabelOff");
        setErrorTextLabel("errorLabelOff");
        setModalCardActive(false);
    }

    function submitCardText(){
        const a = checkCardTextCorrectness(modalCardEventText);
        const b = checkCardDateCorrectness(modalCardEventDate);
        if (a && b){
            saveCardText();
            cancelEditing();
        }
        else {
            if (!a) {
                replayAnimation(setErrorTextLabel);
            }
            else {
                setErrorTextLabel("errorLabelOff");
            }

            if (!b) {
                replayAnimation(setErrorDateLabel);
            }
            else {
                setErrorDateLabel("errorLabelOff");
            }
        }
    }

    function replayAnimation(func){
        func("errorLabelOn");
        setTimeout(function(){
            func("errorLabelOn animation");
        },10);
    }

    function checkCardDateCorrectness(string){
        const regexDate = /^([0-9]{2}\.)?([0-9]{2}\.)?[0-9]{4} ?$/;
        const regexDate1 = /.+/;
        return string.match(regexDate);
    }

    function checkCardTextCorrectness(string){
        const regexText = /.+/;
        return string.match(regexText);
    }

    return (
        modalCardActive &&
        <div className="modalCardOverlay" id="menu" onClick={() => {cancelEditing()}}>
            <div className="modalCardContent" onClick={(event) => {event.stopPropagation()}}>
                <div className="cardHeader">
                    <h1>Заповніть нову картку</h1>
                </div>
                <div className="cardBody">
                    <form action="">
                        <label htmlFor="getEvent">Подія:</label>
                        <input className="cardEnter" id="getEvent" value={modalCardEventText} autoComplete={"off"} onChange={changeFieldTextEvent}  type="text" placeholder="День народження Адміна" />
                        <label htmlFor="getEvent" className={errorTextLabel}>*Поле має містити текст*</label>
                    </form>
                    <form action="">
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