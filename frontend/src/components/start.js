import React, { useState } from 'react';
import axios from "axios"
import io from "socket.io-client"
import './App.css';
import { TakeSix } from './takeSix'

let endPoint = "http://localhost:5000"

if (process.env.NODE_ENV === "production") {
  endPoint = "https://card-game989.herokuapp.com"
}

let socket = io.connect(endPoint);


export function Start() {
  const [newPlayerName, setNewPlayerName] = useState("");
  const [newGameID, setNewGameID] = useState([]);
  const [state, setState] = useState("not_in_game");

    const onChangeGameID = e => {
        setNewGameID(e.target.value);
      }
    
    const joinGame = (gameType) => {
        axios
          .post(endPoint + "/joinGame", { gameID: newGameID , playerName: newPlayerName})
          .then(
            res => {
              let exist = res.data.exist
              setNewGameID(newGameID)
              setState("in_game_not_manager")
            },
            error => {
              console.log(error);
            }
          )
          
      }
    
      const newGame = (gameType) => {
        axios
          .post(endPoint + "/startNewGame", {gameType: gameType, playerName: newPlayerName})
          .then(
            res => {
              let ID = res.data.gameID
              setNewGameID(ID)
              setState("in_game_manager")
            },
            error => {
              console.log(error);
            }
          )
      }

     


  const onChangeNewPlayerName = e => {
    setNewPlayerName(e.target.value);
  };

  if (state === "not_in_game") {
    return (
      <div className="App" >
        <p>הקלד מספר המשחק</p>
        <input name="game ID" onChange={e => onChangeGameID(e)} />
        <p>הקלד שם שחקן</p>
        <input name="playerName" onChange={e => onChangeNewPlayerName(e)} />
        <div>
          <button disabled={newPlayerName===""} onClick={() => newGame("Take Six")}>משחק טייק סיקס חדש</button>
          <button disabled={newPlayerName===""} onClick={() => joinGame()}>הצטרף למשחק טייק סיקס</button>
        </div>
        <div>
          <button disabled={(process.env.NODE_ENV === "production") } onClick={() => newGame("Taki")}>משחק טאקי חדש</button>
          <button disabled={(process.env.NODE_ENV === "production") } onClick={() => joinGame()}>הצטרף למשחק טאקי</button>
        </div>

      </div>
    )
  }
  else {

    return (<TakeSix gameID={newGameID.toString()} playerName={newPlayerName} isManager={state === "in_game_manager" ? true : false} socket={socket} endPoint={endPoint} />)
  }
}
