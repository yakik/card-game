

import { addPlayer,reshuffle , newGame, cardSelected, getPlayers, getPiles} from '../modules/takeSix'
import { getGame, addGame} from '../modules/games'

var express = require('express');
var router = express.Router();

var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
}

let gameID = addGame('Take Six')
reshuffle(getGame(gameID))


module.exports = function (io) {
  //Socket.IO
  io.on('connection', function (socket) {
    console.log('User has connected to Index');
    //ON Events
   
    socket.on('new_player', function (name) {
      addPlayer(getGame(gameID),name)
      io.emit('players', getPlayers(getGame(gameID)));
      io.emit('piles', getPiles(getGame(gameID)));
    });
   
    socket.on('reshuffle', function () {
      reshuffle(getGame(gameID))
      io.emit('piles', getPiles(getGame(gameID)));
      io.emit('players', getPlayers(getGame(gameID)));
    });
   
    socket.on('new_game', function () {
      newGame(getGame(gameID))
      io.emit('piles', getPiles(getGame(gameID)));
      io.emit('players', getPlayers(getGame(gameID)));
    });
   
    socket.on("card_selected", function (msg) {
      cardSelected(getGame(0),msg)
     
      io.emit('players', getPlayers(getGame(gameID)));
    });

  });
  return router;
};

