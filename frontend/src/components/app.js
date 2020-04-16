import React, { useState, useEffect } from 'react';
import io from "socket.io-client"
import './App.css';
import axios from "axios"

import {isManager, setIsManager} from '../stateManager/state'
import { Piles } from "./piles";
import { PlayersList } from "./playersList";

let endPoint = "http://localhost:5000"

if (process.env.NODE_ENV === "production") {
  endPoint = "https://card-game989.herokuapp.com"
}



let socket = io.connect(endPoint);

function App() {
  const [selectedPile, setSelectedPile] = useState('');
  const [players, setPlayers] = useState([]);
  const [playerSelection, setPlayerSelection] = useState("");
  const [allowSelection, setAllowSelection] = useState(true);
  const [inGame, setInGame] = useState(false);
  //const [isManager, setIsManager] = useState(false);
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

  const onChangeGameID = e => {
    setGameID(e.target.value);
  };

  const onChangeSelectedPile = e => {
    setSelectedPile(e.target.value)
  }

  const toggleSelection = () => {
    socket.emit("selection_mode", { gameID: gameID, allowSelection: !allowSelection });

  };

  const removePlayer = (playerName) => {
    socket.emit("remove_player", { gameID: gameID, playerName: playerName });
  };
  const updatePilesAndScores = () => {
    socket.emit("update_piles_And_scores", { gameID: gameID, selectedPile: selectedPile });
    socket.emit("selection_mode", { gameID: gameID, allowSelection: !allowSelection });

  };




  const onClickName = () => {
    if (playerName !== "") {
      socket.emit("new_player", { gameID: gameID, playerName: playerName });
    }
    else {
      alert("Please Add A Message")
    }
  }

  const reshuffle = () => {
    socket.emit("reshuffle", { gameID: gameID });

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
  const onClickCard = (card) => {
    setPlayerSelection(card.number + card.sign)
    socket.emit("card_selected", { gameID: gameID, playerName: playerName, selectedCard: card });

  }

  const getCardsButtons = (cards) => {
    let i = 0
    return cards.map(card => (
      <button key={i++} onClick={() => onClickCard(card)}>{card.number + card.sign}</button>
    ))
  }


  if (!inGame) {
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
  else
    return (

      <div className="App" >
        <h1>take six, the remote version</h1>
        <h3>Game ID: {gameID}</h3>


        {isManager() ?
          <div>
            <button onClick={() => reshuffle()}>ערבב מחדש</button>
            <button onClick={() => toggleSelection()}>אפשר והסתר בחירה /חסום בחירה והראה</button>
            <button onClick={() => updatePilesAndScores()}>שייך כרטיסים לערימות</button>
            <input name="selected Pile" onChange={e => onChangeSelectedPile(e)} />

            {players.length > 0 &&
              players.map(player => {
                return (
                  <div key={player.name}>
                    <button onClick={() => removePlayer(player.name)}>{player.name}</button>
                  </div>
                )
              })
            }
          </div> : <div>


          </div>
        }
        <input value={playerName} name="playerName" onChange={e => onChange(e)} />
        
        
        <button onClick={() => onClickName()}>עדכן שם</button>
        {players.length > 0 &&
          players.map(player => {
            if (player.name === playerName)
              return (
                <div key={player.name}>
                  <p>{getCardsButtons(player.cards)}</p>
                </div>
              )
            else return <div key={player.name}></div>
          })}
        <div>{playerSelection + ":בחירתך"}</div>

     <PlayersList players={players}/>
        <Piles piles={piles} />

      </div >

    );
}

export default App;
