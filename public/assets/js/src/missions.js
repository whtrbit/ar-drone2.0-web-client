import $ from 'jquery';

const SELECTOR_LEDS = '[data-drone-action="mission"]';

/*
 * @returns {Object}
 */
const getParams = function ($el) {
  const params = {
    mission: $el.data('drone-param-mission'),
    info: $el.data('drone-param-info')
  };

  return params;
};

export class Missions {
  constructor () {
    this.$mission = $(SELECTOR_LEDS);
  }

  addClickListener(cb) {
    this.$mission.on('click', e => {
      e.preventDefault();
      const params = getParams($(e.target));

      cb(params);
    });
  }
}
