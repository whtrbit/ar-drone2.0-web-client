import {Leds} from './leds';
import {Battery} from './battery';
import {Fly} from './fly';

class App {
  constructor() {
    this.leds = new Leds();
    this.battery = new Battery();
    this.fly = new Fly();

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
    this.fly.addClickListener((params) => {
      socket.emit('fly', params);
    });
  }
}

export default App;
