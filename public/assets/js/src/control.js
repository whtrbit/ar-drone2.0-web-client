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
    keycode: $el.data('drone-param-keycode')
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

        var $el = $(SELECTOR_CONTROL + '[data-drone-param-keycode="' + e.which + '"');
        var params = getParams($el);

        cb(params);
      }
    });

    this.$control.on('click', (e) => {
      e.preventDefault();
      var params = getParams($(e.target));

      cb(params);
    });
  }
}
