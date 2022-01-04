import './calendarContent.css';
import './weekDays.css'
import './App.css'
import plus from './images/plus.png';
import ReactDOM from "react-dom";
import React from "react";
import App from "./App";
let kilkist = 5;

function CalendarContent(props) {
    if (kilkist > 5){

    }
    function Task(tasks){
        let a = new Array(tasks.numb);
        a.fill(0);
        return(
            <div className={"dailyTasks, weekday"} id={tasks.id}>
                {
                    a.map(x => <div className="task"></div>)
                }
            </div>
        );
    }


    return (
        <div className="calendarContent">
            <div className="columnName"><h1>Завдання на тиждень</h1></div>
            <div className="tasksBlock">
                <Task numb={kilkist} id={"highest"}/>
                <Task numb={kilkist}/>
                <Task numb={kilkist}/>
                <Task numb={kilkist}/>
                <Task numb={kilkist}/>
                <Task numb={kilkist}/>
                <Task numb={kilkist} id={"lowest"}/>
                <div className="addTask-btn" title='Add new task' onClick={() => {kilkist++; console.log(kilkist); ReactDOM.render(<React.StrictMode><App /></React.StrictMode>, document.getElementById('root'));}}>
                    <img src={plus} alt=""/>
                </div>
            </div>
        </div>
    );
}

export default CalendarContent;
//
// ; ReactDOM.render(<React.StrictMode><App /></React.StrictMode>, document.getElementById('root'));

