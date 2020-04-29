import React, {useState, useEffect} from 'react'
import { Redirect } from 'react-router-dom'
import '../App.css'

const ActivePlayerScreen = (props) => {
    
    const [displayButton, setDisplayButton] = useState(props.displayButton)
    const [seconds, setSeconds] = useState(60);
    const [isActive, setIsActive] = useState(false);
    const [redirect, setRedirect] = useState(props.redirect)
        
    console.log(redirect + " redirect status");
    console.log();
    
    function toggle() {
        setIsActive(!isActive);
    }
    
    function startRound() {
        setDisplayButton(false)
        setIsActive(true);
        startTimer(60)
    }

    function startTimer(seconds) {
        let clock = setInterval(function () {
            seconds = seconds - 1    
            setSeconds(seconds);
        
            if (seconds === 0) {
                clearTimeout(clock)
                return setRedirect(true)
            }
        }, 1000);
    }


    function handleRedirect(){
        setRedirect(true)
    }
    
    if(redirect) {
        return <Redirect to='/the-hat-game/turn-over' />
    }

    return (
        <>
        <h1>Have you picked up the hat?</h1>
        { displayButton ? <button className="start-clock" onClick={startRound}>Start the Clock</button> : null }
        { isActive ? <div className="time-left"> {seconds} </div> : null}
        </>
    )
}
export default ActivePlayerScreen