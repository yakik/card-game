var manageSocket = function(server) {

    var io = require('socket.io')(server);



    io.on('connection', function (socket) {
        console.log('a user connected');
        socket.on('enter_message', function(msg){
            io.emit('get_message', {'message': msg});
          });
    });

}

module.exports = manageSocket;
