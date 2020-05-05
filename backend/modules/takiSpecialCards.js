import { takiCardTypes, instructionTypes } from "../constants"

export function specialCardValidated(game, playerID, card) {
    if (card.type === takiCardTypes.CHANGE_COLOR) {
        if (card.configuration !== undefined && card.configuration.color !== undefined){
            game.specialInstructions=[]
            return true
        }
        else {
            game.specialInstructions = []
            game.specialInstructions.push({ playerID: playerID, instructionType: instructionTypes.SELECT_COLOR })
            return false
        }
    }
    return true
}