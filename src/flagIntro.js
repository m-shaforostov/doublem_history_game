import './flagIntro.css';
import flagImg from "./images/flag-of-Ukraine.png";
import {useState} from "react";

function Intro() {
    const [main, setMain] = useState("introDivFirst");
    const [flag, setFlag] = useState("flagImgFirst");
    const [back, setBack] = useState("whiteBgFirst");
    const [flagBlock, setFlagBlock] = useState("flagBlockFirst");
    const [text, setText] = useState("actionTextFirst");

    async function start(){
        await setFlag("flagImgSecond");
        await setText("actionTextSecond");
        window.setTimeout(() => {
            setMain("introDivSecond");
            setBack("whiteBgSecond");
            setFlag("flagImgLast");
            setFlagBlock("flagBlockSecond")
        }, 1000);
        window.setTimeout(() => {setMain("introDiv")},2000);
    }

    return (
        <div className={main} onClick={start}>
            <div className={"appearance"}>
                <div className={flagBlock}>
                    <img src={flagImg} alt="" className={flag}/>
                </div>
                <div className={back}></div>
                <div className={`${text} text`}>
                    <p>[Клацніть, щоб продовжити]</p>
                </div>
            </div>
        </div>
    );
}

export default Intro;
