import {Leds} from './leds';
import {Battery} from './battery';

class App {
  constructor() {
    this.leds = new Leds();
    this.battery = new Battery();

    var socket = io.connect('/');
    socket
      .on('stats', (data) => {
        console.log('Connected clients:', data.numClients);
      })
      .on('battery', (data) => {
        this.battery.update(data);
      });

    // Events
    this.leds.addClickListener((params) => {
      socket.emit('leds', params);
    });
  }
}

export default App;
