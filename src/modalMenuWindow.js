import './modalMenuWindow.css'
import './App.css'
import { Link } from "react-router-dom";
import {useContext} from "react";
import {GeneralContext} from "./context/GeneralContext";

function ModalMenuWindow({}) {

    const { modalMenuActive, setModalMenuActive } = useContext(GeneralContext);


    return (
        <div className={modalMenuActive ? "modalOverlay active" : "modalOverlay"} id="menu" onClick={() => {setModalMenuActive(false)}}>
            <div className={modalMenuActive ? "modalContent active" : "modalContent"}>
                <div className="menuButtons"><Link to="/" className="link-btn">Головна</Link></div>
                <div className="menuButtons"><Link to="/Calendar" className="link-btn">Календар</Link></div>
                <div className="menuButtons"><Link to="/History" className="link-btn">Історична гра</Link></div>
            </div>
        </div>
    );
}

export default ModalMenuWindow;