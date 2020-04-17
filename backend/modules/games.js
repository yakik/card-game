import { getNewTakeSixGame } from './takeSix'

let games = []
let gameID=0

export function getGame(gameID){
    for (let i=0;i<games.length;i++)
        if (games[i].ID == gameID)
            return games[i].game
}

export function doesGameIDExist(gameID){
    let exist=false
    for (let i=0;i<games.length;i++)
        if (games[i].ID == gameID)
            exist=true
    return exist
}

export function addGame(type)
{
    let newGameID = Math.round(Math.random() * 99).toString()
    if (type==="Take Six"){
        games.push({ID:newGameID,game:getNewTakeSixGame()})
    }
    if (type==="Taki"){
        games.push({ID:newGameID,game:getNewTakiGame()})
    }

    return newGameID

    
}