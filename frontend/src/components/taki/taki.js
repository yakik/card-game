import React, { useState, useEffect } from 'react';
import { PlayersList } from "./playersList";
import { Management } from "./management";
import { CardSelection } from "./cardSelection";
import { socketMsgTypes } from '../../constants'
import {getCardClass, getCardText} from './cards'



export function Taki({ gameID, socket, playerName, playerID, isManager }) {

  const [game, setGame] = useState({});
  const getLastCard = () => {
    return game.players.find(player => player.ID === playerID).newCard
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
        <Management gameState={game.state} playerID={playerID} playerName={playerName} gameID={gameID} socket={socket} isManager={isManager} players={game.players} />
        <button onClick={() => socket.emit(socketMsgTypes.TAKE_CARD_BACK, { gameID: gameID, playerID: playerID })}>החזר קלף</button>
        <button class="takeCard" onClick={() => socket.emit(socketMsgTypes.TAKE_CARD, { gameID: gameID, playerID: playerID })}>קח קלף</button>
        
        <CardSelection gameState={game.state} playerID={playerID} gameID={gameID} socket={socket} players={game.players} />
        <div>{game.lastAction}</div>
        <div  class={getCardClass(getLastCard())}>{"הקלף האחרון שקיבלת: " + getCardText(getLastCard())}</div>
        <div  class={getCardClass(game.onTable[game.onTable.length - 1])}>{"הקלף שבראש הערמה על השולחן: " + getCardText(game.onTable[game.onTable.length - 1])}</div>
        <div>{"מספר הקלפים בחפיסה: " + game.pack.length}</div>
        <br></br>
        <PlayersList players={game.players} />
      </div >
    )
}

