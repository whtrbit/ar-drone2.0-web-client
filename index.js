const express = require('express'),
      app = express(),
      server = require('http').createServer(app),
      io = require('socket.io')(server),
      path = require('path'),
      arDrone = require('ar-drone'),
      client = arDrone.createClient(),
      control = arDrone.createUdpControl(),
      stream = require('dronestream'),
      mission = require('ardrone-autonomy').createMission();

app.use('/public', express.static(path.join(__dirname + '/public')));
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

server.listen(3000);
console.log('Listening on port 3000...');

stream.listen(3001);

let numClients = 0;
io.on('connection', socket => {
  let batteryLvl = client.battery();
  numClients++;
  console.log('Connected:', numClients);

  socket.emit('battery', { value: batteryLvl });
  setInterval(() => {
    console.log(batteryLvl);
    socket.emit('battery', { value: batteryLvl });
  }, 5000);

  socket.emit('stats', { numClients });

  socket.on('leds', data => {
    client.animateLeds(data.type, data.hz, data.duration);
    console.log(data.type);
  });

  socket.on('fly', data => {
    switch (data.type) {
      case 'takeoff':
        console.log(data.info);
        client.takeoff();
        break;

      case 'stop':
        console.log(data.info);
        client.stop();
        break;

      case 'land':
        console.log(data.info);
        client.land();
        break;

      default:
        console.log('Unknown fly event.');
    }
  });

  socket.on('control', data => {
    switch (data.type) {
      case 'front':
        console.log(data.info);
        client.front(data.speed);
        break;

      case 'back':
        console.log(data.info);
        client.back(data.speed);
        break;

      case 'left':
        console.log(data.info);
        client.left(data.speed);
        break;

      case 'right':
        console.log(data.info);
        client.right(data.speed);
        break;

      case 'up':
        console.log(data.info);
        client.up(data.speed);
        break;

      case 'down':
        console.log(data.info);
        client.down(data.speed);
        break;

      case 'clockwise':
        console.log(data.info);
        client.clockwise(data.speed);
        break;

      case 'counterClockwise':
        console.log(data.info);
        client.counterClockwise(data.speed);
        break;

      default:
        console.log('Unknown control event.');
    }
  });

  socket.on('mission', data => {
    switch (data.mission) {
      case 'square':
        mission.takeoff()
               .zero()
               .altitude(1)
               .forward(1)
               .right(1)
               .backward(1)
               .left(1)
               .hover(1000)
               .land();

        mission.run((err, res) => {
          if (err) {
            console.trace("Oooops, sth bad happened: %s", err.message);
            mission.client().stop();
            mission.client().land();
          } else {
            console.log('Mission ' + data.mission + ' successed!');
            process.exit(0);
          }
        });
        break;

      default:
        console.log('Unknown mission event.');
    }
  });

  socket.on('disconnect', () => {
    numClients--;
    console.log('Connected:', numClients);
  });
});
