import React, {useState} from 'react';


export function Management({ allowSelection, gameID, socket, players, isManager }) {
    
    const [selectedPile, setSelectedPile] = useState('');
    
    const removePlayer = (socket, playerName) => {
        socket.emit("remove_player", { gameID: gameID, playerName: playerName });
    };

    const reshuffle = (socket) => {
        socket.emit("reshuffle", { gameID: gameID });
    }

    const startGame = (socket) => {
        socket.emit("start_game", { gameID: gameID });
    }

    const toggleSelection = () => {
        socket.emit("selection_mode", { gameID: gameID, allowSelection: !allowSelection });
    };

    const updatePilesAndScores = () => {
        socket.emit("update_piles_And_scores", { gameID: gameID, selectedPile: selectedPile });
        socket.emit("selection_mode", { gameID: gameID, allowSelection: !allowSelection });
    };

    const onChangeSelectedPile = e => {
        setSelectedPile(e.target.value)
    }

    if (isManager)
        return (
            <div>
                <button onClick={() => reshuffle(socket)}>ערבב מחדש</button>
                <button onClick={() => startGame(socket)}>התחל המשחק</button>
                <button onClick={() => toggleSelection()}>אפשר והסתר בחירה /חסום בחירה והראה</button>
                <button onClick={() => updatePilesAndScores()}>שייך כרטיסים לערימות</button>
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
