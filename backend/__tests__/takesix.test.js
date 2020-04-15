import {

} from "../modules/cards";


function whichPileToAdd(piles,selectedCard) {
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


function updatePilesAndScores(game, pileToReplace) {

    game.players = game.players.sort(function (a, b) { return a.selectedCard.number - b.selectedCard.number })

    for (let playerIndex = 0; playerIndex < game.players.length; playerIndex++) {
        let t = whichPileToAdd(game.piles, game.players[playerIndex].selectedCard)
        let newPileItem = { number: game.players[playerIndex].selectedCard.number, points: game.players[playerIndex].selectedCard.points }
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

describe("take six tests", () => {


    test("updating piles, no selected replace", () => {

        let piles = [[{ number: 4, points: 1 }, { number: 16, points: 1 }, { number: 27, points: 1 }],
        [{ number: 18, points: 1 }],
        [{ number: 2, points: 1 }, { number: 17, points: 1 }, { number: 35, points: 2 }, { number: 56, points: 1 }, { number: 90, points: 3 }],
        [{ number: 30, points: 3 }, { number: 45, points: 2 }, { number: 57, points: 1 }]]

        let players = [
        { name: 'Esav', score: 0, selectedCard: { number: 92, points: 1 } , cards:[{number:92}, {number:31}]},
        { name: 'Yaakov', score: 0, selectedCard: { number: 19, points: 1 } , cards:[{number:19}, {number:12}]}]
let game = {piles:piles, players:players}
        updatePilesAndScores(game)


        expect(players[0].score).toBe(0)
        expect(players[1].score).toBe(8)
        expect(piles[2][0].number).toBe(92)
        expect(piles[2][0].points).toBe(1)
        expect(piles[1][1].number).toBe(19)
        expect(piles[1][1].points).toBe(1)
        expect(players[0].selectedCard.number).toBe('')
        expect(players[0].selectedCard.show).toBe('--')
        expect(players[0].cards.length).toBe(1)

    });

    test("updating piles, with selected replace", () => {

        let piles = [[{ number: 4, points: 1 }, { number: 16, points: 1 }, { number: 27, points: 1 }],
        [{ number: 18, points: 1 }],
        [{ number: 2, points: 1 }, { number: 17, points: 1 }, { number: 35, points: 2 }, { number: 56, points: 1 }, { number: 90, points: 3 }],
        [{ number: 30, points: 3 }, { number: 45, points: 2 }, { number: 57, points: 1 }]]

        let players = [{ name: 'Esav', score: 0, selectedCard: { number: 1, points: 1 } , cards:[{number:1}, {number:31}]},
        { name: 'Yaakov', score: 0, selectedCard: { number: 19, points: 1 } , cards:[{number:19}, {number:31}]}
        ]
        let game = {piles:piles, players:players}
        updatePilesAndScores(game,3)


        expect(players[1].score).toBe(0)
        expect(players[0].score).toBe(6)
        expect(piles[3][0].number).toBe(1)
        expect(piles[3][0].points).toBe(1)
        expect(piles[1][1].number).toBe(19)
        expect(piles[1][1].points).toBe(1)

    });
    test("which pack to add, replace another", () => {

        let piles = [[{ number: 4, points: 1 }, { number: 16, points: 1 }, { number: 27, points: 1 }],
        [{ number: 18, points: 1 }],
        [{ number: 2, points: 1 }, { number: 17, points: 1 }, { number: 35, points: 2 }, { number: 56, points: 1 }, { number: 90, points: 3 }],
        [{ number: 30, points: 3 }, { number: 45, points: 2 }, { number: 57, points: 1 }]]

        let card = { number: 1 }

        expect(whichPileToAdd(piles, card)).toBe(-1)


    });
    

    test("which pack to add, between", () => {

        let piles = [[{ number: 4 }, { number: 16 }, { number: 27 }],
        [{ number: 18 }],
        [{ number: 2 }, { number: 17 }, { number: 35 }, { number: 56 }, { number: 90 }],
        [{ number: 30 }, { number: 45 }, { number: 56 }]]

        let card = { number: 19 }

        expect(whichPileToAdd(piles, card)).toBe(1)


    });

    test("which pack to add, largest", () => {

        let piles = [[{ number: 4 }, { number: 16 }, { number: 27 }],
        [{ number: 18 }],
        [{ number: 2 }, { number: 17 }, { number: 35 }, { number: 56 }, { number: 90 }],
        [{ number: 30 }, { number: 45 }, { number: 56 }]]

        let card = { number: 92 }

        expect(whichPileToAdd(piles, card)).toBe(2)


    });

    test("which pack to add, smaller", () => {

        let piles = [[{ number: 4 }, { number: 16 }, { number: 27 }],
        [{ number: 18 }],
        [{ number: 2 }, { number: 17 }, { number: 35 }, { number: 56 }, { number: 90 }],
        [{ number: 30 }, { number: 45 }, { number: 56 }]]

        let card = { number: 1 }

        expect(whichPileToAdd(piles, card)).toBe(-1)


    });

})