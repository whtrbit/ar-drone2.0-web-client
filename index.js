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
  numClients++;
  console.log('Connected:', numClients);

  console.log(client.battery());
  setInterval(() => {
    console.log(client.battery());
  }, 60000);

  client.animateLeds('blinkRed', 3, 3);
  client
    .after(3000, () => {
      client.animateLeds('blinkGreen', 5, 5);
    });

  socket.on('disconnect', function () {
    numClients--;
    console.log('Connected:', numClients);
  });
});
