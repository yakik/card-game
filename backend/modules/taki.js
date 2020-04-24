
export function getNewGame() {
    let game = {}
    game.players = []
    game.state = "new"
    game.onTable = []
    reshuffle(game)
    game.onTable.push(game.pack.pop())
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
    cards = a.cards
    game.pack = a.pack
    game.players.push({ name: name, cards: cards })
}

function getShuffledPack() {
    let pack = []
    let id = 0
    let colors = ["  אדום ", "כחול ", "ירוק ", "צהוב"]
    for (let j = 0; j < 2; j++) {
        colors.map(color => {
            for (let i = 1; i < 10; i++){
                if (i!==2)
                pack.push({ id: id++, color: color, type: i })
                else
                pack.push({ id: id++, color: color, type: "2 פלוס " })
            }
            pack.push({ id: id++, color: color, type: "עצור" })
            pack.push({ id: id++, color: color, type: "שנה כיוון" })
            pack.push({ id: id++, color: color, type: "פלוס" })
            pack.push({ id: id++, color: color, type: "טאקי" })



        })
    }
    pack.push({ id: id++, color: "", type: "שנה צבע" })
    pack.push({ id: id++, color: "", type: "שנה צבע" })
    pack.push({ id: id++, color: "", type: "שנה צבע" })
    pack.push({ id: id++, color: "", type: "שנה צבע" })
    pack.push({ id: id++, color: "", type: "מלך" })
    pack.push({ id: id++, color: "", type: "מלך" })
    pack.push({ id: id++, color: "", type: "שובר פלוס שלוש" })
    pack.push({ id: id++, color: "", type: "שובר פלוס שלוש" })
    pack.push({ id: id++, color: "", type: "שובר פלוס שלוש" })
    pack.push({ id: id++, color: "", type: "פלוס שלוש" })
    pack.push({ id: id++, color: "", type: "פלוס שלוש" })
    pack.push({ id: id++, color: "", type: "פלוס שלוש" })
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
    console.log(game.pack.length)
    console.log(game.pack)
    console.log('---------')
}
export function selectCard(game, msg) {
    for (let playerIndex = 0; playerIndex < game.players.length; playerIndex++) {
        if (game.players[playerIndex].name === msg.playerName) {
            let newCards = []
            game.players[playerIndex].cards.map(card => {
                if (msg.selectedCard.id !== card.id)
                    newCards.push(card)
            })
            game.players[playerIndex].cards = newCards
        }
    }
    game.onTable.push(msg.selectedCard)

}

export function takeCard(game, playerName) {
    game.players.map(player => {
        if (player.name === playerName)
            player.cards.push(game.pack.pop())
    })
}




export function reshuffle(game) {
    game.pack = getShuffledPack()

    game.players.map(player => {
        let a = getCardsForPlayer(game.pack)
        let cards = a.cards
        game.pack = a.pack
        player.cards = cards

    })

}



