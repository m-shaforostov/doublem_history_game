import './modalWritingTaskWindow.css'
import './App.css'
import React, {useState} from "react";

function ModalWritingTaskWindow({active, setActive, x, y, areaText, funcSetCellText}) {
    let taskText = document.getElementsByClassName("taskEnter");
    const [text, setText] = useState(areaText);



    function changeFieldText(event) {
        // debugger;
        setText(event.target.value);
    }

    function checkUnd(text){
        if (text){
            setText(text)
        }
        else {
            setText("");
        }
    }

    function saveText (txt){
        funcSetCellText(txt);
    }

    return (
        active &&
        <div className="modalTaskOverlay" id="menu" onClick={() => {setActive(false); checkUnd(areaText)}}>
            <div className="modalTaskContent" onClick={(event) => {event.stopPropagation()}}>
                <div className="taskHeader">
                    <h1>Введіть заплановане завдання</h1>
                </div>
                <div className="taskBody">
                    <textarea className="taskEnter" value={text} onChange={changeFieldText} />
                </div>
                <div className="taskFooter">
                    <button className="cancel" onClick={() => {setActive(false); checkUnd(areaText)}}><h1>Відмінити</h1></button>
                    <button className="save" type={"submit"} onClick={() => {setActive(false); saveText(text)}}><h1>Зберегти</h1></button>
                </div>
            </div>
        </div>
    );
}

export default ModalWritingTaskWindow;