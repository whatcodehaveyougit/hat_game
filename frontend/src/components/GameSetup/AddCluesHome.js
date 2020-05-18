import React,{useEffect, useState} from 'react'
import { Link } from 'react-router-dom'


export default function AddCluesHome(props){
const [players, setPlayers] = useState(props.players)

    return (
        <>
            <h1>Select a name and start adding clues!</h1>

            { players.map((player) => (
                <div class="player-name-to-add-clues">
                    <Link to="/add-clues/player">
                        <div className="player">
                            {player.name}
                            <br/>Start Adding Clues!
                        </div>
                    </Link>            
                </div>
            ))
        }
        </>
    )
}