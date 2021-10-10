/*
 *
 * @module        JumpToContent.js
 * @description   Adds a navigational link as the first focusable element, which
				  sends the user close to the left TOC button, skiping at least
				  >25 nav links and improving the experience for disabled and
				  keyboard users alike.
 * @author        Polymeric
 * @license       CC-BY-SA 3.0
 * @notes         Install JumpToContent.css stylesheet to use this script.
 *
 */

$(function() {
  'use strict';
  importArticles({
    type: "script",
    article: "u:dev:MediaWiki:I18n-js/code.js"
  }, {
    type: "style",
    article: "u:dev:MediaWiki:JumpToContent.css"
  });
  if (window.JumpToContentLoaded) {
    return;
  }
  window.JumpToContentLoaded = true;
  mw.hook('dev.i18n').add(function (i18n) {
    i18n.loadMessages('JumpToContent').done(function (i18n) {
      $('body').prepend([
        $('<div>', {
          'class': 'jtc-btn',
          'id': 'jumpToContent'
        }).append([
          $('<a>', {
            'class': 'jtc-link',
            'href': '#main-content-start',
            'role': 'link',
            'tabindex': '0',
            'text': i18n.msg('jtc-btn-text').plain()
          })
        ])
      ]);
      $('.content-size-toggle').attr('id', 'main-content-start');
    });
  });
});