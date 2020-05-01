import React, {useState, useEffect} from 'react'
import { Redirect } from 'react-router-dom'
import '../App.css'

const ActivePlayerScreen = (props) => {
    
    const [timerStarted, setTimerStarted] = useState(props.timerStarted)
    const [seconds, setSeconds] = useState(60);
    const [redirect, setRedirect] = useState(props.redirect)
    const [cluesArray, setCluesArray] = useState(props.selectedGame.clues)
    const [currentClue, setCurrentClue] = useState()
    const [counter, setCounter] = useState(0)
    const [emptyHatRedirect, setEmptyHatRedirect] = useState(false)

    if (emptyHatRedirect){
        return <Redirect to='/the-hat-is-empty'/>
        }

    if(redirect) {
        return <Redirect to='/the-hat-game/turn-over' />
    }    
    
    function startRound() {
        setTimerStarted(false)
        startTimer(1)
        nextClue()
    }

    function nextClue(){
        incrementCounter()
        .then(isHatEmpty())
    }

    function incrementCounter(){
     return new Promise((resolve, reject) => {
        setCounter(counter + 1)
     })
    } 

    function isHatEmpty(){
        return new Promise((resolve, reject) => {     
        if (cluesArray.length === counter){
            setEmptyHatRedirect(true) 
            return reject      
        } else {
            setCurrentClue(cluesArray[counter].content)
        }
     })
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

    return (
        <>
            { timerStarted ? <h1>Have you picked up the hat?</h1> : null }
            { timerStarted ? <button className="start-clock" onClick={startRound}>Start the Clock</button> : null }
            { timerStarted ? null : <div className="time-left"> {seconds} </div> }
            { timerStarted ? null : <div>Current Clues: <br/><span className="current-clue">{currentClue}</span></div> }
            { timerStarted ? null : <button onClick={nextClue}>Next Clue</button> }
        </>
    )
}
export default ActivePlayerScreen