import './calendarContent.css';
import './weekDays.css'
import './App.css'
import plusWhite from './images/plusWhite.png'
import minusWhite from './images/minusWhite.png'
import refresh from './images/unnamed.png'
import React, {useState} from "react";
import ModalWritingTaskWindow from "./modalWriteTaskWindow"
import _ from 'lodash'

function CalendarContent(props) {
    const clearCellsObject = {
        validity: [
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            []
        ],
        text:[
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            []
        ]
    }


    const [taskxId, setTaskxId] = useState(0);
    const [taskyId, setTaskyId] = useState(0);
    const [modalActive, setModalActive] = useState(false);
    const [cellsNumb, setCellsNumb] = useState([1,1,1,1,1,1,1]);
    const [cellsObject, setCellsObject] = useState(clearCellsObject);
    // const [taskValidity, setTaskValidity] = useState([])

    function refreshTasks () {
        setCellsObject(clearCellsObject);
        setCellsNumb([1,1,1,1,1,1,1]);
    }

    const setModalTextId = (xid,yid) => () => {  //Зберігає координати натиснутої комірки для подальшого порівняння з номерами текстових полів
        setTaskxId(xid);
        setTaskyId(yid);
        setModalActive(true);
    }

    function funcSetCellText(text){
        const a = _.cloneDeep(cellsObject);
        a.text[taskyId][taskxId] = text;
        setCellsObject(a);
    }

    function funcSetCellValitidy(x, y) {
        const a = _.cloneDeep(cellsObject);
        a.validity[y][x] = !a.validity[y][x];
        setCellsObject(a);
    }

    function Task({id, y}){
        function increaseCellsNumb() {
            let cellsNumbCopy = _.cloneDeep(cellsNumb);
            let cellsObjectCopy = _.cloneDeep(cellsObject);
            cellsNumbCopy[y]+=1;
            cellsObjectCopy.validity[y][cellsNumbCopy[y]] = undefined;
            setCellsNumb(cellsNumbCopy);
            setCellsObject(cellsObjectCopy);
        }

        function decreaseCellsNumb() {
            if (cellsNumb[y] > 1) {
                let cellsNumbCopy = _.cloneDeep(cellsNumb);
                let cellsObjectCopy = _.cloneDeep(cellsObject);
                cellsObjectCopy.text[y][cellsNumbCopy[y]] = "";
                cellsNumbCopy[y] -= 1;
                setCellsNumb(cellsNumbCopy);
                setCellsObject(cellsObjectCopy);
            }
        }

        let a = new Array(cellsNumb[y]);
        a.fill(0);
        return(
            <div className={"dailyTasks"} id={id}>
                {
                    a.map((x, i) => //Створення текстових вікон для запису завдань. modal(x,y)Id - координати комірки

                        <div className={!cellsObject.validity[y][i+1] ? "taskON" : "taskOFF"} onClick={setModalTextId(i+1, y)}>
                            <pre className={"shownTaskText"}>{cellsObject.text[y][i+1]}</pre>

                        </div>
                    )
                }
                <div className="plusMinusButtons">
                    <div className="addTask-btn" title='Add new task' onClick={increaseCellsNumb}>
                        <img src={plusWhite} alt=""/>
                    </div>
                    <div className="removeTask-btn" title='Add new task' onClick={decreaseCellsNumb}>
                        <img src={minusWhite} alt=""/>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="calendarContent">
            <div className="columnName">
                <h1>Завдання на тиждень:</h1>
                <div className={"refreshButton"} onClick={refreshTasks} title='Clear the desk'>
                    <img src={refresh} alt=""/>
                </div>
            </div>
            <div className="tasksBlock">
                {
                    modalActive &&
                    <ModalWritingTaskWindow active={modalActive} setActive={setModalActive} x={taskxId} y={taskyId} cellsObject={cellsObject} funcSetCellText={funcSetCellText} funcSetCellValitidy={funcSetCellValitidy}/>
                }
                <Task id={"highest"} y={1}/>
                <Task y={2}/>
                <Task y={3}/>
                <Task y={4}/>
                <Task y={5}/>
                <Task y={6}/>
                <Task id={"lowest"} y={7}/>
            </div>

        </div>
    );
}

export default CalendarContent;