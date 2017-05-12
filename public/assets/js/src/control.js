import $ from 'jquery';

const SELECTOR_CONTROL = '[data-drone-action="control"]';
const KEYCODE_FRONT = 38,
      KEYCODE_BACK = 40,
      KEYCODE_LEFT = 37,
      KEYCODE_RIGHT = 39;

/*
 * @returns {Object}
 */
let getParams = function ($el) {
  var params = {
    type: $el.data('drone-param-type'),
    speed: $el.data('drone-param-speed'),
    keycode: $el.data('drone-param-keycode'),
    info: $el.data('drone-param-info')
  };

  return params;
};

export class Control {
  constructor () {
    this.$control = $(SELECTOR_CONTROL);
  }

  addEventListener(cb) {
    $(window).on('keydown', (e) => {
      if (e.which === KEYCODE_FRONT ||
        e.which === KEYCODE_BACK ||
        e.which === KEYCODE_LEFT ||
        e.which === KEYCODE_RIGHT) {

        const $el = $(SELECTOR_CONTROL + '[data-drone-param-keycode="' + e.which + '"');
        const params = getParams($el);

        cb(params);
      }
    });
    $(window).on('keyup', (e) => {
      // @TODO: test if timeout is necessary
      if (e.which === KEYCODE_FRONT ||
          e.which === KEYCODE_BACK ||
          e.which === KEYCODE_LEFT ||
          e.which === KEYCODE_RIGHT) {

        const $el = $(SELECTOR_CONTROL + '[data-drone-param-keycode="' + e.which + '"');
        const params = getParams($el);
              params.speed = 0;
              params.info = getParams($el).info + ' stop';

        cb(params);
      }
    });
    this.$control.on('click', (e) => {
      e.preventDefault();
      const params = getParams($(e.target));

      cb(params);
    });
  }
}
