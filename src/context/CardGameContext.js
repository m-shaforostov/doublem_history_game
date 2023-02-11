import {createContext, useState, useEffect} from "react";
import { useEffectOnce } from 'usehooks-ts';
import { useNavigate } from "react-router-dom";

export const CardGameContext = createContext({});

export const CardGameContextProvider = ({children}) => {

    const [modalCardActive, setModalCardActive] = useState(false); // modal window for card creation of editing
    const [selectionTicksOpen, setSelectionTicksOpen] = useState(false); // ticks for selecting cards before the game starts
    const [selectedCards, setSelectedCards] = useState([]); // an array for already selected cards
    const [modalCardEventText, setModalCardEventText] = useState(""); // text which was written to the event name field (in the modal window for card creation of editing)
    const [modalCardEventDate, setModalCardEventDate] = useState(""); // text which was written to the event date field (in the modal window for card creation of editing)
    const [modalCardEventYear, setModalCardEventYear] = useState(1); // the year of the event created
    const [modalCardEventIndex, setModalCardEventIndex] = useState(1); // the index in an object which contains all created cards
    const [cardsObject, setCardsOdject] = useState({}); // an object which contains all created cards

    const navigate = useNavigate();
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

    function startTheGame(){
        if (!selectionTicksOpen){
            appearSelectionTicks();
        }
        else if (!selectedCards?.[0]){
            alert("Оберіть хоча б одну карту!")
        }
        else {
            navigate("/History/Game");
        }

    }

    function appearSelectionTicks(){
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

    function pushSelectedElementToAnArray(selectedCardsCopy, i, year , k) {
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
        startTheGame,
        appearSelectionTicks,
        selectionTickClick,
    };

    return <CardGameContext.Provider value={value} > {children} </CardGameContext.Provider>
}