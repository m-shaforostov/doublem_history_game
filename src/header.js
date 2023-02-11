import './App.css';
import './header.css';
import logo from "./images/logo.png";
import menu from "./images/menu.png";
import GeneralPage from "./generalPage";
import WeekBlocks from "./calendar/weekBlocks";
import HistoryCards from "./history/historyCards";
import {Routes, Route, Link} from "react-router-dom";
import whitePlay from "./images/play.png";
import whitePlus from "./images/WhitePlus.png";
import React, {useContext} from "react";
import {GeneralContext} from "./context/GeneralContext";
import {CardGameContext} from "./context/CardGameContext";

function Header({}) {

    const {modalMenuActive, setModalMenuActive} = useContext(GeneralContext);
    const {
        openEmptyCardEditing,
        startTheGame,
    } = useContext(CardGameContext);


    return (
        <div className="header">
            <Link to="/" className="logo">
                    <div className="logoImg">
                        <img src={logo} alt=""/>
                    </div>
                    <div className="logoText">
                        <h1>DoubleM</h1>
                    </div>
            </Link>
            <div className="pageName">
                <Routes>
                    <Route path='/' element={<h2>Головна</h2>}/>
                    <Route path='/Calendar/*' element={<h2>Календар</h2>}/>
                    <Route path='/History/*' element={<h2>Історія</h2>}/>
                </Routes>
            </div>
            <div className="right-bnts">
                <Routes>
                    <Route path='/History' element={
                        <div className="playGame-btn" title='Add new card'>
                            <img src={whitePlay} alt="" onClick={() => {startTheGame()}}/>
                        </div>
                    }/>
                </Routes>
                <Routes>
                    <Route path='/History' element={
                        <div className="addCard-btn" title='Add new card'>
                            <img src={whitePlus} alt="" onClick={() => {openEmptyCardEditing()}}/>
                        </div>
                    }/>
                </Routes>
                <div className="menu" title='Menu'>
                    <img id="menuIMG" src={menu} alt="" onClick={() => {
                        modalMenuActive === true ? setModalMenuActive(false) : setModalMenuActive(true)
                    }}/>
                </div>
            </div>
        </div>
    );
}

export default Header;
