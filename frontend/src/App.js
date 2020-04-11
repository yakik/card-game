import React, { useState, useEffect } from 'react';
import io from "socket.io-client"
import './App.css';

let endPoint = "http://localhost:5000"

if (process.env.NODE_ENV === "production") {
  endPoint = "https://card-game989.herokuapp.com"
}

console.log(process.env.NODE_ENV)
console.log(endPoint)


let socket = io.connect(endPoint);

function App() {
  const [players, setPlayers] = useState([]);
  const [playerName, setName] = useState("");




  useEffect(() => {
    socket.on("players", msg => {
      setPlayers(msg);
    });
  });



  const onChange = e => {
    setName(e.target.value);
  };


  const onClickName = () => {
    if (playerName !== "") {
      socket.emit("new_player", playerName);
    }
    else {
      alert("Please Add A Message")
    }
  }
  const newGame = () => {
      socket.emit("new_game", playerName);
   
  }



  return (

    <div>
      <h1>take six, the remote version</h1>
      <button onClick={() => newGame()}>משחק חדש</button>
      
      <input value={playerName} name="playerName" onChange={e => onChange(e)} />
      <button onClick={() => onClickName()}>עדכן שם</button>
      {players.length > 0 &&
        players.map(msg => {if (msg.name==playerName)
        return (
          <div>
            <p>{msg.name}</p>
            <p>{msg.score}</p>
            <p>{msg.cards.join(' ')}</p>
          </div>
        )})}

    </div>

  );
}

export default App;
