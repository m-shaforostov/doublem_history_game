import {createContext, useState} from "react";


export const CardGameContext = createContext({});

export const CardGameContextProvider = ({children}) => {

    const [modalCardActive, setModalCardActive] = useState(false);
    const [selectionTicksActive, setSelectionTicksActive] = useState(false);
    const [modalCardEventText, setModalCardEventText] = useState("");
    const [modalCardEventDate, setModalCardEventDate] = useState("");
    const [modalCardEventYear, setModalCardEventYear] = useState(1);
    const [modalCardEventIndex, setModalCardEventIndex] = useState(1);
    const [cardsObject, setCardsOdject] = useState({})

    function localStorageCardsSave(value) {
        setCardsOdject(value);
        window.localStorage.setItem('cards_object', JSON.stringify(value));
    }

    function openEmptyCardEditing() {
        setModalCardEventText("");
        setModalCardEventDate("");
        setModalCardEventYear(0);
        setModalCardActive(true);
    }

    const value = {
        modalCardActive,
        setModalCardActive,
        selectionTicksActive,
        setSelectionTicksActive,
        modalCardEventText,
        setModalCardEventText,
        modalCardEventDate,
        setModalCardEventDate,
        modalCardEventYear,
        setModalCardEventYear,
        modalCardEventIndex,
        setModalCardEventIndex,
        cardsObject,
        setCardsOdject,
        localStorageCardsSave,
        openEmptyCardEditing,
    };

    return <CardGameContext.Provider value={value} > {children} </CardGameContext.Provider>
}