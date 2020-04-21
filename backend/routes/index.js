

import {  revealCards,  updatePilesAndScores,selectCard} from '../modules/takeSix'
import { reshuffle ,getGame, addGame, doesGameIDExist, addPlayer, removePlayer,updateState} from '../modules/games'
import {routes,socketMsgTypes,states} from '../constants'
var cors = require('cors')
var express = require('express');
var router = express.Router();

var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
}


router.post(routes.START_NEW_GAME, cors(corsOptions), (req, res) => {
  let newID = addGame(req.body.gameType)
  addPlayer(newID,req.body.playerName)
  return res.json({ success: true, gameID: newID });
});

router.post(routes.JOIN_GAME, cors(corsOptions), (req, res) => {
  let exist = doesGameIDExist(req.body.gameID)
  let status = true
  if (exist)
    status=addPlayer(req.body.gameID,req.body.playerName)
  return res.json({ success: status, exist: exist });
});

const sendState=(io, gameID, game)=>{
  io.emit(socketMsgTypes.SET_GAME_STATE, {gameID,game:game});
}

module.exports = function (io) {
  //Socket.IO
  io.on(socketMsgTypes.CONNECTION, function (socket) {
    console.log('User has connected to Index');
    //ON Events
    socket.on(socketMsgTypes.REFRESH, function (msg) {
      io.emit(socketMsgTypes.SET_GAME_STATE, {gameID:msg.gameID,game:getGame(msg.gameID)});
    });
    socket.on(socketMsgTypes.START_GAME, function (msg) {
      updateState(msg.gameID,states.SELECTING_CARDS)
      io.emit(socketMsgTypes.SET_GAME_STATE, {gameID:msg.gameID,game:getGame(msg.gameID)});
    });

    socket.on(socketMsgTypes.UPDATE_PILES_AND_SCORES, function (msg) {
      let remainingCards = updatePilesAndScores(getGame(msg.gameID),msg.selectedPile, msg.playersToProcess)
      console.log(remainingCards)
      if (remainingCards==0)
        updateState(msg.gameID,states.SELECTING_CARDS)
      console.log(getGame(msg.gameID).state)
      sendState(io,msg.gameID,getGame(msg.gameID))
    });
    socket.on(socketMsgTypes.REMOVE_PLAYER, function (msg) {
      removePlayer(msg.gameID,msg.playerName)
      sendState(io,msg.gameID,getGame(msg.gameID))
    });
    socket.on(socketMsgTypes.REVEAL_CARDS, function (msg) {
      
      revealCards(getGame(msg.gameID))
      sendState(io,msg.gameID,getGame(msg.gameID))
    });
   
    socket.on(socketMsgTypes.RESHUFFLE, function (msg) {
      reshuffle(msg.gameID)
      sendState(io,msg.gameID,getGame(msg.gameID))
    });
   
    socket.on(socketMsgTypes.SELECT_CARDS, function (msg) {
      selectCard(getGame(msg.gameID),msg)
      sendState(io,msg.gameID,getGame(msg.gameID))
    });

  });
  return router;
};

