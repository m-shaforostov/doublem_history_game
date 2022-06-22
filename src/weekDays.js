import './weekDays.css'
import './App.css'

function Weekdays() {
    const currentDate = new Date();
    const oneJan = new Date(currentDate.getFullYear(),0,1);
    const numberOfDays = Math.floor((currentDate - oneJan) / (24 * 60 * 60 * 1000));
    const result = Math.ceil(( currentDate.getDay() + 1 + numberOfDays) / 7);

    const daysArray = ["Понеділок", "Вівторок", "Середа", "Четвер", "П'ятниця", "Субота", "Неділя"]
    const monthsArray = ["Січень", "Лютий", "Березень", "Квітень", "Травень", "Червень", "Липень", "Серпень", "Вересень", "Жовтень", "Листопад", "Грудень"]
    const monthNumb = currentDate.getMonth();
    const monthName = monthsArray[monthNumb];

    const weekDayNumb = currentDate.getDay() === 0 ? 7 : currentDate.getDay();

    let clearArray = new Array(7);
    clearArray.fill(0);

    return (
        <div className="weekDaysSideBar">
            <div className="weekNumb"><h2>{result}</h2></div>
            <div className="weekDaysList" id="weekDaysList">
                <div className="monthName"><h1>{monthName}</h1></div>

                {//Створення блоків з назвами днів тиждня.
                    clearArray.map((x, i) =>
                        <div className={i+1 === weekDayNumb ? "today" : "weekday"} id={i===0 ? "highest" : (i===6 ? "lowest" : undefined)}>
                            <h2>{daysArray[i]}</h2>
                        </div>
                    )
                }

            </div>
        </div>
    );
}

export default Weekdays;