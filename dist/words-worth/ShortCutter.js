/*
 * ShortCutter
 *
 * A library for adding a shortcut to the wiki-tools you can see on the
 * fandom-community-header and the fandom-sticky-header
 *
 * @example
 * importArticles({
 *   type: 'script',
 *   article: 'u:dev:MediaWiki:ShortCutter.js'
 * }).then(function () {
 *   shortCutter.add({ id: 'dev_fandom', href: '//dev.fandom.com' });
 *
 *   mw.loader.using('mediawiki.util').then(function () {
 *     shortCutter.add({
 *       id: 'random',
 *       href: mw.util.getUrl('Special:Random')
 *     });
 *   });
 * });
 *
 * @author [[User:Leslie1289|Leslie1289]]
 */

(function ($, mw) {
  'use strict';
  if (window.dev && window.dev.ShortCutter) return;

  window.dev = window.dev || {};
  var ShortCutter;
  window.dev.ShortCutter = {
    _shortcutMustache: [
      '<a',
      '  {{#href}}href="{{.}}"{{/href}}',
      '  class="wds-button wds-is-secondary {{#id}}wiki-tools__{{.}}{{/id}}',
      '  {{#class}}{{.}}{{/class}}"',
      '  {{#title}}title="{{.}}"{{/title}}',
      '  {{#data-tracking}}data-tracking="{{.}}"{{/data-tracking}}',
      '  {{#accesskey}}accesskey="{{.}}"{{/accesskey}}',
      '>',
      '  {{{icon}}}',
      '</a>'
    ].join(''),
    _defaultIcon: [
      '<svg xmlns="http://www.w3.org/2000/svg',
      'xmlns:xlink="http://www.w3.org/1999/xlink"',
      'version="1.1"',
      'viewBox="0 0 24 24">',
      '<path d="M12,4c-4.4,0-8,3.6-8,8s3.6,8,8,8s8-3.6,8-8S16.4,4,12,4z M16,16l-3-2l-1,4l-1-4l-3,2l2-3l-4-1l4-1L8,8l3,2l1-4l1,4l3-2 l-2,3l4,1l-4,1L16,16z"/>',
      '</svg>'
    ].join(''),
    _template: null,

    /**
     * @memberof window.dev.ShortCutter
     * @method add
     * @param {object} shortcuts Options for a shortcut or an array of options for shortcuts.
     */
    add: function (shortcuts) {
      mw.loader.using('mediawiki.template.mustache').then(function () {
        if (Object.prototype.toString.call(shortcuts) !== '[object Array]') {
          shortcuts = [shortcuts];
        }
        var wikiTools = document.querySelectorAll('.wiki-tools');
        shortcuts.forEach(function (options) {
          wikiTools.forEach(function (parent) {
            var button = ShortCutter._createButton(options);
            if (options.after) {
              parent.querySelector(options.after).after(button);
            } else if (options.before) {
              parent.querySelector(options.before).before(button);
            } else {
              // Use prepend() instead of append() to avoid shifting the original tools.
              // Same in RTL languages.
              parent.prepend(button);
            }
          });
        });
      });
    },

    /**
     * @memberof window.dev.ShortCutter
     * @method _createButton
     * @param {object} options
     * @returns {string}
     */
    _createButton: function (options) {
      options.icon = options.icon || ShortCutter._defaultIcon;
      if (!ShortCutter._template) {
        ShortCutter._template = mw.template.compile(
          ShortCutter._shortcutMustache,
          'mustache'
        );
      }
      var button = ShortCutter._template.render(options)[0];
      var svg = button.getElementsByTagName('svg');
      if (svg && svg[0]) {
        svg[0].classList.add('wds-icon');
        svg[0].classList.add('wds-icon-small');
      }
      return button;
    }
  };
  ShortCutter = window.dev.ShortCutter;
})(window.jQuery, window.mediaWiki);