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

// Just dependencies
