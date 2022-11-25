import './App.css';
import './generalPage.css';
import { Link } from "react-router-dom";

function GeneralPage() {

    return (
        <div className="mainBlock">
            <div className="choiceWindow">
                <div className="linkWraper">
                    <Link to="/Calendar" className="pageLink"><h1>Calendar</h1></Link>
                </div>
                <div className="linkWraper">
                    <Link to="/History" className="pageLink"><h1>History</h1></Link>
                </div>
            </div>
        </div>
    );
}

export default GeneralPage;
