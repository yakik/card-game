
export function getNewGame() {
    let game = {}
    game.players = []
    game.state = "new"
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
    game.players.push({ name: name, cards: cards })
}

function getShuffledPack() {
    let pack = []
    let id = 0
    let colorCounter = 0
    let colors = [" אדום ", "כחול ", "ירוק ", "צהוב"]

    colors.map(color => {
        colorCounter++
        for (let j = 0; j < 2; j++) {
           
            for (let i = 1; i < 10; i++) {
                if (i !== 2)
                    pack.push({ id: id++, kind: colorCounter * 100 + i, color: color, type: i })
                else
                    pack.push({ id: id++, kind: colorCounter * 100 + i, color: color, type: "+2" })
            }
            pack.push({ id: id++, kind: colorCounter * 100 + 30, color: color, type: "עצור" })
            pack.push({ id: id++, kind: colorCounter * 100 + 31, color: color, type: "שנה כיוון" })
            pack.push({ id: id++, kind: colorCounter * 100 + 32, color: color, type: "פלוס" })
            pack.push({ id: id++, kind: colorCounter * 100 + 33, color: color, type: "טאקי" })

        }

    })

    pack.push({ id: id++, kind: 1001, color: "", type: "שנה צבע" })
    pack.push({ id: id++, kind: 1002, color: "", type: "שנה צבע" })
    pack.push({ id: id++, kind: 1003, color: "", type: "שנה צבע" })
    pack.push({ id: id++, kind: 1004, color: "", type: "שנה צבע" })
    pack.push({ id: id++, kind: 1005, color: "", type: "מלך" })
    pack.push({ id: id++, kind: 1006, color: "", type: "מלך" })
    pack.push({ id: id++, kind: 1007, color: "", type: "שובר פלוס שלוש" })
    pack.push({ id: id++, kind: 1008, color: "", type: "שובר פלוס שלוש" })
    pack.push({ id: id++, kind: 1009, color: "", type: "שובר פלוס שלוש" })
    pack.push({ id: id++, kind: 1010, color: "", type: "+3" })
    pack.push({ id: id++, kind: 1011, color: "", type: "+3" })
    pack.push({ id: id++, kind: 1012, color: "", type: "+3" })
    for (let f = 0; f < 300; f++) {
        let cardIndexA = Math.round(Math.random() * (pack.length - 1))
        let cardIndexB = Math.round(Math.random() * (pack.length - 1))
        let p = pack[cardIndexA]
        pack[cardIndexA] = pack[cardIndexB]
        pack[cardIndexB] = p
        f = f + 1
    }
    console.log(pack)
    return pack
}
export function removePlayer(game, playerName) {
    let newPlayers = []
    console.log('YYYYYYYYY')
    console.log(game.pack.length)
    console.log(game.pack)
    console.log('XXXXXXXX')

    game.players.map(player => {
        if (player.name !== playerName)
            newPlayers.push(player)
        else {
            player.cards.map(card => {
                game.pack.push(card)
            })
        }
    })
    game.players = newPlayers
}
export function selectCard(game, msg) {
    for (let playerIndex = 0; playerIndex < game.players.length; playerIndex++) {
        if (game.players[playerIndex].name === msg.playerName) {
            let newCards = []
            game.players[playerIndex].cards.map(card => {
                if (msg.selectedCard.id !== card.id)
                    newCards.push(card)
            })
            game.players[playerIndex].cards = newCards.sort(sortCards)
        }
    }
    game.onTable.push(msg.selectedCard)
    game.lastPlayerPlacedCard = msg.playerName

}

export function takeCard(game, playerName) {
    if (game.pack.length === 0)
        return
    game.players.map(player => {
        if (player.name === playerName) {
            player.cards.push(game.pack.pop())
            player.cards = player.cards.sort(sortCards)
        }
    })
}
export function takeCardBack(game, playerName) {
    if (playerName === game.lastPlayerPlacedCard) {
        game.players.map(player => {
            if (player.name === playerName)
                player.cards.push(game.onTable.pop())
        })
        game.lastPlayerPlacedCard = undefined
    }
}
export function reshuffleUsedCards(game) {
    let cardsOnTable = game.onTable.length - 1
    for (let i = 0; i < cardsOnTable; i++)
        game.pack.push(game.onTable.shift())
    for (let f = 0; f < 300; f++) {
        let cardIndexA = Math.round(Math.random() * (game.pack.length - 1))
        let cardIndexB = Math.round(Math.random() * (game.pack.length - 1))
        let p = game.pack[cardIndexA]
        game.pack[cardIndexA] = game.pack[cardIndexB]
        game.pack[cardIndexB] = p
        f = f + 1
    }
}

const sortCards = (a, b) => { return (a.kind) - (b.kind) }

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


