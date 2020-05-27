import React from 'react'
import ReactPlayer from 'react-player'

export default function Rules(){
    return (
        <section>
            <h1>Playing The Virtual Hat Game</h1>

            <p>This game is also known as "Celebrity" and the rules can be found <a target="_blank" href="https://en.wikipedia.org/wiki/Celebrity_(game)">here on Wikepedia</a></p>
            <p>This game played over 3 rounds, each round ends when every single answer in the hat has been guessed</p>
            
            <p>This video explains how the hat game has been adapted to be played virtually.</p>
            <div className="flex-container-center video">
                <ReactPlayer url='https://www.youtube.com/watch?v=yeG741oUKtY' playing />
            </div>
        </section>
    )
}