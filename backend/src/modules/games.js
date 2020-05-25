import { reshuffle as reshuffleTakeSix, removePlayer as removeTakeSixPlayer, 
    addNewPlayer as addNewTakeSixPlayer, getNewGame as getNewTakeSixGame, selectCard as selectCardTakeSix } from './takeSix/takeSix'
import {  addNewPlayer as addNewTakiPlayer, 
    getNewGame as getNewTakiGame, removePlayer as removeTakiPlayer, selectCard as selectCardTaki } from './taki/taki'
    import {reshuffle as reshuffleTaki} from './takiPack'
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


export function addPlayer(gameID, name, playerID) {
    let game = getGameObject(gameID)
    if (game.type === gameTypes.TAKE_SIX)
        return addNewTakeSixPlayer(game.game, name, playerID)
    if (game.type === gameTypes.TAKI)
        return addNewTakiPlayer(game.game, name, playerID)
}

export function removePlayer(gameID, playerID){
    let game = getGameObject(gameID)
    if (game.type===gameTypes.TAKE_SIX)
        return removeTakeSixPlayer(game.game, playerID)
        if (game.type===gameTypes.TAKI)
        return removeTakiPlayer(game.game, playerID)
}

export function getGameType(gameID){
    let game = getGameObject(gameID)
        return game.type
}

export function addGame(type,gameID)
{
    let newGameID
    if (gameID===undefined)
        newGameID = Math.round(Math.random() * 99).toString()
    else
        newGameID = gameID
    for( let i = 0; i < games.length; i++)
        if ( games[i].ID === newGameID)
            games.splice(i, 1);
    if (type===gameTypes.TAKE_SIX){
        games.push({ID:newGameID,game:getNewTakeSixGame(),type:gameTypes.TAKE_SIX})
    }
    if (type===gameTypes.TAKI){
        games.push({ID:newGameID,game:getNewTakiGame(),type:gameTypes.TAKI})
    }

    return newGameID

    
}