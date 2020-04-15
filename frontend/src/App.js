import React, { useState, useEffect } from 'react';
import io from "socket.io-client"
import './App.css';
import axios from "axios"

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
  const [isManager, setIsManager] = useState(false);
  const [gameID, setGameID] = useState("");
  const [playerName, setName] = useState("");
  const [piles, setPiles] = useState([[' ', '', ' ', ' ', ' '], [' ', ' ', ' ', '', ' '], [' ', ' ', ' ', '', ' '], [' ', ' ', ' ', ' ', '']]);



  useEffect(() => {
    socket.on("players", msg => {
      console.log('XXXX')
      console.log(msg.gameID)
      console.log(gameID)
      if (msg.gameID === gameID)
        setPlayers(msg.players);
    });
    socket.on("piles", msg => {
      console.log('YYY')
      console.log(msg.gameID)
      console.log(gameID)
      if (msg.gameID === gameID)
      setPiles(msg.piles);
    });
    socket.on("selection_mode", msg => {
      console.log('ZZZZ')
      console.log(msg.gameID)
      console.log(gameID)
      if (msg.gameID===gameID)
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
    socket.emit("selection_mode", { gameID: gameID, allowSelection:!allowSelection });
  
  };

  const removePlayer = (playerName) => {
    socket.emit("remove_player", { gameID: gameID, playerName:playerName });
  };
  const updatePilesAndScores = () => {
    socket.emit("update_piles_And_scores", { gameID: gameID, selectedPile:selectedPile });
    socket.emit("selection_mode", { gameID: gameID, allowSelection:!allowSelection });
  
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

  const checkIfGameExists = () =>{
    setIsManager(false)
    axios
    .post(endPoint + "/doesExist", {gameID: gameID})
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
    setPlayerSelection(card.number+card.sign)
    socket.emit("card_selected", { gameID: gameID, playerName: playerName, selectedCard: card });

  }

  const getCardsButtons = (cards) => {
    let i=0
    return cards.map(card => (
      <button key={i++} onClick={() => onClickCard(card)}>{card.number+card.sign}</button>
    ))
  }


const getCell=(key,value)=>{
  return (
    <div key={key}><textarea className="cell"
      rows="1"
      cols="8"
      value={value}
      readOnly={true}
    ></textarea></div>)
}

const getCardText = (card) => {
  return card===undefined?"":card.number+card.sign
}

  const getOneRow = (piles, row) => {
    let myCols = [];
    for (let pile = 0; pile < 4; pile++) {
      myCols.push(getCell(row*4+pile,getCardText(piles[pile][row])))
    }
    return <div className="flexRow" key={row}>{myCols}</div>;
  }

  const getHeaders = () => {
    let myCols = [];
    let pileHeaders = ['0','1','2','3']
    for (let i = 0; i < 4; i++) {
      myCols.push(getCell("header"+i,pileHeaders[i]))
    }
    return <div className="flexRow" key={"headers"}>{myCols}</div>;
  }

  const getRows = (piles) => {
    let myRows = [];
    myRows.push(getHeaders())
    for (let row = 0; row < 5; row++)
      myRows.push(getOneRow(piles, row));
    return <div className="flexCol" >{myRows}</div>;
  }

  const getPilesJSX = (piles) => {
    return (
      <div className="flexGrid" >{getRows(piles)}</div>
    );
  }


  if (!inGame) {
    return(
      <div className="App" >
<div>
        <button onClick={() => newGame()}>משחק חדש</button>
        </div>
      <input  name="game ID" onChange={e => onChangeGameID(e)} />
      <button onClick={() => checkIfGameExists()}>כנס למשחק</button>
    </div>
    )
  }
  else
    return (

      <div className="App" >
        <h1>take six, the remote version</h1>
        <h3>Game ID: {gameID}</h3>


        {isManager?
        <div>
          <button onClick={() => reshuffle()}>ערבב מחדש</button>
          <button onClick={() => toggleSelection()}>אפשר והסתר בחירה /חסום בחירה והראה</button>
          <button onClick={() => updatePilesAndScores()}>שייך כרטיסים לערימות</button>
          <input  name="selected Pile" onChange={e => onChangeSelectedPile(e)} />
          
          {players.length > 0 &&
          players.map(player => {
            return (
              <div key={player.name}>
                <button onClick={() => removePlayer(player.name)}>{player.name}</button>
              </div>
            )
          })
        }
        </div>:<div>
          

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

        {players.length > 0 &&
          players.map(player => {
            return (
              <div key={player.name}>
                <p>{player.name + "  Score: " + player.score + "  selection: " + player.selectedCard.show}</p>
              </div>
            )
          })
        }
        {getPilesJSX(piles)}

      </div >

    );
}

export default App;
