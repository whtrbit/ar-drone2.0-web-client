import {Leds} from './leds';
import {Battery} from './battery';

class App {
  constructor() {
    this.leds = new Leds();
    this.battery = new Battery();

    var socket = io.connect('/');
    socket
      .on('stats', function (data) {
        console.log('Connected clients:', data.numClients);
      })
      .on('battery', function (data) {
        this.battery.update(data);
      }.bind(this));

    // Events
    this.leds.addClickListener((params) => {
      socket.emit('leds', params);
    });
  }
}

export default App;
