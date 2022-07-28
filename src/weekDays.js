import './weekDays.css'
import './App.css'
import React, {useState, useEffect} from "react";

function Weekdays({weekNumb}) {
    const [currentDateState, setCurrentDateState] = useState(new Date());


    useEffect(() => {
        const intervalId = setInterval(() => {  //assign interval to a variable to clear it.
            setCurrentDateState(new Date());
        }, 60000)

        return () => clearInterval(intervalId); //This is important

    }, [])

    const oneJan = new Date(currentDateState.getFullYear(),0,1);
    const numberOfDays = Math.floor((currentDateState - oneJan) / (24 * 60 * 60 * 1000));
    const result = Math.ceil(( currentDateState.getDay() + 1 + numberOfDays) / 7);

    const daysArray = ["Неділя", "Понеділок", "Вівторок", "Середа", "Четвер", "П'ятниця", "Субота"]
    const monthsArray = ["Січень", "Лютий", "Березень", "Квітень", "Травень", "Червень", "Липень", "Серпень", "Вересень", "Жовтень", "Листопад", "Грудень"]
    const monthNumb = currentDateState.getMonth();
    const monthName = monthsArray[monthNumb];

    const weekDayNumb = currentDateState.getDay();

    let pureArray = new Array(7);
    pureArray.fill(0);

    return (
        <div className="weekDaysSideBar">
            <div className="weekNumb"><h2>{result}</h2></div>
            <div className="weekDaysList" id="weekDaysList">
                <div className="monthName"><h1>{monthName}</h1></div>

                {//Створення блоків з назвами днів тиждня.
                    pureArray.map((x, i) =>
                        <div className={i === weekDayNumb ? "today" : "weekday"} id={i===0 ? "highest" : (i===6 ? "lowest" : undefined)}>
                            <h2>{daysArray[i]}</h2>
                        </div>
                    )
                }

            </div>
        </div>
    );
}

export default Weekdays;