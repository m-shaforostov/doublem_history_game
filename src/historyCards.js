import './App.css';
import './historyCards.css';
import React, {useEffect, useState} from "react";
import HistoryYearBlock from "./historyYearBlock";
import ModalWriteCardWindow from "./modalWriteCardWindow";
import NoCardsExist from "./noCardsExist";

function HistoryCards() {
    let localStorageCardsObject = JSON.parse(window.localStorage.getItem('cards_object'));

    const [modalActive, setModalActive] = useState(false);
    const [modalEventText, setModalEventText] = useState("");
    const [modalEventDate, setModalEventDate] = useState("");
    const [modalEventYear, setModalEventYear] = useState(1);
    const [modalEventIndex, setModalEventIndex] = useState(1);

    useEffect(() => {
        localStorageCardsSave(cardsOdj);
    }, [])

    const cardsOdj = {
        1939: [{
            event: "Пакт Молотова-Ріббентропа",
            date: "23 серпня 1939р",
        }]
    };

    const [cardsObject, setCardsOdject] = useState({})

    function localStorageCardsSave(value) {
        setCardsOdject(value);
        window.localStorage.setItem('cards_object', JSON.stringify(value));
    }

    // localStorageCardsSave(cardsOdj);

    return (
        <div className={localStorageCardsObject ? "cardTable" : "noData cardTable"}>
            <ModalWriteCardWindow modalActive={modalActive} setModalActive={setModalActive} modalEventText={modalEventText} setModalEventText={setModalEventText} modalEventDate={modalEventDate} setModalEventDate={setModalEventDate} localStorageCardsSave={localStorageCardsSave} modalEventYear={modalEventYear} setModalEventYear={setModalEventYear} modalEventIndex={modalEventIndex} setModalEventIndex={setModalEventIndex}/>
            {
                localStorageCardsObject ? <HistoryYearBlock modalActive={modalActive} setModalActive={setModalActive} modalEventText={modalEventText} setModalEventText={setModalEventText} modalEventDate={modalEventDate} setModalEventDate={setModalEventDate} year={1939} cardsOdj={cardsOdj} localStorageCardsSave={localStorageCardsSave} modalEventYear={modalEventYear} setModalEventYear={setModalEventYear} modalEventIndex={modalEventIndex} setModalEventIndex={setModalEventIndex} /> : <NoCardsExist/>



            }
        </div>
    );
}

export default HistoryCards;
