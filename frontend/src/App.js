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
  const [selectedPile, setSelectedPile] = useState("");
  const [players, setPlayers] = useState([]);
  const [playerName, setName] = useState("");
  const [piles, setPiles] = useState([[' ', '', ' ', ' ', ' '], [' ', ' ', ' ', '', ' '], [' ', ' ', ' ', '', ' '], [' ', ' ', ' ', ' ', '']]);




  useEffect(() => {
    socket.on("players", msg => {
      setPlayers(msg);
    });
    socket.on("piles", msg => {
      setPiles(msg);
    });

  });



  const onChange = e => {
    setName(e.target.value);
  };

  const onChangePile = e => {
    setSelectedPile(e.target.value);
  };


  const onClickName = () => {
    if (playerName !== "") {
      socket.emit("new_player", playerName);
    }
    else {
      alert("Please Add A Message")
    }
  }

  const reshuffle = () => {
    socket.emit("reshuffle", playerName);

  }

  const newGame = () => {
    socket.emit("new_game", playerName);

  }
  const onClickCard = (card) => {
    socket.emit("card_selected", { player: playerName, selectedCard: card });

  }

  const getCardsButtons = (cards) => {
    return cards.map(card => (
      <button onClick={() => onClickCard(card)}>{card}</button>
    ))
  }


  const getOneRow = (piles, row) => {
    let myCols = [];
    for (let pile = 0; pile < 4; pile++) {
      myCols.push(
        <div ><textarea className="cell"
          rows="1"
          cols="8"
          value={piles[pile][row]}
          readOnly={true}
        ></textarea></div>);
    }
    return <div className="flexRow">{myCols}</div>;
  }


  const getRows = (piles) => {
    let myRows = [];
    myRows.push(getOneRow([['A'], ['B'], ['C'], ['D']], 0))
    for (let row = 0; row < 5; row++)
      myRows.push(getOneRow(piles, row));
    return <div className="flexCol">{myRows}</div>;
  }

  const getPilesJSX = (piles) => {
    return (
      <div className="flexGrid" >{getRows(piles)}</div>
    );
  }



  return (

    <div className="App" >
      <h1>take six, the remote version</h1>

      <div >
        <button onClick={() => newGame()}>משחק חדש</button>
      </div>
      <div>
        <button onClick={() => reshuffle()}>ערבב מחדש</button>
      </div>
      <h1></h1>
      <input value={playerName} name="playerName" onChange={e => onChange(e)} />
      <button onClick={() => onClickName()}>עדכן שם</button>
      {players.length > 0 &&
        players.map(msg => {
          if (msg.name == playerName)
            return (
              <div>

                <p>{getCardsButtons(msg.cards)}</p>
              </div>
            )
        })}
        <div className="flexGrid" >
      <div className="flexRow">
        <div className="flexCol">
          <input value={playerName} name="playerName" onChange={e => onChange(e)} />
        </div>
        <div className="flexCol">
        <p>חבילה לפעולה</p>
      </div>
    </div>
    </div>
      {players.length > 0 &&
    players.map(msg => {

      return (
        <div >
          <p>{msg.selectedCard + " " + msg.name + "  בחר/ה"}</p>
        </div>
      )
    })
  }
  { getPilesJSX(piles) }

    </div >

  );
}

export default App;
