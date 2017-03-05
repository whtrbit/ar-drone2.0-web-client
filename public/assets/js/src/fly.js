import $ from 'jquery';

const SELECTOR_FLY = '[data-drone-action="fly"]';

/*
 * @returns {Object}
 */
let getParams = function ($el) {
  var params = {
    type: $el.data('drone-param-type'),
    info: $el.data('drone-param-info')
  };

  return params;
};

export class Fly {
  constructor () {
    this.$fly = $(SELECTOR_FLY);
  }

  addClickListener(cb) {
    this.$fly.on('click', (e) => {
      e.preventDefault();
      var params = getParams($(e.target));

      cb(params);
    });
  }
}
