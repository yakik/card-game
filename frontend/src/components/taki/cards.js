import React from 'react'
import { takiCardTypes, takiColors } from '../../constants'

export function getCardClass(card) {
  if (card === undefined)
    return ""
  if (card.type === takiCardTypes.KING && card.configuration !== undefined) {
    return getCardClass(card.configuration)
  }
  if (card.type === takiCardTypes.CHANGE_COLOR && card.configuration !== undefined) {
    return getCardClass(card.configuration)
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

export function getCardTestID(card) {
  let testID = "cards_" + card.type + "_" + getCardClass(card)
  if (card.color !== undefined)
    testID += "_" + card.color
  if (card.numnber !== undefined)
    testID += "_" + card.number
  return testID
}

const getTypeText = (card) => {
  let typeText
  switch (card.type) {
    case takiCardTypes.STOP: typeText = 'עצור'
      break
    case takiCardTypes.CHANGE_DIRECTION: typeText = 'שנה כיוון'
      break
    case takiCardTypes.PLUS: typeText = '+'
      break
    case takiCardTypes.PLUS_TWO: typeText = '+2'
      break
    case takiCardTypes.NUMBER: typeText = card.number
      break
    case takiCardTypes.CHANGE_COLOR: typeText = 'שנה צבע'
      break
    case takiCardTypes.TAKI: typeText = 'טאקי'
      break
    case takiCardTypes.KING: typeText = 'מלך'
      break
    case takiCardTypes.PLUS_THREE: typeText = '+3'
      break
    case takiCardTypes.PLUS_THREE_BREAK: typeText = 'שובר +3'
      break
    default: typeText = 'לא ידוע'
  }

  return typeText

}

export function getCardText(card) {
  let typeText = ''
  if (card === undefined)
    typeText = "---"
  else if (card.type === takiCardTypes.KING && card.configuration !== undefined) {
    typeText = " מלך " + getTypeText(card.configuration)
  }
  else
    typeText = getTypeText(card)

  let playerText = ""
  if (card.player !== undefined)
    playerText = " (" + card.player + ") "
  return <div><span>{playerText}</span><span>{typeText}</span></div>
}