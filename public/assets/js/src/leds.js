import $ from 'jquery';

const SELECTOR_LEDS = '[data-drone-action="leds"]';

/*
 * @return {Object}
 */
let getParams = function ($el) {
  var params = {
    type: $el.data('drone-param-type'),
    hz: $el.data('drone-param-hz'),
    duration: $el.data('drone-param-duration')
  };

  return params;
};

export class Leds {
  constructor () {
    this.$leds = $(SELECTOR_LEDS);
  }

  addClickListener(cb) {
    this.$leds.on('click', (e) => {
      e.preventDefault();
      var params = getParams($(e.target));

      cb(params);
    })
  }
}
