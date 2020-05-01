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
  const [modalIsOpen, setIsOpen] = React.useState(false);

  const getPlayer =() =>{
    return game.players.find((player) => player.ID === playerID)
  }


  const getAdditionInformationModal = () => {
    if (player !== undefined && player.requiredAction !== undefined) {
      return (<div>
        <h2 >בחר צבע</h2>
        <button className="greenCard" onClick={() => { return takiColors.GREEN }}>ירוק</button>
        <button className="blueCard" onClick={() => { return takiColors.BLUE }}>ירוק</button>
        <button className="yellowCard" onClick={() => { return takiColors.YELLOW }}>ירוק</button>
        <button className="redCard" onClick={() => { return takiColors.RED }}>ירוק</button>
        <button onClick={() => { }}>close</button>

      </div>)

    }
    else return
  }

  const getPack = (deckOnTable) => {
    let deckSize = deckOnTable.length
    return <div className={getCardClass(game.onTable[deckSize - 1])}>{getCardText(game.onTable[deckSize - 1])}</div>
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
    <button className="takeCard" onClick={() => socket.emit(socketMsgTypes.TAKE_CARD, { gameID: gameID, playerID: playerID })}>{"קח קלף, נותרו " + game.pack.length }</button>
          <CardSelection gameState={game.state} playerID={playerID} gameID={gameID} socket={socket} player={getPlayer()} />
          <div>{game.lastAction}</div>
        </div>
        <div className="taki-cards-on-table">
        <div >{"הערמה על השולחן "} </div>
          {getPack(game.onTable)}
        </div>
        <div className="taki-players" >
          <PlayersList players={game.players} />
        </div >
      </div >
    )
}

