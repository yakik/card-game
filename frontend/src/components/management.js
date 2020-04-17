import React, {useState} from 'react';


export function Management({ gameID, socket, players, isManager, gameState }) {
    
    const [selectedPile, setSelectedPile] = useState('');
    
    const removePlayer = (socket, playerName) => {
        socket.emit("remove_player", { gameID: gameID, playerName: playerName });
    };

    const reshuffle = (socket) => {
        socket.emit("reshuffle", { gameID: gameID });
    }

    const revealCards = () => {
        socket.emit("reveal_cards", { gameID: gameID });
    };

    const updatePilesAndScores = (playersToProcess) => {
        socket.emit("update_piles_And_scores", { gameID: gameID, selectedPile: selectedPile, playersToProcess:playersToProcess });
    };

    const onChangeSelectedPile = e => {
        setSelectedPile(e.target.value)
    }

    if (isManager)
        return (
            <div>
                <button onClick={() => reshuffle(socket)}>ערבב מחדש</button>
                <button disabled={gameState!=="all_selected"?true:false} onClick={() => revealCards()}>גלה קלפים</button>
                <button disabled={gameState!=="cards_to_piles"?true:false} onClick={() => updatePilesAndScores(20)}>שייך כרטיסים </button>
                <button disabled={gameState!=="cards_to_piles"?true:false} onClick={() => updatePilesAndScores(1)}>שייך כרטיס הבא </button>
                <input name="selected Pile" onChange={e => onChangeSelectedPile(e)} />

                {players.length > 0 &&
                    players.map(player => {
                        return (
                            <div key={player.name}>
                                <button onClick={() => removePlayer(socket, player.name)}>{player.name}</button>
                            </div>
                        )
                    })
                }
            </div>)
    else
        return <div></div>
}
