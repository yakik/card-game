import React, { useState, useEffect } from 'react';


export function PlayersList({players}) {

   
return    (<div>{players.length > 0 &&
    players.map(player => {
      return (
        <div key={player.name}>
          <p>{player.name + "  Score: " + player.score + "  selection: " + player.selectedCard.show}</p>
        </div>
      )
    })
  }</div>)
}
