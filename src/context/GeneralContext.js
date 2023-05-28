import {createContext, useState} from "react";

export const GeneralContext = createContext({});

export const GeneralContextProvider = ({children}) => {

    const [modalMenuActive, setModalMenuActive] = useState(false);

    // function localStorageCardsSave(value) {
    //     setCardsOdject(value);
    //     window.localStorage.setItem('cards_object', JSON.stringify(value));
    // }

    function preventLinkChange (e) {
        e.preventDefault()
    }

    const value = {
        modalMenuActive,
        setModalMenuActive,
        preventLinkChange,
    };

    return <GeneralContext.Provider value={value} > {children} </GeneralContext.Provider>
}