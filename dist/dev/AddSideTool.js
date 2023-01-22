/**
 * @name addSideTool
 * @author 机智的小鱼君
 * <nowiki>
 */

/**
 * @param {import('jquery').JQueryStatic} $
 * @param {any} dev
 * @param {any} hook
 */
;(function($, hook) {
  'use strict';
  /**
   * @param {string | HTMLElement} icon
   * @param {string | HTMLElement} tooltip
   * @returns {{ $button: HTMLElement; $tooltip: HTMLElement }}
   */
  function addSideTool(icon, tooltip) {
    // Make button
    var $button = $('<button>', { class: 'page-side-tool custom-tool' })
      .append(icon)
      .css({
        position: 'relative',
      });

    // Make tooltip
    var $tooltip = $('<div>', {
      class: 'wds-tooltip is-right',
    })
      .append(tooltip)
      .css({
        position: 'absolute',
        display: 'none',
        top: '50%',
        left: 'calc(100% + 1em)',
        'white-space': 'nowrap'
      });

    // Insert tooltip
    $button
      .append($tooltip)
      .on('mouseenter', function() {
        if ($tooltip.html()) $tooltip.show();
      })
      .on('mouseleave', function() {
        $tooltip.hide();
      });

    // Append button into side container
    $('.page-side-tools').append($button);

    // Returns ctx
    return {
      $button: $button,
      $tooltip: $tooltip,
    };
  }

  window.dev = window.dev || {};
  window.dev.addSideTool = addSideTool;
  hook('dev.addSideTool').fire(addSideTool);
})(window.jQuery, mediaWiki.hook);
// </nowiki>