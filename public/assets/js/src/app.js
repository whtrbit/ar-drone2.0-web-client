import {Tooltip} from './tooltip';

class App {
  constructor() {
    this.tooltip = new Tooltip();

    io.connect('/');
  }
}

export default App;
