import React from 'react';


export function Management({ gameID, socket, players, isManager, toggleSelection, updatePilesAndScores, onChangeSelectedPile }) {
    const removePlayer = (socket, playerName) => {
        socket.emit("remove_player", { gameID: gameID, playerName: playerName });
    };

    const reshuffle = (socket) => {
        socket.emit("reshuffle", { gameID: gameID });

    }

    if (isManager)
        return (
            <div>
                <button onClick={() => reshuffle(socket)}>ערבב מחדש</button>
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
