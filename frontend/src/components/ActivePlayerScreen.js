import React, {useState, useEffect} from 'react'
import { Redirect } from 'react-router-dom'
import '../App.css'

const ActivePlayerScreen = (props) => {
    
    // Timer
    const [timerStarted, setTimerStarted] = useState(false)
    const [timeLeft, setTimeLeft] = useState(4);
    // Clues
    const [cluesArray, setCluesArray] = useState(props.selectedGame.clues)
    const [cluesInHat, setCluesInHat] = useState([])
    const [turnCount, setTurnCount] = useState(0)
   
    useEffect(() => { 
      if(cluesArray){
        filterOutGuessedClues(cluesArray)
        // this isEmpty function is now redundant in this current state.  The page is constantly checking if hat is empty and will redirect when it is.
        .then(res => isHatEmpty(res))
        .then(res => shuffle(res)) 
    }
  }, [turnCount]);
// This turn count should not be necessary - it is to stop it going on an infinite loop

    function filterOutGuessedClues(arrayOfClues){      
      return new Promise(resolve => {
        let array = []; 
          arrayOfClues.forEach(clue => {
              if(clue.guessed === false){
              array.push(clue)
              }
            })
            resolve(array)
          })  
        }

    function isHatEmpty(clues){      
      return new Promise((resolve, reject) => {     
      if (clues.length === 0){
          setTimeLeft(0)
          // I can't call props.endOfTurn() because the page redirects before that can happen
          // To be honest I don't even need this function anymore with the code on line 115
          // This was not working - should have done though?
          // return <Redirect to='/the-hat-is-empty'/>
      } else {
        resolve(clues)
      }
    })
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
    
    function startTurn() {
        setTimerStarted(true)
        props.getTeamsCurrentScore()
    }

    function clueGuessedCorrectly(){
          props.onClueGuessed(cluesInHat[0].id)  
          removeGuessedClueFromHatArray()
          // How is it still working with this commented out?  Should be broke, not setting state of cluesInHat anywhere ??
          // .then(array => isHatEmpty(array))
    }

    function removeGuessedClueFromHatArray(){
     return new Promise((resolve, reject) => {
      const deck = cluesInHat;
          deck.shift();
          return(deck)
     })
    } 

    // Is timir continuing to tick after page redirected
    useEffect(() => {
        if (!timerStarted) return
        const intervalId = setInterval(() => {
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
            { timerStarted ? null : <><h1>Have you picked up the hat?</h1> <h3>{ cluesInHat.length } clues left in hat</h3> </> }
            { timerStarted ? null : <button className="start-clock" onClick={startTurn}>Start the Clock</button> }
            { timerStarted ? <div className="time-left"> {timeLeft} </div> : null}
            { timerStarted ? <div>Current Clues: <br/><span className="current-clue">{ cluesInHat.length > 0 ? cluesInHat[0].content : <Redirect to='/the-hat-is-empty'/>  }</span></div> : null }
            { timerStarted ? <button onClick={clueGuessedCorrectly}>We got it! Next Clue Please!</button> : null }  
        </>
    )
}
export default ActivePlayerScreen