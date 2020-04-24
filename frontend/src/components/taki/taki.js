import React, { useState, useEffect } from 'react';
import { PlayersList } from "./playersList";
import { Management } from "./management";
import { CardSelection } from "./cardSelection";
import { socketMsgTypes } from '../../constants'



export function Taki({ gameID, socket, playerName, isManager }) {

  const [game, setGame] = useState({});
  const getLastCard = () => {
    let cards = game.players.find(player => player.name === playerName).cards
    return cards[cards.length - 1].color + cards[cards.length - 1].type
  }
  if (game.players === undefined)
    socket.emit(socketMsgTypes.REFRESH, { gameID: gameID });

  useEffect(() => {
    socket.on(socketMsgTypes.SET_GAME_STATE, msg => {
      if (msg.gameID === gameID) {
        setGame(msg.game)
      }
    });
  });
  if (game.players === undefined)
    return (<div>Loading...</div>)
  else
    return (

      <div className="App" >
        <h1>Taki, the remote version</h1>
        <h3>Game ID: {gameID}</h3>
        <Management gameState={game.state} playerName={playerName} gameID={gameID} socket={socket} isManager={isManager} players={game.players} />
        <button onClick={() => socket.emit(socketMsgTypes.TAKE_CARD, { gameID: gameID, playerName: playerName })}>קח קלף</button>
        <button onClick={() => socket.emit(socketMsgTypes.TAKE_CARD_BACK, { gameID: gameID, playerName: playerName })}>החזר קלף</button>
        <CardSelection gameState={game.state} playerName={playerName} gameID={gameID} socket={socket} players={game.players} />
        <div>{"last card recieved: " + getLastCard()}</div>
        <div>{"top card: " + game.onTable[game.onTable.length - 1].color + game.onTable[game.onTable.length - 1].type}</div>
        <div>{"cards in pack: " + game.pack.length}</div>
        <br></br>
        <PlayersList players={game.players} />
      </div >
    )
}

