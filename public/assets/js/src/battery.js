import $ from 'jquery';

const SELECTOR_BATTERY = '[data-drone-battery]';
const SELECTOR_BATTERY_PROGRESS = '[data-drone-battery="progress"]';
const SELECTOR_BATTERY_VALUE = '[data-drone-battery="value"]';
const STATES = [
  'low', 'medium', 'high'
];

export class Battery {
  constructor () {
    this.$battery = $(SELECTOR_BATTERY);
    this.$batteryProgress = this.$battery.find(SELECTOR_BATTERY_PROGRESS);
    this.$batteryValue = this.$battery.find(SELECTOR_BATTERY_VALUE);
  }

  update(data) {
    console.log(data.value);
    this.$batteryProgress.css('width', data.value + '%');
    this.$batteryValue.html(data.value);
  }
  colorize(data) {
    STATES.forEach((state) => {
      this.$battery.removeClass('is-' + state);
    });

    if (data.value <= 33) {
      this.$battery.addClass('is-' + STATES[0]);
    } else if (data.value >= 34 && data.value <= 66) {
      this.$battery.addClass('is-' + STATES[1]);
    } else {
      this.$battery.addClass('is-' + STATES[2]);
    }
  }
}
