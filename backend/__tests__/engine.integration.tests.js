import {

} from "../modules/pack";


function whichPileToAdd(piles,card){
    return -2
} 



describe("validation tests", () => {


    test.skip("between", () => {

        let piles = [[{number:4},{number:16},{number:27}],
        [{number:18}],
        [{number:2},{number:17},{number:35},{number:56},{number:90}],
        [{number:30},{number:45},{number:56}]]

        let card = {number:19}

        expect(whichPileToAdd(piles,card)).toBe(1)

        
    });

    test.skip("largest", () => {

        let piles = [[{number:4},{number:16},{number:27}],
        [{number:18}],
        [{number:2},{number:17},{number:35},{number:56},{number:90}],
        [{number:30},{number:45},{number:56}]]

        let card = {number:92}

        expect(whichPileToAdd(piles,card)).toBe(2)

        
    });

    test.skip("smaller", () => {

        let piles = [[{number:4},{number:16},{number:27}],
        [{number:18}],
        [{number:2},{number:17},{number:35},{number:56},{number:90}],
        [{number:30},{number:45},{number:56}]]

        let card = {number:1}

        expect(whichPileToAdd(piles,card)).toBe(-1)

        
    });

})