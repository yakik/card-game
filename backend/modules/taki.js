import { takiCardTypes, takiColors, takiSpecialAction } from '../constants'


export function getNewGame() {
    let game = {}
    game.players = []
    game.state = "new"
    game.lastAction = "משחק מתחיל"
    game.lastPlayerID = 0
    game.onTable = []
    reshuffle(game)

    return game
}
export function getCardsForPlayer(oldPack) {
    let pack = oldPack.slice()
    let cards = []
    for (let u = 0; u < 8; u++)
        cards.push(pack.pop())
    cards = cards.sort(function (a, b) { return a.number - b.number })
    return { cards: cards, pack: pack }
}
export function addNewPlayer(game, name) {
    let cards
    let a = getCardsForPlayer(game.pack)
    cards = a.cards.sort(sortCards)
    game.pack = a.pack
    let ID = game.lastPlayerID++
    game.players.push({ name: name, ID: ID, cards: cards })
    return ID
}

function getShuffledPack() {
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

    for (let i = 0; i < 4; i++)
        pack.push({ ID: id++, forSorting: 1001, type: takiCardTypes.CHANGE_COLOR })
    pack.push({ ID: id++, forSorting: 1005, type: takiCardTypes.KING })
    pack.push({ ID: id++, forSorting: 1006, type: takiCardTypes.KING })
    for (let i = 0; i < 3; i++)
        pack.push({ ID: id++, forSorting: 1007, type: takiCardTypes.PLUS_THREE_BREAK })
    for (let i = 0; i < 3; i++)
        pack.push({ ID: id++, forSorting: 1012, type: takiCardTypes.PLUS_THREE })
    for (let f = 0; f < 300; f++) {
        let cardIndexA = Math.round(Math.random() * (pack.length - 1))
        let cardIndexB = Math.round(Math.random() * (pack.length - 1))
        let p = pack[cardIndexA]
        pack[cardIndexA] = pack[cardIndexB]
        pack[cardIndexB] = p
        f = f + 1
    }
    return pack
}
export function removePlayer(game, playerID) {
    let newPlayers = []

    game.players.map(player => {
        if (player.ID !== playerID)
            newPlayers.push(player)
        else {
            player.cards.map(card => {
                game.pack.push(card)
            })
        }
    })
    game.players = newPlayers
}

const getPlayer = (game, ID) => {
    return game.players.find((player) => player.ID === ID)
}

export function selectCard(game, msg) {
    game.players = resetTakenCards(game.players)
    let player = getPlayer(game, msg.playerID)
    let newCards = player.cards.filter((card)=> card.ID!==msg.selectedCard.ID)
    player.cards = newCards.sort(sortCards)
    if (msg.selectedCard.type===takiCardTypes.CHANGE_COLOR || msg.selectedCard.type===takiCardTypes.KING)
        player.requiredAction=takiSpecialAction.SELECT_COLOR
    game.onTable.push(msg.selectedCard)
    game.lastPlayerPlacedCard = msg.playerID
    game.lastAction = player.name + " הניח קלף "

}

const resetTakenCards=(players)=>{
    return players.map(player=>{
        let newPlayer = {...player}
        newPlayer.newCard = undefined
        return newPlayer
    })
}

export function takeCard(game, playerID) {
    game.players = resetTakenCards(game.players)
    if (game.pack.length === 0)
        return
    let player = getPlayer(game, playerID)
    player.newCard = game.pack.pop()
    player.cards.push(player.newCard)
    player.cards = player.cards.sort(sortCards)
    game.lastAction = player.name + " לקח קלף "
}

function resetCard(card) {
    let newCard = { ...card }
    if (card.type = takiCardTypes.KING)
        card.kingSelection = undefined
    if (card.type = takiCardTypes.CHANGE_COLOR)
        card.changeColorSelection = undefined
    return newCard

}

export function takeCardBack(game, playerID) {
    if (playerID === game.lastPlayerPlacedCard) {
        let player = getPlayer(game, playerID)
        player.newCard = game.onTable.pop()
        player.cards.push(resetCard(player.newCard))
        game.lastAction = player.name + " לקח קלף בחזרה "
        player.cards = player.cards.sort(sortCards)
        game.lastPlayerPlacedCard = undefined
    }
}
export function reshuffleUsedCards(game) {
    let cardsOnTable = game.onTable.length - 1
    for (let i = 0; i < cardsOnTable; i++)
        game.pack.push(resetCard(game.onTable.shift()))
    for (let f = 0; f < 300; f++) {
        let cardIndexA = Math.round(Math.random() * (game.pack.length - 1))
        let cardIndexB = Math.round(Math.random() * (game.pack.length - 1))
        let p = game.pack[cardIndexA]
        game.pack[cardIndexA] = game.pack[cardIndexB]
        game.pack[cardIndexB] = p
        f = f + 1
    }
    game.lastAction = " הכררטיסים מוחזרו "
}

const sortCards = (a, b) => { return (a.forSorting) - (b.forSorting) }

export function reshuffle(game) {
    game.pack = getShuffledPack()
    
    game.players.map(player => {
        let a = getCardsForPlayer(game.pack)
        let cards = a.cards
        game.pack = a.pack
        player.cards = cards.sort(sortCards)

    })
    game.onTable.push(game.pack.pop())

}


