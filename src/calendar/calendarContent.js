import './calendarContent.css';
import './weekDays.css'
import '../App.css'
import plusWhite from '../images/plusWhite.png'
import trashButton from '../images/trash-can-icon-png.jpg'
import refresh from '../images/unnamed.png'
import React, {useState} from "react";
import ModalWritingTaskWindow from "./modalWriteTaskWindow"
import _ from 'lodash'

function CalendarContent({cellsObject, setCellsObject, weekNumb, localStorageCellsSave}) {
    let localStorageCellsObject = JSON.parse(window.localStorage.getItem('tasks_object'));

    const currentDate = new Date();
    const currentWeekDayNumb = currentDate.getDay();
    const currentDateCopy = _.clone(currentDate);

    const [taskxId, setTaskxId] = useState(0);
    const [taskyId, setTaskyId] = useState(0);
    const [modalActive, setModalActive] = useState(false);
    // const [taskValidity, setTaskValidity] = useState([])

    function refreshTasks () {
        let a = _.cloneDeep(localStorageCellsObject);
        a[weekNumb] = {};
        localStorageCellsSave(a);//save data to LocalStorage and reload state
    }

    const setModalTextId = (xid, yid) => () => {  //Зберігає координати натиснутої комірки для подальшого порівняння з номерами текстових полів
        setTaskxId(xid);
        setTaskyId(yid);
        setModalActive(true);
    }

    const newCellsNumb = (xid, currentTaskDate) => () => {
        let a = _.cloneDeep(localStorageCellsObject);
        a[weekNumb][currentTaskDate].number += 1;
        localStorageCellsSave(a);//save data to LocalStorage and reload state

        setTaskxId(xid);
        setTaskyId(currentTaskDate);
        setModalActive(true);
    }

    function funcSetCellText(text){
        localStorageCellsObject[weekNumb][taskyId].text[taskxId] = text;
        localStorageCellsSave(localStorageCellsObject);//save data to LocalStorage and reload state
    }

    function funcSetCellValitidy() {
        localStorageCellsObject[weekNumb][taskyId].validity[taskxId] = !localStorageCellsObject[weekNumb][taskyId].validity[taskxId];
        localStorageCellsSave(localStorageCellsObject);//save data to LocalStorage and reload state
    }

    function Task({id, currentTaskDate}){
        currentTaskDate = currentTaskDate.slice(0, 10);
        console.log("a");
        // console.log(localStorageCellsObject[weekNumb]);
        console.log(currentTaskDate);

        if (!localStorageCellsObject[weekNumb]?.[currentTaskDate]){
            localStorageCellsObject[weekNumb][currentTaskDate] = {
                number: 1,
                validity: [],
                text: [],
            }
            localStorageCellsSave(localStorageCellsObject);//save data to LocalStorage and reload state
        }

        function deleteTask (x) {
            if (localStorageCellsObject[weekNumb][currentTaskDate].number === 1) {
                localStorageCellsObject[weekNumb][currentTaskDate].text[1] = undefined;
                localStorageCellsObject[weekNumb][currentTaskDate].validity[1] = false;
                localStorageCellsSave(localStorageCellsObject);//save data to LocalStorage and reload state
            }
            else {
                const k = localStorageCellsObject[weekNumb][currentTaskDate].number - x;
                for (let i = 0; i <= k; i++) {
                    localStorageCellsObject[weekNumb][currentTaskDate].text[x + i] = localStorageCellsObject[weekNumb][currentTaskDate].text[x + i + 1];
                    localStorageCellsObject[weekNumb][currentTaskDate].validity[x + i] = localStorageCellsObject[weekNumb][currentTaskDate].validity[x + i + 1];
                }
                localStorageCellsObject[weekNumb][currentTaskDate].number -= 1;
                localStorageCellsSave(localStorageCellsObject);//save data to LocalStorage and reload state
            }
        }


        let a = new Array(localStorageCellsObject[weekNumb][currentTaskDate].number);
        a.fill(0);

        return(
            <div className={"dailyTasks"} id={id}>
                {
                    a.map((x, i) => //Створення текстових вікон для запису завдань. modal(x,y)Id - координати комірки
                        <div className={"taskWraper"}>
                            <div className={!localStorageCellsObject[weekNumb][currentTaskDate].validity[i+1] ? "taskON" : "taskOFF"} onClick={setModalTextId(i+1, currentTaskDate)}>
                                <p className={"shownTaskText"}>{localStorageCellsObject[weekNumb][currentTaskDate].text[i+1]}</p>
                            </div>
                            <div className={"trashButton"} onClick={() => {deleteTask(i+1)}}>
                                <img src={trashButton} alt="" />
                            </div>
                        </div>
                    )
                }
                <div className="addTask-btn" title='Add new task' onClick={newCellsNumb(a.length+1, currentTaskDate)}>
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
                    <ModalWritingTaskWindow active={modalActive} setActive={setModalActive} x={taskxId} y={taskyId} weekNumb={weekNumb} cellsObject={cellsObject} funcSetCellText={funcSetCellText} funcSetCellValitidy={funcSetCellValitidy} />
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