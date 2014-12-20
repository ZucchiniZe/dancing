var io = require('../app').io;
var dsock = require('debug')('socket');

io.sockets.on('connection', function (socket) {
  dsock('user connected')
});
