import React from 'react'
import { Link } from 'react-router-dom'
import ReactPlayer from 'react-player'

export default function Rules(){
    return (
        <>
            <section>
                <h1>Playing The Virtual Hat Game</h1>

                <p>The virtual game involves <span className="underline">3 rounds,</span> a round ends when every single answer in the hat has been guessed.</p>
                <p>When the hat is empty the active team don't get the remaining time on the clock. </p>
                <p>It simply moves onto the next team!</p>
                
                <p>This video explains how the hat game has been adapted for virtual gaming.</p>
                <div className="flex-container-center video">
                    <ReactPlayer url='https://www.youtube.com/watch?v=yeG741oUKtY' playing />
                </div>
                <Link to="/"><button className="green-btn">Back to Home</button></Link>
            </section>
        </>
    )
}