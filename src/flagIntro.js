import './flagIntro.css';
import flagImg from "./images/80b435a7b96a.webp";
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
            setBack("whiteBgSecond");
            setFlag("flagImgLast");
            setFlagBlock("flagBlockSecond")
        }, 1000);
        window.setTimeout(() => {setMain("introDiv")},2000);
    }

    return (
        <div className={main} onClick={start}>
            <div className={flagBlock}>
                <img src={flagImg} alt="" className={flag}/>
            </div>
            <div className={back}></div>
            <div className={text}>
                <p>[Клацніть, щоб продовжити]</p>
            </div>
        </div>
    );
}

export default Intro;
