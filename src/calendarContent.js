import './calendarContent.css';
import './weekDays.css'
import './App.css'
import plusWhite from './images/plusWhite.png'
import React, {useState} from "react";
import ModalWritingTaskWindow from "./modalWriteTaskWindow"

function CalendarContent(props) {
    const [modalActive, setModalActive] = useState(false);
    const [taskxId, setTaskxId] = useState(0);
    const [taskyId, setTaskyId] = useState(0);
    const [cellsNumb, setCellsNumb] = useState([1,1,1,1,1,1,1]);
    const [cellText, setCellText] = useState({
            text:   [
                [""],
                [""],
                [""],
                [""],
                [""],
                [""],
                [""]
            ]
        }
    );


    const setModalTextId = (xid,yid) => () => {  //Зберігає координати натиснутої комірки для подальшого порівняння з номерами текстових полів
        setTaskxId(xid);
        setTaskyId(yid);
        setModalActive(true);
    }

    function funcSetCellText(text){
        let emptyObj = {};
        const a = Object.assign(cellText, emptyObj);
        console.log(a);
        a.text[taskyId-1][taskxId] = text;
        console.log(a);
        setCellText(a);
    }

    function Task(tasks){
        async function changeCellsNumb() {
            let cells = cellsNumb[tasks.y-1];
            console.log(cells);
            cells++;
            console.log(cells);
            await setCellsNumb(cells);
            console.log(cellsNumb);
        }

        let a = new Array(tasks.numb[tasks.y-1]);
        a.fill(0);
        return(
            <div className={"dailyTasks"} id={tasks.id}>
                {
                    a.map((x, i) => //Створення текстових вікон для запису завдань. modal(x,y)Id - координати комірки
                        // <div>
                            <div className="task" id={`taskId${i+1}:${tasks.y}`} onClick={setModalTextId(i+1, tasks.y)}>
                                <pre className={"shownTaskText"}>{cellText.text[tasks.y-1][i+1]}</pre>
                            </div>
                            // <div className={"deleteTask"}><p>-</p></div>
                        // </div>
                    )
                }
                <div className="addTask-btn" title='Add new task' onClick={changeCellsNumb}>
                    <img src={plusWhite} alt=""/>
                </div>
            </div>
        );
    }

    return (
        <div className="calendarContent">
            <div className="columnName"><h1>Завдання на тиждень:</h1></div>
            <div className="tasksBlock">
                <ModalWritingTaskWindow active={modalActive} setActive={setModalActive} x={taskxId} y={taskyId} areaText={cellText.text[taskyId][taskxId]} funcSetCellText={funcSetCellText}/>
                <Task numb={cellsNumb} id={"highest"} y={1}/>
                <Task numb={cellsNumb} y={2}/>
                <Task numb={cellsNumb} y={3}/>
                <Task numb={cellsNumb} y={4}/>
                <Task numb={cellsNumb} y={5}/>
                <Task numb={cellsNumb} y={6}/>
                <Task numb={cellsNumb} id={"lowest"} y={7}/>
            </div>

        </div>
    );
}

export default CalendarContent;
//
// ; ReactDOM.render(<React.StrictMode><App /></React.StrictMode>, document.getElementById('root'));

