import {createContext, useState, useEffect} from "react";
import { useEffectOnce } from 'usehooks-ts';
import { useNavigate } from "react-router-dom";

export const CardGameContext = createContext({});

export const CardGameContextProvider = ({children}) => {

    const [modalCardActive, setModalCardActive] = useState(false); // modal window for card creation of editing
    const [selectionTicksOpen, setSelectionTicksOpen] = useState(false); // ticks for selecting cards before the game starts
    const [selectedCards, setSelectedCards] = useState([]); // an array for already selected cards
    const [isGameActive, setIsGameActive] = useState(false); // if game has started or not
    const [modalCardEventText, setModalCardEventText] = useState(""); // text which was written to the event name field (in the modal window for card creation of editing)
    const [modalCardEventDate, setModalCardEventDate] = useState(""); // text which was written to the event date field (in the modal window for card creation of editing)
    const [modalCardEventYear, setModalCardEventYear] = useState(1); // the year of the event created
    const [modalCardEventIndex, setModalCardEventIndex] = useState(1); // the index in an object which contains all created cards
    const [cardsObject, setCardsOdject] = useState({}); // an object which contains all created cards

    const navigate = useNavigate();
    let localStorageCardsObject = JSON.parse(window.localStorage.getItem('cards_object'));
    let localStorageSelectedCardsArray = JSON.parse(window.localStorage.getItem('selected_cards_array'));

    // useEffectOnce(() => {
    //     if (!isGameActive && localStorageSelectedCardsArray?.[0]){ // check if localStorageSelectedCardsArray isn't empty
    //         clearSelectedTicks();
    //         localStorageSelectedCardsArray = []; // clear all array of selections
    //         localStorageSelectedCardsSave(localStorageSelectedCardsArray); // save to localStorage
    //         localStorageCardsSave(localStorageCardsObject);
    //     }
    // })

    function clearSelectedTicks(){ // clears an array of selected cards
        for (let k=0; k < localStorageSelectedCardsArray.length; k++){ // clear ticks selection
            let year = localStorageSelectedCardsArray[k].year;
            let id = localStorageSelectedCardsArray[k].id
            localStorageCardsObject[year][id].tickIsActive = false; // remove selection of every tick
        }
        localStorageSelectedCardsArray = []; // clear all array of selections
        localStorageSelectedCardsSave(localStorageSelectedCardsArray); // save to localStorage
        localStorageCardsSave(localStorageCardsObject);
    }

    function localStorageCardsSave(value) { // save to 'cards_object' local storage
        setCardsOdject(value);
        window.localStorage.setItem('cards_object', JSON.stringify(value));
    }

    function localStorageSelectedCardsSave(value){ // save to 'selected_cards_array' local storage
        setCardsOdject(value);
        window.localStorage.setItem('selected_cards_array', JSON.stringify(value));
    }

    function openEmptyCardEditing() { // set some states to default values
        setModalCardEventText("");
        setModalCardEventDate("");
        setModalCardEventYear(0);
        setModalCardActive(true);
    }

    function startTheGame(){ // if the start button has been pushed
        if (!selectionTicksOpen){ // if it was the first push
            setSelectedCards([]);
            appearSelectionTicks();
        }
        else if (!selectedCards?.[0]){ // if it was the second one and there were no cards selected
            alert("Оберіть хоча б одну карту!")
        }
        else { // if it was the second one and there were some cards selected
            navigate("/History/Game");
            setIsGameActive(true);
            setSelectionTicksOpen(false);
            localStorageSelectedCardsSave(localStorageSelectedCardsArray); // save to localStorage
            localStorageCardsSave(localStorageCardsObject);
        }

    }

    function appearSelectionTicks(){ // appears ticks for cards selection
        if (cardsObject){
            setSelectionTicksOpen(true); //set true!!!!!
        }
    }

    function selectionTickClick(imgClass, year , i){
        let selectedCardsCopy = selectedCards;// a copy of state const
        let index = selectedCardsCopy.length; // number of elements in array, that equals to index of new element in selectedCards array
        if (!selectionTicksOpen){
            setSelectionTicksOpen(true); // appearance of all selectionTicks if it's needed
        }

        if (imgClass === `individualTick`){
            pushSelectedElementToAnArray(selectedCardsCopy, index, year , i); // push selected card to the array
            localStorageSelectedCardsSave(selectedCardsCopy); // save "selectedCardsCopy" to a local storage and a "selectedCards" state
            localStorageCardsSave(localStorageCardsObject); // save "localStorageCardsObject" to a local storage and a "cardsObject" state
        }
        else if (imgClass === `groupTick`){
            for (let k=0; k < localStorageCardsObject[year].length; k++){
                pushSelectedElementToAnArray(selectedCardsCopy, index + k, year , k); // push every selected card to the array
            }
            localStorageSelectedCardsSave(selectedCardsCopy); // save "selectedCardsCopy" to a local storage and a "selectedCards" state
            localStorageCardsSave(localStorageCardsObject); // save "localStorageCardsObject" to a local storage and a "cardsObject" state
        }
    }

    function pushSelectedElementToAnArray(selectedCardsCopy, i, year , k) { // save an element to an array
        selectedCardsCopy[i] = {
            year: year,
            id: k,
            link: localStorageCardsObject[year][k],  // a link to a card in localStorage object to easy change of tickIsActive value
        }
        selectedCardsCopy[i].link.tickIsActive = true;// that easy change of tickIsActive value
    }



    // {"1938":[{"event":"sda","date":"27.08.1938"}],"1939":[{"event":"sadasd","date":"23.08.1939"},{"event":"asdasd","date":"22.08.1939"},{"event":"sadads","date":"24.08.1939"}],"2005":[{"event":"Maxim","date":"27.10.2005"}]}

    const value = {
        modalCardActive,
        setModalCardActive,
        selectionTicksOpen,
        setSelectionTicksOpen,
        selectedCards,
        setSelectedCards,
        isGameActive,
        setIsGameActive,
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
        localStorageSelectedCardsSave,
        openEmptyCardEditing,
        startTheGame,
        appearSelectionTicks,
        selectionTickClick,
        clearSelectedTicks,
    };

    return <CardGameContext.Provider value={value} > {children} </CardGameContext.Provider>
}