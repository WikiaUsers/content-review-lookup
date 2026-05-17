/*
 * Magical Princess Wiki — Bold Interval Test
 * Cycles through numbered wikitext items and bolds one item every 5 seconds.
 */

(function (mw, document, window) {
  'use strict';

  function toArray(list) {
    return Array.prototype.slice.call(list || []);
  }

  function rootOf(content) {
    if (content && content[0] && content[0].querySelectorAll) {
      return content[0];
    }

    if (content && content.querySelectorAll) {
      return content;
    }

    return document;
  }

  function init(content) {
    var root = rootOf(content);

    toArray(root.querySelectorAll('.mp-js-bold-interval')).forEach(function (box) {
      var items;
      var interval;
      var index;

      if (box.dataset.mpBoldIntervalReady === '1') {
        return;
      }

      items = toArray(box.querySelectorAll('.mp-js-bold-interval-item'));

      if (!items.length) {
        return;
      }

      interval = parseInt(box.dataset.mpBoldInterval || '5000', 10);

      if (isNaN(interval) || interval < 1000) {
        interval = 5000;
      }

      index = 0;
      box.dataset.mpBoldIntervalReady = '1';

      function render() {
        items.forEach(function (item, itemIndex) {
          var active = itemIndex === index;

          item.classList.toggle('is-mp-bold-active', active);
          item.style.fontWeight = active ? '800' : '400';
          item.style.opacity = active ? '1' : '0.55';
        });

        index = (index + 1) % items.length;
      }

      render();
      window.setInterval(render, interval);
    });
  }

  if (mw && mw.hook) {
    mw.hook('wikipage.content').add(init);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      init(document);
    });
  } else {
    init(document);
  }
}(window.mediaWiki || window.mw, document, window));