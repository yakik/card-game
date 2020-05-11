import { turnDirections, takiCardTypes } from "../../constants";

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

const changeDirection = (game) => {
    if (game.turn.direction === turnDirections.LEFT_TO_RIGHT)
        game.turn.direction = turnDirections.RIGHT_TO_LEFT
    else
        game.turn.direction = turnDirections.LEFT_TO_RIGHT
}

export function handleEndTakiSeries(game, playerID) {
    game.turn = { ...game.turn, inTakiSeries: false, inTakiSeriesPlayerID: undefined }
    setNextPlayer(game, getNextPlayerID(game.turn.playerID, game.players, game.turn.direction))
}

export function updateTurnAfterSeletingCard(game, playerID, selectedCard) {

    if (game.turn === undefined) {
        game.turn = { playerID: game.players[0].ID, direction: turnDirections.LEFT_TO_RIGHT }
    }

    if (selectedCard.type === takiCardTypes.CHANGE_DIRECTION)
        changeDirection(game)

    if (selectedCard.type === takiCardTypes.TAKI ||
        selectedCard.type === takiCardTypes.KING && selectedCard.configuration.type === takiCardTypes.TAKI) {
        game.turn = { ...game.turn, inTakiSeries: true, inTakiSeriesPlayerID: playerID }
    }
    else
        if (!game.turn.inTakiSeries)
            setNextPlayer(game, getNextPlayerID(game.turn.playerID, game.players, game.turn.direction, selectedCard.type))
}

export function getNextPlayerID(currentPlayerID, players, direction, cardType) {
    let currentPlayerIndex = players.findIndex((player) => player.ID === currentPlayerID)
    let nextPlayerIndex
    let steps = 1
    if (cardType === takiCardTypes.STOP)
        steps = 2
    if (direction === turnDirections.LEFT_TO_RIGHT)
        nextPlayerIndex = (currentPlayerIndex + steps) % (players.length)
    else
        nextPlayerIndex = (players.length + currentPlayerIndex - steps) % players.length

    return players[nextPlayerIndex].ID
}