import './App.css';
import './generalPage.css';
import { NavLink } from "react-router-dom";
import {useContext} from "react";
import {GeneralContext} from "./context/GeneralContext";

function GeneralPage() {
    const { preventLinkChange } = useContext(GeneralContext);

    return (
        <div className="mainBlock">
            <div className="choiceWindow">
                <div className="linkWraper history">
                    <NavLink to="/History" className="pageLink"><h1>History</h1></NavLink>
                </div>
                <div className="linkWraper calendar">
                    <NavLink to="/Calendar" onClick={preventLinkChange} className="pageLink disabled"><h1>Calendar</h1></NavLink>
                </div>
            </div>
        </div>
    );
}

export default GeneralPage;
