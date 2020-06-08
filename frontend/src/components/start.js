import React, { useState } from 'react';
import axios from "axios"
import io from "socket.io-client"
import './App.css';
import { TakeSix } from './takeSix/takeSix'
import { Taki } from './taki/taki'
import {routes, states, gameTypes, endPoints, envTypes} from '../constants'

let endPoint = endPoints.LOCAL_HOST

if (process.env.NODE_ENV === envTypes.PRODUCTION) {
  endPoint = endPoints.PRODUCTION
}

let socket = io.connect(endPoint);


export function Start() {
  const [newPlayerName, setNewPlayerName] = useState("");
  const [playerID, setPlayerID] = useState("");
  const [gameType, setGameType] = useState("");
  const [testingMode,setTestingMode] = useState(false)
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
              setPlayerID(res.data.playerID)
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
              setPlayerID(res.data.playerID)
            },
            error => {
              console.log(error);
            }
          )
      }
      

      const startTakiTestingGame = (gameType) => {
        axios
          .post(endPoint + routes.START_TESTING_NEW_GAME, {gameType: gameType})
          .then(
            res => {
              let ID = res.data.gameID
              setNewGameID(ID)
              setState(states.IN_GAME_AS_MANAGER)
              setGameType (gameType)
              setPlayerID(0)
              setTestingMode(true)
            },
            error => {
              console.log(error);
            }
          )
      }

     const testingSelectPlayer=()=>{
       if (testingMode) {
         let selectPlayerButtons = []
         for (let i = 0; i < 4; i++)
           if (i !== playerID)
             selectPlayerButtons.push(<button key={i} onClick={() => setPlayerID(i)}>{"Player " + i}</button>)
         return <div>{selectPlayerButtons}</div>
       }
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
        <input role='nameInput'  name="playerName" onChange={e => onChangeNewPlayerName(e)} />
        <br></br>
        <div>
          <button disabled={newPlayerName===""} onClick={() => newGame(gameTypes.TAKE_SIX)}>משחק טייק סיקס חדש</button>
          <button disabled={newPlayerName===""} onClick={() => joinGame(gameTypes.TAKE_SIX)}>הצטרף למשחק טייק סיקס</button>
        </div>
        <br></br>
        <div>
          <button disabled={newPlayerName===""} onClick={() => newGame(gameTypes.TAKI)}>משחק טאקי חדש</button>
          <button disabled={newPlayerName===""} onClick={() => joinGame(gameTypes.TAKI)}>הצטרף למשחק טאקי</button>
          <button disabled={(process.env.NODE_ENV !== envTypes.PRODUCTION)} onClick={() => startTakiTestingGame(gameTypes.TAKI)}>משחק טאקי לבדיקות</button>
        </div>

      </div>
    )
  }
  else {
if ( gameType===gameTypes.TAKE_SIX)
    return (<TakeSix gameID={newGameID.toString()} playerID={playerID}
     isManager={state === states.IN_GAME_AS_MANAGER ? true : false} socket={socket} endPoint={endPoint} />)
else
return (<div>
  {testingSelectPlayer()}
  <Taki gameID={newGameID.toString()} playerID={playerID} testingMode={testingMode}
     isManager={state === states.IN_GAME_AS_MANAGER ? true : false} socket={socket} endPoint={endPoint} />
     </div>)

  }
}
