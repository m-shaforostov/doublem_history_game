import './calendarContent.css';
import './weekDays.css'
import './App.css'
import plusWhite from './images/plusWhite.png'
import trashButton from './images/trash-can-icon-png.jpg'
import refresh from './images/unnamed.png'
import React, {useState} from "react";
import ModalWritingTaskWindow from "./modalWriteTaskWindow"
import _ from 'lodash'

function CalendarContent({cellsObject, setCellsObject, localStorageCellsObject}) {

    const currentDate = new Date();
    const currentWeekDayNumb = currentDate.getDay();
    const currentDateCopy = _.clone(currentDate);

    const [taskxId, setTaskxId] = useState(0);
    const [taskyId, setTaskyId] = useState(0);
    const [modalActive, setModalActive] = useState(false);
    // const [taskValidity, setTaskValidity] = useState([])

    function refreshTasks () {
        setCellsObject({});
        window.localStorage.setItem('tasks_object', JSON.stringify({}));
    }

    const setModalTextId = (xid,yid) => () => {  //Зберігає координати натиснутої комірки для подальшого порівняння з номерами текстових полів
        setTaskxId(xid);
        setTaskyId(yid);
        setModalActive(true);
    }

    function funcSetCellText(text){
        localStorageCellsObject[taskyId].text[taskxId] = text;
        window.localStorage.setItem('tasks_object', JSON.stringify(localStorageCellsObject));
        setCellsObject(localStorageCellsObject);
    }

    function funcSetCellValitidy() {
        localStorageCellsObject[taskyId].validity[taskxId] = !localStorageCellsObject[taskyId].validity[taskxId];
        window.localStorage.setItem('tasks_object', JSON.stringify(localStorageCellsObject));
        setCellsObject(localStorageCellsObject);
    }

    function Task({id, currentTaskDate}){
        currentTaskDate = currentTaskDate.slice(0, 10);
        if (!localStorageCellsObject[`${currentTaskDate}`]){
            localStorageCellsObject[`${currentTaskDate}`] = {
                number: 1,
                validity: [],
                text: [],
            }
            window.localStorage.setItem('tasks_object', JSON.stringify(localStorageCellsObject));
            setCellsObject(localStorageCellsObject);
        }

        function deleteTask (x) {
            if (localStorageCellsObject[currentTaskDate].number === 1) {
                localStorageCellsObject[currentTaskDate].text[1] = undefined;
                window.localStorage.setItem('tasks_object', JSON.stringify(localStorageCellsObject));
                setCellsObject(localStorageCellsObject);
            }
            else {
                const k = localStorageCellsObject[currentTaskDate].number - x;
                for (let i = 0; i <= k; i++) {
                    localStorageCellsObject[currentTaskDate].text[x + i] = localStorageCellsObject[currentTaskDate].text[x + i + 1];
                }
                localStorageCellsObject[currentTaskDate].number -= 1;
                window.localStorage.setItem('tasks_object', JSON.stringify(localStorageCellsObject));
                setCellsObject(localStorageCellsObject);
            }
        }

        function increaseCellsNumb() {
            let a = _.cloneDeep(localStorageCellsObject);
            a[currentTaskDate].number += 2;
            window.localStorage.setItem('tasks_object', JSON.stringify(a));
            setCellsObject(a);
        }


        let a = new Array(localStorageCellsObject[currentTaskDate].number);
        a.fill(0);

        return(
            <div className={"dailyTasks"} id={id}>
                {
                    a.map((x, i) => //Створення текстових вікон для запису завдань. modal(x,y)Id - координати комірки
                        <div className={"taskWraper"}>
                            <div className={!localStorageCellsObject[currentTaskDate].validity[i+1] ? "taskON" : "taskOFF"} onClick={setModalTextId(i+1, currentTaskDate)}>
                                <p className={"shownTaskText"}>{localStorageCellsObject[currentTaskDate].text[i+1]}</p>
                            </div>
                            <div className={"trashButton"} onClick={() => {deleteTask(i+1)}}>
                                <img src={trashButton} alt="" />
                            </div>
                        </div>
                    )
                }
                <div className="addTask-btn" title='Add new task' onClick={increaseCellsNumb}>
                    <img src={plusWhite} alt=""/>
                </div>
            </div>
        );
    }

    let pureArray = new Array(7);
    pureArray.fill(0);

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

                {//Створення блоків для завдань.
                    pureArray.map((x, i) => {

                            currentDateCopy.setDate(currentDate.getDate() - (currentWeekDayNumb - i));
                            console.log(currentDateCopy.toLocaleString())
                            return (
                                <Task id={i === 0 ? "highest" : (i === 6 ? "lowest" : undefined)} y={i + 1} currentTaskDate={currentDateCopy.toLocaleString()}/>
                            )
                        }
                    )
                }
            </div>
        </div>
    );
}

export default CalendarContent;