import React, {useState} from 'react';


export function CardSelection({ playerName, gameID,socket, players }) {
    const [playerSelection, setPlayerSelection] = useState("");

    const onClickCard = (socket,card) => {
        setPlayerSelection(card.number + card.sign)
        socket.emit("card_selected", { gameID: gameID, playerName: playerName, selectedCard: card });
    
      }
    
      const getCardsButtons = (socket,cards) => {
        let i = 0
        return cards.map(card => (
          <button key={i++} onClick={() => onClickCard(socket,card)}>{card.number + card.sign}</button>
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
          <div>{playerSelection + ":בחירתך"}</div></div>)
}
