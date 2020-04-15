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
    console.log(allowSelection)
    if (!allowSelection)
        game.players = game.players.sort(function (a, b) { return a.selectedCard.replace(/\*/g, '') - b.selectedCard.replace(/\*/g, '') })

}

export function addPlayer(game, name) {
    let cards
    let a = getCardsForPlayer(game.pack)
    cards = a.cards
    game.pack = a.pack
    game.players.push({ name: name, score: 0, cards: cards, selectedCard: "X" })
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
        player.selectedCard = "X"
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
        /* player.cards = player.cards.map(card => {
                return card == msg.selectedCard ? "X" : card
            })*/
        }
        //game.players = game.players.sort(function (a, b) { return a.selectedCard.replace(/\*/g, '') - b.selectedCard.replace(/\*/g, '') })

    })
}

export function getPlayers(game) {
    return game.players
}

export function getPiles(game) {
    return game.piles
}