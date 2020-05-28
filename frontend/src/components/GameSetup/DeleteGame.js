import React, {useState} from 'react'
import HomePage from '../HomePage'

export default function DeleteGame(props){
    const [redirect, setRedirect] = useState(false)

    async function handleClick(){
        await props.onGameDelete(props.selectedGame.id)
        setRedirect(true)
    }
    if(redirect){
        return <HomePage games={props.games} fetchGames={props.fetchGames} asyncSetSelectedGame={props.asyncSetSelectedGame} getPlayers={props.getPlayers} />
    }

    return (
        <>
            <section>
                <h1>Please Note that Games must have:</h1>
                <h2>• More than 1 Team</h2>
                <h2>• At least 4 players</h2>
                <button className="red-btn" onClick={handleClick}>Click Here to Delete Game and Create a New One</button>
            </section>
        </>
    )
}