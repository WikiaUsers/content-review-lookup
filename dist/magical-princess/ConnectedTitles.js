/*
 * Magical Princess Wiki - Connected Titles Carousel
 * Circular state carousel for Module:ConnectedTitles.
 *
 * Module:ConnectedTitles renders one real card set. JavaScript only assigns
 * circular prev/current/next state classes; MainPage.css owns layout and motion.
 * No cloned rails, track translation, resize rebuild, or end-of-loop reset is
 * needed, so last-to-first behaves like every other move.
 */
(function (mw, document, window) {
  'use strict';

  var MP = window.MagicalPrincess = window.MagicalPrincess || {};
  var BUILD = 'connected-titles-circular:6.1.0';

  if (MP.connectedTitlesBuild === BUILD) {
    return;
  }
  MP.connectedTitlesBuild = BUILD;

  var SELECTOR = {
    shell: '.mp-connected-carousel-shell, .mp-js-connected-titles',
    viewport: '.mp-connected-carousel-viewport, .mp-js-connected-viewport',
    track: '.mp-connected-carousel-track, .mp-js-connected-track',
    item: '.mp-connected-title-card, .mp-js-connected-title-item',
    control: '.mp-connected-titles-control, .mp-js-connected-prev, .mp-js-connected-next, [data-mp-connected-action]',
    previous: '.mp-connected-titles-prev, .mp-js-connected-prev, [data-mp-connected-action="prev"]',
    clone: '.is-mp-connected-clone'
  };

  var STATE_CLASSES = [
    'is-current', 'is-mp-current', 'is-mp-connected-current',
    'is-mp-connected-visible', 'is-mp-connected-near', 'is-mp-connected-side', 'is-mp-connected-far',
    'is-mp-connected-before', 'is-mp-connected-after',
    'is-mp-connected-prev', 'is-mp-connected-prev-2', 'is-mp-connected-prev-3',
    'is-mp-connected-next', 'is-mp-connected-next-2', 'is-mp-connected-next-3',
    'is-mp-connected-hidden'
  ];

  function toArray(list) {
    return Array.prototype.slice.call(list || []);
  }

  function getRoot(content) {
    if (content && content[0] && content[0].querySelectorAll) {
      return content[0];
    }
    if (content && content.querySelectorAll) {
      return content;
    }
    return document;
  }

  function query(root, selector) {
    var scope = root || document;
    try {
      return (scope.matches && scope.matches(selector) ? [scope] : [])
        .concat(toArray(scope.querySelectorAll(selector)));
    } catch (error) {
      return [];
    }
  }

  function first(root, selector) {
    try {
      return (root || document).querySelector(selector);
    } catch (error) {
      return null;
    }
  }

  function closest(element, selector) {
    if (!element || !element.closest) {
      return null;
    }
    try {
      return element.closest(selector);
    } catch (error) {
      return null;
    }
  }

  function number(value, fallback) {
    var parsed = parseInt(value, 10);
    return isNaN(parsed) ? fallback : parsed;
  }

  function modulo(value, length) {
    return length ? ((value % length) + length) % length : 0;
  }

  function removeStateClasses(item) {
    item.classList.remove.apply(item.classList, STATE_CLASSES);
  }

  function realItems(track) {
    return query(track, SELECTOR.item).filter(function (item) {
      return !item.classList.contains('is-mp-connected-clone');
    });
  }

  function clearLegacyRail(shell, track, viewport) {
    query(track, SELECTOR.clone).forEach(function (clone) {
      if (clone.parentNode) {
        clone.parentNode.removeChild(clone);
      }
    });

    track.classList.remove('is-mp-connected-jump');
    track.style.removeProperty('--mp-connected-offset');
    track.style.removeProperty('transform');
    track.style.removeProperty('transition');

    shell.classList.remove(
      'is-mp-connected-moving',
      'is-mp-connected-loop-pass',
      'is-mp-connected-at-start',
      'is-mp-connected-at-end',
      'is-mp-carousel-at-start',
      'is-mp-carousel-at-end'
    );

    shell.removeAttribute('data-mp-connected-clones-before');
    shell.removeAttribute('data-mp-connected-clones-after');
    shell.removeAttribute('data-mp-connected-offset');

    if (viewport && viewport.scrollLeft !== 0) {
      viewport.scrollLeft = 0;
    }
  }

  function circularDistance(itemIndex, currentIndex, length) {
    var distance = modulo(itemIndex - currentIndex, length);
    var half = length / 2;

    if (distance > half) {
      distance -= length;
    }

    /* For an even item count, the exact opposite card has no preferred side.
     * It remains outside the visible +/-3 coverflow window. */
    if (length % 2 === 0 && distance === half) {
      return half;
    }

    return distance;
  }

  function applyStates(shell, requestedIndex) {
    var track = first(shell, SELECTOR.track);
    var items = track ? realItems(track) : [];
    var length = items.length;
    var index;

    if (!length) {
      return;
    }

    index = modulo(requestedIndex, length);

    items.forEach(function (item, itemIndex) {
      var distance = circularDistance(itemIndex, index, length);
      var absoluteDistance = Math.abs(distance);
      var current = distance === 0;

      removeStateClasses(item);

      item.classList.toggle('is-current', current);
      item.classList.toggle('is-mp-current', current);
      item.classList.toggle('is-mp-connected-current', current);
      item.classList.toggle('is-mp-connected-visible', absoluteDistance <= 3);
      item.classList.toggle('is-mp-connected-hidden', absoluteDistance > 3);
      item.classList.toggle('is-mp-connected-before', distance < 0);
      item.classList.toggle('is-mp-connected-after', distance > 0);
      item.classList.toggle('is-mp-connected-prev', distance === -1);
      item.classList.toggle('is-mp-connected-prev-2', distance === -2);
      item.classList.toggle('is-mp-connected-prev-3', distance === -3);
      item.classList.toggle('is-mp-connected-next', distance === 1);
      item.classList.toggle('is-mp-connected-next-2', distance === 2);
      item.classList.toggle('is-mp-connected-next-3', distance === 3);
      item.classList.toggle('is-mp-connected-near', absoluteDistance === 1);
      item.classList.toggle('is-mp-connected-side', absoluteDistance > 0 && absoluteDistance <= 3);
      item.classList.toggle('is-mp-connected-far', absoluteDistance >= 2 && absoluteDistance <= 3);

      item.setAttribute('data-mp-connected-distance', String(distance));
      item.setAttribute('aria-hidden', absoluteDistance <= 3 ? 'false' : 'true');
    });

    shell.setAttribute('data-mp-connected-index', String(index));
    shell.setAttribute('data-mp-connected-position', String(index));
    shell.classList.add(
      'is-mp-connected-js-ready',
      'is-mp-connected-carousel-ready',
      'is-mp-connected-looping'
    );
    shell.classList.toggle(
      'is-mp-connected-moved',
      index !== number(shell.getAttribute('data-mp-connected-default-index'), 0)
    );
  }

  function move(shell, direction) {
    var track = first(shell, SELECTOR.track);
    var items = track ? realItems(track) : [];
    var index;

    if (!items.length) {
      return;
    }

    index = number(shell.getAttribute('data-mp-connected-index'), 0);
    applyStates(shell, index + direction);
  }

  function activateControl(control, event) {
    var shell = closest(control, SELECTOR.shell);
    var action;

    if (!shell) {
      return;
    }

    action = control.getAttribute('data-mp-connected-action') ||
      (control.matches(SELECTOR.previous) ? 'prev' : 'next');

    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    move(shell, action === 'prev' ? -1 : 1);
  }

  function bindShell(shell) {
    var track;
    var viewport;
    var items;
    var defaultIndex;
    var defaultTitle;

    if (!shell || shell.getAttribute('data-mp-connected-ready') === 'circular-6.1.0') {
      return;
    }

    track = first(shell, SELECTOR.track);
    viewport = first(shell, SELECTOR.viewport);

    if (!track) {
      return;
    }

    clearLegacyRail(shell, track, viewport);
    items = realItems(track);

    if (!items.length) {
      return;
    }

    defaultIndex = modulo(number(shell.getAttribute('data-mp-connected-index'), 0), items.length);
    defaultTitle = String(shell.getAttribute('data-mp-connected-default-title') || '').toLowerCase();

    if (defaultTitle) {
      items.forEach(function (item, itemIndex) {
        if (String(item.getAttribute('data-mp-connected-title') || '').toLowerCase() === defaultTitle) {
          defaultIndex = itemIndex;
        }
      });
    }

    items.forEach(function (item, itemIndex) {
      item.setAttribute('data-mp-connected-real-index', String(itemIndex));
    });

    shell.setAttribute('data-mp-connected-default-index', String(defaultIndex));
    shell.setAttribute('data-mp-connected-ready', 'circular-6.1.0');
    shell.setAttribute('role', shell.getAttribute('role') || 'region');
    shell.setAttribute('aria-label', shell.getAttribute('aria-label') || 'Connected Titles');

    query(shell, SELECTOR.control).forEach(function (control) {
      if (!control.getAttribute('role')) {
        control.setAttribute('role', 'button');
      }
      if (!control.getAttribute('tabindex')) {
        control.setAttribute('tabindex', '0');
      }
      control.setAttribute('aria-disabled', 'false');
      control.classList.remove('is-mp-disabled');
    });

    applyStates(shell, defaultIndex);
  }

  function init(content) {
    var root = getRoot(content);
    query(root, SELECTOR.shell).forEach(bindShell);
  }

  document.addEventListener('click', function (event) {
    var control = closest(event.target, SELECTOR.control);
    if (control) {
      activateControl(control, event);
    }
  });

  document.addEventListener('keydown', function (event) {
    var control = closest(event.target, SELECTOR.control);
    var shell;

    if (event.repeat) {
      return;
    }

    if (control && (event.key === 'Enter' || event.key === ' ')) {
      activateControl(control, event);
      return;
    }

    shell = closest(event.target, SELECTOR.shell);
    if (!shell) {
      return;
    }

    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      move(shell, -1);
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      move(shell, 1);
    }
  });

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