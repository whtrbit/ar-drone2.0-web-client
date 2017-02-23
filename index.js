var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io')(server),
    path = require('path'),
    drone = require('ar-drone').createClient(),
    stream = require('dronestream');

app.use('/public', express.static(path.join(__dirname + '/public')));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

server.listen(3000);
stream.listen(3001);

console.log('Listening on port 3000...');

var numClients = 0;
io.on('connection', function (socket) {
  numClients++;
  io.emit('stats', { numClients: numClients });
  console.log('Connected:', numClients);

  setInterval(function () {
    var batteryLevel = drone.battery();

    socket.emit('battery', { value: batteryLevel });
  }, 60000);

  socket.on('leds', function (data) {
    drone.animateLeds(data.type, data.hz, data.duration);
  });

  socket.on('disconnect', function () {
    numClients--;
    io.emit('stats', { numClients: numClients });
  });
});
