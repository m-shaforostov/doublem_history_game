import './App.css';
import './header.css';
import {useState} from "react";
import { Routes, Route } from "react-router-dom";
import Intro from "./flagIntro";
import ModalMenuWindow from "./modalMenuWindow";
import WeekBlocks from "./weekBlocks";
import GeneralPage from "./generalPage";
import Header from "./header";
import HistoryCards from "./historyCards"
import {CardGameContextProvider} from "./context/CardGameContext";


function App() {
    const [modalActive, setModalActive] = useState(false);

    return (
        <CardGameContextProvider>
            <div className="mainDiv">
                {/*<Intro/>*/}
                <div className="siteMainDiv">
                    <Header modalActive={modalActive} setModalActive={setModalActive}/>
                    <div className="content">
                        <ModalMenuWindow active={modalActive} setActive={setModalActive}/>

                        <Routes>
                            <Route path='/' element={<GeneralPage/>} />
                            <Route path='/Calendar' element={<WeekBlocks/>} />
                            <Route path='/History' element={<HistoryCards/>} />
                        </Routes>
                    </div>
                </div>
            </div>
        </CardGameContextProvider>
    );
}

export default App;
