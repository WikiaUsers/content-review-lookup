/*
 * Magical Princess Wiki - Connected Titles Carousel
 * Swiper-style cover rail for Module:ConnectedTitles.
 * Wikitext/module renders the structure, MainPage.css styles the states,
 * and this script only moves the rail and recalculates slide state classes.
 */
(function (mw, document, window) {
  'use strict';

  var SELECTOR = {
    shell: '.mp-connected-carousel-shell, .mp-js-connected-titles',
    viewport: '.mp-connected-carousel-viewport, .mp-js-connected-viewport',
    track: '.mp-connected-carousel-track, .mp-js-connected-track',
    item: '.mp-connected-title-card, .mp-js-connected-title-item',
    control: '.mp-connected-titles-control, .mp-js-connected-prev, .mp-js-connected-next, [data-mp-connected-action]',
    previous: '.mp-connected-titles-prev, .mp-js-connected-prev, [data-mp-connected-action="prev"]',
    next: '.mp-connected-titles-next, .mp-js-connected-next, [data-mp-connected-action="next"]',
    clone: '.is-mp-connected-clone'
  };

  var STATE_CLASSES = [
    'is-current',
    'is-mp-current',
    'is-mp-connected-current',
    'is-mp-connected-visible',
    'is-mp-connected-near',
    'is-mp-connected-side',
    'is-mp-connected-far',
    'is-mp-connected-before',
    'is-mp-connected-after',
    'is-mp-connected-prev',
    'is-mp-connected-prev-2',
    'is-mp-connected-prev-3',
    'is-mp-connected-next',
    'is-mp-connected-next-2',
    'is-mp-connected-next-3',
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
    try {
      return toArray((root || document).querySelectorAll(selector));
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
    if (!length) {
      return 0;
    }
    return ((value % length) + length) % length;
  }

  function removeStateClasses(item) {
    item.classList.remove.apply(item.classList, STATE_CLASSES);
  }

  function removeClones(track) {
    query(track, SELECTOR.clone).forEach(function (clone) {
      if (clone.parentNode) {
        clone.parentNode.removeChild(clone);
      }
    });
  }

  function originalItems(track) {
    return query(track, SELECTOR.item).filter(function (item) {
      return !item.classList.contains('is-mp-connected-clone');
    });
  }

  function cloneItem(item, realIndex, side) {
    var clone = item.cloneNode(true);
    clone.classList.add('is-mp-connected-clone');
    removeStateClasses(clone);
    clone.setAttribute('aria-hidden', 'true');
    clone.setAttribute('data-mp-connected-real-index', String(realIndex));
    clone.setAttribute('data-mp-connected-clone-side', side);
    return clone;
  }

  function ensureLoopClones(shell, track) {
    var items;
    var beforeFragment;
    var afterFragment;
    var index;

    removeClones(track);
    items = originalItems(track);

    if (!items.length) {
      return;
    }

    beforeFragment = document.createDocumentFragment();
    afterFragment = document.createDocumentFragment();

    items.forEach(function (item, itemIndex) {
      item.setAttribute('data-mp-connected-real-index', String(itemIndex));
    });

    for (index = 0; index < items.length; index += 1) {
      beforeFragment.appendChild(cloneItem(items[index], index, 'before'));
      afterFragment.appendChild(cloneItem(items[index], index, 'after'));
    }

    track.insertBefore(beforeFragment, items[0]);
    track.appendChild(afterFragment);
    shell.setAttribute('data-mp-connected-clones-before', String(items.length));
    shell.setAttribute('data-mp-connected-clones-after', String(items.length));
  }

  function allItems(track) {
    return query(track, SELECTOR.item);
  }

  function readInfo(shell) {
    var viewport = first(shell, SELECTOR.viewport);
    var track = first(shell, SELECTOR.track);
    var items;
    var all;
    var beforeCount;
    var defaultIndex;
    var position;

    if (!viewport || !track) {
      return null;
    }

    items = originalItems(track);
    all = allItems(track);
    beforeCount = number(shell.getAttribute('data-mp-connected-clones-before'), items.length);
    defaultIndex = number(shell.getAttribute('data-mp-connected-default-index'), 0);
    position = number(shell.getAttribute('data-mp-connected-position'), beforeCount + defaultIndex);

    if (!items.length || !all.length) {
      return null;
    }

    return {
      shell: shell,
      viewport: viewport,
      track: track,
      items: items,
      allItems: all,
      beforeCount: beforeCount,
      position: position,
      previous: first(shell, SELECTOR.previous),
      next: first(shell, SELECTOR.next)
    };
  }

  function realIndexFromPosition(info, position) {
    var item = info.allItems[position];
    var indexed;

    if (item) {
      indexed = number(item.getAttribute('data-mp-connected-real-index'), NaN);
      if (!isNaN(indexed)) {
        return modulo(indexed, info.items.length);
      }
    }

    return modulo(position - info.beforeCount, info.items.length);
  }

  function offsetForPosition(info, position) {
    var item = info.allItems[position];
    var viewportWidth = info.viewport.clientWidth || 0;
    var itemWidth;
    var rawOffset;

    if (!item) {
      return 0;
    }

    itemWidth = item.offsetWidth || 0;
    rawOffset = (item.offsetLeft || 0) - Math.max(0, (viewportWidth - itemWidth) / 2);

    return Math.round(rawOffset);
  }

  function setTrackOffset(info, offset, instant) {
    if (instant) {
      info.track.classList.add('is-mp-connected-jump');
      info.track.style.setProperty('transition', 'none', 'important');
    } else {
      info.track.classList.remove('is-mp-connected-jump');
      info.track.style.removeProperty('transition');
    }

    info.track.style.setProperty('--mp-connected-offset', offset + 'px');
    info.track.style.setProperty('transform', 'translate3d(' + (-offset) + 'px, 0, 0)', 'important');

    if (instant) {
      window.requestAnimationFrame(function () {
        window.requestAnimationFrame(function () {
          info.track.classList.remove('is-mp-connected-jump');
          info.track.style.removeProperty('transition');
        });
      });
    }
  }

  function setControls(info) {
    if (info.previous) {
      info.previous.classList.remove('is-mp-disabled');
      info.previous.setAttribute('aria-disabled', 'false');
    }
    if (info.next) {
      info.next.classList.remove('is-mp-disabled');
      info.next.setAttribute('aria-disabled', 'false');
    }
  }

  function setCardStates(info, activePosition) {
    info.allItems.forEach(function (item, itemPosition) {
      var distance = itemPosition - activePosition;
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
      item.setAttribute('aria-hidden', current || absoluteDistance <= 3 ? 'false' : 'true');
    });
  }

  function renderPosition(info, position, instant) {
    var index = realIndexFromPosition(info, position);
    var offset = offsetForPosition(info, position);

    info.shell.setAttribute('data-mp-connected-index', String(index));
    info.shell.setAttribute('data-mp-connected-position', String(position));
    info.shell.setAttribute('data-mp-connected-offset', String(offset));
    info.shell.classList.add('is-mp-connected-js-ready');
    info.shell.classList.add('is-mp-connected-looping');
    info.shell.classList.toggle('is-mp-connected-moved', index !== number(info.shell.getAttribute('data-mp-connected-default-index'), 0));
    info.shell.classList.toggle('is-mp-connected-at-start', index === 0);
    info.shell.classList.toggle('is-mp-connected-at-end', index === info.items.length - 1);

    setCardStates(info, position);
    setTrackOffset(info, offset, instant);
    setControls(info);
  }

  function renderShell(shell, position, instant) {
    var info = readInfo(shell);
    if (info) {
      renderPosition(info, position, instant);
    }
  }

  function normalizeAfterMove(shell) {
    var info = readInfo(shell);
    var position;
    var normalized;

    if (!info) {
      return;
    }

    position = number(info.shell.getAttribute('data-mp-connected-position'), info.position);
    normalized = position;

    if (position >= info.beforeCount + info.items.length) {
      normalized = position - info.items.length;
    } else if (position < info.beforeCount) {
      normalized = position + info.items.length;
    }

    if (normalized !== position) {
      renderPosition(info, normalized, true);
    }

    shell.classList.remove('is-mp-connected-moving');
  }

  function scheduleNormalize(info) {
    var called = false;
    var fallback;

    function done(event) {
      if (event && event.target !== info.track) {
        return;
      }
      if (called) {
        return;
      }
      called = true;
      window.clearTimeout(fallback);
      info.track.removeEventListener('transitionend', done);
      normalizeAfterMove(info.shell);
    }

    info.track.addEventListener('transitionend', done);
    fallback = window.setTimeout(done, 920);
  }

  function move(shell, direction) {
    var info = readInfo(shell);
    var nextPosition;

    if (!info || info.shell.classList.contains('is-mp-connected-moving')) {
      return;
    }

    nextPosition = info.position + direction;

    if (nextPosition < 0) {
      nextPosition = info.allItems.length - 1;
    }
    if (nextPosition >= info.allItems.length) {
      nextPosition = 0;
    }

    info.shell.classList.add('is-mp-connected-moving');
    renderPosition(info, nextPosition, false);
    scheduleNormalize(info);
  }

  function activateControl(control, event) {
    var shell = closest(control, SELECTOR.shell);
    var action;

    if (!shell) {
      return;
    }

    action = control.getAttribute('data-mp-connected-action') || (control.matches(SELECTOR.previous) ? 'prev' : 'next');

    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    move(shell, action === 'prev' ? -1 : 1);
  }

  function bindShell(shell) {
    var viewport;
    var track;
    var items;
    var defaultIndex;
    var defaultTitle;
    var startPosition;
    var info;

    if (!shell || shell.getAttribute('data-mp-connected-ready') === '1') {
      return;
    }

    viewport = first(shell, SELECTOR.viewport);
    track = first(shell, SELECTOR.track);

    if (!viewport || !track) {
      return;
    }

    shell.setAttribute('data-mp-connected-ready', '1');
    ensureLoopClones(shell, track);
    items = originalItems(track);
    defaultIndex = number(shell.getAttribute('data-mp-connected-default-index'), 0);
    defaultTitle = String(shell.getAttribute('data-mp-connected-default-title') || '').toLowerCase();

    if (defaultTitle) {
      items.forEach(function (item, index) {
        if (String(item.getAttribute('data-mp-connected-title') || '').toLowerCase() === defaultTitle) {
          defaultIndex = index;
        }
      });
    }

    shell.setAttribute('data-mp-connected-default-index', String(defaultIndex));
    startPosition = items.length + defaultIndex;
    shell.setAttribute('data-mp-connected-position', String(startPosition));

    query(shell, SELECTOR.control).forEach(function (control) {
      if (!control.getAttribute('role')) {
        control.setAttribute('role', 'button');
      }
      if (!control.getAttribute('tabindex')) {
        control.setAttribute('tabindex', '0');
      }
    });

    info = readInfo(shell);
    if (info) {
      renderPosition(info, startPosition, true);
    }
  }

  function refreshShell(shell) {
    var track = first(shell, SELECTOR.track);
    var index;
    var items;
    var position;

    if (!track) {
      return;
    }

    index = number(shell.getAttribute('data-mp-connected-index'), number(shell.getAttribute('data-mp-connected-default-index'), 0));
    ensureLoopClones(shell, track);
    items = originalItems(track);
    position = items.length + modulo(index, items.length);
    renderShell(shell, position, true);
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

  window.addEventListener('resize', function () {
    query(document, SELECTOR.shell).forEach(refreshShell);
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