import React from 'react';
import { socketMsgTypes } from '../../constants'


export function Management({ gameID, socket, players, isManager }) {



    const removePlayer = (socket, playerID) => {
        socket.emit(socketMsgTypes.REMOVE_PLAYER, { gameID: gameID, playerID: playerID });
    };

    const reshuffle = (socket) => {
        socket.emit(socketMsgTypes.RESHUFFLE, { gameID: gameID });
    }


    if (isManager)
        return (
            <div>
                <button onClick={() => reshuffle(socket)}>ערבב מחדש</button>
                <button onClick={() => socket.emit(socketMsgTypes.RESHUFFLE_USED_CARDS, { gameID: gameID })}>מחזר קלפים</button>
                <br></br>
                <div>
                    {players.length > 0 &&
                        players.map(player => {
                            return (
                                <div key={player.ID}>
                                    <button  onClick={() => removePlayer(socket, player.ID)}>{player.name}</button>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    else
        return <div></div>
}
