import $ from 'jquery';

const SELECTOR_CONTROL = '[data-drone-action="control"]';
const keycodes = {
  front: 38,
  back: 40,
  left: 37,
  right: 39,
  up: 87,
  down: 83,
  clockwise: 68,
  counterClockwise: 65
};

/*
 * Returns object with params from HTML data-attrs
 * @returns {Object}
 */
const getParams = function ($el) {
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
    $(window).on('keydown', e => {
      if (e.which === keycodes.front ||
        e.which === keycodes.back ||
        e.which === keycodes.left ||
        e.which === keycodes.right ||
        e.which === keycodes.up ||
        e.which === keycodes.down ||
        e.which === keycodes.clockwise ||
        e.which === keycodes.counterClockwise ) {

        const $el = $(SELECTOR_CONTROL + '[data-drone-param-keycode="' + e.which + '"');
        const params = getParams($el);

        cb(params);
      }
    });
    $(window).on('keyup', e => {
      if (e.which === keycodes.front ||
          e.which === keycodes.back ||
          e.which === keycodes.left ||
          e.which === keycodes.right ||
          e.which === keycodes.up ||
          e.which === keycodes.down ||
          e.which === keycodes.clockwise ||
          e.which === keycodes.counterClockwise ) {

        const $el = $(SELECTOR_CONTROL + '[data-drone-param-keycode="' + e.which + '"');
        const params = getParams($el);
              params.speed = 0;
              params.info = getParams($el).info + ' stop';

        cb(params);
      }
    });
    this.$control.on('click', e => {
      e.preventDefault();

      const params = getParams($(e.target));

      cb(params);
    });
  }
}
