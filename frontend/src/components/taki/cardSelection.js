import React, { useState } from 'react';
import { socketMsgTypes, takiColors, takiCardTypes } from '../../constants'

import { getCardClass, getCardText, getCardTestID } from './cards'

export function CardSelection({ showDoneTakiButton, packLength, playerID, gameID, socket, player }) {
  const [shouldSelectColor, setShouldSelectColor] = useState(false);
  const [shouldSelectKingType, setShouldSelectKingType] = useState(false);
  const [selectedKingType, setSelectedKingType] = useState('')
  const [cardToConfigure, setCardToConfigure] = useState(undefined)

  const sendCardWithColor = (color) => {
    if (cardToConfigure.type === takiCardTypes.CHANGE_COLOR) {
      socket.emit(socketMsgTypes.SELECT_CARDS, {
        gameID: gameID, playerID: playerID,
        selectedCard: { ...cardToConfigure, configuration: { color: color } }
      })
      setShouldSelectColor(false)
      setCardToConfigure(undefined)
      return
    }

    if (cardToConfigure.type === takiCardTypes.KING) {

      socket.emit(socketMsgTypes.SELECT_CARDS, {
        gameID: gameID, playerID: playerID,
        selectedCard: { ...cardToConfigure, configuration: { type: selectedKingType, color: color } }
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
      selectedCard: { ...cardToConfigure, configuration: { type: type } }
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
    setShouldSelectColor(false)
    setShouldSelectKingType(false)
    setCardToConfigure(undefined)
  }

  const getCardsButtons = (socket, cards) => {
    let i = 0
    return cards.map(card => {
      let scaleCSS = ""
      if (player.newCard !== undefined && card.ID === player.newCard.ID) {
        scaleCSS = " scaled"
      }
      return (
        <button data-testid={getCardTestID(card)} className={getCardClass(card) + scaleCSS}
        key={i++} onClick={() => onClickCard(socket, card)}>{getCardText(card)}</button>
      )
    })
  }

  const kingSelection = () => {
    if (shouldSelectKingType)
      return (
        <div dir="rtl">
          <button data-testid={"king_selection_"+takiCardTypes.PLUS_THREE} className="card" onClick={() => { sendKingWithoutColor(takiCardTypes.PLUS_THREE) }}>3+</button>
          <span className="divider" />
          <button data-testid={"king_selection_"+takiCardTypes.PLUS_THREE_BREAK} className="card" onClick={() => { sendKingWithoutColor(takiCardTypes.PLUS_THREE_BREAK) }}>3+ שובר</button>
          <span className="divider" />
          <input
            type="radio"
            data-testid={"king_selection_"+takiCardTypes.TAKI}
            value={takiCardTypes.TAKI}
            checked={selectedKingType === takiCardTypes.TAKI}
            onChange={() => { setShouldSelectColor(true); setSelectedKingType(takiCardTypes.TAKI) }}
          />
          <span className="card-no-padding">טאקי</span>
          <span className="divider" />
          <input
            type="radio"
            data-testid={"king_selection_"+takiCardTypes.PLUS_TWO}
            value={takiCardTypes.PLUS_TWO}
            checked={selectedKingType === takiCardTypes.PLUS_TWO}
            onChange={() => { setShouldSelectColor(true); setSelectedKingType(takiCardTypes.PLUS_TWO) }}
          />
          <span className="card-no-padding">+2</span>
          <span className="divider" />

          <input
            type="radio"
            data-testid={"king_selection_"+takiCardTypes.CHANGE_COLOR}
            value={takiCardTypes.CHANGE_COLOR}
            checked={selectedKingType === takiCardTypes.CHANGE_COLOR}
            onChange={() => { setShouldSelectColor(true); setSelectedKingType(takiCardTypes.CHANGE_COLOR) }}
          />
          <span className="card-no-padding">שנה צבע</span>
          <span className="divider" />

          <input
            type="radio"
            data-testid={"king_selection_"+takiCardTypes.CHANGE_DIRECTION}
            value={takiCardTypes.CHANGE_DIRECTION}
            checked={selectedKingType === takiCardTypes.CHANGE_DIRECTION}
            onChange={() => { setShouldSelectColor(true); setSelectedKingType(takiCardTypes.CHANGE_DIRECTION) }}
          />
          <span className="card-no-padding">שנה כיוון</span>
          <span className="divider" />

          <input
            type="radio"
            data-testid={"king_selection_"+takiCardTypes.STOP}
            value={takiCardTypes.STOP}
            checked={selectedKingType === takiCardTypes.STOP}
            onChange={() => { setShouldSelectColor(true); setSelectedKingType(takiCardTypes.STOP) }}
          />
          <span className="card-no-padding">עצור</span>
          <span className="divider" />
        </div>)
  }

  const colorSelection = () => {
    if (shouldSelectColor)
      return (
        <div dir="rtl">
          < button
            className="yellowCard"
            data-testid={"color_selection_"+takiColors.YELLOW}
            onClick={() => { sendCardWithColor(takiColors.YELLOW) }}
          >צהוב</button>
          < button
            className="redCard"
            data-testid={"color_selection_"+takiColors.RED}
            onClick={() => { sendCardWithColor(takiColors.RED) }}
          >אדום</button>
          < button
            className="greenCard"
            data-testid={"color_selection_"+takiColors.GREEN}
            onClick={() => { sendCardWithColor(takiColors.GREEN) }}
          >ירוק</button>
          < button
            className="blueCard"
            data-testid={"color_selection_"+takiColors.BLUE}
            onClick={() => { sendCardWithColor(takiColors.BLUE) }}
          >כחול</button>
        </div>)
  }

  const endTakiSeriesButton=()=>{
    if (showDoneTakiButton)
      return <div><button onClick={() => socket.emit(socketMsgTypes.TAKI_END_TAKI_SERIES, { gameID: gameID, playerID: playerID })}>סיים רצף טאקי</button></div>
  }

  const takeCard = () => {
    socket.emit(socketMsgTypes.TAKE_CARD, { gameID: gameID, playerID: playerID })
    setShouldSelectColor(false)
    setShouldSelectKingType(false)
    setCardToConfigure(undefined)
  }

  if (player !== undefined && player.cards !== undefined)
    return (<div><button onClick={() => socket.emit(socketMsgTypes.TAKE_CARD_BACK, { gameID: gameID, playerID: playerID })}>החזר קלף</button>
      <button data-testid="take_card" className="takeCard" onClick={() => takeCard()}>{"קח קלף, נותרו " + packLength}</button>
      <div>
        <p>{getCardsButtons(socket, player.cards)}</p>
      </div>
      {kingSelection()}
      {colorSelection()}
      {endTakiSeriesButton()}
    </div>
    )
  else
    return <div></div>

}
