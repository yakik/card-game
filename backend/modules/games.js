import { reshuffle as reshuffleTakeSix, removePlayer as removeTakeSixPlayer, addNewPlayer as addNewTakeSixPlayer, getNewGame as getNewTakeSixGame } from './takeSix'
import { addNewPlayer as addNewTakiPlayer, getNewGame as getNewTakiGame } from './taki'

let games = []

export function getGame(gameID){
    for (let i=0;i<games.length;i++)
        if (games[i].ID == gameID)
            return games[i].game
}

export function getGameObject(gameID){
    for (let i=0;i<games.length;i++)
        if (games[i].ID == gameID)
            return games[i]
}

export function doesGameIDExist(gameID){
    let exist=false
    for (let i=0;i<games.length;i++)
        if (games[i].ID == gameID)
            exist=true
    return exist
}

export function updateState(gameID, state) {
    let game = getGame(gameID)
    game.state = state
}

export function reshuffle(gameID){
    let game = getGameObject(gameID)
    if (game.type==="Take Six")
        return reshuffleTakeSix(game.game)
}

export function addPlayer(gameID, name){
    let game = getGameObject(gameID)
    if (game.type==="Take Six")
        return addNewTakeSixPlayer(game.game, name)
}

export function removePlayer(gameID, name){
    let game = getGameObject(gameID)
    if (game.type==="Take Six")
        return removeTakeSixPlayer(game.game, name)
}


export function addGame(type)
{
    let newGameID = Math.round(Math.random() * 99).toString()
    if (type==="Take Six"){
        games.push({ID:newGameID,game:getNewTakeSixGame(),type:"Take Six"})
    }
    if (type==="Taki"){
        games.push({ID:newGameID,game:getNewTakiGame(),type:"Taki"})
    }

    return newGameID

    
}