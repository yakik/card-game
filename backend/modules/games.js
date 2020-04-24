import { reshuffle as reshuffleTakeSix, removePlayer as removeTakeSixPlayer, 
    addNewPlayer as addNewTakeSixPlayer, getNewGame as getNewTakeSixGame, selectCard as selectCardTakeSix } from './takeSix'
import { reshuffle as reshuffleTaki, addNewPlayer as addNewTakiPlayer, 
    getNewGame as getNewTakiGame, removePlayer as removeTakiPlayer, selectCard as selectCardTaki } from './taki'
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
        if (game.type===gameTypes.TAKI)
        return reshuffleTaki(game.game)

}
export function selectCard(gameID, msg){
    let game = getGameObject(gameID)
    if (game.type===gameTypes.TAKE_SIX)
        return selectCardTakeSix(game.game, msg)
        if (game.type===gameTypes.TAKI)
        return selectCardTaki(game.game, msg)

}


export function addPlayer(gameID, name) {
    let game = getGameObject(gameID)
    if (game.type === gameTypes.TAKE_SIX)
        return addNewTakeSixPlayer(game.game, name)
    if (game.type === gameTypes.TAKI)
        return addNewTakiPlayer(game.game, name)
}

export function removePlayer(gameID, name){
    let game = getGameObject(gameID)
    if (game.type===gameTypes.TAKE_SIX)
        return removeTakeSixPlayer(game.game, name)
        if (game.type===gameTypes.TAKI)
        return removeTakiPlayer(game.game, name)
}


export function addGame(type)
{
    let newGameID = Math.round(Math.random() * 99).toString()
    if (type===gameTypes.TAKE_SIX){
        games.push({ID:newGameID,game:getNewTakeSixGame(),type:gameTypes.TAKE_SIX})
    }
    if (type===gameTypes.TAKI){
        games.push({ID:newGameID,game:getNewTakiGame(),type:gameTypes.TAKI})
    }

    return newGameID

    
}