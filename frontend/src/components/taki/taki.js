import React, { useState, useEffect } from 'react';
import { PlayersList } from "./playersList";
import { Management } from "./management";
import { CardSelection } from "./cardSelection";
import { socketMsgTypes } from '../../constants'
import { getCardClass, getCardText } from './cards'



export function Taki({ gameID, socket, playerName, playerID, isManager }) {

  const [game, setGame] = useState({});
  const getLastCard = () => {
    return game.players.find(player => player.ID === playerID).newCard
  }

  const getPack = (deckOnTable) => {
    let myDiv=[]
    let deckSize=deckOnTable.length
    for (let i=deckSize;i>Math.max(-1,deckSize-2);i--){
      console.log(i)
      myDiv.push(<div className={getCardClass(game.onTable[i])}>{getCardText(game.onTable[i])}</div>)
    }
    return myDiv
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
        <button className="takeCard" onClick={() => socket.emit(socketMsgTypes.TAKE_CARD, { gameID: gameID, playerID: playerID })}>קח קלף</button>

        <CardSelection gameState={game.state} playerID={playerID} gameID={gameID} socket={socket} players={game.players} />
        <div className="taki-grid-container">
          <div className="taki-padding-left"></div>
          <div className="taki-content">
            <div>{game.lastAction}</div>
            <div className="flexRowCenter">
              <div className={getCardClass(getLastCard())}>{getCardText(getLastCard())}</div>
              <div >{"הקלף האחרון שקיבלת "}</div>
            </div>
            <div className="flexColCenter">
            {getPack(game.onTable)}
            <div >{"הערמה על השולחן "} </div>
            </div>
            <div>{"מספר הקלפים בחפיסה: " + game.pack.length}</div>
          </div>
          <div className="taki-padding-right"></div>
        </div>
        <br></br>
        <PlayersList players={game.players} />
      </div >
    )
}

