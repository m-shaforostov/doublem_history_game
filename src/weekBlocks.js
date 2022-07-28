import './weekBlocks.css';
import './App.css';
import Weekdays from "./weekDays";
import CalendarContent from "./calendarContent";
import trashButton from "./images/trash-can-icon-png.jpg";
import React, {useState} from "react";

function WeekBlocks() {
    let localStorageCellsObject = JSON.parse(window.localStorage.getItem('tasks_object'));

    const [cellsObject, setCellsObject] = useState(localStorageCellsObject);
    const [currentDateState, setCurrentDateState] = useState(new Date());

    const oneJan = new Date(currentDateState.getFullYear(),0,1);
    const numberOfDays = Math.floor((currentDateState - oneJan) / (24 * 60 * 60 * 1000));
    const weekNumb = Math.ceil(( currentDateState.getDay() + 1 + numberOfDays) / 7);

    if (!localStorageCellsObject) {
        localStorageCellsObject = {};
        window.localStorage.setItem('tasks_object', JSON.stringify(localStorageCellsObject));
        setCellsObject(localStorageCellsObject);
    }


    return (
        <div className="weeksWraper">
            {
                Object.keys(localStorageCellsObject).map((x, i) => //[x]
                    <div className="weekBlock" >
                        <Weekdays weekNumb={x}/>
                        <CalendarContent cellsObject={cellsObject} setCellsObject={setCellsObject} localStorageCellsObject={localStorageCellsObject}/>
                    </div>
                )
            }

        </div>
    )
}

export default WeekBlocks;