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
        expect(game.specialInstructions[0].playerID).toBe(playerOneID)
        expect(game.specialInstructions[0].instructionType).toBe(instructionTypes.SELECT_COLOR)
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
        expect(game.specialInstructions.length).toBe(0)
    })
})