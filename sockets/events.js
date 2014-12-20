var io = require('../app');
var dsock = require('debug')('socket');

module.exports = {
  color: function(color) {
    io.sockets.emit('change color', {"color": color});
    dsock('Changed color');
  },
  rscolor: function(color) {
    io.sockets.emit('change color back', {"color": color});
    dsock('Reset color');
  }
}
