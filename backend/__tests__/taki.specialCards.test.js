import { pullCardFromPack, getTakiPack,setGamePack, getPlayer, addNewPlayer as addNewTakiPlayer, 
    getNewGame as getNewTakiGame, removePlayer as removeTakiPlayer, selectCard as selectCardTaki } from '../modules/taki'
import { takiCardTypes, takiColors, takiSpecialAction } from '../constants'



describe("special cards", () => {


    test.skip("add player", () => {
        let game = getNewTakiGame()
        let playerOneID = addNewTakiPlayer(game, "player one")
        let playerTwoID = addNewTakiPlayer(game, "player two")
        let playerOne = getPlayer(game, playerOneID)
        let playerTwo = getPlayer(game, playerTwoID)

        let card = pullCardFromPack(game,{color: takiColors.BLUE, number:5,type:takiCardTypes.NUMBER})
       
        expect(playerOne.ID).toBe(playerOneID)
        expect(playerOne.name).toBe("player one")
    })


})