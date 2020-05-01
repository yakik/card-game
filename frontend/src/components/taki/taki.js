import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { PlayersList } from "./playersList"
import { Management } from "./management"
import { CardSelection } from "./cardSelection"
import { socketMsgTypes, takiColors } from '../../constants'
import { getCardClass, getCardText } from './cards'



export function Taki({ gameID, socket, playerName, playerID, isManager }) {

  const [game, setGame] = useState({});
  const [player, setPlayer] = useState({});

  const getPlayer = () => {
    return game.players.find((player) => player.ID === playerID)
  }

  const getPack = (deckOnTable) => {
    let deckSize = deckOnTable.length-1
    let cardsOnTable=[]
    for (let i=deckSize;i>Math.max(0,deckSize-6);i--)
      cardsOnTable.push(<div key={i} className={getCardClass(game.onTable[i])}>{getCardText(game.onTable[i])}</div>)
    return <div className="flexCol">{cardsOnTable}</div>
  }

  if (game.players === undefined)
    socket.emit(socketMsgTypes.REFRESH, { gameID: gameID });

  useEffect(() => {
    socket.on(socketMsgTypes.SET_GAME_STATE, msg => {
      if (msg.gameID === gameID) {
        setGame(msg.game)
        setPlayer(msg.game.players.find((player) => player.ID === playerID))
      }
    });
  });
  if (game.players === undefined)
    return (<div>Loading...</div>)
  else
    return (
      <div className="taki-grid-container" >
        <div className="taki-title">
          <h1>Taki, the remote version</h1>
          <h3>Game ID: {gameID}</h3>
        </div>
        <div className="taki-management">
          <Management gameState={game.state} playerID={playerID} playerName={playerName} gameID={gameID} socket={socket} isManager={isManager} players={game.players} />
        </div>
        <div className="taki-cards">
          <button onClick={() => socket.emit(socketMsgTypes.TAKE_CARD_BACK, { gameID: gameID, playerID: playerID })}>החזר קלף</button>
          <button className="takeCard" onClick={() => socket.emit(socketMsgTypes.TAKE_CARD, { gameID: gameID, playerID: playerID })}>{"קח קלף, נותרו " + game.pack.length}</button>
          <CardSelection gameState={game.state} playerID={playerID} gameID={gameID} socket={socket} player={getPlayer()} />
          <div>{game.lastAction}</div>
        </div>
        <div className="taki-cards-on-table">
          <h2>{"קלפים שהונחו"} </h2>
          {getPack(game.onTable)}
        </div>
        <div className="taki-players" >
          <PlayersList players={game.players} />
        </div >
      </div >
    )
}

