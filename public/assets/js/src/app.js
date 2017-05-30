import {Tooltip} from './tooltip';

class App {
  constructor() {
    this.tooltip = new Tooltip();

    let socket = io.connect('/');

    socket.on('stats', (data) => { // listening on 'stats'
      console.log('Connected clients:', data.numClients);
      this.tooltip.create('Clients: ' + data.numClients);
    });

    setInterval(() => {
      socket.emit('leds', {
        type: 'blinkRed',
        hz: 3,
        duration: 1
      });
      this.tooltip.create('blinkRed');
    }, 5000);

    socket.on('battery', (lvl) => {
      this.tooltip.create('Battery: ' + lvl);
      console.log('Battery lvl =', lvl);
    });
  }
}

export default App;
