const { Given, When, Then } = require("cucumber");
const { expect } = require("chai");
import {
  getPlayerName,addCardToPlayer,getPlayerID,selectCard, takeCard, getPlayer, addNewPlayer as addNewTakiPlayer,
  getNewGame as getNewTakiGame, removePlayer as removeTakiPlayer, selectCard as selectCardTaki
} from '../../modules/taki/taki'
import { getTakiPack, getTakiCard, setGamePack } from "../../modules/taki/takiPack"
import {  takiCardTypes, turnDirections } from '../../constants'
import {handleEndTakiSeries, setTurn, getCurrentTurnPlayerID} from '../../modules/taki/takiTurns'
import { getShuffledPack } from '../../modules/cards';

Given("a game with players:", function(dataTable) {
  this.game = getNewTakiGame()
  setGamePack(this.game, getShuffledPack(getTakiPack()));
  dataTable.rawTable[0].forEach(player=>addNewTakiPlayer(this.game, player))
});

Given("it is {string} turn, direction is {string}", function(playerName,turnDirection) {
  setTurn(this.game,getPlayerID(this.game,playerName),turnDirections[turnDirection])
});

When('{string} places a {string} {int} card on the table', function (playerName, color, number) {
  let card = getTakiCard(takiCardTypes.NUMBER,{number:number,color:color} )
  addCardToPlayer(this.game,getPlayerID(this.game,playerName),card)
  selectCard(this.game, { playerID: getPlayerID(this.game,playerName), selectedCard: card })
  
});

When('{string} takes a card from the pack', function (playerName) {
  takeCard(this.game, getPlayerID(this.game,playerName))
});

When('{string} places a {string} {string} card on the table', function (playerName, color, cardType) {
  let card = getTakiCard(takiCardTypes[cardType],{color:color})
  addCardToPlayer(this.game,getPlayerID(this.game,playerName),card)
  selectCard(this.game, { playerID: getPlayerID(this.game,playerName), selectedCard: card })
});

When('{string} places a King {string} {string} card on the table', function (playerName, color, cardType) {
  let card = getTakiCard(takiCardTypes.KING)
  addCardToPlayer(this.game,getPlayerID(this.game,playerName),card)
  selectCard(this.game, { playerID: getPlayerID(this.game,playerName),
    selectedCard: {...card,configuration:{type:takiCardTypes[cardType],color:color}}})
});

When('{string} indicates Taki series is done', function (playerName) {
  handleEndTakiSeries(this.game,getPlayerID(this.game,playerName))
});

Then('next player is {string}', function (playerName) {
  expect(getPlayerName(this.game,getCurrentTurnPlayerID(this.game))).to.eql(playerName)
});

 
