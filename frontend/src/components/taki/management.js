import React, { useState } from 'react';
import {socketMsgTypes, states} from '../../constants'


export function Management({ gameID, socket, players, isManager, gameState }) {



    const removePlayer = (socket, playerName) => {
        socket.emit(socketMsgTypes.REMOVE_PLAYER, { gameID: gameID, playerName: playerName });
    };

    const reshuffle = (socket) => {
        socket.emit(socketMsgTypes.RESHUFFLE, { gameID: gameID });
    }


    if (isManager)
        return (
            <div>
                <button onClick={() => reshuffle(socket)}>ערבב מחדש</button>
               
                <br></br>
                <div>

                    {players.length > 0 &&
                        players.map(player => {
                            return (
                                <div>
                                <button key={player.name} onClick={() => removePlayer(socket, player.name)}>{player.name}</button>
                                <button  onClick={() => socket.emit(socketMsgTypes.RESHUFFLE_USED_CARDS, { gameID: gameID})}>מחזר קלפים</button>
                            </div>
                            )
                        })
                    }
                </div>
            </div>)
    else
        return <div></div>
}
