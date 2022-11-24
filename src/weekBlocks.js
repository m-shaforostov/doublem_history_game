import './weekBlocks.css';
import './App.css';
import Weekdays from "./weekDays";
import CalendarContent from "./calendarContent";
import React, {useState, useEffect} from "react";
import plus from "./images/plus.png";
import _ from "lodash";

function WeekBlocks() {
    let localStorageCellsCheck = JSON.parse(window.localStorage.getItem('tasks_object'));
    let localStorageCellsObject = undefined;

    const [cellsObject, setCellsObject] = useState(localStorageCellsCheck);
    const [currentDateState, setCurrentDateState] = useState(new Date());
    console.log(localStorageCellsCheck)

    useEffect(() => {
        const intervalId = setInterval(() => {  //assign interval to a variable to clear it.
            createCurrentWeekData(weekNumb);
            setCurrentDateState(new Date());
        }, 6000)

        return () => clearInterval(intervalId); //This is important

    }, [])

    const oneJan = new Date(currentDateState.getFullYear(),0,1);
    const numberOfDays = Math.floor((currentDateState - oneJan) / (24 * 60 * 60 * 1000)); // from 01.01 till now
    const weekNumb = Math.ceil((1 + numberOfDays) / 7); // current week number



    function localStorageCellsSave(value) {
        setCellsObject(value);
        window.localStorage.setItem('tasks_object', JSON.stringify(value));
    }


    function createCurrentWeekData(numberOfWeek) {
        if (!localStorageCellsCheck) {
            let localStorageCellsCheck = {};
            console.log(weekNumb)
            localStorageCellsCheck[numberOfWeek] = {};
            localStorageCellsSave(localStorageCellsCheck);
        }
        else if (!localStorageCellsCheck[numberOfWeek]) {
            localStorageCellsCheck[numberOfWeek] = {};
            localStorageCellsSave(localStorageCellsCheck);
        }
        localStorageCellsObject = JSON.parse(window.localStorage.getItem('tasks_object'));
    }




    return (
        <div className="weeksWraper">
            {
                localStorageCellsObject &&
                Object.keys(localStorageCellsObject).map((x, i) => //[x]
                    <div className="weekBlock" >
                        <Weekdays currentWeekNumb={x} currentDateState={currentDateState}/>
                        <CalendarContent cellsObject={cellsObject} setCellsObject={setCellsObject} localStorageCellsObject={localStorageCellsObject} weekNumb={x} localStorageCellsSave={localStorageCellsSave}/>
                    </div>
                )
            }
            <div className="addWeek-block">
                <div className="addWeek-btn" title='Add new week' ><img src={plus} alt=""/></div>
            </div>
        </div>
    )
}

export default WeekBlocks;