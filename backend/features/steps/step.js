const { Given, When, Then } = require("cucumber");
const { expect } = require("chai");
import {
  getPlayerID,selectCard, takeCard, getPlayer, addNewPlayer as addNewTakiPlayer,
  getNewGame as getNewTakiGame, removePlayer as removeTakiPlayer, selectCard as selectCardTaki
} from '../../modules/taki'
import { getTakiPack, pullCardFromPack, setGamePack } from "../../modules/takiPack"
import {  takiCardTypes, turnDirections } from '../../constants'
import {setTurn} from '../../modules/takiTurns'

Given("a game with players:", function(dataTable) {
  this.game = getNewTakiGame()
  dataTable.rawTable[0].forEach(player=>addNewTakiPlayer(this.game, player))
});


Given("it is {string} turn, direction is {string}", function(playerName,turnDirection) {
  setTurn(this.game,getPlayerID(this.game,playerName,turnDirections[turnDirection]))
});

Given("player {string} joins the game", function(playerName) {
  addNewTakiPlayer(this.game, playerName)
});

Given("{string} takes a card from the pack", function(playerName) {
  takeCard(this.game, getPlayerID(this.game,playerName))
});

When("{string} places a {string} card on the table", function(playerName,cardType) {
  selectCard(this.game, { playerID: getPlayerID(this.game,playerName), selectedCard: getPlayer(this.game, getPlayerID(this.game,playerName)).cards[0] })
});

Then("{string} has {int} cards left", function(playerName,numberOfCards) {
  expect(getPlayer(game, getPlayerID(this.game,playerName)).cards.length).to.eql(numberOfCards)
});

 
