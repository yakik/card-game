import React, {useState} from 'react';
import {states,socketMsgTypes} from '../../constants'


export function CardSelection({ playerName, playerID, gameID,socket, players , gameState}) {
    const [playerSelection, setPlayerSelection] = useState("");

    const onClickCard = (socket,card) => {
        socket.emit(socketMsgTypes.SELECT_CARDS, { gameID: gameID, playerID: playerID, selectedCard: card });
    
      }
    


      const getCardsButtons = (socket,cards) => {
        let i = 0
        return cards.map(card => (
          <button  class={card.color} key={i++} onClick={() => onClickCard(socket,card)}>{card.type}</button>
        ))
      }
    return (
        <div>{players.length > 0 &&
            players.map(player => {
              if (player.ID === playerID)
                return (
                  <div key={player.ID}>
                    <p>{getCardsButtons(socket,player.cards)}</p>
                  </div>
                )
              else return <div key={player.ID}></div>
            })}
         <br></br></div>)
          
}
