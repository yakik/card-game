import React, { useState } from 'react';
import { socketMsgTypes, takiColors, takiCardTypes } from '../../constants'

import { getCardClass, getCardText } from './cards'

export function CardSelection({ packLength, playerID, gameID, socket, player }) {
  const [shouldSelectColor, setShouldSelectColor] = useState(false);
  const [shouldSelectKingType, setShouldSelectKingType] = useState(false);
  const [selectedKingType, setSelectedKingType] = useState('')
  const [cardToConfigure, setCardToConfigure] = useState(undefined)

  const sendCardWithColor = (color) => {
    if (cardToConfigure.type === takiCardTypes.CHANGE_COLOR) {
      socket.emit(socketMsgTypes.SELECT_CARDS, {
        gameID: gameID, playerID: playerID,
        selectedCard: {...cardToConfigure, configuration: { color: color }}
      })
      setShouldSelectColor(false)
      setCardToConfigure(undefined)
      return
    }

    if (cardToConfigure.type === takiCardTypes.KING) {

      socket.emit(socketMsgTypes.SELECT_CARDS, {
        gameID: gameID, playerID: playerID,
        selectedCard: {...cardToConfigure, configuration: { type: selectedKingType, color: color }}
      })
      setShouldSelectColor(false)
      setShouldSelectKingType(false)
      setCardToConfigure(undefined)
      return
    }
  }

  const sendKingWithoutColor = (type) => {
   
      socket.emit(socketMsgTypes.SELECT_CARDS, {
        gameID: gameID, playerID: playerID,
        selectedCard: {...cardToConfigure, configuration: { type: type }}
      })
      setShouldSelectKingType(false)
      setCardToConfigure(undefined)
    
  }

  const onClickCard = (socket, card) => {
    let configuration = {}

    if (card.type === takiCardTypes.CHANGE_COLOR) {
      setShouldSelectColor(true)
      setCardToConfigure(card)
      return
    }

    if (card.type === takiCardTypes.KING) {
      setShouldSelectKingType(true)
      setCardToConfigure(card)
      return
    }

    socket.emit(socketMsgTypes.SELECT_CARDS, {
      gameID: gameID, playerID: playerID,
      selectedCard: card
    })
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

  const kingSelection = () => {
    if (shouldSelectKingType)
      return (
        <div dir="rtl">
          <button className="card" onClick={() => { sendKingWithoutColor(takiCardTypes.PLUS_THREE) }}>3+</button>
          <span className="divider" />
          <button className="card" onClick={() => { sendKingWithoutColor(takiCardTypes.PLUS_THREE_BREAK) }}>3+ שובר</button>
          <span className="divider" />
          <input
            type="radio"
            value={takiCardTypes.TAKI}
            checked={selectedKingType === takiCardTypes.TAKI}
            onChange={() => { setShouldSelectColor(true); setSelectedKingType(takiCardTypes.TAKI) }}
          />
          <span className="card">טאקי</span>
          <span className="divider" />
          <input
            type="radio"
            value={takiCardTypes.PLUS_TWO}
            checked={selectedKingType === takiCardTypes.PLUS_TWO}
            onChange={() => { setShouldSelectColor(true); setSelectedKingType(takiCardTypes.PLUS_TWO) }}
          />
          <span className="card">+2</span>
          <span className="divider" />

          <input
            type="radio"
            value={takiCardTypes.CHANGE_COLOR}
            checked={selectedKingType === takiCardTypes.CHANGE_COLOR}
            onChange={() => { setShouldSelectColor(true); setSelectedKingType(takiCardTypes.CHANGE_COLOR) }}
          />
          <span className="card">שנה צבע</span>
          <span className="divider" />

          <input
            type="radio"
            value={takiCardTypes.CHANGE_DIRECTION}
            checked={selectedKingType === takiCardTypes.CHANGE_DIRECTION}
            onChange={() => { setShouldSelectColor(true); setSelectedKingType(takiCardTypes.CHANGE_DIRECTION) }}
          />
          <span className="card">שנה כיוון</span>
          <span className="divider" />

          <input
            type="radio"
            value={takiCardTypes.STOP}
            checked={selectedKingType === takiCardTypes.STOP}
            onChange={() => { setShouldSelectColor(true); setSelectedKingType(takiCardTypes.STOP) }}
          />
          <span className="card">עצור</span>
          <span className="divider" />
        </div>)
  }

  const colorSelection = () => {
    if (shouldSelectColor)
      return (
        <div dir="rtl">
          < button
            className="yellowCard"
            onClick={() => { sendCardWithColor(takiColors.YELLOW) }}
          >צהוב</button>
          < button
            className="redCard"
            onClick={() => { sendCardWithColor(takiColors.RED) }}
          >אדום</button>
          < button
            className="greenCard"
            onClick={() => { sendCardWithColor(takiColors.GREEN) }}
          >ירוק</button>
          < button
            className="blueCard"
            onClick={() => { sendCardWithColor(takiColors.BLUE) }}
          >כחול</button>
        </div>)
  }



  if (player !== undefined && player.cards !== undefined)
    return (<div><button onClick={() => socket.emit(socketMsgTypes.TAKE_CARD_BACK, { gameID: gameID, playerID: playerID })}>החזר קלף</button>
      <button className="takeCard" onClick={() => socket.emit(socketMsgTypes.TAKE_CARD, { gameID: gameID, playerID: playerID })}>{"קח קלף, נותרו " + packLength}</button>
      <div>
        <p>{getCardsButtons(socket, player.cards)}</p>
      </div>
      {kingSelection()}
      <br></br>
      {colorSelection()}
    </div>
    )
  else
    return <div></div>

}
