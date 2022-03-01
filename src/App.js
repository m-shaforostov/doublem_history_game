import './App.css';
import './header.css'
import Weekdays from "./weekDays";
import CalendarContent from "./calendarContent"
import ModalMenuWindow from "./modalWindow";
import {useState} from "react";
import logo from "./images/logo.png";
import menu from "./images/menu.png";
import plus from "./images/plus.png";

function App() {
    const [modalActive, setModalActive] = useState(false);

    return (
        <div className="mainDiv">
            <div className="header">
                <div className="logo">
                    <div className="logoImg">
                        <img src={logo} alt=""/>
                    </div>
                    <div className="logoText">
                        <h1>DoubleM_Calendar</h1>
                    </div>
                </div>
                <div className="menu" title='Menu'>
                    <img id="menuIMG" src={menu} alt="" onClick={() => {modalActive===true ? setModalActive(false) : setModalActive(true)}}/>
                </div>
            </div>

            <div className="content">
                <ModalMenuWindow active={modalActive} setActive={setModalActive}/>
                <div className="mainWeekBlock">
                    <Weekdays/>
                    <CalendarContent/>
                </div>
                <div className="addWeek-block">
                    <div className="addWeek-btn" title='Add new week'><img src={plus} alt=""/></div>
                </div>
            </div>
        </div>
    );
}

export default App;
