import React, { useState, useEffect } from 'react';
import { PlayersList } from "./playersList";
import { Management } from "./management";
import { CardSelection } from "./cardSelection";
import { socketMsgTypes } from '../../constants'



export function Taki({ gameID, socket, playerName, isManager }) {

  const [game, setGame] = useState({});
  const getLastCard = () => {
    return game.players.find(player => player.name === playerName).newCard
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
        <button onClick={() => socket.emit(socketMsgTypes.TAKE_CARD_BACK, { gameID: gameID, playerName: playerName })}>החזר קלף</button>
        <button class="takeCard" onClick={() => socket.emit(socketMsgTypes.TAKE_CARD, { gameID: gameID, playerName: playerName })}>קח קלף</button>
        
        <CardSelection gameState={game.state} playerName={playerName} gameID={gameID} socket={socket} players={game.players} />
        <div>{game.lastAction}</div>
        <div  class={getLastCard().color}>{"הקלף האחרון שקיבלת: " + getLastCard().type}</div>
        <div  class={game.onTable[game.onTable.length - 1].color}>{"הקלף שבראש הערמה על השולחן: " + game.onTable[game.onTable.length - 1].type}</div>
        <div>{"מספר הקלפים בחפיסה: " + game.pack.length}</div>
        <br></br>
        <PlayersList players={game.players} />
      </div >
    )
}

