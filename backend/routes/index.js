

import { addPlayer,reshuffle , setSelectionMode,newGame, 
  updatePilesAndScores,cardSelected, getPlayers, getPiles} from '../modules/takeSix'
import { getGame, addGame, doesGameIDExist} from '../modules/games'
var cors = require('cors')
var express = require('express');
var router = express.Router();

var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
}

//let gameID = addGame('Take Six')
//reshuffle(getGame(gameID))

router.post('/getGameID', cors(corsOptions), (req, res) => {
  //get parameter: req.body.parameterName;
  let newID = addGame('Take Six')
  return res.json({ success: true, gameID: newID });
});

router.post('/doesExist', cors(corsOptions), (req, res) => {
  //get parameter: req.body.parameterName;
  let exist = doesGameIDExist(req.body.gameID)
  return res.json({ success: true, exist: exist });
});


module.exports = function (io) {
  //Socket.IO
  io.on('connection', function (socket) {
    console.log('User has connected to Index');
    //ON Events
   
    socket.on('update_piles_And_scores', function (msg) {
      updatePilesAndScores(getGame(msg.gameID),msg.selectedPile)
      
      io.emit('players', {gameID:msg.gameID,players:getPlayers(getGame(msg.gameID))});
      io.emit('piles', {gameID:msg.gameID,piles:getPiles(getGame(msg.gameID))});
    });
    socket.on('new_player', function (msg) {
      console.log(msg)
      addPlayer(getGame(msg.gameID),msg.playerName)
      
      io.emit('players', {gameID:msg.gameID,players:getPlayers(getGame(msg.gameID))});
      io.emit('piles', {gameID:msg.gameID,piles:getPiles(getGame(msg.gameID))});
    });
    socket.on('selection_mode', function (msg) {
      setSelectionMode(getGame(msg.gameID),msg.allowSelection)
      io.emit('selection_mode', msg);
      io.emit('players', {gameID:msg.gameID,players:getPlayers(getGame(msg.gameID))});
    });
   
    socket.on('reshuffle', function (msg) {
      reshuffle(getGame(msg.gameID))
      io.emit('piles', {gameID:msg.gameID,piles:getPiles(getGame(msg.gameID))});
      io.emit('players', {gameID:msg.gameID,players:getPlayers(getGame(msg.gameID))});
     
    });
   
   /* socket.on('new_game', function () {
      newGame(getGame(gameID))
      io.emit('piles', getPiles(getGame(gameID)));
      io.emit('players', getPlayers(getGame(gameID)));
    });*/
   
    socket.on("card_selected", function (msg) {
      cardSelected(getGame(msg.gameID),msg)
     
      io.emit('players', {gameID:msg.gameID,players:getPlayers(getGame(msg.gameID))});
    });

  });
  return router;
};

