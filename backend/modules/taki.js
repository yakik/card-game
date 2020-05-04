import { takiCardTypes, takiColors, takiSpecialAction } from '../constants'
import { getShuffledPack } from './cards'


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

export function getTakiPack() {
    let pack = []
    let id = 0
    let colorCounter = 0
    let colors = [takiColors.GREEN, takiColors.YELLOW, takiColors.BLUE, takiColors.RED]

    colors.map(color => {
        colorCounter++
        for (let j = 0; j < 2; j++) {
            for (let i = 1; i < 10; i++) {
                if (i !== 2)
                    pack.push({ ID: id++, forSorting: colorCounter * 100 + i, color: color, number: i, type: takiCardTypes.NUMBER })
                else
                    pack.push({ ID: id++, forSorting: colorCounter * 100 + i, color: color, type: takiCardTypes.PLUS_TWO })
            }
            pack.push({ ID: id++, forSorting: colorCounter * 100 + 30, color: color, type: takiCardTypes.STOP })
            pack.push({ ID: id++, forSorting: colorCounter * 100 + 31, color: color, type: takiCardTypes.CHANGE_DIRECTION })
            pack.push({ ID: id++, forSorting: colorCounter * 100 + 32, color: color, type: takiCardTypes.PLUS })
            pack.push({ ID: id++, forSorting: colorCounter * 100 + 33, color: color, type: takiCardTypes.TAKI })
        }
    })

    for (let i = 0; i < 6; i++)
        pack.push({ ID: id++, forSorting: 1001, color: takiColors.NOT_APPLICABLE, type: takiCardTypes.CHANGE_COLOR })
    pack.push({ ID: id++, forSorting: 1005, color: takiColors.NOT_APPLICABLE, type: takiCardTypes.KING })
    pack.push({ ID: id++, forSorting: 1006, color: takiColors.NOT_APPLICABLE, type: takiCardTypes.KING })
    for (let i = 0; i < 2; i++)
        pack.push({ ID: id++, forSorting: 1007, color: takiColors.NOT_APPLICABLE, type: takiCardTypes.PLUS_THREE_BREAK })
    for (let i = 0; i < 2; i++)
        pack.push({ ID: id++, forSorting: 1012, color: takiColors.NOT_APPLICABLE, type: takiCardTypes.PLUS_THREE })

    return pack
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
    if (game.turn !== undefined && game.turn.player !== msg.playerID)
        return
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
    if (game.turn!==undefined && game.turn.player!==playerID)
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

function resetCard(card) {
    let newCard = { ...card }
    if (newCard.type === takiCardTypes.KING)
        newCard.kingSelection = undefined
    if (newCard.type === takiCardTypes.CHANGE_COLOR)
        newCard.changeColorSelection = undefined
    newCard.player = undefined
    return newCard

}
export function setTurn(game,turn){
    game.turn = turn
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
export function reshuffleUsedCards(game) {
    let cardsOnTable = game.onTable.length - 1
    for (let i = 0; i < cardsOnTable; i++)
        game.pack.push(resetCard(game.onTable.shift()))
    if (game.pack.length > 1) {
        for (let f = 0; f < 300; f++) {
            let cardIndexA = Math.round(Math.random() * (game.pack.length - 1))
            let cardIndexB = Math.round(Math.random() * (game.pack.length - 1))
            let p = game.pack[cardIndexA]
            game.pack[cardIndexA] = game.pack[cardIndexB]
            game.pack[cardIndexB] = p
            f = f + 1
        }
    }
}

const sortCards = (a, b) => { return (a.forSorting) - (b.forSorting) }

export function setGamePack(game, pack) {
    game.pack = pack
}

export function setOnTable(game, card) {
    game.onTable = []
    game.onTable.push(card)
}

export function reshuffle(game) {
    game.onTable = []
    setGamePack(game, getShuffledPack(getTakiPack()))
    assignCardsForPlayers(game)
    setOnTable(game, pullCardFromPack(game,{type:takiCardTypes.NUMBER}))
}

export function pullCardFromPack(game, criterion) {
    if (criterion === undefined)
        return game.pack.pop()
    else {
        let cardIndex
        if (criterion.type === takiCardTypes.NUMBER) {
            if (criterion.color === undefined && criterion.number === undefined)
                cardIndex = game.pack.findIndex((card) => (card.type === takiCardTypes.NUMBER))
            else
                cardIndex = game.pack.findIndex((card) => (card.type === criterion.type && card.color === criterion.color && card.number === criterion.number))
        } else
            cardIndex = game.pack.findIndex((card) => (card.color === criterion.color && card.type === criterion.type))

        let card = game.pack.splice(cardIndex, 1)[0]
        return card
    }
}


