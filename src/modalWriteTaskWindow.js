import './modalWritingTaskWindow.css'
import './App.css'
import {findAllByDisplayValue} from "@testing-library/react";

function ModalWritingTaskWindow({active, setActive, text, setText, x, y, setCell}) {
    let taskText = document.getElementsByClassName("taskEnter");
    function saveText(txt){
        setText(txt);
        // setCell()
    }
    return (
        active &&
        <div className="modalTaskOverlay" id="menu" onClick={() => {setActive(false)}}>
            <div className="modalTaskContent" onClick={(event) => {event.stopPropagation()}}>
                <div className="taskHeader">
                    <h1>Введіть заплановане завдання</h1>
                </div>
                <div className="taskBody">
                    <textarea type="Завдання..." className="taskEnter" />
                </div>
                <div className="taskFooter">
                    <button className="cancel" onClick={() => {setActive(false); }}><h1>Відмінити</h1></button>
                    <button className="save" type={"submit"} onClick={() => {setActive(false); saveText(taskText[0].value)}}><h1>Зберегти</h1></button>
                </div>
            </div>
        </div>
    );
}

export default ModalWritingTaskWindow;