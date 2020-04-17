import { getShuffledPack, getCardsForPlayer } from './cards'

//adding_players -> select_cards -> all_selected -> cards_to_piles -> select cards

export function getNewGame() {
    let game = {}
    game.players = []
    game.allowSelection = true
    game.state = "adding_players"
    reshuffle(game)
    return game
}
export function revealCards(game) {
        game.players = game.players.sort(function (a, b) { return a.selectedCard.number - b.selectedCard.number })
        for (let i = 0; i < game.players.length; i++)
            game.players[i].selectedCard.show = game.players[i].selectedCard.number + game.players[i].selectedCard.sign
}

export function addNewPlayer(game, name) {
    let cards
    let a = getCardsForPlayer(game.pack)
    console.log(game.state)
    if (game.state!=="adding_players")
        return false
    cards = a.cards
    game.pack = a.pack
    game.players.push({ name: name, score: 0, cards: cards, selectedCard: { number: "X", sign: "", show: '--' } })
    return true
}

export function updateState(game, state) {
    game.state=state
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
        player.selectedCard = { number: "X", sign: "" }
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
    let numberOfPlayersWithSelection = 0
    game.players.map(player => {
        if (player.selectedCard.show === "?")
            numberOfPlayersWithSelection++
    })
    if (numberOfPlayersWithSelection===game.players.length)
        game.state = "all_selected"

}

export function removePlayer(game, playerName) {
    let newPlayers = []
    game.players.map(player => {
        if (player.name !== playerName)
            newPlayers.push(player)
    })
    game.players = newPlayers
}


export function getPlayers(game) {
    return game.players
}

export function getPiles(game) {
    return game.piles
}

export function whichPileToAdd(piles, selectedCard) {

    let maxAndLength = []
    if (isNaN(selectedCard.number))
        return -1
    for (let i = 0; i < piles.length; i++) {
        maxAndLength.push({ pile: i, max: piles[i][piles[i].length - 1].number })
    }
    maxAndLength = maxAndLength.sort(function (a, b) { return a.max - b.max })
    if (selectedCard.number < maxAndLength[0].max) {
        return -1
    }

    for (let i = maxAndLength.length - 1; i >= 0; i--)
        if (selectedCard.number > maxAndLength[i].max)
            return maxAndLength[i].pile

}


export function updatePilesAndScores(game, pileToReplace) {

    game.players = game.players.sort(function (a, b) { return a.selectedCard.number - b.selectedCard.number })

    for (let playerIndex = 0; playerIndex < game.players.length; playerIndex++) {
        let t = whichPileToAdd(game.piles, game.players[playerIndex].selectedCard)
        let newPileItem = Object.assign({}, game.players[playerIndex].selectedCard)
        if (t != -1) {
            if (game.piles[t] === undefined)
                return
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
            if (game.piles[pileToReplace] === undefined)
                return
            
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
        game.players[playerIndex].selectedCard.show = "--"
        game.players[playerIndex].selectedCard.number = ""

    }
}