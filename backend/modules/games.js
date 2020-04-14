import { getNewTakeSixGame } from './takeSix'

let games = []

export function getGame(gameID){
    return games[0].game
}

export function addGame(type)
{
    if (type==="Take Six"){
        games.push({ID:0,game:getNewTakeSixGame()})
    }

    return 0
    
}