var io = require('../app');
var dsock = require('debug')('socket');

module.exports = {
  color: function(color, selector) {
    io.sockets.emit('change color', {"color": color, "selector": selector});
    dsock('Changed color');
  },
  rscolor: function(color, selector) {
    io.sockets.emit('change color back', {"color": color, "selector": selector});
    dsock('Reset color');
  }
}
