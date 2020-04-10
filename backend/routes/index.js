


var cors = require('cors')

var express = require('express');
var router = express.Router();






var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}


module.exports = function (io) {
  //Socket.IO
  io.on('connection', function (socket) {
      console.log('User has connected to Index');
      //ON Events
      socket.on('enter_message', function(msg){
        io.emit('get_message', {'message': msg});
      });

      //End ON Events
  });
  return router;
};


//module.exports = router;
