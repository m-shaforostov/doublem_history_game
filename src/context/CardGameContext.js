import {createContext, useState, useEffect} from "react";
import { useEffectOnce } from 'usehooks-ts'


export const CardGameContext = createContext({});

export const CardGameContextProvider = ({children}) => {

    const [modalCardActive, setModalCardActive] = useState(false);
    const [selectionTicksOpen, setSelectionTicksOpen] = useState(false);
    const [selectedCards, setSelectedCards] = useState([]);
    const [modalCardEventText, setModalCardEventText] = useState("");
    const [modalCardEventDate, setModalCardEventDate] = useState("");
    const [modalCardEventYear, setModalCardEventYear] = useState(1);
    const [modalCardEventIndex, setModalCardEventIndex] = useState(1);
    const [cardsObject, setCardsOdject] = useState(                                                                                                                                                                                                                                                                                                                                                                                                                                 {})

    let localStorageCardsObject = JSON.parse(window.localStorage.getItem('cards_object'));
    let localStorageSelectedCardsArray = JSON.parse(window.localStorage.getItem('selected_cards_array'));

    useEffectOnce(() => {
        if (localStorageSelectedCardsArray?.[0]){ // check if localStorageSelectedCardsArray isn't empty
            for (let k=0; k < localStorageSelectedCardsArray.length; k++){ // clear ticks selection
                let year = localStorageSelectedCardsArray[k].year;
                let id = localStorageSelectedCardsArray[k].id
                localStorageCardsObject[year][id].tickIsActive = false; // remove selection of every tick
            }
            localStorageSelectedCardsArray = []; // clear all array of selections
            localStorageSelectedCardsSave(localStorageSelectedCardsArray); // save to localStorage
            localStorageCardsSave(localStorageCardsObject);
        }
    })



    function localStorageCardsSave(value) {
        setCardsOdject(value);
        window.localStorage.setItem('cards_object', JSON.stringify(value));
    }

    function localStorageSelectedCardsSave(value){
        setCardsOdject(value);
        window.localStorage.setItem('selected_cards_array', JSON.stringify(value));
    }

    function openEmptyCardEditing() {
        setModalCardEventText("");
        setModalCardEventDate("");
        setModalCardEventYear(0);
        setModalCardActive(true);
    }

    function appearSelectionTicks(){
        if (cardsObject){
            const a = selectionTicksOpen;
            setSelectionTicksOpen(!a);//set true!!!!!
        }
    }

    function selectionTickActivation(imgClass, year , i){
        let selectedCardsCopy = selectedCards;// a copy of state const
        if (!selectionTicksOpen){
            setSelectionTicksOpen(true); // appearance of all selectionTicks if it's needed
        }

        if (imgClass === `individualTick`){
            let index = selectedCardsCopy.length; // number of elements in array, that equals to index of new element in selectedCards array
            selectedCardsCopy[index] = {
                year: year,
                id: i,
                link: localStorageCardsObject[year][i],  // a link to a card in localStorage object to easy change of tickIsActive value
            }
            selectedCardsCopy[index].link.tickIsActive = true;// that easy change of tickIsActive value
            localStorageSelectedCardsSave(selectedCardsCopy);
            localStorageCardsSave(localStorageCardsObject);
        }
        else if (imgClass === `groupTick`){
            let index = selectedCardsCopy.length;
            for (let k=0; k < localStorageCardsObject[year].length; k++){
                selectedCardsCopy[index + k] = {
                    year: year,
                    id: k,
                    link: localStorageCardsObject[year][k],  // a link to a card in localStorage object to easy change of tickIsActive value
                }
                selectedCardsCopy[index + k].link.tickIsActive = true;// that easy change of tickIsActive value
            }
            localStorageSelectedCardsSave(selectedCardsCopy);
            localStorageCardsSave(localStorageCardsObject);
        }
    }



    // {"1938":[{"event":"sda","date":"27.08.1938"}],"1939":[{"event":"sadasd","date":"23.08.1939"},{"event":"asdasd","date":"22.08.1939"},{"event":"sadads","date":"24.08.1939"}],"2005":[{"event":"Maxim","date":"27.10.2005"}]}

    const value = {
        modalCardActive,
        setModalCardActive,
        selectionTicksOpen,
        setSelectionTicksOpen,
        selectedCards,
        setSelectedCards,
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
        appearSelectionTicks,
        selectionTickActivation,
    };

    return <CardGameContext.Provider value={value} > {children} </CardGameContext.Provider>
}