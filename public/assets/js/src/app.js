import {Tooltip} from './tooltip';

import {Leds} from './leds';
import {Battery} from './battery';
import {Fly} from './fly';
import {Control} from './control';

class App {
  constructor() {
    this.leds = new Leds();
    this.battery = new Battery();
    this.fly = new Fly();
    this.control = new Control();
    this.tooltip = new Tooltip();

    var socket = io.connect('/');
    socket
      .on('stats', (data) => {
        console.log('Connected clients:', data.numClients);
      })
      .on('battery', (data) => {
        this.battery.update(data);
        this.battery.colorize(data);
      });

    // Events
    this.leds.addClickListener((params) => {
      socket.emit('leds', params);
      this.tooltip.create(params.info);
    });
    this.fly.addEventListener((params) => {
      socket.emit('fly', params);
      this.tooltip.create(params.info);
    })
    this.control.addEventListener((params) => {
      socket.emit('control', params);
      this.tooltip.create(params.info);
    });
  }
}

export default App;
