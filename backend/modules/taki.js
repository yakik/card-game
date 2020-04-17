import { getShuffledPack, getCardsForPlayer } from './cards'

export function getNewTakiGame() {
    let game = {}
    game.players = []
    game.state = "new"
    reshuffle(game)
    return game
}
export function setSelectionMode(game, allowSelection) {
    game.allowSelection = allowSelection
    if (!allowSelection) {
        game.players = game.players.sort(function (a, b) { return a.selectedCard.number - b.selectedCard.number })
        for (let i = 0; i < game.players.length; i++)
            game.players[i].selectedCard.show = game.players[i].selectedCard.number + game.players[i].selectedCard.sign
    }
}

export function addTakiPlayer(game, name) {
    let cards
    let a = getCardsForPlayer(game.pack)
    cards = a.cards
    game.pack = a.pack
    game.players.push({ name: name, score: 0, cards: cards, selectedCard: { number: "X", sign: "", show: '--' } })
}



 function getCardsForPlayer(oldPack) {
    let pack = oldPack.slice()
    let cards = []
    for (let u = 0; u < 10; u++)
      cards.push(pack.pop())
    cards = cards.sort(function (a, b) { return a.number - b.number })
    return {cards:cards, pack:pack}
  }
  
  
   function getShuffledPack() {
    let pack = []
    let colors=["red","blue","green","yellow"]
    colors.map(color=>{
        for(let i = 1;i<10;i++)
        pack.push({type:color+" "+i})
    })
    for (let f = 0; f < 300; f++) {
        let a = Math.round(Math.random() * pack.length())
        let b = Math.round(Math.random() *  pack.length())
        let p = pack[a]
        pack[a] = pack[b]
        pack[b] = p
        f = f + 1
      }
    return pack
  }
  
  

 function reshuffle(game) {
    let cards
    game.pack = getShuffledPack()
   }

 function newGame(game) {
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