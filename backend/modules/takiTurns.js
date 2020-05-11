import { turnDirections } from "../constants";

export function allowed(game, playerID, action) {
    return (game.turn === undefined || game.turn.playerID === playerID);
}

export function setTurn(game,playerID,direction){
    game.turn = {playerID:playerID, direction:direction}
}

export function getCurrentTurnPlayerID(game){
    return game.turn.playerID
}

const setNextPlayer = (game,nextPlayerID)=>{
    game.turn.playerID = nextPlayerID
}

export function updateTurnAfterSeletingCard(game,playerID,selectedCard){
    
    setNextPlayer(game,getNextPlayerID(game.turn.playerID,game.players,game.turn.direction))    
}

export function getNextPlayerID(currentPlayerID,players,direction){
    let currentPlayerIndex = players.findIndex((player)=>player.ID===currentPlayerID)
    let nextPlayerIndex
    if (direction===turnDirections.LEFT_TO_RIGHT)
        nextPlayerIndex = (currentPlayerIndex+1)%(players.length)
    else{
        if (currentPlayerIndex===0)
            nextPlayerIndex=players.length-1
        else
            nextPlayerIndex=currentPlayerIndex-1
    }
        
    return players[nextPlayerIndex].ID
}
