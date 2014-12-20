var express = require('express');
var app = require('express')();
var path = require('path');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var dsock = require('debug')('socket');
var dapp = require('debug')('app');
var devent = require('debug')('event');

module.exports = io;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
app.set('port', process.env.PORT || 3000);

app.get('/', function(req, res) {
  res.render('index', { title: "Dancing HTML" });
});

var events = require('./sockets/events');

app.get('/trigger/:event/:param?', function(req, res) {
  var param = req.params.param || "red";
  if(req.params.param == undefined) {
    events[req.params.event](param, ".color");
    res.send(req.params.event + " triggered");
    devent('Triggered ' + req.params.event);
  } else {
    events[req.params.event](param, ".color");
    res.send(req.params.event + " triggered with params: " + req.params.param);
    devent('Triggered ' + req.params.event + ' with param: ' + req.params.param);
  }
});

app.get('/reset/:event/:param?', function(req, res) {
  var param = req.params.param || "white";
  if(req.params.param == undefined) {
    events["rs"+req.params.event](param, ".color");
    res.send(req.params.event + " reset");
    devent('Reset ' + req.params.event);
  } else {
    var param = req.params.param || "red";
    events["rs"+req.params.event](param, ".color");
    res.send(req.params.event + " reset with params: " + req.params.param);
    devent('Reset ' + req.params.event + ' with param: ' + req.params.param);
  }
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
    dapp(err);
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


http.listen(app.get('port'), function(){
  dapp('Server listening on port ' + app.get('port'));
});
