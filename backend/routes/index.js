


var cors = require('cors')

var express = require('express');
var router = express.Router();

var players = []

function getCardsForPlayer() {
  let cards = []
  for (let u = 0; u < 10; u++)
    cards.push(hafisa.pop())
  cards = cards.sort(function (a, b) { return a - b })
  return cards
}

function getHafisaMeurbevet() {
  let hafisa = []
  for (let r = 0; r < 104; r++) {
    hafisa.push(r + 1)
    if (hafisa[r] == 55)
      hafisa[r] = hafisa[r] + "*******"
    else {
      hafisa[r] = hafisa[r] + "*"
      if ((r + 1) % 11 == 0)
        hafisa[r] = hafisa[r] + "****"
      if ((r + 1) % 10 == 0)
        hafisa[r] = hafisa[r] + "**"
      if ((r + 1) % 5 == 0 && (r + 1) % 10 != 0)
        hafisa[r] = hafisa[r] + "*"
    }

  }
  for (let f = 0; f < 300; f++) {
    let a = Math.round(Math.random() * 103)
    let b = Math.round(Math.random() * 103)
    let p = hafisa[a]
    hafisa[a] = hafisa[b]
    hafisa[b] = p
    f = f + 1
  }
  return hafisa
}

let hafisa = getHafisaMeurbevet()


var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}


module.exports = function (io) {
  //Socket.IO
  io.on('connection', function (socket) {
    console.log('User has connected to Index');
    //ON Events
    socket.on('new_player', function (name) {
      players.push({ name: name, score: 0, cards: getCardsForPlayer() ,selectedCard:"X" })

      io.emit('players', players);
    });
    socket.on('reshuffle', function (name) {
      hafisa = getHafisaMeurbevet()
      players.map(player => {
        player.cards = getCardsForPlayer()
        player.score = 0
      })
      io.emit('players', players);
    });
    socket.on('new_game', function (name) {
      players = []
      io.emit('players', players);
    });
    socket.on("card_selected", function (msg) {
      players.map(player => {
        if (player.name==msg.player){
          player.selectedCard=msg.selectedCard
          player.cards=player.cards.map(card=>{
            return card==msg.selectedCard?"X":card
          })
        }
       
      })
      io.emit('players', players);
    });
    //End ON Events
  });
  return router;
};


//module.exports = router;
