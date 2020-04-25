import { takiCardType } from '../constants'

const getNextPlayer = (cardType) =>{

    return "player name" //0 , 1 or 2
} 


describe("taki tests", () => {


    test("who's next stop", () => {


        let game = {}
        game.playingOrder = "downList" // 0 -> 1 -> 2
        game.currentPlayer = "1"

        expect("0").toBe(getNextPlayer(game, takiCardType.STOP))

    })

    test("who's next change order", () => {


        let game = {}
        game.playingOrder = "downList" // 0 -> 1 -> 2
        game.currentPlayer = "1"

        expect("0").toBe(getNextPlayer(game, takiCardType.CHANGE_ORDER))

    })

    test("who's next plus", () => {


        let game = {}
        game.playingOrder = "downList" // 0 -> 1 -> 2
        game.currentPlayer = "1"

        expect("1").toBe(getNextPlayer(game, takiCardType.PLUS))

    })

    test("who's next number", () => {


        let game = {}
        game.playingOrder = "downList" // 0 -> 1 -> 2
        game.currentPlayer = "1"

        expect("2").toBe(getNextPlayer(game, takiCardType.NUMBER))

    })

    test("who's next change color", () => {


        let game = {}
        game.playingOrder = "downList" // 0 -> 1 -> 2
        game.currentPlayer = "1"

        expect("2").toBe(getNextPlayer(game, takiCardType.CHANGE_COLOR))

    })

    test("who's next taki", () => {


        let game = {}
        game.playingOrder = "downList" // 0 -> 1 -> 2
        game.currentPlayer = "1"

        expect("1").toBe(getNextPlayer(game, takiCardType.TAKI))

    })
})