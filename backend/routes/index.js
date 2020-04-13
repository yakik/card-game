

import { createStore} from 'redux'
import {getShuffledPack} from '../modules/pack'
import {rootReducer,getInitialState} from '../reducers/main'
var cors = require('cors')

var express = require('express');
var router = express.Router();
const store = createStore(rootReducer, getInitialState());

var players = []

let pack = getShuffledPack()
let piles = [[], [], [], []]
for (let i = 0; i < 4; i++)
  piles[i].push(pack.pop())


var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 
}

export function getCardsForPlayer() {
  let cards = []
  for (let u = 0; u < 10; u++)
    cards.push(pack.pop())
  cards = cards.sort(function (a, b) { return a.replace(/\*/g, '') - b.replace(/\*/g, '') })
  return cards
}

module.exports = function (io) {
  //Socket.IO
  io.on('connection', function (socket) {
    console.log('User has connected to Index');
    //ON Events
    socket.on('new_player', function (name) {
      players.push({ name: name, score: 0, cards: getCardsForPlayer(), selectedCard: "X" })

      io.emit('players', players);
      io.emit('piles', piles);
    });
    socket.on('reshuffle', function (name) {
      pack = getShuffledPack()
      players.map(player => {
        player.cards = getCardsForPlayer()
        player.score = 0
      })
      let piles = [[], [], [], []]
      for (let i = 0; i < 4; i++)
        piles[i].push(pack.pop())
      io.emit('piles', piles);
      io.emit('players', players);
    });
    socket.on('new_game', function (name) {
      players = []
      pack = getShuffledPack()
      let piles = [[], [], [], []]
      for (let i = 0; i < 4; i++)
        piles[i].push(pack.pop())
        io.emit('piles', piles);
      io.emit('players', players);
    });
    socket.on("card_selected", function (msg) {
      players.map(player => {
        if (player.name == msg.player) {
          player.selectedCard = msg.selectedCard
          player.cards = player.cards.map(card => {
            return card == msg.selectedCard ? "X" : card
          })
        }
        players = players.sort(function (a, b) { return a.selectedCard.replace(/\*/g, '') - b.selectedCard.replace(/\*/g, '') })

      })
      io.emit('players', players);
    });
    socket.on("add_card_to_pile", function (playerName) {
      let card
      players.map(player => {
        if (player.name == msg.player) {
          card = player.selectedCard
        }

      })

    });
  });
  return router;
};

