

import { reshuffle , revealCards, removePlayer,
  updatePilesAndScores,cardSelected as selectCard, updateState} from '../modules/takeSix'
import { getGame, addGame, doesGameIDExist, addPlayer} from '../modules/games'
var cors = require('cors')
var express = require('express');
var router = express.Router();

var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
}


router.post('/startNewGame', cors(corsOptions), (req, res) => {
  let newID = addGame(req.body.gameType)
  addPlayer(newID,req.body.playerName)
  return res.json({ success: true, gameID: newID });
});

router.post('/joinGame', cors(corsOptions), (req, res) => {
  let exist = doesGameIDExist(req.body.gameID)
  let status = true
  if (exist)
    status=addPlayer(req.body.gameID,req.body.playerName)
  return res.json({ success: status, exist: exist });
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
    socket.on('start_game', function (msg) {
      updateState(getGame(msg.gameID),"select_cards")
      io.emit('game_state', {gameID:msg.gameID,game:getGame(msg.gameID)});
    });

    socket.on('update_piles_And_scores', function (msg) {
      let remainingCards = updatePilesAndScores(getGame(msg.gameID),msg.selectedPile, msg.playersToProcess)
      if (remainingCards==0)
        updateState(getGame(msg.gameID),"select_cards")
      sendState(io,msg.gameID,getGame(msg.gameID))
    });
    socket.on('remove_player', function (msg) {
      removePlayer(getGame(msg.gameID),msg.playerName)
      sendState(io,msg.gameID,getGame(msg.gameID))
    });
    socket.on('reveal_cards', function (msg) {
      updateState(getGame(msg.gameID),"cards_to_piles")
      revealCards(getGame(msg.gameID))
      sendState(io,msg.gameID,getGame(msg.gameID))
    });
   
    socket.on('reshuffle', function (msg) {
      reshuffle(getGame(msg.gameID))
      updateState(getGame(msg.gameID),"select_cards")
      sendState(io,msg.gameID,getGame(msg.gameID))
    });
   
    socket.on("select_card", function (msg) {
      selectCard(getGame(msg.gameID),msg)
      sendState(io,msg.gameID,getGame(msg.gameID))
    });

  });
  return router;
};

