import React, { useState, useEffect } from 'react';
import { Piles } from "./piles";
import { PlayersList } from "./playersList";
import { Management } from "./management";
import { CardSelection } from "./cardSelection";



export function TakeSix({gameID, socket, playerName, isManager, endPoint}) {
  
  const [game, setGame] = useState({});
  const [allowSelection, setAllowSelection] = useState(true);
  const [gameState,setGameState] = useState("not_in_game")

  if (game.players===undefined)
    socket.emit("refresh", { gameID: gameID});

  useEffect(() => {
    socket.on("game_state", msg => {
      if (msg.gameID === gameID){
        setGame(msg.game)
        setAllowSelection(msg.game.allowSelection);
        setGameState(msg.game.gameState)
      }
    });
  });
  if (game.players===undefined)
  return (<div>Loading...</div>)
  else
  return (

      <div className="App" >
        <h1>take six, the remote version</h1>
        <h3>Game ID: {gameID}</h3>
        <Management allowSelection={allowSelection} playerName={playerName} gameID={gameID} socket={socket} isManager={isManager} players={game.players} />
        <CardSelection playerName={playerName} gameID={gameID} socket={socket} players={game.players} />
        <PlayersList players={game.players} />
        <Piles piles={game.piles} />
      </div >

    );
}

