import './modalWindow.css'
import './App.css'

function ModalMenuWindow({active, setActive}) {
    return (
        <div className={active ? "modalOverlay active" : "modalOverlay"} id="menu" onClick={() => {setActive(false)}}>
            <div className={active ? "modalContent active" : "modalContent"}>
                <div className="menuButtons"><a href="golovna" className="link-btn">Головна</a></div>
                <div className="menuButtons"><a href="grafik-tuzhnia" className="link-btn">Графік тиждня</a></div>
                <div className="menuButtons"><a href="grafik-misiacia" className="link-btn">Графік місяця</a></div>
                <div className="menuButtons"><a href="nalashtuvannia" className="link-btn">Налаштування</a></div>
            </div>
        </div>
    );
}

export default ModalMenuWindow;