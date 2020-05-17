import React, { useState, useEffect } from 'react';
import { PlayersList } from "./playersList"
import { Management } from "./management"
import { CardSelection } from "./cardSelection"
import { socketMsgTypes } from '../../constants'
import { getCardClass, getCardText } from './cards'



export function Taki({ testingMode, gameID, socket, playerName, playerID, isManager }) {

  const [game, setGame] = useState({});
  const [testingAddCard,setTestingAddCard] = useState("")
  
  const getPlayer = () => {
    return game.players.find((player) => player.ID === playerID)
  }

  const showDoneTakiButton = () => {
    return game.turn.inTakiSeries && game.turn.inTakiSeriesPlayerID === playerID
  }

  const getPack = (deckOnTable) => {
    let deckSize = deckOnTable.length - 1
    let cardsOnTable = []
    for (let i = deckSize; i >= Math.max(0, deckSize - 6); i--)
      cardsOnTable.push(<div key={i} className={getCardClass(game.onTable[i])}>{getCardText(game.onTable[i])}</div>)
    return <div className="cards-list">{cardsOnTable}</div>
  }

  const onChangeNewTestingCard = e => {
    setTestingAddCard(e.target.value);
  }


  const testingAddCardDiv = () => {
    if (testingMode) {
      return (<div><input data-testid="test_text_for_new_card"  name="newTestingCard" value={testingAddCard} onChange={e => onChangeNewTestingCard(e)} />
      <br></br>
        <button onClick={() => {
          socket.emit(socketMsgTypes.TESTING_ADD_CARD_TO_PLAYER, {
            gameID: gameID, playerID: playerID,
            card: JSON.parse(testingAddCard)
          })
        setTestingAddCard("")
        }}>הוסף קלף</button></div>)

    }
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
          {testingAddCardDiv()}
        <CardSelection showDoneTakiButton={showDoneTakiButton()} packLength={game.pack.length} gameState={game.state} playerID={playerID} gameID={gameID} socket={socket} player={getPlayer()} />
        <div data-testid={"message_player"}>{getPlayer().message}</div>
        <div ><span data-testid={"message_everyone"}>{game.message}</span></div>
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

