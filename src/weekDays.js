import './weekDays.css'
import './App.css'

function Weekdays() {
    return (
        <div className="weekDaysSideBar">
            <div className="weekNumb"><h2>04</h2></div>
            <div className="weekDaysList">
                <div className="monthName"><h1>Січень</h1></div>
                <div className="weekday" id="highest"><h2>Понеділок</h2></div>
                <div className="weekday"><h2>Вівторок</h2></div>
                <div className="weekday"><h2>Середа</h2></div>
                <div className="weekday"><h2>Четвер</h2></div>
                <div className="weekday"><h2>П'ятниця</h2></div>
                <div className="weekday"><h2>Субота</h2></div>
                <div className="weekday" id="lowest"><h2>Неділя</h2></div>
            </div>
        </div>
    );
}

export default Weekdays;