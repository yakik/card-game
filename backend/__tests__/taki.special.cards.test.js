import {
    takeCardBack, selectCard, takeCard, getPlayer, addNewPlayer as addNewTakiPlayer,
    getNewGame as getNewTakiGame, removePlayer as removeTakiPlayer, selectCard as selectCardTaki
} from '../modules/taki'
import { reshuffleUsedCards, pullCardFromPack, setGamePack } from "../modules/takiPack"
import { getTakiPack } from "../modules/takiPack"
import { instructionTypes, takiCardTypes, takiColors, takiSpecialAction } from '../constants'
import { setTurn } from '../modules/takiTurns'



describe("Special cards", () => {


    test("change color no color", () => {
        let game = getNewTakiGame()
        let gameJustForPack = getNewTakiGame()
        setGamePack(gameJustForPack, getTakiPack())

        game.pack.push(pullCardFromPack(gameJustForPack, { type: takiCardTypes.CHANGE_COLOR }))

        let playerOneID = addNewTakiPlayer(game, "player one")

        takeCard(game, playerOneID)

        selectCard(game, { playerID: playerOneID, selectedCard: getPlayer(game, playerOneID).cards[0] })

        expect(getPlayer(game, playerOneID).cards.length).toBe(1) //card not taken
        expect(game.selectCardInstructions[0].playerID).toBe(playerOneID)
        expect(game.selectCardInstructions[0].instructionType).toBe(instructionTypes.SELECT_COLOR)
    })

    test("change color with color", () => {
        let game = getNewTakiGame()
        let gameJustForPack = getNewTakiGame()
        setGamePack(gameJustForPack, getTakiPack())

        game.pack.push(pullCardFromPack(gameJustForPack, { type: takiCardTypes.CHANGE_COLOR }))

        let playerOneID = addNewTakiPlayer(game, "player one")

        takeCard(game, playerOneID)

        selectCard(game, {
            playerID: playerOneID,
            selectedCard: {
                ...getPlayer(game, playerOneID).cards[0],
                configuration: { color: takiColors.BLUE }
            }
        })

        expect(getPlayer(game, playerOneID).cards.length).toBe(0) //card taken
        expect(game.selectCardInstructions.length).toBe(0)
    })
    
    test("king no type", () => {
        let game = getNewTakiGame()
        let gameJustForPack = getNewTakiGame()
        setGamePack(gameJustForPack, getTakiPack())

        game.pack.push(pullCardFromPack(gameJustForPack, { type: takiCardTypes.KING }))

        let playerOneID = addNewTakiPlayer(game, "player one")

        takeCard(game, playerOneID)

        selectCard(game, { playerID: playerOneID, selectedCard: getPlayer(game, playerOneID).cards[0] })

        expect(getPlayer(game, playerOneID).cards.length).toBe(1) //card not taken
        expect(game.selectCardInstructions[0].playerID).toBe(playerOneID)
        expect(game.selectCardInstructions[0].instructionType).toBe(instructionTypes.SELECT_TYPE_FOR_KING)
    })

    test("king change color no color", () => {
        let game = getNewTakiGame()
        let gameJustForPack = getNewTakiGame()
        setGamePack(gameJustForPack, getTakiPack())

        game.pack.push(pullCardFromPack(gameJustForPack, { type: takiCardTypes.KING }))

        let playerOneID = addNewTakiPlayer(game, "player one")

        takeCard(game, playerOneID)

        selectCard(game, { playerID: playerOneID,
            selectedCard: {
                ...getPlayer(game, playerOneID).cards[0],
                configuration: { type: takiCardTypes.CHANGE_COLOR}
            }})

        expect(getPlayer(game, playerOneID).cards.length).toBe(1) //card not taken
        expect(game.selectCardInstructions[0].playerID).toBe(playerOneID)
        expect(game.selectCardInstructions[0].instructionType).toBe(instructionTypes.SELECT_TYPE_FOR_KING)
        expect(game.selectCardInstructions[1].playerID).toBe(playerOneID)
        expect(game.selectCardInstructions[1].instructionType).toBe(instructionTypes.SELECT_COLOR)
    })

    test("king change color take card", () => {
        let game = getNewTakiGame()
        let gameJustForPack = getNewTakiGame()
        setGamePack(gameJustForPack, getTakiPack())

        game.pack.push(pullCardFromPack(gameJustForPack, { type: takiCardTypes.KING }))

        let playerOneID = addNewTakiPlayer(game, "player one")

        takeCard(game, playerOneID)

        selectCard(game, { playerID: playerOneID,
            selectedCard: {
                ...getPlayer(game, playerOneID).cards[0],
                configuration: { type: takiCardTypes.CHANGE_COLOR, color: takiColors.BLUE}
            }})

        expect(getPlayer(game, playerOneID).cards.length).toBe(0) //card taken
        expect(game.selectCardInstructions.length).toBe(0)
    })


})