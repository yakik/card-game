import React from 'react';
import { socketMsgTypes } from '../../constants'

import {getCardClass, getCardText} from './cards'

export function CardSelection({ playerID, gameID, socket, players }) {

  const onClickCard = (socket, card) => {
    socket.emit(socketMsgTypes.SELECT_CARDS, { gameID: gameID, playerID: playerID, selectedCard: card });
  }

  const getCardsButtons = (socket, cards) => {
    let i = 0
    return cards.map(card => (
      <button class={getCardClass(card)} key={i++} onClick={() => onClickCard(socket, card)}>{getCardText(card)}</button>
    ))
  }
  return (
    <div>{players.length > 0 &&
      players.map(player => {
        if (player.ID === playerID)
          return (
            <div key={player.ID}>
              <p>{getCardsButtons(socket, player.cards)}</p>
            </div>
          )
        else return <div key={player.ID}></div>
      })}
      <br></br></div>)

}
