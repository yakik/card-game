import React from 'react';


export function PlayersList({ players }) {

  
  const getGrid = (players) => {
    let cells = []
    let key = 0
    cells.push(<div className="card-no-padding" key={key++}>שחקן</div>)
    cells.push(<div className="card-no-padding" key={key++}>קלפים</div>)
    players.forEach(player => {
      cells.push(<div className="card-no-padding" key={key++}>{player.name}</div>)
      if (player.cards !== undefined)
        cells.push(<div className="card-no-padding" key={key++}>{player.cards.length}</div>)
      else
        cells.push(<div key={key++}></div>)
    })
    return (<div className="players-list">{cells}</div>)
  }

  return getGrid(players)

}
