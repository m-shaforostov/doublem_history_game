import './modalWindow.css'
import './App.css'

function ModalWindow({active, setActive}) {
    return (
        <div className={active ? "modalOverlay active" : "modalOverlay"} id="menu" onClick={() => {setActive(false)}}>
            <div className={active ? "modalContent active" : "modalContent"}>
                <div className="menuButtons"><a href="#" className="link-btn">Головна</a></div>
                <div className="menuButtons"><a href="#" className="link-btn">Графік тиждня</a></div>
                <div className="menuButtons"><a href="#" className="link-btn">Графік місяця</a></div>
                <div className="menuButtons"><a href="#" className="link-btn">Налаштування</a></div>
            </div>
        </div>
    );
}

export default ModalWindow;