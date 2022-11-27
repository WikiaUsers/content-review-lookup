/*
 * @module        JumpToContent.js
 * @description   Adds a navigational link as the first focusable element, which
				  quickly sends the user to the page's main content.
 * @author        Polymeric
 * @license       CC-BY-SA 3.0
 * @notes         Install JumpToContent.css stylesheet to use this script.
 */

(function() {
  'use strict';

  importArticles({
    articles: [
      'u:dev:MediaWiki:I18n-js/code.js',
      'u:dev:MediaWiki:JumpToContent.css'
    ]
  });

  if (window.JumpToContentLoaded) return;

  window.JumpToContentLoaded = true;

  mw.hook('dev.i18n').add(function (i18n) {
    i18n.loadMessages('JumpToContent').done(function (i18n) {
      // Inline styles prevent the link from appearing if the CSS has not loaded
      // yet. Those are overwriten in JumpToContent.css.
      // Clip-path is a modern version of the "clip" property which is future-
      // proof in terms of browser support.
      // White-space prevents screen readers from skipping white spaces.
      var jtcBtn = '<div class="jtc-btn" id="jumpToContent" style="clip: rect(1px, 1px, 1px, 1px); clip-path: inset(50%); height: 1px; overflow: hidden; position: absolute; white-space: nowrap; width: 1px;"><a class="jtc-link" href="#jump-content">' + i18n.msg('jtc-btn-text').plain() + '</a></div>';

      document.body.insertAdjacentHTML('afterbegin', jtcBtn);
      document.querySelector('.page__main').setAttribute('id', 'jump-content');
    });
  });
}());