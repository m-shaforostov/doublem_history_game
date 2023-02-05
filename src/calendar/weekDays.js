import './weekDays.css'
import '../App.css'
import React, {useState, useEffect} from "react";
import _ from "lodash";

function Weekdays({currentWeekNumb, currentDateState}) {
    let localStorageCellsObject = JSON.parse(window.localStorage.getItem('tasks_object'));


    const oneJan = new Date(currentDateState.getFullYear(),0,1);
    const numberOfDays = Math.floor((currentDateState - oneJan) / (24 * 60 * 60 * 1000));
    const daysArray = ["Неділя", "Понеділок", "Вівторок", "Середа", "Четвер", "П'ятниця", "Субота"]
    const monthsArray = ["Січень", "Лютий", "Березень", "Квітень", "Травень", "Червень", "Липень", "Серпень", "Вересень", "Жовтень", "Листопад", "Грудень"]
    const monthNumb = currentDateState.getMonth();
    const monthName = monthsArray[monthNumb];

    const weekDayNumb = currentDateState.getDay();


    let pureArray = new Array(7);
    pureArray.fill(0);

    return (
        <div className="weekDaysSideBar">
            <div className="weekNumb"><h2>{currentWeekNumb}</h2></div>
            <div className="weekDaysList" id="weekDaysList">
                <div className="monthName"><h1>{monthName}</h1></div>

                {//Створення блоків з назвами днів тиждня.
                    pureArray.map((x, i) => {
                        const givenDay = new Date();
                        console.log("weeknumb", currentWeekNumb, " ", oneJan)
                        const currentDate = new Date(givenDay.setDate(oneJan + (currentWeekNumb * 7 - 8 + i)));
                        console.log("culc", currentDate)
                        const currentDateSliced = currentDate.toLocaleString().slice(0, 10);
                        return (
                            <div className={resolveDayClass(currentWeekNumb, i === weekDayNumb)} id={i===0 ? "highest" : (i===6 ? "lowest" : undefined)}>
                                <h2>{daysArray[i]}</h2>
                                <h5>{currentDateSliced}</h5>
                            </div>
                        )
                    })
                }

            </div>
        </div>
    );

    function resolveDayClass(currentWeekNumb, isToday) {
        const todayWeekNumb = Math.ceil((1 + numberOfDays) / 7); // current week number
        if (todayWeekNumb == currentWeekNumb && isToday) {
            return 'today';
        }

        return 'weekday'
    }
}

export default Weekdays;