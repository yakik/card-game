import React, { useState, useEffect } from 'react';
import io from "socket.io-client"
import './App.css';

import { Piles } from "./piles";
import { PlayersList } from "./playersList";
import { Management } from "./management";
import { CardSelection } from "./cardSelection";
import { Start } from "./start";

let endPoint = "http://localhost:5000"

if (process.env.NODE_ENV === "production") {
  endPoint = "https://card-game989.herokuapp.com"
}

let socket = io.connect(endPoint);

function App() {
  
  const [players, setPlayers] = useState([]);
  const [allowSelection, setAllowSelection] = useState(true);
  const [inGame, setInGame] = useState(false);
  const [isManager, setIsManager] = useState(false);
  const [gameID, setGameID] = useState("");
  const [playerName, setName] = useState("");
  const [piles, setPiles] = useState([[' ', '', ' ', ' ', ' '], [' ', ' ', ' ', '', ' '], [' ', ' ', ' ', '', ' '], [' ', ' ', ' ', ' ', '']]);

  useEffect(() => {
    socket.on("players", msg => {
      if (msg.gameID === gameID)
        setPlayers(msg.players);
    });
    socket.on("piles", msg => {
      if (msg.gameID === gameID)
        setPiles(msg.piles);
    });
    socket.on("selection_mode", msg => {
      if (msg.gameID === gameID)
        setAllowSelection(msg.allowSelection);
    });
  });

  const onChange = e => {
    setName(e.target.value);
  };

  const onClickName = () => {
    if (playerName !== "") {
      socket.emit("new_player", { gameID: gameID, playerName: playerName });
    }
    else {
      alert("Please Add A Message")
    }
  }

  if (!inGame)
    return <Start setIsManager={setIsManager} gameID={gameID} endPoint={endPoint} setInGame={setInGame} setGameID={setGameID} />
  else
    return (

      <div className="App" >
        <h1>take six, the remote version</h1>
        <h3>Game ID: {gameID}</h3>

        <Management allowSelection={allowSelection} playerName={playerName} gameID={gameID} socket={socket} isManager={isManager} players={players} />

        <input value={playerName} name="playerName" onChange={e => onChange(e)} />
        <button onClick={() => onClickName()}>עדכן שם</button>

        <CardSelection playerName={playerName} gameID={gameID} socket={socket} players={players} />
        <PlayersList players={players} />
        <Piles piles={piles} />

      </div >

    );
}

export default App;
