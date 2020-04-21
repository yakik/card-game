import { reshuffle as reshuffleTakeSix, removePlayer as removeTakeSixPlayer, addNewPlayer as addNewTakeSixPlayer, getNewGame as getNewTakeSixGame } from './takeSix'
import { addNewPlayer as addNewTakiPlayer, getNewGame as getNewTakiGame } from './taki'
import {gameTypes} from '../constants'

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
    if (game.type===gameTypes.TAKE_SIX)
        return reshuffleTakeSix(game.game)
}

export function addPlayer(gameID, name){
    let game = getGameObject(gameID)
    if (game.type===gameTypes.TAKE_SIX)
        return addNewTakeSixPlayer(game.game, name)
}

export function removePlayer(gameID, name){
    let game = getGameObject(gameID)
    if (game.type===gameTypes.TAKE_SIX)
        return removeTakeSixPlayer(game.game, name)
}


export function addGame(type)
{
    let newGameID = Math.round(Math.random() * 99).toString()
    if (type===gameTypes.TAKE_SIX){
        games.push({ID:newGameID,game:getNewTakeSixGame(),type:gameTypes.TAKE_SIX})
    }
    if (type===gameTypes.TAKI){
        games.push({ID:newGameID,game:getNewTakiGame(),type:gameTypes.TAKE_SIX})
    }

    return newGameID

    
}