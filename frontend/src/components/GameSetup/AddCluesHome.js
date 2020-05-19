import React,{useEffect, useState} from 'react'
import { Link } from 'react-router-dom'


export default function AddCluesHome(props){
    const [filteredPlayers, setFilteredPlayers] = useState([]);

    useEffect(() => {
        filterPlayers(props.selectedGamePlayers)
    }, [props.selectedGamePlayers])

    function filterPlayers(players){
        const array = [];
        players.forEach(player => {
            if(!player.added_clues){
                array.push(player)
            }
        })
        setFilteredPlayers(array)
    }

    return (
        <>
            <h1>Select a name and start adding clues!</h1>

            { 
                filteredPlayers.map((player) => (
                    <div className="player-name-to-add-clues" key={player.name}>
                        <Link to="/add-clues/player" onClick={() => props.setPlayerAddingClues(player)}>
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