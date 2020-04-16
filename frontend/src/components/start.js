import React from 'react';
import axios from "axios"


export function Start({ setIsManager, gameID,endPoint, setInGame, setGameID }) {
    
    const onChangeGameID = e => {
        setGameID(e.target.value);
      }
    
    const checkIfGameExists = () => {
        setIsManager(false)
        axios
          .post(endPoint + "/doesExist", { gameID: gameID })
          .then(
            res => {
              let exist = res.data.exist
              setInGame(exist)
            },
            error => {
              console.log(error);
            }
          )
      }
    
      const newGame = () => {
        setIsManager(true)
        axios
          .post(endPoint + "/getGameID", {})
          .then(
            res => {
              let ID = res.data.gameID
              setGameID(ID)
              setInGame(true)
            },
            error => {
              console.log(error);
            }
          )
    
      }
    

      return (
        <div className="App" >
          <div>
            <button onClick={() => newGame()}>משחק חדש</button>
          </div>
          <input name="game ID" onChange={e => onChangeGameID(e)} />
          <button onClick={() => checkIfGameExists()}>כנס למשחק</button>
        </div>
      )
}
