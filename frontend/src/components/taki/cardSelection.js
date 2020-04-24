import React, {useState} from 'react';
import {states,socketMsgTypes} from '../../constants'


export function CardSelection({ playerName, gameID,socket, players , gameState}) {
    const [playerSelection, setPlayerSelection] = useState("");

    const onClickCard = (socket,card) => {
        socket.emit(socketMsgTypes.SELECT_CARDS, { gameID: gameID, playerName: playerName, selectedCard: card });
    
      }
    


      const getCardsButtons = (socket,cards) => {
        let i = 0
        return cards.map(card => (
          <button  key={i++} onClick={() => onClickCard(socket,card)}>{card.color + card.type}</button>
        ))
      }
    return (
        <div>{players.length > 0 &&
            players.map(player => {
              if (player.name === playerName)
                return (
                  <div key={player.name}>
                    <p>{getCardsButtons(socket,player.cards)}</p>
                  </div>
                )
              else return <div key={player.name}></div>
            })}
         <br></br></div>)
          
}
