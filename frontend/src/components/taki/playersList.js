import React from 'react';


export function PlayersList({ players }) {

  const getGrid = (players) => {
    let cells = []
    let key=0
    cells.push(<div key={key++}><h2>שחקן</h2></div>)
    cells.push(<div key={key++}><h2>קלפים</h2></div>)
    players.forEach(player=>{
      cells.push(<div key={key++}><h3>{player.name}</h3></div>)
      cells.push(<div key={key++}><h3>{player.cards.length}</h3></div>)
    })
    return (<div className="players-list">{cells}</div>)
    }
   
  return getGrid(players)

}
 