import './modalWritingTaskWindow.css'
import './App.css'
import React, {useEffect, useState} from "react";

function ModalWritingTaskWindow({active, setActive, x, y, cellsObject, funcSetCellText, funcSetCellValitidy}) {
    let taskText = document.getElementsByClassName("taskEnter");
    const [text, setText] = useState(cellsObject[y].text[x]);
    console.log(cellsObject[y].text[x]);
    const validityButtonClass = !cellsObject[y].validity[x] ? "startedTask" : "endedTask";
    const validityButtonTextName = !cellsObject[y].validity[x] ? "Завершити" : "Повернути";

    function changeFieldText(event) {
        setText(event.target.value);
    }
    useEffect(() => {
        const textarea = document.querySelector("textarea");
        textarea.focus();
    })

    useEffect(() => {
        const close = (e) => {
            if(e.keyCode === 27){
                setActive(false)
            }
        }
        window.addEventListener('keydown', close)
        return () => window.removeEventListener('keydown', close)
    },[])


    return (
        <div className="modalTaskOverlay" id="menu" onClick={() => {setActive(false)}}>
            <div className="modalTaskContent" onClick={(event) => {event.stopPropagation()}}>
                <div className="taskHeader">
                    <h1>Введіть заплановане завдання</h1>
                </div>
                <div className="taskBody">
                    <textarea rows="1"className="taskEnter" value={text} onChange={changeFieldText} />
                </div>
                <div className="taskFooter">
                    <div className="leftButtons">
                        <button className={validityButtonClass} onClick={ () => { funcSetCellValitidy(); setActive(false); } }>
                            <h1>{validityButtonTextName}</h1>
                        </button>
                    </div>
                    <div className="rightButtons">
                        <button className="cancel" onClick={() => {setActive(false)}}>
                            <h1>Відмінити</h1>
                        </button>
                        <button className="save" type={"submit"} onClick={() => {funcSetCellText(text); setActive(false)}}>
                            <h1>Зберегти</h1>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalWritingTaskWindow;