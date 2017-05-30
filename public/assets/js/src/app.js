import {Tooltip} from './tooltip';
import {Battery} from './battery';
import {Leds} from './leds';
import {Fly} from './fly';
import {Control} from './control';

class App {
  constructor() {
    this.tooltip = new Tooltip();
    this.battery = new Battery();
    this.leds = new Leds();
    this.fly = new Fly();
    this.control = new Control();

    let socket = io.connect('/');

    socket
      .on('stats', data => {
        this.tooltip.create('Clients: ' + data.numClients);
      })
      .on('battery', data => {
        this.battery.update(data);
        this.battery.colorize(data);
        this.tooltip.create('Battery = ' + data.value);
      });

    this.leds.addClickListener(data => {
      socket.emit('leds', data);
      this.tooltip.create(data.info);
    });
    this.fly.addEventListener(params => {
      socket.emit('fly', params);
      this.tooltip.create(params.info);
    });
    this.control.addEventListener(params => {
      socket.emit('control', params);
      this.tooltip.create(params.info);
    });
  }
}

export default App;
