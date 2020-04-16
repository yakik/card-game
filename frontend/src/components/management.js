import React, { useState, useEffect } from 'react';


export function Management({ players, isManager, reshuffle, toggleSelection, updatePilesAndScores, onChangeSelectedPile, removePlayer }) {


    if (isManager()) return (
        <div>
            <button onClick={() => reshuffle()}>ערבב מחדש</button>
            <button onClick={() => toggleSelection()}>אפשר והסתר בחירה /חסום בחירה והראה</button>
            <button onClick={() => updatePilesAndScores()}>שייך כרטיסים לערימות</button>
            <input name="selected Pile" onChange={e => onChangeSelectedPile(e)} />

            {players.length > 0 &&
                players.map(player => {
                    return (
                        <div key={player.name}>
                            <button onClick={() => removePlayer(player.name)}>{player.name}</button>
                        </div>
                    )
                })
            }
        </div>)
}
