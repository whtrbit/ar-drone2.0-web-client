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

  update(level) {
    this.$batteryProgress.css('width', level + '%');
    this.$batteryValue.html(level);
  }
  colorize(level) {
    STATES.forEach((state) => {
      this.$battery.removeClass('is-' + state);
    });

    if (level <= 33) {
      this.$battery.addClass('is-' + STATES[0]);
    } else if (level >= 34 && level <= 66) {
      this.$battery.addClass('is-' + STATES[1]);
    } else {
      this.$battery.addClass('is-' + STATES[2]);
    }
  }
}
