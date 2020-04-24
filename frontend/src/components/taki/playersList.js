import React from 'react';


export function PlayersList({ players }) {

  const getCol = (colKey, width, title, fieldName, players, anotherFieldName) => {
    let col = []
    let key = 0
    col.push(<textarea disabled={true} cols={width} rows="1" className="cell" key={key} value={title}></textarea>)
    players.map(player => {
      if (anotherFieldName==2){
        col.push(<textarea cols={width} rows="1"key={++key} disabled={true} className="cell" value={player.cards.length}/>)
      } else {
      if (anotherFieldName === undefined)
        col.push(<textarea cols={width} rows="1"key={++key} disabled={true} className="cell" value={player[fieldName]}/>)
      else
        col.push(<textarea cols={width} rows="1" key={++key} disabled={true} className="cell" value={player[fieldName][anotherFieldName]}/>)
    }})
    return (<div key={colKey} className="flexCol">{col}</div>)
  }

  const getGrid = (players) => {
    let rows = []
    let colKey = 0
    rows.push(getCol(++colKey,10, "Name", "name", players))
    rows.push(getCol(++colKey,10, "Cards", "", players,2))
   
    return (<div className="flexGrid">{rows}</div>)
  }

  return getGrid(players)

}
 