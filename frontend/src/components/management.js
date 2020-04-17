import React, {useState} from 'react';


export function Management({ allowSelection, gameID, socket, players, isManager, gameState }) {
    
    const [selectedPile, setSelectedPile] = useState('');
    
    const removePlayer = (socket, playerName) => {
        socket.emit("remove_player", { gameID: gameID, playerName: playerName });
    };

    const reshuffle = (socket) => {
        socket.emit("reshuffle", { gameID: gameID });
    }

    const startGame = (socket) => {
        socket.emit("select_cards", { gameID: gameID });
    }

    const revealCards = () => {
        socket.emit("reveal_cards", { gameID: gameID });
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
                <button disabled={gameState!=="all_selected"?true:false} onClick={() => revealCards()}>גלה קלפים</button>
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
