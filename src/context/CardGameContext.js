import {createContext, useState} from "react";


export const CardGameContext = createContext({});

export const CardGameContextProvider = ({children}) => {

    const [modalActive, setModalActive] = useState(false);
    const [modalEventText, setModalEventText] = useState("");
    const [modalEventDate, setModalEventDate] = useState("");
    const [modalEventYear, setModalEventYear] = useState(1);
    const [modalEventIndex, setModalEventIndex] = useState(1);
    const [cardsObject, setCardsOdject] = useState({})

    function localStorageCardsSave(value) {
        setCardsOdject(value);
        window.localStorage.setItem('cards_object', JSON.stringify(value));
    }

    const value = {
        modalActive,
        setModalActive,
        modalEventText,
        setModalEventText,
        modalEventDate,
        setModalEventDate,
        modalEventYear,
        setModalEventYear,
        modalEventIndex,
        setModalEventIndex,
        cardsObject,
        setCardsOdject,
        localStorageCardsSave,
    };

    return <CardGameContext.Provider value={value} > {children} </CardGameContext.Provider>
}