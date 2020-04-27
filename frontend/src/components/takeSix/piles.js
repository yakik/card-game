import React from 'react';


export function Piles({piles}) {

    const getCell=(key,value)=>{
        return (
          <div key={key}><textarea className="cell"
            rows="1"
            cols="8"
            value={value}
            readOnly={true}
          ></textarea></div>)
      }

    const getCardText = (card) => {
        return card === undefined ? "" : card.number + card.sign
    }

    const getOneRow = (piles, row) => {
        let myCols = [];
        for (let pile = 0; pile < 4; pile++) {
            myCols.push(getCell(row * 4 + pile, getCardText(piles[pile][row])))
        }
        return <div className="flexRow" key={row}>{myCols}</div>;
    }

    const getHeaders = () => {
        let myCols = [];
        let pileHeaders = ['0', '1', '2', '3']
        for (let i = 0; i < 4; i++) {
            myCols.push(getCell("header" + i, pileHeaders[i]))
        }
        return <div className="flexRow" key={"headers"}>{myCols}</div>;
    }

    const getRows = (piles) => {
        let myRows = [];
        myRows.push(getHeaders())
        for (let row = 0; row < 5; row++)
            myRows.push(getOneRow(piles, row));
        return <div className="flexCol" >{myRows}</div>;
    }

    const getPilesJSX = (piles) => {
        return (
            <div className="flexGrid" >{getRows(piles)}</div>
        );
    }
    
return getPilesJSX(piles)
}
