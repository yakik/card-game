import { takiCardTypes, instructionTypes } from "../constants"

export function specialCardValidated(game, playerID, card) {
    let validated = true
    game.selectCardInstructions = []
    if (card.type === takiCardTypes.KING) {
        if (card.configuration === undefined || card.configuration !== undefined && card.configuration.type === undefined) {
            game.selectCardInstructions.push({ playerID: playerID, instructionType: instructionTypes.SELECT_TYPE_FOR_KING })
            validated = false
        }
    }
    if (card.type === takiCardTypes.CHANGE_COLOR ||
        (card.type === takiCardTypes.KING && card.configuration !== undefined && card.configuration.type === takiCardTypes.CHANGE_COLOR)) {
        if (card.type === takiCardTypes.KING)
            game.selectCardInstructions.push({ playerID: playerID, instructionType: instructionTypes.SELECT_TYPE_FOR_KING })
        if (card.configuration === undefined || card.configuration.color === undefined) {
            game.selectCardInstructions.push({ playerID: playerID, instructionType: instructionTypes.SELECT_COLOR })
            validated = false
        }
        else
            game.selectCardInstructions = []
    }

    return validated
}