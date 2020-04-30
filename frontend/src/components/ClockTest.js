import React, {useState, useEffect} from 'react'
import '../App.css'

export default function ActivePlayerScreen(){
    const [displayButton, setDisplayButton] = useState(true)
    const [clock, setClock] = useState(null)
    const [timeLeft, setTimeLeft] = useState(null);


    const startRound = () => {
        setDisplayButton(false)   
        setTimeLeft(60)
      }

      useEffect(() => {
        // exit early when we reach 0
        if (!timeLeft) return;
    
        // save intervalId to clear the interval when the
        // component re-renders
        const intervalId = setInterval(() => {
          setTimeLeft(timeLeft - 1);
        }, 1000);
    
        // clear interval on re-render to avoid memory leaks
        return () => clearInterval(intervalId);
        // add timeLeft as a dependency to re-rerun the effect
        // when we update it
      }, [timeLeft]);


    return (
        <>
        <h1>Have you picked up the hat?</h1>
        { displayButton ? <button className="start-clock" onClick={startRound}>Start the Clock</button> : null }
        { timeLeft ? <div> {timeLeft} </div> : null}
        </>
    )
}