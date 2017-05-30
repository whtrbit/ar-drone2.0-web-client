import {Tooltip} from './tooltip';
import {Battery} from './battery';
import {Leds} from './leds';

class App {
  constructor() {
    this.tooltip = new Tooltip();
    this.battery = new Battery();
    this.leds = new Leds();

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
  }
}

export default App;
