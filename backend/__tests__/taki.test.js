import { takiCardTypes } from '../constants'
let hafoc=1
let bonosgadol=1
const setNextPlayer = (game, currentPlayerCardType) =>{
    let bonosplus=1
    let somer=0
    if (currentPlayerCardType==takiCardTypes.STOP){
        bonosgadol=2
    }
    if (currentPlayerCardType==takiCardTypes.CHANGE_ORDER){
        hafoc= -1*hafoc
    }
    if (currentPlayerCardType==takiCardTypes.PLUS){
        somer=1
    }
    bonosplus=1*bonosgadol*hafoc
    bonosgadol=1
    game.prevPlayer=game.currentPlayerIndex
    game.nextPlayer=game.players[(game.currentPlayerIndex+bonosplus)%(game.players.length)]
    if (somer==1){
        game.nextPlayer=game.prevPlayer
    }
    
} 


describe("taki tests", () => {


    test("who's next stop", () => {


        let game = {}
        game.prevPlayer = 0
        game.currentPlayerIndex = 1
        game.players=[0,1,2]

        setNextPlayer(game, takiCardTypes.STOP)
       
        expect(game.nextPlayer).toBe(0)
        expect(game.prevPlayer).toBe(1)

    })

    test("who's next change order", () => {


        let game = {}
        game.prevPlayer = 0
        game.currentPlayerIndex = 1
        game.players=[0,1,2]

        setNextPlayer(game, takiCardTypes.CHANGE_ORDER)

        expect(game.nextPlayer).toBe(0)
        expect(game.prevPlayer).toBe(1)
    })
    test("who's next change order upList", () => {


        let game = {}
        game.prevPlayer = 2
        game.currentPlayerIndex = 1
        game.players=[0,1,2]

        setNextPlayer(game, takiCardTypes.CHANGE_ORDER)

        expect(game.nextPlayer).toBe(2)
        expect(game.prevPlayer).toBe(1)

    })

    test("who's next plus", () => {


       let game = {}
        game.prevPlayer = 0
        game.currentPlayerIndex = 1
        game.players=[0,1,2]

        setNextPlayer(game, takiCardTypes.PLUS)
        
        expect(game.nextPlayer).toBe(1)
        expect(game.prevPlayer).toBe(1)

    })

    test("who's next number", () => {

    let game = {}
        game.prevPlayer = 0
        game.currentPlayerIndex = 1
        game.players=[0,1,2]

        setNextPlayer(game, takiCardTypes.NUMBER)
        
        expect(game.nextPlayer).toBe(2)
        expect(game.prevPlayer).toBe(1)


    })
    test("who's next number upList", () => {


    let game = {}
        game.prevPlayer = 2
        game.currentPlayerIndex = 1
        game.players=[0,1,2]
        hafoc=-1
        setNextPlayer(game, takiCardTypes.NUMBER)
        
        expect(game.nextPlayer).toBe(0)
        expect(game.prevPlayer).toBe(1)


    })

    test("who's next change color", () => {

    let game = {}
        game.prevPlayer = 0
        game.currentPlayerIndex = 1
        game.players=[0,1,2]
        hafoc=1
        setNextPlayer(game, takiCardTypes.CHANGE_COLOR)
        
        expect(game.nextPlayer).toBe(2)
        expect(game.prevPlayer).toBe(1)


    })


})