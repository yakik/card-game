const { Given, When, Then } = require("cucumber");
const { expect } = require("chai");
import {
  getPlayerID,selectCard, takeCard, getPlayer, addNewPlayer as addNewTakiPlayer,
  getNewGame as getNewTakiGame, removePlayer as removeTakiPlayer, selectCard as selectCardTaki
} from '../../modules/taki'
import { getTakiPack, pullCardFromPack, setGamePack } from "../../modules/takiPack"
import { instructionTypes, takiCardTypes, takiColors, errors } from '../../constants'

console.log('VVVVVV')
Given("an empty game", function() {
  this.game = getNewTakiGame()
  this.gameJustForPack = getNewTakiGame()
  setGamePack(this.gameJustForPack, getTakiPack())
});

Given("pack has card of type {string}", function(cardType) {
  this.game.pack.push(pullCardFromPack(this.gameJustForPack, { type: takiCardTypes[cardType] }))
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

 
