import React from "react"
import Length from "./Length"
import {AiOutlinePause, AiOutlinePlayCircle, AiOutlineHistory} from "react-icons/ai"


function App() {

  const [displayTime, setDisplayTime] = React.useState(25*60)
  const [breakTime, setBreakTime] = React.useState(5*60)
  const [sessionTime, setSessionTime] = React.useState(25*60)
  const [timerOn, setTimerOn ] = React.useState(false)
  const [onBreak, setOnBreak] = React.useState(false)
  const [breakAudio, setBreakAudio] = React.useState(
    new Audio("./censorBeep.mp3")
  );


  const playSound = () => {
    breakAudio.currentTime = 0;
    breakAudio.play()
  }

    const formatTime = time => {
      let minutes = Math.floor(time/60);
      let seconds = time % 60;
      return (
        (minutes < 10 ? "0" + minutes : minutes)
        + ":" +
        (seconds < 10 ? "0" + seconds : seconds)
      )
    }

      const changeTime = (amount, type) => {
        if(type === "break") {
          if(breakTime <= 60 && amount < 0) {
            return;
          }
          setBreakTime(prev => prev + amount)
        }
        else {
          if(sessionTime <= 60 && amount < 0) {
            return;
          }
          setSessionTime(prev => prev + amount)
        };
        if(!timerOn) {
          setDisplayTime(sessionTime + amount)
        }
      }



    const reset = () => {
      setDisplayTime(25*60)
      setBreakTime(5*60)
      setSessionTime(25*60)
    }

    const controlTime = () => {
      let second = 1000;
      let date = new Date().getTime();
      let nextDate = new Date().getTime() + second;
      let onBreakVariable = onBreak;
      if(!timerOn) {
        let interval = setInterval(() => {
          let date = new Date().getTime();
            if(date > nextDate) {
              setDisplayTime(prev => {
                if(prev <= 0 && !onBreakVariable) {
                  playSound();
                  onBreakVariable=true;
                  setOnBreak(true);
                  return breakTime;
                }
                else if(prev <= 0 && !onBreakVariable) {
                  playSound();
                  onBreakVariable = false;
                  setOnBreak(false);
                  return sessionTime;
                }
                return prev - 1;
              })
              nextDate += second;
            }
        }, 30);
        localStorage.clear();
        localStorage.setItem("interval-id", interval)
      }

      if(timerOn) {
        clearInterval(localStorage.getItem("interval-id"));
      }
      setTimerOn(!timerOn);
    }

  return (
    <div className="app">
      <div className="row">
        <Length 
        title={"Break Length"}
        type={"break"}
        changeTime={changeTime}
        time={breakTime}
        formatTime={formatTime}
        ></Length>
        <Length 
        title={"Session Length"}
        type={"session"}
        changeTime={changeTime}
        time={sessionTime}
        formatTime={formatTime}
        ></Length>

      </div>
      <div className="time">
        <h3>{onBreak ? "Break" : "Session"}</h3>
        <h1>{formatTime(displayTime)}</h1>
      <button 
        id="start_stop" 
        className={`button button-primary `}
        onClick={controlTime}
        >{timerOn ? (<h2><AiOutlinePause/></h2>) : (<h2><AiOutlinePlayCircle/></h2>)}</button>
        
        <button id="reset" 
        onClick={reset} 
        className="button button-primary">
          <h2><AiOutlineHistory/></h2>
        </button>
      </div>
    </div>
  );
}

export default App;
