import React, {useState, useEffect} from 'react'
import { Redirect } from 'react-router-dom'
import '../App.css'

const ActivePlayerScreen = (props) => {
    
    // Timer
    const [timerStarted, setTimerStarted] = useState(false)
    const [clock, setClock] = useState(null)
    const [timeLeft, setTimeLeft] = useState(4);
    // Clues
    const [cluesArray, setCluesArray] = useState(props.selectedGame.clues)
    const [cluesInHat, setCluesInHat] = useState([])
    const [currentClue, setCurrentClue] = useState()
    const [counter, setCounter] = useState(0)
    
    useEffect(() => { 
      if(cluesArray){
        filterOutGuessedClues(cluesArray)  
    }
  }, [cluesArray]);

    function filterOutGuessedClues(arrayOfClues){      
      let unGuessedClues = []
      return new Promise((resolve, reject) => {     
        arrayOfClues.forEach(clue => {
            if(!clue.guessed){
            unGuessedClues.push(clue)
            }
        })
      }).then(shuffle(unGuessedClues))
    }

    function shuffle(array) {      
      let counter = array.length;
      while (counter > 0) {
          let index = Math.floor(Math.random() * counter);
  
          counter--;

          let temp = array[counter];
          array[counter] = array[index];
          array[index] = temp;
      }
      setCluesInHat(array)
  }
    

  // Need to Order this function so everythign is getting called one after the other, chained in promises etc.
    function startRound() {
      // console.log("empty hat redirect is" + props.emptyHatRedirect);
      // console.log("clues in hat, here ?" + cluesInHat);
      
        setTimerStarted(true)
        filterOutGuessedClues(cluesArray)  

        if(cluesInHat.length > 1) { 
          setCurrentClue(cluesInHat[counter]) 
        } else { 
          console.log(cluesInHat + "cloue in hat are...");
          // The bug is here the clues are not going into the hat...
          props.setEmptyHatRedirect(true) 
        }
        incrementCounter()
        props.getTeamsCurrentScore()
    }

    function nextClue(){
          props.onClueGuessed(currentClue.id)
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
        if (cluesInHat.length <= counter){
            props.endTurnSetDbScore()
            props.setEmptyHatRedirect(true)
            return reject    
        } else {
            setCurrentClue(cluesInHat[counter])
        }
     })
    }
  
    useEffect(() => {
        if (!timerStarted) return

        const intervalId = setInterval(() => {
          console.log("timer ticks");
          setTimeLeft(prevTimeLeft => {
            if (prevTimeLeft === 1) {
              clearInterval(intervalId)
              return <Redirect to='/the-hat-game/turn-over'/>
            } else {
              return prevTimeLeft - 1
            }
          })
        }, 1000);

        return () => {
            clearInterval(intervalId);
          }
        }, [timerStarted])

       

    return (
        <>
            { timerStarted ? null : <h1>Have you picked up the hat?</h1> }
            { timerStarted ? null : <button className="start-clock" onClick={startRound}>Start the Clock</button> }
            { timerStarted ? <div className="time-left"> {timeLeft} </div> : null}
            { timerStarted && currentClue? <div>Current Clues: <br/><span className="current-clue">{currentClue.content}</span></div> : null }
            { timerStarted ? <button onClick={nextClue}>Next Clue</button> : null }  
            { props.emptyHatRedirect ? <Redirect to='/the-hat-is-empty'/> : null } 
        </>
    )
}
export default ActivePlayerScreen