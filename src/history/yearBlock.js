import '../App.css';
import './yearBlock.css';
import selectionTick from "../images/tick-icon.png";
import trashIcon from "../images/trash-can-icon-png.jpg";
import React, { useContext } from "react";
import {CardGameContext} from "../context/CardGameContext";
import {useEffectOnce} from "usehooks-ts";

function YearBlock({ year }) {
    let localStorageCardsObject = JSON.parse(window.localStorage.getItem('cards_object'));
    let localStorageSelectedCardsArray = JSON.parse(window.localStorage.getItem('selected_cards_array'));

    const {modalCardActive, setModalCardActive,
        selectionTicksOpen, setSelectionTicksOpen,
        modalCardEventText, setModalCardEventText,
        modalCardEventDate, setModalCardEventDate,
        modalCardEventYear, setModalCardEventYear,
        modalCardEventIndex, setModalCardEventIndex,
        yearTickObject, setYearTickObject,
        selectionTickClick, clearSelectedTicks,
        localStorageCardsSave, } = useContext(CardGameContext);



    useEffectOnce(() => {
        if (localStorageSelectedCardsArray?.[0]){ // check if localStorageSelectedCardsArray isn't empty
            clearSelectedTicks();
        }
    })

    async function openCardEditing(i) {
        setModalCardEventText(localStorageCardsObject[year][i].event);
        setModalCardEventDate(localStorageCardsObject[year][i].date);
        setModalCardEventYear(year);
        setModalCardEventIndex(i);
        setModalCardActive(true);
    }

    function deleteCard(year, i) {
        if(localStorageCardsObject[year].length === 1){
            delete localStorageCardsObject[year];
        }
        else {
            localStorageCardsObject[year].splice(i,1);
        }
        localStorageCardsSave(localStorageCardsObject)
    }


    let buttonPressTimer;
    function buttonPressStart(year, i) {
        buttonPressTimer = setTimeout(() => {
            selectionTickClick(`individualTick`, year, i)
        }, 500);
    }

    function buttonPressEnd() {
        clearTimeout(buttonPressTimer);
    }

    return (
        <div className="specialYear">
            <div className="yearEmblem">
                <img src={selectionTick} alt="" className={`tickIcon groupTick ${yearTickObject[year] ? "" : "offTick"} ${selectionTicksOpen ? "shown" : ""}`} onClick={() => {selectionTickClick(`groupTick`, year,0)}} /> {/*show color under another circumstance*/}
                <h1>{year}</h1>
            </div>
            <div className="collectionContainer" >
                <div className="cardsCollection">
                    {
                        localStorageCardsObject &&
                        Object.keys(localStorageCardsObject[year]).map((x, i) => {//[x]
                            return (
                                <div className={`inventoryCard`}
                                     onClick={() => {openCardEditing(i)}}
                                     onTouchStart={() => {buttonPressStart(year, i)}}
                                     onTouchEnd={buttonPressEnd}
                                     onTouchMove={buttonPressEnd}>
                                    <img src={selectionTick}  className={`tickIcon individualTick ${localStorageCardsObject[year][i].tickIsActive ? "" : "offTick"} ${selectionTicksOpen ? "shown" : ""}`} onClick={(event) => {event.stopPropagation(); selectionTickClick(`individualTick`, year, i)}} />
                                    <img src={trashIcon}  className={`individualTrash`} onClick={(event) => {event.stopPropagation(); deleteCard(year, i)}} />
                                    <p>{localStorageCardsObject[year][i].event}</p>
                                    <b><p>{localStorageCardsObject[year][i].date}</p></b>
                                </div>
                            )})
                    }
                </div>
            </div>

        </div>
    );
}

export default YearBlock;