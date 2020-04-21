import React, {useState} from 'react';
import {states,socketMsgTypes} from '../constants'


export function CardSelection({ playerName, gameID,socket, players , gameState}) {
    const [playerSelection, setPlayerSelection] = useState("");

    const onClickCard = (socket,card) => {
        setPlayerSelection(card.number + card.sign)
        socket.emit(socketMsgTypes.SELECT_CARDS, { gameID: gameID, playerName: playerName, selectedCard: card });
    
      }
    
const canSelectCard=(gameState)=>{
  if (gameState===states.SELECTING_CARDS || gameState===states.ALL_PLAYERS_SELECTED_CARDS)
    return true
  else
    return false
}

      const getCardsButtons = (socket,cards) => {
        let i = 0
        return cards.map(card => (
          <button disabled={!canSelectCard(gameState)} key={i++} onClick={() => onClickCard(socket,card)}>{card.number + card.sign}</button>
        ))
      }
    return (
        <div>{players.length > 0 &&
            players.map(player => {
              if (player.name === playerName)
                return (
                  <div key={player.name}>
                    <p>{getCardsButtons(socket,player.cards)}</p>
                  </div>
                )
              else return <div key={player.name}></div>
            })}
          <div>{playerSelection + ":בחירתך"}</div><br></br></div>)
          
}
