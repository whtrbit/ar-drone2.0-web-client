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

  socket.on('fly', function (data) {
    switch (data.type) {
      case 'takeoff':
        console.log('Taking off.');
        drone.takeoff();
        break;

      case 'stop':
        console.log('Stopping and hovering.');
        drone.stop();
        break;

      case 'land':
        console.log('Landing.');
        drone.land();
        break;

      default:
        console.log('Unknown fly event.');
    }
  });

  socket.on('control', function (data) {
    switch(data.type) {
      case 'front':
        console.log('Go front.');
        drone.front(data.speed);
        break;

      case 'back':
        console.log('Go back.');
        drone.back(data.speed);
        break;

      case 'left':
        console.log('Go left.');
        drone.left(data.speed);
        break;

      case 'right':
        console.log('Go right.');
        drone.right(data.speed);
        break;

      default:
        console.log('Uknown control event.');
    }
  });

  socket.on('disconnect', function () {
    numClients--;
    io.emit('stats', { numClients: numClients });
  });
});
