import { getShuffledPack, getCardsForPlayer } from './cards'

export function getNewTakeSixGame() {
    let game = {}
    game.players = []
    game.allowSelection = true
    reshuffle(game)
    return game
}
export function setSelectionMode(game,allowSelection){
    game.allowSelection=allowSelection
    if (!allowSelection) {
        game.players = game.players.sort(function (a, b) { return a.selectedCard.number - b.selectedCard.number })
        for (let i = 0; i < game.players.length; i++)
            game.players[i].selectedCard.show = game.players[i].selectedCard.number + game.players[i].selectedCard.sign
    }

}

export function addPlayer(game, name) {
    let cards
    let a = getCardsForPlayer(game.pack)
    cards = a.cards
    game.pack = a.pack
    game.players.push({ name: name, score: 0, cards: cards, selectedCard:{number:"X",sign:"", show:'--'}})
}

export function reshuffle(game) {
    let cards
    game.pack = getShuffledPack()
    let a = getCardsForPlayer(game.pack)
    cards = a.cards
    game.pack = a.pack
    game.players.map(player => {
        player.cards = cards
        player.score = 0
        player.selectedCard = {number:"X",sign:""}
    })
    game.piles = [[], [], [], []]
    for (let i = 0; i < 4; i++)
        game.piles[i].push(game.pack.pop())
}

export function newGame(game) {
    game.players = []
    game.pack = getShuffledPack()
    game.piles = [[], [], [], []]
    for (let i = 0; i < 4; i++)
        game.piles[i].push(game.pack.pop())
}

export function cardSelected(game, msg) {
    game.players.map(player => {
        if (player.name == msg.playerName) {
            player.selectedCard = msg.selectedCard
            player.selectedCard.show = "?"
        }

    })
}

export function getPlayers(game) {
    return game.players
}

export function getPiles(game) {
    return game.piles
}