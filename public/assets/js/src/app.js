import {Leds} from './leds';

class App {
  constructor() {
    this.leds = new Leds();

    var socket = io.connect('/');
    socket.on('stats', function (data) {
      console.log('Connected clients:', data.numClients);
    });

    // Events
    this.leds.addClickListener((params) => {
      socket.emit('leds', params);
    });
  }
}

export default App;
