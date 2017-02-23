import $ from 'jquery';

const SELECTOR_BATTERY = '[data-drone-state="battery"]';

export class Battery {
  constructor () {
    this.$battery = $(SELECTOR_BATTERY);
  }

  update(data) {
    this.$battery.html(data.value);
  }
}
