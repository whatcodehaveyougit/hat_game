import React,{useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import '../../style/game-setup.css'


export default function AddCluesHome(props){
    const [playersToAddClues, setPlayersToAddClues] = useState([]);

    useEffect(() => {
        filterPlayers(props.selectedGamePlayers)
    }, [props.selectedGamePlayers])

    function filterPlayers(players){
        console.log(players.toString());
        const playersToAddCluesArray = [];
        players.forEach(player => {
            if(!player.addedClues){
                playersToAddCluesArray.push(player)
            }
        })
        setPlayersToAddClues(playersToAddCluesArray)
    }

    return (
        <>
           

            { playersToAddClues.length > 0 ?  
            <div>
            <h1>Select your name and start adding clues!</h1>
                { playersToAddClues.map((player) => (
                        <div className="player-name-to-add-clues" key={player.name}>
                                <Link to="/add-clues/player" onClick={() => props.setPlayerAddingClues(player)}>
                                    <div className="player-name">                    
                                        {player.name}
                                    </div>
                                </Link>         
                        </div>
                    
                    )
                )}
            </div> :
            <h1>Everyone has added Clues to the Hat!</h1>
        }
        </>
    )
}