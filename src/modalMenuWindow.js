import './modalMenuWindow.css'
import './App.css'
import { Link } from "react-router-dom";

function ModalMenuWindow({active, setActive}) {
    return (
        <div className={active ? "modalOverlay active" : "modalOverlay"} id="menu" onClick={() => {setActive(false)}}>
            <div className={active ? "modalContent active" : "modalContent"}>
                <div className="menuButtons"><Link to="/" className="link-btn">Головна</Link></div>
                <div className="menuButtons"><Link to="/Calendar" className="link-btn">Календар</Link></div>
                <div className="menuButtons"><Link to="/History" className="link-btn">Історична гра</Link></div>
            </div>
        </div>
    );
}

export default ModalMenuWindow;