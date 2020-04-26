import React, { useState } from 'react';
import {socketMsgTypes, states} from '../constants'


export function Management({ gameID, socket, players, isManager, gameState }) {

    const [selectedPile, setSelectedPile] = useState('');

    const removePlayer = (socket, playerID) => {
        socket.emit(socketMsgTypes.REMOVE_PLAYER, { gameID: gameID, playerID: playerID });
    };

    const reshuffle = (socket) => {
        socket.emit(socketMsgTypes.RESHUFFLE, { gameID: gameID });
    }

    const revealCards = () => {
        socket.emit(socketMsgTypes.REVEAL_CARDS, { gameID: gameID });
    };

    const updatePilesAndScores = (playersToProcess) => {
        socket.emit(socketMsgTypes.UPDATE_PILES_AND_SCORES, { gameID: gameID, selectedPile: selectedPile, playersToProcess: playersToProcess });
    };

    const onChangeSelectedPile = e => {
        setSelectedPile(e.target.value)
    }

    if (isManager)
        return (
            <div>
                <button onClick={() => reshuffle(socket)}>ערבב מחדש</button>
                <button disabled={gameState !== states.ALL_PLAYERS_SELECTED_CARDS ? true : false} onClick={() => revealCards()}>גלה קלפים</button>
                <button disabled={gameState !== states.RELATING_CARDS_TO_PILES ? true : false} onClick={() => updatePilesAndScores(players.length)}>שייך כרטיסים </button>
                <button disabled={gameState !== states.RELATING_CARDS_TO_PILES ? true : false} onClick={() => updatePilesAndScores(1)}>שייך כרטיס הבא </button>
                <div>
                    <br></br>
                    <select name="selected Pile" onChange={e => onChangeSelectedPile(e)}>
                        <option value="0">0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>
                    
                </div>
                <br></br>
                <div>

                    {players.length > 0 &&
                        players.map(player => {
                            return (
                                <button key={player.ID} onClick={() => removePlayer(socket, player.ID)}>{player.name}</button>
                            )
                        })
                    }
                </div>
            </div>)
    else
        return <div></div>
}
