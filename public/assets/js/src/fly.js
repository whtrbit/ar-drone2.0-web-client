import $ from 'jquery';

const SELECTOR_FLY = '[data-drone-action="fly"]';
const KEYCODE_TAKEOFF = 13, // enter
      KEYCODE_LAND = 32, // space
      KEYCODE_STOP = 17; // ctrl

/*
 * @returns {Object}
 */
let getParams = function ($el) {
  var params = {
    type: $el.data('drone-param-type'),
    info: $el.data('drone-param-info'),
    keycode: $el.data('drone-param-keycode')
  };

  return params;
};

export class Fly {
  constructor () {
    this.$fly = $(SELECTOR_FLY);
  }

  addEventListener(cb) {
    $(window).on('keydown', (e) => {
      if (e.which === KEYCODE_TAKEOFF || e.which === KEYCODE_LAND) {
        var $el = $(SELECTOR_FLY + '[data-drone-param-keycode="' + e.which + '"');
        var params = getParams($el);

        cb(params);
      }
    });
    $(window).on('keyup', (e) => {
      if (e.which === KEYCODE_TAKEOFF || e.which === KEYCODE_LAND) {
        var $el = $(SELECTOR_FLY + '[data-drone-param-keycode="' + e.which + '"');
        var params = getParams($el);

        cb(params);
      }
    });
    this.$fly.on('click', (e) => {
      e.preventDefault();
      var params = getParams($(e.target));

      cb(params);
    });
  }
}
