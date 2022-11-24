import './App.css';
import './header.css';
import logo from "./images/logo.png";
import menu from "./images/menu.png";
import GeneralPage from "./generalPage";
import WeekBlocks from "./weekBlocks";
import HistoryCards from "./historyCards";
import { Routes, Route } from "react-router-dom";
import whitePlus from "./images/WhitePlus.png";
import React from "react";

function Header({modalActive, setModalActive}) {
    return (
        <div className="header">
            <div className="logo">
                <div className="logoImg">
                    <img src={logo} alt=""/>
                </div>
                <div className="logoText">
                    <h1>DoubleM</h1>
                </div>
            </div>
            <div className="pageName">
                <Routes>
                    <Route path='/' element={<h2>Головна</h2>} />
                    <Route path='/Calendar' element={<h2>Календар</h2>} />
                    <Route path='/History' element={<h2>Історія</h2>} />
                </Routes>
            </div>
            <div className="right-bnts">
                <div className="addCard-btn" title='Add new card'>
                    <img src={whitePlus} alt="" onClick={() => {setModalActive(true)}}/>
                </div>
                <div className="menu" title='Menu'>
                    <img id="menuIMG" src={menu} alt="" onClick={() => {modalActive===true ? setModalActive(false) : setModalActive(true)}}/>
                </div>
            </div>
        </div>
    );
}

export default Header;
