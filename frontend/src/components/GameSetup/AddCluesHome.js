import React,{useEffect, useState} from 'react'
import { Link } from 'react-router-dom'


export default function AddCluesHome(props){
    const [filteredPlayers, setFilteredPlayers] = useState([]);

    useEffect(() => {
        filterPlayers(props.selectedGamePlayers)
    }, [props.selectedGamePlayers])

    function filterPlayers(players){
        console.log(players.toString());
        const array = [];
        players.forEach(player => {
            if(player.addedClues === false){
                array.push(player)
            }
        })
        setFilteredPlayers(array)
        console.log(array + "array");
    }

    return (
        <>
           

            { filteredPlayers.length > 0 ?  
            <div>
            <h1>Select a name and start adding clues!</h1>
                { filteredPlayers.map((player) => (
                    <div className="player-name-to-add-clues" key={player.name}>
                        <Link to="/add-clues/player" onClick={() => props.setPlayerAddingClues(player)}>
                            <div className="player">
                                {player.name}
                                <br/>Start Adding Clues!
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