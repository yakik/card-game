import React, {useState} from 'react';


export function CardSelection({ playerName, gameID,socket, players , gameState}) {
    const [playerSelection, setPlayerSelection] = useState("");

    const onClickCard = (socket,card) => {
        setPlayerSelection(card.number + card.sign)
        socket.emit("select_card", { gameID: gameID, playerName: playerName, selectedCard: card });
    
      }
    
const canSelectCard=(gameState)=>{
  if (gameState==="select_cards" || gameState==="all_selected")
    return true
  else
    return false
}

      const getCardsButtons = (socket,cards) => {
        let i = 0
        return cards.map(card => (
          <button disabled={!canSelectCard(gameState)} key={i++} onClick={() => onClickCard(socket,card)}>{card.number + card.sign}</button>
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
