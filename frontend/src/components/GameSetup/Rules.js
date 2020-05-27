import React from 'react'
import ReactPlayer from 'react-player'

export default function Rules(){
    return (
        <>
            <section>
                <h1>Playing The Virtual Hat Game</h1>

                <h3>Important Points</h3>
                <p>The virtual game involves 3 rounds, a round ends when every single answer in the hat has been guessed</p>
                <p>When the hat is empty the active team do not get the remaining amount of time on the clock. </p>
                <p>It simply moves onto the next team</p>
                
                <p>This video explains how the hat game has been adapted to be played virtually.</p>
                <div className="flex-container-center video">
                    <ReactPlayer url='https://www.youtube.com/watch?v=yeG741oUKtY' playing />
                </div>
            </section>
        </>
    )
}