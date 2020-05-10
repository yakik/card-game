export function allowed(game, playerID, action) {
    return (game.turn === undefined || game.turn.player === playerID);
}

export function setTurn(game,playerID,direction){
    game.turn = {playerID:playerID, direction:direction}
}
