import _ from 'lodash';
import {createContext, useState, useEffect} from "react";
import { useEffectOnce } from 'usehooks-ts';
import { useNavigate, useLocation } from "react-router-dom";

export const CardGameContext = createContext({});

export const CardGameContextProvider = ({children}) => {
    let localStorageCardsObject = JSON.parse(window.localStorage.getItem('cards_object'));

    const [modalCardActive, setModalCardActive] = useState(false); // modal window for card creation of editing
    const [selectionTicksOpen, setSelectionTicksOpen] = useState(false); // ticks for selecting cards before the game starts
    // const [selectedCards, setSelectedCards] = useState([]); // an array for already selected cards
    // const [isGameActive, setIsGameActive] = useState(getStateFromLocalStorage()?.isGameActive || false); // if game has started or not
    const [modalCardEventText, setModalCardEventText] = useState(""); // text which was written to the event name field (in the modal window for card creation of editing)
    const [modalCardEventDate, setModalCardEventDate] = useState(""); // text which was written to the event date field (in the modal window for card creation of editing)
    const [modalCardEventYear, setModalCardEventYear] = useState(1); // the year of the event created
    const [modalCardEventIndex, setModalCardEventIndex] = useState(1); // the index in an object which contains all created cards
    const [cardsObject, setCardsObject] = useState(JSON.parse(window.localStorage.getItem('cards_object'))); // an object which contains all created cards
    const [yearTickObject, setYearTickObject] = useState({});
    const [isFlipped, setIsFlipped] = useState(getStateFromLocalStorage()?.isFlipped || false); // is card flipped (for gameCard.js)
    const [immediateFlip, setImmediatelyFlip] = useState(false); // is card flipped (for gameCard.js)

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        let generatedArray = getSelectedCardsArray();
        if (location.pathname !== "/History/Game" && generatedArray){ // check if localStorageSelectedCardsArray isn't empty and path is correct
            clearSelectedTicks();
        }
    }, [location.pathname]);


    function clearSelectedTicks(){ // clears an array of selected cards
        localStorageCardsObject = _.mapValues(localStorageCardsObject, (cards) => {
            return _.map(cards, card => ({ ...card,  tickIsActive: false }));
        });
        setYearTickObject({})
        localStorageCardsSave(localStorageCardsObject);
    }

    function localStorageCardsSave(value) { // save to 'cards_object' local storage
        setCardsObject(value);
        window.localStorage.setItem('cards_object', JSON.stringify(value));
    }


    function saveStateToLocalStorage(isFlipped) {
        const stateObj = JSON.stringify({isFlipped});
        window.localStorage.setItem('state', stateObj);
    }

    function getStateFromLocalStorage() {
        const stateObj = localStorage.getItem('state');
        if (stateObj === null) {
            return undefined;
        }
        return JSON.parse(stateObj);
    }

    useEffect(() => {
        saveStateToLocalStorage(isFlipped);
    }, [isFlipped]);



    function getSelectedCardsArray(){
        let selectedCardsArray = [];
        _.mapValues(localStorageCardsObject, (cards) => {
            cards = _.map(cards, (element, index) => ({
                ...element, id: index, year: element.date.slice(6, 10),
            }))
            selectedCardsArray = selectedCardsArray.concat(cards.filter(i => i.tickIsActive));
        })


        return selectedCardsArray
    }

    function openEmptyCardEditing() { // set some states to default values
        setModalCardEventText("");
        setModalCardEventDate("");
        setModalCardEventYear(0);
        setModalCardActive(true);
    }

    function startTheGame(){ // if the start button has been pushed
        if (!selectionTicksOpen){ // if it was the first push
            appearSelectionTicks();
        }
        else if (_.isEmpty(getSelectedCardsArray())){ // if it was the second start button push, but returned by function array is empty
            // alert("Оберіть хоча б одну карту!")
            setSelectionTicksOpen(false);
        }
        else { // if it was the second one and there were some cards selected

            navigate("/History/Game");
            // setIsGameActive(true);
            setSelectionTicksOpen(false);
            localStorageCardsSave(localStorageCardsObject);
        }

    }

    function appearSelectionTicks(){ // appears ticks for cards selection
        if (cardsObject){
            setSelectionTicksOpen(true); //set true!!!!!
        }
    }

    function selectionTickClick(tickClass, year , i){
        // let selectedCardsCopy = selectedCards;// a copy of state const
        if (!selectionTicksOpen){
            setSelectionTicksOpen(true); // appearance of all selectionTicks if it's needed
        }

        if (tickClass === `individualTick`){
            selectOrUnselectItem(year , i, !localStorageCardsObject[year][i].tickIsActive);
        }
        else if (tickClass === `groupTick`){
            const selectionValue = !yearTickObject[year];
            for (let k=0; k < localStorageCardsObject[year].length; k++){
                selectOrUnselectItem(year , k, selectionValue);// push every selected card to the array
            }
        }
        localStorageCardsSave(localStorageCardsObject); // save "localStorageCardsObject" to a local storage and a "cardsObject" state
    }

    function selectOrUnselectItem(year , k, value) { // save an element to an array
        localStorageCardsObject[year][k].tickIsActive = value;
        if (!value){ //if an element has to be deleted, it will try to hide all ticks
            if (!countAllTicks()){
                setSelectionTicksOpen(false); // disappearance of all selectionTicks if it's needed
            }

            if (!countYearTicks(year)){
                let objectCopy = yearTickObject;
                objectCopy[year] = false;
                setYearTickObject(objectCopy); // deactivate year tick
            }
        }
        else {
            if (countYearTicks(year)){
                let objectCopy = yearTickObject;
                objectCopy[year] = true;
                setYearTickObject(objectCopy); // activate year tick
            }
        }
    }

    function countAllTicks(){
        let selectedCardsArray = []
        _.mapValues(localStorageCardsObject, (cards) => {
            selectedCardsArray = selectedCardsArray.concat(cards.filter(i => i.tickIsActive));
        });
        return selectedCardsArray.length
    }

    function countYearTicks(year){
        let selectedCardsArray = []
        let cardsArray = localStorageCardsObject[year];
        selectedCardsArray = selectedCardsArray.concat(cardsArray.filter(i => i.tickIsActive));
        return selectedCardsArray.length === cardsArray.length //compare number of ticks and number of cards in a year
    }

    const value = {
        modalCardActive,
        setModalCardActive,
        selectionTicksOpen,
        setSelectionTicksOpen,
        modalCardEventText,
        setModalCardEventText,
        modalCardEventDate,
        setModalCardEventDate,
        modalCardEventYear,
        setModalCardEventYear,
        modalCardEventIndex,
        setModalCardEventIndex,
        cardsObject,
        setCardsObject,
        yearTickObject,
        setYearTickObject,
        isFlipped,
        setIsFlipped,
        immediateFlip,
        setImmediatelyFlip,
        localStorageCardsSave,
        openEmptyCardEditing,
        startTheGame,
        appearSelectionTicks,
        selectionTickClick,
        clearSelectedTicks,
        getSelectedCardsArray,
    };

    return <CardGameContext.Provider value={value} > {children} </CardGameContext.Provider>
}