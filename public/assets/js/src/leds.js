import $ from 'jquery';

const SELECTOR_LEDS = '[data-drone-action="leds"]';

/*
 * @returns {Object}
 */
const getParams = function ($el) {
  const params = {
    type: $el.data('drone-param-type'),
    hz: $el.data('drone-param-hz'),
    duration: $el.data('drone-param-duration'),
    info: $el.data('drone-param-info')
  };

  return params;
};

export class Leds {
  constructor () {
    this.$leds = $(SELECTOR_LEDS);
  }

  addClickListener(cb) {
    this.$leds.on('click', e => {
      e.preventDefault();
      const params = getParams($(e.target));

      cb(params);
    });
  }
}
