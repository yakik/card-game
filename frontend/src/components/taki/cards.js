import React from 'react'
import { takiCardTypes, takiColors } from '../../constants'

export function getCardClass(card) {
  if (card === undefined)
    return ""
  if (card.type === takiCardTypes.KING && card.kingSelection !== undefined) {
    return getCardClass(card.kingSelection)
  }
  if (card.type === takiCardTypes.CHANGE_COLOR && card.changeColorSelection !== undefined) {
    return getCardClass(card.changeColorSelection)
  }
  if (card.color === undefined)
    return "specialCard"
  else {
    switch (card.color) {
      case takiColors.RED:
        return "redCard"
      case takiColors.YELLOW:
        return "yellowCard"
      case takiColors.BLUE:
        return "blueCard"
      case takiColors.GREEN:
        return "greenCard"
      default: return "specialCard"
    }
  }
}

export function getCardText(card) {
  let cardText = ''
  if (card === undefined)
    cardText = "---"
  else if (card.type === takiCardTypes.KING && card.kingSelection !== undefined) {
    cardText = " מלך " + getCardText(card.kingSelection)
  }
  else
    switch (card.type) {
      case takiCardTypes.STOP: cardText = 'עצור'
        break
      case takiCardTypes.CHANGE_DIRECTION: cardText = 'שנה כיוון'
        break
      case takiCardTypes.PLUS: cardText = '+'
        break
      case takiCardTypes.PLUS_TWO: cardText = '+2'
        break
      case takiCardTypes.NUMBER: cardText = card.number
        break
      case takiCardTypes.CHANGE_COLOR: cardText = 'שנה צבע'
        break
      case takiCardTypes.TAKI: cardText = 'טאקי'
        break
      case takiCardTypes.KING: cardText = 'מלך'
        break
      case takiCardTypes.PLUS_THREE: cardText = '+3'
        break
      case takiCardTypes.PLUS_THREE_BREAK: cardText = 'שובר +3'
        break
      default: cardText = 'לא ידוע'
    }
  let playerText = ""
  if (card.player !== undefined)
    playerText = " (" + card.player + ") "
  return <div><span>{playerText}</span><span>{cardText}</span></div>
}