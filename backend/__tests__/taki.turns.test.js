import { takeCardBack, selectCard, takeCard, getPlayer, addNewPlayer as addNewTakiPlayer, 
    getNewGame as getNewTakiGame, removePlayer as removeTakiPlayer, selectCard as selectCardTaki } from '../modules/taki'
import { reshuffleUsedCards, pullCardFromPack, setGamePack } from "../modules/takiPack"
import { getTakiPack } from "../modules/takiPack"
import { takiCardTypes, takiColors, takiSpecialAction } from '../constants'
import { setTurn } from '../modules/takiTurns'



describe("take and return cards", () => {


    test("cannot take card if not turn", () => {
        let game = getNewTakiGame()
        let gameJustForPack = getNewTakiGame()
        setGamePack(gameJustForPack,getTakiPack())

        game.pack.push(pullCardFromPack(gameJustForPack,{number: 5, color: takiColors.RED, type:takiCardTypes.NUMBER}))
        game.pack.push(pullCardFromPack(gameJustForPack,{number: 6, color: takiColors.RED, type:takiCardTypes.NUMBER}))
        
        let playerOneID = addNewTakiPlayer(game, "player one")
        let playerTwoID = addNewTakiPlayer(game, "player two")

        setTurn(game,{player:playerOneID, direction:1})

        expect(getPlayer(game, playerTwoID).cards.length).toBe(0)

        takeCard(game, playerTwoID)

        expect(getPlayer(game, playerTwoID).cards.length).toBe(0)

        
        
    })

    test("can take card if turn", () => {
        let game = getNewTakiGame()
        let gameJustForPack = getNewTakiGame()
        setGamePack(gameJustForPack,getTakiPack())

        game.pack.push(pullCardFromPack(gameJustForPack,{number: 5, color: takiColors.RED, type:takiCardTypes.NUMBER}))
        game.pack.push(pullCardFromPack(gameJustForPack,{number: 6, color: takiColors.RED, type:takiCardTypes.NUMBER}))
        
        let playerOneID = addNewTakiPlayer(game, "player one")
        let playerTwoID = addNewTakiPlayer(game, "player two")

        setTurn(game,{player:playerOneID, direction:1})

        expect(getPlayer(game, playerOneID).cards.length).toBe(0)

        takeCard(game, playerOneID)

        expect(getPlayer(game, playerOneID).cards.length).toBe(1)

        
        
    })

    test("cannot put card if not turn", () => {
        let game = getNewTakiGame()
        let gameJustForPack = getNewTakiGame()
        setGamePack(gameJustForPack,getTakiPack())

        game.pack.push(pullCardFromPack(gameJustForPack,{number: 5, color: takiColors.RED, type:takiCardTypes.NUMBER}))
        game.pack.push(pullCardFromPack(gameJustForPack,{number: 6, color: takiColors.RED, type:takiCardTypes.NUMBER}))
        
        let playerOneID = addNewTakiPlayer(game, "player one")
        let playerTwoID = addNewTakiPlayer(game, "player two")

        takeCard(game, playerTwoID)

        setTurn(game,{player:playerOneID, direction:1})

        expect(game.onTable.length).toBe(0)

        selectCard(game, {playerID:playerTwoID, selectedCard:getPlayer(game, playerTwoID).cards[0]})

        expect(game.onTable.length).toBe(0)

        
        
    })

    test("can put card if  turn", () => {
        let game = getNewTakiGame()
        let gameJustForPack = getNewTakiGame()
        setGamePack(gameJustForPack,getTakiPack())

        game.pack.push(pullCardFromPack(gameJustForPack,{number: 5, color: takiColors.RED, type:takiCardTypes.NUMBER}))
        game.pack.push(pullCardFromPack(gameJustForPack,{number: 6, color: takiColors.RED, type:takiCardTypes.NUMBER}))
        
        let playerOneID = addNewTakiPlayer(game, "player one")
        let playerTwoID = addNewTakiPlayer(game, "player two")

        takeCard(game, playerTwoID)

        setTurn(game,{player:playerTwoID, direction:1})

        expect(game.onTable.length).toBe(0)

        selectCard(game, {playerID:playerTwoID, selectedCard:getPlayer(game, playerTwoID).cards[0]})

        expect(game.onTable.length).toBe(1)

        
        
    })

})