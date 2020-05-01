import React from 'react';
import { socketMsgTypes } from '../../constants'

import { getCardClass, getCardText } from './cards'

export function CardSelection({ playerID, gameID, socket, player }) {

  const onClickCard = (socket, card) => {
    socket.emit(socketMsgTypes.SELECT_CARDS, { gameID: gameID, playerID: playerID, selectedCard: card });
  }

  const getCardsButtons = (socket, cards) => {
    let i = 0
    return cards.map(card => {
      let scaleCSS = ""
      if (player.newCard !== undefined && card.ID === player.newCard.ID) {
        scaleCSS = " scaled"
      }
      return (
        <button className={getCardClass(card) + scaleCSS} key={i++} onClick={() => onClickCard(socket, card)}>{getCardText(card)}</button>
      )
    })
  }
  if (player !== undefined)
    return (<div>
      <p>{getCardsButtons(socket, player.cards)}</p>
    </div>
    )
  else
    return <div></div>

}
