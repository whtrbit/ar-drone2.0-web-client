import $ from 'jquery';

const SELECTOR_TOOLTIP_WRAPPER = '[data-tooltip]';
const STATE_ACTIVE = 'is-active';

export class Tooltip {
  constructor () {
    this.$tooltipWrapper = $(SELECTOR_TOOLTIP_WRAPPER);
  }

  create(data) {
    var $tooltip = $('<div>', {
      'class': 'c-tooltip__item',
      'text': data
    });
    $tooltip.appendTo(this.$tooltipWrapper);

    setTimeout(() => {
      $tooltip.addClass(STATE_ACTIVE);
    });
    setTimeout(() => {
      $tooltip.removeClass(STATE_ACTIVE);

      setTimeout(() => {
        $tooltip.remove();
      }, 500); // value of CSS transition
    }, 3000);
  }
}
