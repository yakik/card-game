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


describe("take six tests", () => {


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