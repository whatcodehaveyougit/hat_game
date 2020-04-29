import React, {useState, useEffect} from 'react'
import '../App.css'

export default function ActivePlayerScreen(){
    const [displayButton, setDisplayButton] = useState(true)
    const [clock, setClock] = useState(null)

    const startRound = () => {
        setDisplayButton(false)   
        setClock(60);
        // startClock()
      }

    //   useEffect(() => {
    //     console.log('Do something after counter has changed', clock);
    //     startClock()
    //  })


        if(clock) {
            setInterval(() => {
                if(clock > 0 )
                setClock(clock => clock - 1 ) 
            }, 1000)
         }

    return (
        <>
        <h1>Have you picked up the hat?</h1>
        { displayButton ? <button className="start-clock" onClick={startRound}>Start the Clock</button> : null }
        { clock ? <div> {clock} </div> : null}
        </>
    )
}