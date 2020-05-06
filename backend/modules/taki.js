import { userActions, takiCardTypes, takiSpecialAction } from '../constants'
import { pullCardFromPack } from './takiPack'
import { allowed } from './takiTurns'
import {selectCardValidation} from './takiValidations'


export function getNewGame() {
    let game = {}
    game.players = []
    game.state = {}
    game.lastPlayerID = 0
    game.pack=[]
    game.onTable = []

    return game
}
export function assignCardsForPlayers(game) {
    game.players.forEach(player => {
        player.cards = []
        for (let i = 0; i < 8; i++)
            player.cards.push(pullCardFromPack(game))
        player.cards = player.cards.sort(sortCards)
    })
}

export function addNewPlayer(game, name) {
    let ID = game.lastPlayerID++
    game.players.push({ name: name, ID: ID, cards: [] })
    return ID
}

export function removePlayer(game, playerID) {
    let newPlayers = []

    game.players.map(player => {
        if (player.ID !== playerID)
            newPlayers.push(player)
        else {
            if (player.cards !== undefined) {
                player.cards.forEach(card => {
                    game.pack.push(card)
                })
            }
        }
    })
    game.players = newPlayers
}

export function getPlayer(game, ID) {
    return game.players.find((player) => player.ID === ID)
}

export function selectCard(game, msg) {
    getPlayer(game,msg.playerID).error=undefined
    if (!allowed(game,msg.playerID,userActions.SELECT_CARD))
        return
    let error=selectCardValidation(game,msg.playerID, msg.selectedCard)
    if (error!=undefined){
        console.log(msg)
        console.log(error)
        getPlayer(game,msg.playerID).error = error
        return
    }
    
    game.players = resetTakenCards(game.players)
    let player = getPlayer(game, msg.playerID)
    let newCards = player.cards.filter((card) => card.ID !== msg.selectedCard.ID)
    player.cards = newCards.sort(sortCards)
    if (msg.selectedCard.type === takiCardTypes.CHANGE_COLOR || msg.selectedCard.type === takiCardTypes.KING)
        player.requiredAction = takiSpecialAction.SELECT_COLOR
    game.onTable.push({ ...msg.selectedCard, player: player.name })
    game.lastPlayerPlacedCard = msg.playerID

}

const resetTakenCards = (players) => {
    return players.map(player => {
        let newPlayer = { ...player }
        newPlayer.newCard = undefined
        return newPlayer
    })
}

export function takeCard(game, playerID, criterion) {
    if (!allowed(game, playerID, userActions.TAKE_CARD))
        return
    game.players = resetTakenCards(game.players)
    if (game.pack.length === 0)
        return
    let card = pullCardFromPack(game, criterion)
    let player = getPlayer(game, playerID)
    player.newCard = card

    player.cards.push(player.newCard)
    player.cards = player.cards.sort(sortCards)
}

export function resetCard(card) {
    let newCard = { ...card }
    if (newCard.type === takiCardTypes.KING)
        newCard.kingSelection = undefined
    if (newCard.type === takiCardTypes.CHANGE_COLOR)
        newCard.changeColorSelection = undefined
    newCard.player = undefined
    return newCard

}

export function takeCardBack(game, playerID) {
    if (playerID === game.lastPlayerPlacedCard) {
        let player = getPlayer(game, playerID)
        let card = game.onTable.pop()
        player.cards.push(resetCard(card))
        player.cards = player.cards.sort(sortCards)
        game.lastPlayerPlacedCard = undefined
    }
}

const sortCards = (a, b) => { return (a.forSorting) - (b.forSorting) }


