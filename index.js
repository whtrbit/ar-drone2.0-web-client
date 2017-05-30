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

  socket.on('disconnect', () => {
    numClients--;
    console.log('Connected:', numClients);
  });
});
