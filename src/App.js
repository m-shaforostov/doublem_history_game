import './App.css';
import './header.css';
import { Routes, Route } from "react-router-dom";
import Intro from "./flagIntro";
import ModalMenuWindow from "./modalMenuWindow";
import WeekBlocks from "./calendar/weekBlocks";
import GeneralPage from "./generalPage";
import Header from "./header";
import HistoryMainPage from "./history/historyMainPage";
import HistoryGameField from "./history/historyGameField";
import TESTS from "./TESTS";
import {CardGameContextProvider} from "./context/CardGameContext";
import {GeneralContextProvider} from "./context/GeneralContext";


function App() {

    return (
        <GeneralContextProvider>
            <CardGameContextProvider>
                <div className="mainDiv">
                    TODO
                    {/*<Intro/>*/}
                    <div className="siteMainDiv">
                        <Header/>
                        <div className="content">
                            <ModalMenuWindow/>

                            <Routes>
                                <Route path='/' element={<GeneralPage/>} />
                                <Route path='/Calendar' element={<TESTS/>} /> {/* <WeekBlocks/> */}
                                <Route path='/History' element={<HistoryMainPage/>} />
                                <Route path='/History/Game' element={<HistoryGameField/>} />
                                <Route path='/TESTS' element={<TESTS/>} />
                            </Routes>
                        </div>
                    </div>
                </div>
            </CardGameContextProvider>
        </GeneralContextProvider>
    );
}

export default App;
