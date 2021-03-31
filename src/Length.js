import React from 'react'
import {AiOutlineArrowDown, AiOutlineArrowUp} from "react-icons/ai"

export default function Length({title, changeTime, time, formatTime, type}) {
    return (
        <div>
            <h3>{title}</h3>
            <div className="time-sets">
                <button type="button"                 
                onClick={() => changeTime(-60, type)}>
                    <AiOutlineArrowDown/>
                </button> 
                <h3>{formatTime(time)}</h3>
                <button type="button" 
                onClick={() => changeTime(60, type)}>
                <AiOutlineArrowUp/></button>
            </div>
        </div>
    )
}
