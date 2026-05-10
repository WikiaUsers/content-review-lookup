/*
 * Magical Princess Wiki â€” Connected Titles Carousel
 * Page name: MediaWiki:ConnectedTitlesCarousel.js
 *
 * Standalone behavior for Template:MainPage/ConnectedTitles.
 * The template provides only the carousel shell, viewport, track, and item classes.
 * This script injects the < and > buttons after the wikitext has rendered.
 */
(function (mw, window, document) {
  'use strict';

  var BUILD = 'mp-connected-titles-carousel:standalone-injected-controls-v1:2026-05-10';
  var MP = window.MagicalPrincess = window.MagicalPrincess || {};
  var api = MP.connectedTitlesCarousel = MP.connectedTitlesCarousel || {};

  if (api.loadedBuildIdentifier === BUILD) {
    return;
  }

  api.loadedBuildIdentifier = BUILD;
  api.instances = [];

  var SELECTOR = {
    shell: '.mp-js-connected-carousel',
    viewport: '.mp-js-connected-carousel-viewport, .mp-js-carousel-viewport, .mp-connected-carousel-viewport',
    track: '.mp-js-connected-carousel-track, .mp-js-carousel-track, .mp-connected-carousel-track',
    item: '.mp-js-connected-carousel-item, .mp-js-carousel-item, .mp-connected-title-card',
    prev: '.mp-js-connected-carousel-prev, .mp-js-carousel-prev, .mp-connected-carousel-prev, [data-mp-connected-carousel-action="previous"], [data-mp-carousel-action="previous"], [data-mp-carousel-action="prev"]',
    next: '.mp-js-connected-carousel-next, .mp-js-carousel-next, .mp-connected-carousel-next, [data-mp-connected-carousel-action="next"], [data-mp-carousel-action="next"]',
    control: '.mp-js-connected-carousel-prev, .mp-js-connected-carousel-next, .mp-js-carousel-prev, .mp-js-carousel-next, .mp-connected-carousel-prev, .mp-connected-carousel-next, [data-mp-connected-carousel-action], [data-mp-carousel-action]'
  };

  function arr(list) {
    return Array.prototype.slice.call(list || []);
  }

  function rootOf(content) {
    if (content && content[0] && content[0].querySelectorAll) {
      return content[0];
    }
    if (content && content.nodeType === 1 && content.querySelectorAll) {
      return content;
    }
    return document;
  }

  function query(scope, selector) {
    try {
      return arr((scope || document).querySelectorAll(selector));
    } catch (error) {
      return [];
    }
  }

  function matches(element, selector) {
    return !!(element && element.nodeType === 1 && element.matches && element.matches(selector));
  }

  function closest(element, selector) {
    if (element && element.nodeType !== 1) {
      element = element.parentElement;
    }
    while (element && element.nodeType === 1) {
      if (matches(element, selector)) {
        return element;
      }
      element = element.parentElement;
    }
    return null;
  }

  function unique(items) {
    var output = [];
    items.forEach(function (item) {
      if (item && output.indexOf(item) === -1) {
        output.push(item);
      }
    });
    return output;
  }

  function number(value, fallback) {
    var parsed = parseInt(value, 10);
    return isNaN(parsed) ? fallback : parsed;
  }

  function bool(value, fallback) {
    if (value === undefined || value === null || value === '') {
      return !!fallback;
    }
    return /^(1|true|yes|on)$/i.test(String(value));
  }

  function reducedMotion() {
    return !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }

  function readData(element, key, fallback) {
    if (element && element.dataset && element.dataset[key] !== undefined && element.dataset[key] !== '') {
      return element.dataset[key];
    }
    return fallback;
  }

  function controlButton(className, action, label, textValue) {
    var button = document.createElement('button');
    button.type = 'button';
    button.className = className;
    button.setAttribute('data-mp-connected-carousel-action', action);
    button.setAttribute('aria-label', label);
    button.textContent = textValue;
    return button;
  }

  function ensureControls(record) {
    var shell = record.shell;
    var viewport = record.viewport;

    record.prev = query(shell, SELECTOR.prev)[0] || null;
    record.next = query(shell, SELECTOR.next)[0] || null;

    if (!record.prev) {
      record.prev = controlButton(
        'mp-connected-carousel-control mp-connected-carousel-arrow mp-connected-carousel-prev mp-connected-carousel-arrow-prev mp-js-connected-carousel-prev mp-js-carousel-prev',
        'previous',
        'Previous connected title',
        '<'
      );
      shell.insertBefore(record.prev, viewport || shell.firstChild);
    }

    if (!record.next) {
      record.next = controlButton(
        'mp-connected-carousel-control mp-connected-carousel-arrow mp-connected-carousel-next mp-connected-carousel-arrow-next mp-js-connected-carousel-next mp-js-carousel-next',
        'next',
        'Next connected title',
        '>'
      );
      shell.appendChild(record.next);
    }

    [record.prev, record.next].forEach(function (control) {
      if (!control) {
        return;
      }
      control.classList.add('is-mp-carousel-control-bound');
      control.setAttribute('role', 'button');
      if (!control.getAttribute('tabindex')) {
        control.setAttribute('tabindex', '0');
      }
    });
  }

  function cardStep(record) {
    var first = record.items[0];
    var second = record.items[1];
    var firstRect;
    var secondRect;
    var style;
    var gap;

    if (!first) {
      return 0;
    }

    firstRect = first.getBoundingClientRect();

    if (second) {
      secondRect = second.getBoundingClientRect();
      if (secondRect.left > firstRect.left) {
        return secondRect.left - firstRect.left;
      }
    }

    style = window.getComputedStyle ? window.getComputedStyle(record.track) : null;
    gap = style ? parseFloat(style.columnGap || style.gap || '0') : 0;
    return firstRect.width + (isNaN(gap) ? 0 : gap);
  }

  function visibleCount(record) {
    var width = record.viewport ? record.viewport.clientWidth : 0;
    var step = cardStep(record);

    if (!width || !step) {
      return 1;
    }

    return Math.max(1, Math.floor(width / step));
  }

  function maxIndex(record) {
    return Math.max(0, record.items.length - visibleCount(record));
  }

  function clampIndex(record, index) {
    var max = maxIndex(record);

    if (record.loop && record.items.length) {
      if (index < 0) {
        return max;
      }
      if (index > max) {
        return 0;
      }
      return index;
    }

    return Math.max(0, Math.min(index, max));
  }

  function setDisabled(control, value) {
    if (!control) {
      return;
    }
    control.classList.toggle('is-mp-disabled', !!value);
    control.setAttribute('aria-disabled', value ? 'true' : 'false');
  }

  function render(record, immediate) {
    var step = cardStep(record);
    var count = visibleCount(record);
    var max = maxIndex(record);
    var offset;

    record.index = clampIndex(record, record.index);
    offset = Math.round(record.index * step);

    record.shell.dataset.mpConnectedCarouselIndex = String(record.index);
    record.shell.dataset.mpConnectedCarouselMax = String(max);
    record.shell.dataset.mpConnectedCarouselVisible = String(count);

    record.track.style.transition = immediate || reducedMotion() ? 'none' : '';
    record.track.style.transform = 'translate3d(' + (-offset) + 'px, 0, 0)';

    record.items.forEach(function (item, itemIndex) {
      var isVisible = itemIndex >= record.index && itemIndex < record.index + count;
      item.hidden = false;
      item.removeAttribute('hidden');
      item.setAttribute('aria-hidden', isVisible ? 'false' : 'true');
      item.classList.toggle('is-current', itemIndex === record.index);
      item.classList.toggle('is-mp-current', itemIndex === record.index);
      item.classList.toggle('is-mp-carousel-in-view', isVisible);
      item.classList.add('is-mp-carousel-item-ready');
      item.classList.remove('is-mp-carousel-hidden', 'is-mp-hidden');
    });

    setDisabled(record.prev, !record.loop && record.index <= 0);
    setDisabled(record.next, !record.loop && record.index >= max);

    record.shell.classList.add('is-mp-carousel-ready', 'is-mp-connected-carousel-ready');
    record.shell.classList.toggle('is-mp-carousel-at-start', record.index <= 0);
    record.shell.classList.toggle('is-mp-carousel-at-end', record.index >= max);
    record.shell.classList.toggle('is-mp-carousel-single-page', max <= 0);
    record.shell.classList.toggle('is-mp-carousel-has-pages', max > 0);
  }

  function move(record, direction) {
    var stepCount = Math.max(number(readData(record.shell, 'mpConnectedCarouselStep', readData(record.shell, 'mpCarouselStep', 1)), 1), 1);
    record.index = clampIndex(record, record.index + (direction * stepCount));
    render(record, false);
  }

  function buildRecord(shell) {
    var viewport;
    var track;
    var items;
    var record;

    if (!shell || !shell.querySelectorAll) {
      return null;
    }

    viewport = query(shell, SELECTOR.viewport)[0] || shell;
    track = query(shell, SELECTOR.track)[0];
    items = track ? query(track, SELECTOR.item) : query(shell, SELECTOR.item);

    if (!track || !items.length) {
      shell.classList.add('is-mp-carousel-missing-parts');
      return null;
    }

    record = shell.mpConnectedTitlesCarouselRecord;

    if (!record) {
      record = {
        shell: shell,
        viewport: viewport,
        track: track,
        items: items,
        index: Math.max(number(readData(shell, 'mpConnectedCarouselStart', readData(shell, 'mpCarouselStart', 0)), 0), 0),
        loop: bool(readData(shell, 'mpConnectedCarouselLoop', readData(shell, 'mpCarouselLoop', 'false')), false)
      };
      shell.mpConnectedTitlesCarouselRecord = record;
      api.instances.push(record);
    } else {
      record.viewport = viewport;
      record.track = track;
      record.items = items;
      record.loop = bool(readData(shell, 'mpConnectedCarouselLoop', readData(shell, 'mpCarouselLoop', 'false')), false);
    }

    ensureControls(record);
    render(record, true);
    return record;
  }

  function init(content) {
    var root = rootOf(content);
    var shells = [];

    if (!root || !root.querySelectorAll) {
      return;
    }

    if (matches(root, SELECTOR.shell)) {
      shells.push(root);
    }

    shells = shells.concat(query(root, SELECTOR.shell));
    unique(shells).forEach(buildRecord);
  }

  function recordFromControl(control) {
    var shell = closest(control, SELECTOR.shell);
    return shell ? buildRecord(shell) : null;
  }

  function activate(control, event) {
    var record;
    var action;

    if (!control || control.classList.contains('is-mp-disabled') || control.getAttribute('aria-disabled') === 'true') {
      return;
    }

    record = recordFromControl(control);
    if (!record) {
      return;
    }

    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    action = control.getAttribute('data-mp-connected-carousel-action') || control.getAttribute('data-mp-carousel-action') || '';

    if (action === 'previous' || action === 'prev' || matches(control, SELECTOR.prev)) {
      move(record, -1);
    } else {
      move(record, 1);
    }
  }

  function onClick(event) {
    var control = closest(event.target, SELECTOR.control);
    if (control) {
      activate(control, event);
    }
  }

  function onKeydown(event) {
    var control;
    var shell;
    var record;

    control = closest(event.target, SELECTOR.control);
    if (control && (event.key === 'Enter' || event.key === ' ')) {
      activate(control, event);
      return;
    }

    shell = closest(event.target, SELECTOR.shell);
    if (!shell || (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight')) {
      return;
    }

    record = buildRecord(shell);
    if (!record) {
      return;
    }

    event.preventDefault();
    move(record, event.key === 'ArrowLeft' ? -1 : 1);
  }

  function refresh() {
    init(document);
    api.instances.forEach(function (record) {
      render(record, true);
    });
  }

  api.init = init;
  api.refresh = refresh;
  api.next = function () {
    refresh();
    if (api.instances[0]) {
      move(api.instances[0], 1);
    }
  };
  api.previous = function () {
    refresh();
    if (api.instances[0]) {
      move(api.instances[0], -1);
    }
  };

  document.addEventListener('click', onClick, true);
  document.addEventListener('keydown', onKeydown, true);

  if (mw && mw.hook) {
    mw.hook('wikipage.content').add(init);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { init(document); });
  } else {
    init(document);
  }

  window.setTimeout(function () { init(document); }, 250);
  window.setTimeout(function () { init(document); }, 1000);
  window.setTimeout(function () { init(document); }, 2500);

  if (window.ResizeObserver) {
    new ResizeObserver(function () {
      window.clearTimeout(api.resizeTimer);
      api.resizeTimer = window.setTimeout(refresh, 120);
    }).observe(document.documentElement);
  } else {
    window.addEventListener('resize', refresh);
  }
}(window.mediaWiki || window.mw, window, document));