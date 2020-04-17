

import { addPlayer,reshuffle , setSelectionMode,newGame, removePlayer,
  updatePilesAndScores,cardSelected, getPlayers, getPiles} from '../modules/takeSix'
import { getGame, addGame, doesGameIDExist} from '../modules/games'
var cors = require('cors')
var express = require('express');
var router = express.Router();

var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
}



router.post('/getGameID', cors(corsOptions), (req, res) => {
  let newID = addGame(req.body.gameType)
  addPlayer(getGame(newID),req.body.playerName)
  return res.json({ success: true, gameID: newID });
});

router.post('/doesExist', cors(corsOptions), (req, res) => {
  let exist = doesGameIDExist(req.body.gameID)
  if (exist)
    addPlayer(getGame(req.body.gameID),req.body.playerName)
  return res.json({ success: true, exist: exist });
});

const sendState=(io, gameID, game)=>{
  io.emit('game_state', {gameID,game:game});
}

module.exports = function (io) {
  //Socket.IO
  io.on('connection', function (socket) {
    console.log('User has connected to Index');
    //ON Events
    socket.on('refresh', function (msg) {
      io.emit('game_state', {gameID:msg.gameID,game:getGame(msg.gameID)});
    });
    socket.on('update_piles_And_scores', function (msg) {
      updatePilesAndScores(getGame(msg.gameID),msg.selectedPile)
      sendState(io,msg.gameID,getGame(msg.gameID))
    });
    socket.on('remove_player', function (msg) {
      removePlayer(getGame(msg.gameID),msg.playerName)
      sendState(io,msg.gameID,getGame(msg.gameID))
    });
    socket.on('new_player', function (msg) {
      addPlayer(getGame(msg.gameID),msg.playerName)
      sendState(io,msg.gameID,getGame(msg.gameID))
    });
    socket.on('selection_mode', function (msg) {
      setSelectionMode(getGame(msg.gameID),msg.allowSelection)
      sendState(io,msg.gameID,getGame(msg.gameID))
    });
   
    socket.on('reshuffle', function (msg) {
      reshuffle(getGame(msg.gameID))
      sendState(io,msg.gameID,getGame(msg.gameID))
    });
   
    socket.on("card_selected", function (msg) {
      cardSelected(getGame(msg.gameID),msg)
      sendState(io,msg.gameID,getGame(msg.gameID))
    });

  });
  return router;
};

