import {

} from "../modules/cards";


function whichPileToAdd(piles, card) {
    for (let l = 0; l < 101; l++) {
        for (let i = 0; i < piles.length; i++) {
            for (let r = 0; r < piles[i].length; r++) {
                if ((piles[i][r].number) + l == card.number) {
                    return (i)
                }
                if (l == 100) {
                    return (-1)
                }
            }
        }
    }
}

function updatePilesAndScores(piles, players, pileToReplace){
    let t = whichPileToAdd(piles, card)
}

describe("take six tests", () => {


    test("updating piles, no selected replace", () => {

        let piles = [[{ number: 4 ,points:1}, { number: 16,points:1 }, { number: 27,points:1 }],
        [{ number: 18,points:1 }],
        [{ number: 2,points:1 }, { number: 17,points:1 }, { number: 35,points:2 }, { number: 56,points:1 }, { number: 90,points:3 }],
        [{ number: 30,points:3 }, { number: 45,points:2 }, { number: 57,points:1 }]]

        let players = [{ name: 'Yaakov', score: 0, selectedCard: {number:19, points:1 }},
                        { name: 'Esav', score: 0, selectedCard: {number:92, points:3 }}]

    updatePilesAndScores(piles,players)


        expect(players[0].score).toBe(0)
        expect(players[1].score).toBe(8)
        expect(piles[2][0].number).toBe(92)
        expect(piles[2][0].points).toBe(3)
        expect(piles[1][1].number).toBe(19)
        expect(piles[1][1].points).toBe(1)

    });

    test("updating piles, with selected replace", () => {

        let piles = [[{ number: 4 ,points:1}, { number: 16,points:1 }, { number: 27,points:1 }],
        [{ number: 18,points:1 }],
        [{ number: 2,points:1 }, { number: 17,points:1 }, { number: 35,points:2 }, { number: 56,points:1 }, { number: 90,points:3 }],
        [{ number: 30,points:3 }, { number: 45,points:2 }, { number: 57,points:1 }]]

        let players = [{ name: 'Yaakov', score: 0, selectedCard: {number:19, points:1 }},
                        { name: 'Esav', score: 0, selectedCard: {number:2, points:3 }}]

    updatePilesAndScores(piles,players,3)


        expect(players[0].score).toBe(0)
        expect(players[1].score).toBe(6)
        expect(piles[3][0].number).toBe(2)
        expect(piles[3][0].points).toBe(3)
        expect(piles[1][1].number).toBe(19)
        expect(piles[1][1].points).toBe(1)

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