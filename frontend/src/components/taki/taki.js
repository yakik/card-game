import React, { useState, useEffect } from 'react';
import { PlayersList } from "./playersList"
import { Management } from "./management"
import { CardSelection } from "./cardSelection"
import { socketMsgTypes, takiColors, takiCardTypes  } from '../../constants'
import { getCardClass, getCardText } from './cards'



export function Taki({ gameID, socket, playerName, playerID, isManager }) {

  const [game, setGame] = useState({});
  const [selectedColor, setSelectedColor] = useState({});
  const [selectedKing, setSelectedKing] = useState({});

  const getPlayer = () => {
    return game.players.find((player) => player.ID === playerID)
  }

  const getPack = (deckOnTable) => {
    let deckSize = deckOnTable.length - 1
    let cardsOnTable = []
    for (let i = deckSize; i >= Math.max(0, deckSize - 6); i--)
      cardsOnTable.push(<div key={i} className={getCardClass(game.onTable[i])}>{getCardText(game.onTable[i])}</div>)
    return <div className="cards-list">{cardsOnTable}</div>
  }

  const kingSelection = () =>{
    return (
    <div >
      <span className="card">טאקי</span>
      <span className="divider"/>
      <input
        type="radio"
        value={takiCardTypes.TAKI}
        checked={selectedKing === takiCardTypes.TAKI}
        onChange={() => { setSelectedKing(takiCardTypes.TAKI) }}
      />
    <span className="card">3+</span>
    <span className="divider"/>
      <input
        type="radio"
        value={takiCardTypes.PLUS_THREE}
        checked={selectedKing === takiCardTypes.PLUS_THREE}
        onChange={() => { setSelectedKing(takiCardTypes.PLUS_THREE) }}
      />
      
    <span className="card">3+ שובר</span>
    <span className="divider"/>
      <input
        type="radio"
        value={takiCardTypes.PLUS_THREE_BREAK}
        checked={selectedKing === takiCardTypes.PLUS_THREE_BREAK}
        onChange={() => { setSelectedKing(takiCardTypes.PLUS_THREE_BREAK) }}
      />
    <span className="card">+2</span>
    <span className="divider"/>
      <input
        type="radio"
        value={takiCardTypes.PLUS_TWO}
        checked={selectedKing === takiCardTypes.PLUS_TWO}
        onChange={() => { setSelectedKing(takiCardTypes.PLUS_TWO) }}
      />
    <span className="card">שנה צבע</span>
    <span className="divider"/>
      <input
        type="radio"
        value={takiCardTypes.CHANGE_COLOR}
        checked={selectedKing === takiCardTypes.CHANGE_COLOR}
        onChange={() => { setSelectedKing(takiCardTypes.CHANGE_COLOR) }}
      />
    <span className="card">שנה כיוון</span>
    <span className="divider"/>
      <input
        type="radio"
        value={takiCardTypes.CHANGE_DIRECTION}
        checked={selectedKing === takiCardTypes.CHANGE_DIRECTION}
        onChange={() => { setSelectedKing(takiCardTypes.CHANGE_DIRECTION) }}
      />
    <span className="card">עצור</span>
    <span className="divider"/>
      <input
        type="radio"
        value={takiCardTypes.STOP}
        checked={selectedKing === takiCardTypes.STOP}
        onChange={() => { setSelectedKing(takiCardTypes.STOP) }}
      />
  </div>)
  }

  const colorSelection = () =>{
    return (
    <div >
      <label className="yellowCard">צהוב
      <input
        type="radio"
        value={takiColors.YELLOW}
        checked={selectedColor === takiColors.YELLOW}
        onChange={() => { setSelectedColor(takiColors.YELLOW) }}
      /></label>
    <label className="redCard">
      <input
        type="radio"
        value={takiColors.RED}
        checked={selectedColor === takiColors.RED}
        onChange={() => { setSelectedColor(takiColors.RED) }}
      />אדום</label>
  <label className="greenCard">
      <input
        type="radio"
        value={takiColors.GREEN}
        checked={selectedColor === takiColors.GREEN}
        onChange={() => { setSelectedColor(takiColors.GREEN) }}
      />ירוק</label>
  <label className="blueCard">
      <input
        type="radio"
        value={takiColors.BLUE}
        checked={selectedColor === takiColors.BLUE}
        onChange={() => { setSelectedColor(takiColors.BLUE) }}
      />כחול</label>
  </div>)
  }

  const getTakiCards = () => {
    if (getPlayer().cards !== undefined && game.pack !== undefined)
      return (
        <div><button onClick={() => socket.emit(socketMsgTypes.TAKE_CARD_BACK, { gameID: gameID, playerID: playerID })}>החזר קלף</button>
          <button className="takeCard" onClick={() => socket.emit(socketMsgTypes.TAKE_CARD, { gameID: gameID, playerID: playerID })}>{"קח קלף, נותרו " + game.pack.length}</button>
          <CardSelection gameState={game.state} playerID={playerID} gameID={gameID} socket={socket} player={getPlayer()} />
          {kingSelection()}
          <br></br>

          {colorSelection()}
          <br></br>
          <button className="takeCard" onClick={() => socket.emit(socketMsgTypes.TAKE_CARD, { gameID: gameID, playerID: playerID })}>{"שלח"}</button>
         
        </div>
      )
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
      <div className="taki-grid-container" >
        <div className="taki-title">
          <h2>Taki. Game ID: {gameID}</h2>
        </div>
        <div className="taki-management">
          <Management gameState={game.state} playerID={playerID} playerName={playerName} gameID={gameID} socket={socket} isManager={isManager} players={game.players} />
        </div>

        <div className="taki-cards">
          {getTakiCards()}
        </div>

        <div className="taki-cards-on-table">
          {game.onTable !== undefined ? getPack(game.onTable) : <div></div>}
        </div>
        <div className="taki-players" >
          <PlayersList players={game.players} />
        </div >
      </div >
    )
}

