import {createContext, useState} from "react";


export const CardGameContext = createContext({});

export const CardGameContextProvider = ({children}) => {
    const [user, setUser] = useState(null);

    const [modalActive, setModalActive] = useState(false);
    const [modalEventText, setModalEventText] = useState("");
    const [modalEventDate, setModalEventDate] = useState("");
    const [modalEventYear, setModalEventYear] = useState(1);
    const [modalEventIndex, setModalEventIndex] = useState(1);
    const [cardsObject, setCardsOdject] = useState({})

    const updateUserName = (name) => {
        setUser(prevState => {
            return {...prevState, name};
        })
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
    };

    return <CardGameContext.Provider value={value} > {children} </CardGameContext.Provider>
}