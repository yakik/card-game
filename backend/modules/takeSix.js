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


export function whichPileToAdd(piles,selectedCard) {
    for (let l = 0; l < 101; l++) {
        for (let i = 0; i < piles.length; i++) {
            for (let r = 0; r < piles[i].length; r++) {
                if ((piles[i][r].number) + l == selectedCard.number) {
                    return (i)
                }
                if (l == 100) {
                    return (-1)
                }
            }
        }
    }
}


export function updatePilesAndScores(game, pileToReplace) {

    game.players = game.players.sort(function (a, b) { return a.selectedCard.number - b.selectedCard.number })

    for (let playerIndex = 0; playerIndex < game.players.length; playerIndex++) {
        let t = whichPileToAdd(game.piles, game.players[playerIndex].selectedCard)
        let newPileItem = Object.assign({},game.players[playerIndex].selectedCard)
        if (t != -1) {
            if (game.piles[t].length == 5) {
                for (let y = 0; y < game.piles[t].length; y++) {
                    game.players[playerIndex].score += game.piles[t][y].points
                }
                game.piles[t] = [newPileItem]
            }
            else {
                game.piles[t].push(newPileItem)
            }
        }
        if (t == -1) {
            for (let y = 0; y < game.piles[pileToReplace].length; y++) {
                game.players[playerIndex].score += game.piles[pileToReplace][y].points
            }
            game.piles[pileToReplace] = [newPileItem]
        }
        let newCards = []
        game.players[playerIndex].cards.map(card => {
            if (card.number !== game.players[playerIndex].selectedCard.number)
                newCards.push(card)
        })
        game.players[playerIndex].cards = newCards
        game.players[playerIndex].selectedCard.show="--"
        game.players[playerIndex].selectedCard.number=""

    }
}