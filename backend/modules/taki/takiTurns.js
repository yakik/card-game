import { turnDirections, takiCardTypes } from "../../constants";
import { getTopCardOnTable } from "./takiPack"

export function allowed(game, playerID, action) {
    return (game.turn === undefined || game.turn.playerID === playerID);
}

export function setTurn(game, playerID, direction) {
    game.turn = { playerID: playerID, direction: direction }
}

export function getCurrentTurnPlayerID(game) {
    return game.turn.playerID
}

const setNextPlayer = (game, nextPlayerID) => {
    game.turn.playerID = nextPlayerID
}

const getCardType = (card) => {
    if (card.type === takiCardTypes.KING)
        return card.configuration.type
    return card.type
}

const changeDirection = (game) => {
    if (game.turn.direction === turnDirections.LEFT_TO_RIGHT)
        game.turn.direction = turnDirections.RIGHT_TO_LEFT
    else
        game.turn.direction = turnDirections.LEFT_TO_RIGHT
}

export function handleEndTakiSeries(game, playerID) {
    game.turn = { ...game.turn, inTakiSeries: false, inTakiSeriesPlayerID: undefined }
    updateTurnAfterSeletingCard(game, playerID, getTopCardOnTable(game), true)
}

export function setDefaultTurn (game){
    if (game.turn === undefined) {
        game.turn = { playerID: game.players[0].ID, direction: turnDirections.LEFT_TO_RIGHT }
    }
}


export function updateTurnAfterSeletingCard(game, playerID, selectedCard, lastTakiCard) {
    if (lastTakiCard === undefined)
        lastTakiCard = false

        setDefaultTurn(game)

    if (!game.turn.inTakiSeries && getCardType(selectedCard) === takiCardTypes.CHANGE_DIRECTION)
        changeDirection(game)

    if (!lastTakiCard && getCardType(selectedCard) === takiCardTypes.TAKI) {
        game.turn = { ...game.turn, inTakiSeries: true, inTakiSeriesPlayerID: playerID }
        return
    }

    if (getCardType(selectedCard) === takiCardTypes.PLUS) {
        game.turn = { ...game.turn, inPlus: true, inPlusPlayerID: playerID }
        return
    }

    if (game.turn.inPlus) {
        game.turn = { ...game.turn, inPlus: false, inPlusPlayerID: undefined }
    }

    if (!game.turn.inTakiSeries)
        setNextPlayer(game, getNextPlayerID(game.turn.playerID, game.players, game.turn.direction, getCardType(selectedCard)))
}

export function updateTurnAfterTakingCard(game, playerID) {
    setDefaultTurn(game)
    setNextPlayer(game, getNextPlayerID(game.turn.playerID, game.players, game.turn.direction))
}

export function getNextPlayerID(currentPlayerID, players, direction, cardType) {
    let currentPlayerIndex = players.findIndex((player) => player.ID === currentPlayerID)
    let nextPlayerIndex
    let steps = 1
    if (cardType !== undefined) {
        if (cardType === takiCardTypes.STOP)
            steps = 2
    }
    if (direction === turnDirections.LEFT_TO_RIGHT)
        nextPlayerIndex = (currentPlayerIndex + steps) % (players.length)
    else
        nextPlayerIndex = (players.length + currentPlayerIndex - steps) % players.length

    return players[nextPlayerIndex].ID
}
