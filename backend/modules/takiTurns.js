export function allowed(game, playerID, action) {
    return (game.turn === undefined || game.turn.player === playerID);
}

export function setTurn(game,turn){
    game.turn = turn
}
