import {takiCardTypes,takiColors} from '../../constants'

export function getCardClass(card) {
    if (card===undefined)
        return ""
    if (card.type===takiCardTypes.KING && card.kingSelection!==undefined){
        return getCardClass(card.kingSelection)
    }
    if (card.type===takiCardTypes.CHANGE_COLOR && card.changeColorSelection!==undefined){
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

  export function getCardText(card){
    if (card===undefined)
        return "---"
    if (card.type===takiCardTypes.KING && card.kingSelection!==undefined){
        return " מלך " + getCardText(card.kingSelection)
    }
      switch (card.type){
          case takiCardTypes.STOP : return 'עצור'
          case takiCardTypes.CHANGE_DIRECTION : return 'שנה כיוון'
          case takiCardTypes.PLUS : return '+'
          case takiCardTypes.PLUS_TWO: return '+2'
          case takiCardTypes.NUMBER: return card.number
          case takiCardTypes.CHANGE_COLOR: return 'שנה צבע'
          case takiCardTypes.TAKI:return 'טאקי'
          case takiCardTypes.KING:  return 'מלך'
          case takiCardTypes.PLUS_THREE: return '+3'
          case takiCardTypes.PLUS_THREE_BREAK: return 'שובר +3'
          default: return 'לא ידוע'
      }
  }