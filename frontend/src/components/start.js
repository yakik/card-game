import React, { useState } from 'react';
import axios from "axios"
import io from "socket.io-client"
import './App.css';
import { TakeSix } from './takeSix'
import { Taki } from './taki/taki'
import {routes, states, gameTypes, endPoints, envTyoes} from '../constants'

let endPoint = endPoints.LOCAL_HOST

if (process.env.NODE_ENV === envTyoes.PRODUCTION) {
  endPoint = endPoints.PRODUCTION
}

let socket = io.connect(endPoint);


export function Start() {
  const [newPlayerName, setNewPlayerName] = useState("");
  const [gameType, setGameType] = useState("");
  const [newGameID, setNewGameID] = useState([]);
  const [state, setState] = useState(states.NOT_IN_GAME);

    const onChangeGameID = e => {
        setNewGameID(e.target.value);
      }
    
    const joinGame = (gameType) => {
        axios
          .post(endPoint + routes.JOIN_GAME, { gameID: newGameID , playerName: newPlayerName})
          .then(
            res => {
              setNewGameID(newGameID)
              setState(states.IN_GAME_NOT_MANAGER)
              setGameType (gameType)
            },
            error => {
              console.log(error);
            }
          )
          
      }
    
      const newGame = (gameType) => {
        axios
          .post(endPoint + routes.START_NEW_GAME, {gameType: gameType, playerName: newPlayerName})
          .then(
            res => {
              let ID = res.data.gameID
              setNewGameID(ID)
              setState(states.IN_GAME_AS_MANAGER)
              setGameType (gameType)
            },
            error => {
              console.log(error);
            }
          )
      }

     


  const onChangeNewPlayerName = e => {
    setNewPlayerName(e.target.value);
  };

  if (state === states.NOT_IN_GAME) {
    return (
      <div className="App" >
        <p>הקלד מספר המשחק</p>
        <input name="game ID" onChange={e => onChangeGameID(e)} />
        <p>הקלד שם שחקן</p>
        <input name="playerName" onChange={e => onChangeNewPlayerName(e)} />
        <br></br>
        <div>
          <button disabled={newPlayerName===""} onClick={() => newGame(gameTypes.TAKE_SIX)}>משחק טייק סיקס חדש</button>
          <button disabled={newPlayerName===""} onClick={() => joinGame()}>הצטרף למשחק טייק סיקס</button>
        </div>
        <br></br>
        <div>
          <button disabled={newPlayerName===""} onClick={() => newGame(gameTypes.TAKI)}>משחק טאקי חדש</button>
          <button disabled={newPlayerName===""} onClick={() => joinGame()}>הצטרף למשחק טאקי</button>
        </div>

      </div>
    )
  }
  else {
if ( gameType===gameTypes.TAKE_SIX)
    return (<TakeSix gameID={newGameID.toString()} playerName={newPlayerName}
     isManager={state === states.IN_GAME_AS_MANAGER ? true : false} socket={socket} endPoint={endPoint} />)
else
return (<Taki gameID={newGameID.toString()} playerName={newPlayerName}
     isManager={state === states.IN_GAME_AS_MANAGER ? true : false} socket={socket} endPoint={endPoint} />)

  }
}
