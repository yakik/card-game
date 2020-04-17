
export function getNewTakiGame() {
    let game = {}
    game.players = []
    game.state = "new"
    reshuffle(game)
    return game
}

function addTakiPlayer(game, name) {
    let cards
    let a = getCardsForPlayer(game.pack)
    cards = a.cards
    game.pack = a.pack
    game.players.push({ name: name, score: 0, cards: cards, selectedCard: { number: "X", sign: "", show: '--' } })
}

function getShuffledPack() {
    let pack = []
    let colors = ["red", "blue", "green", "yellow"]
    colors.map(color => {
        for (let i = 1; i < 10; i++)
            pack.push({ type: color + " " + i })
    })
    for (let f = 0; f < 300; f++) {
        let a = Math.round(Math.random() * pack.length())
        let b = Math.round(Math.random() * pack.length())
        let p = pack[a]
        pack[a] = pack[b]
        pack[b] = p
        f = f + 1
    }
    return pack
}



function reshuffle(game) {
    game.pack = getShuffledPack()
}

function newGame(game) {
    game.players = []
    game.pack = getShuffledPack()
    game.piles = [[], [], [], []]
    for (let i = 0; i < 4; i++)
        game.piles[i].push(game.pack.pop())
}

