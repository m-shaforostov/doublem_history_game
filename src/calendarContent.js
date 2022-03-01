import './calendarContent.css';
import './weekDays.css'
import './App.css'
import plus from './images/plus.png';
import ReactDOM from "react-dom";
import React, {useState} from "react";
import App from "./App";
import ModalWritingTaskWindow from "./modalWriteTaskWindow";
import ModalMenuWindow from "./modalWindow";
let kilkist = 5;

function CalendarContent(props) {
    const [modalActive, setModalActive] = useState(false);
    const [taskxId, setTaskxId] = useState(0);
    const [taskyId, setTaskyId] = useState(0);
    const [saveText, setSaveText] = useState("");
    const [cellText, setCellText] = useState({
            text: [
                [],
                [],
                [],
                [],
                [],
                [],
                []
            ]
        }
    );


    const setModalTextId = (xid,yid) => () => {  //Зберігає координати натиснутої комірки для подальшого порівняння з номерами текстових полів
        setModalActive(true);
        setTaskxId(xid);
        setTaskyId(yid);
    }

    function Task(tasks){
        let a = new Array(tasks.numb);
        a.fill(0);
        return(
            <div className={"dailyTasks"} id={tasks.id} y={tasks.y}>
                {
                    a.map((x, i) => //Створення текстових вікон для запису завдань. madal(x,y)Id - координати комірки
                        <div className="task" id={`taskId${i+1}:${tasks.y}`} onClick={setModalTextId(i+1, tasks.y)}>
                            <p>{saveText}</p>
                            <ModalWritingTaskWindow active={modalActive && taskxId===i+1 && taskyId===tasks.y} setActive={setModalActive} text={saveText} setText={setSaveText} x={taskxId} y={taskyId} setCell={setCellText}/>
                        </div>
                    )
                }
            </div>
        );
    }


    return (
        <div className="calendarContent">
            <div className="columnName"><h1>Завдання на тиждень:</h1></div>
            <div className="tasksBlock">
                <Task numb={kilkist} id={"highest"} y={1}/>
                <Task numb={kilkist} y={2}/>
                <Task numb={kilkist} y={3}/>
                <Task numb={kilkist} y={4}/>
                <Task numb={kilkist} y={5}/>
                <Task numb={kilkist} y={6}/>
                <Task numb={kilkist} id={"lowest"} y={7}/>
            </div>
            <div className="addTask-btn" title='Add new task' onClick={() => {kilkist++; console.log(kilkist); ReactDOM.render(<React.StrictMode><App /></React.StrictMode>, document.getElementById('root'));}}>
                <img src={plus} alt=""/>
            </div>
        </div>
    );
}

export default CalendarContent;
//
// ; ReactDOM.render(<React.StrictMode><App /></React.StrictMode>, document.getElementById('root'));

