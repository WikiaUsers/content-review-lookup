/*
 * Magical Princess Wiki â€” Connected Titles Auto Shelf
 *
 * Purpose:
 * Adds optional motion to the Connected Titles shelf. It emphasizes one cover
 * at a time, scrolls the shelf naturally, and keeps native touch/trackpad
 * scrolling as a fallback.
 *
 * Install:
 * Create this page as MediaWiki:ConnectedTitlesAutoShelf.js and add
 * ConnectedTitlesAutoShelf.js to MediaWiki:ImportJS.
 */
(function (mw, window, document) {
  'use strict';

  var SCRIPT = {
    name: 'Magical Princess Connected Titles Auto Shelf',
    version: '2026-05-10-autoshelf'
  };
  var buildIdentifier = 'mp-connected-titles-auto-shelf:' + SCRIPT.version;
  var MP = window.MagicalPrincess = window.MagicalPrincess || {};
  var feature = MP.connectedTitlesAutoShelf = MP.connectedTitlesAutoShelf || {};

  if (feature.loadedBuildIdentifier === buildIdentifier) {
    return;
  }

  feature.loadedBuildIdentifier = buildIdentifier;
  feature.version = SCRIPT.version;

  function array(list) {
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
      return array((scope || document).querySelectorAll(selector));
    } catch (error) {
      return [];
    }
  }

  function number(value, fallback) {
    var parsed = parseInt(value, 10);
    return isNaN(parsed) ? fallback : parsed;
  }

  function hasDebug(shell) {
    return /(?:^|[?&])mpConnectedDebug=1(?:&|$)/.test(window.location.search || '') ||
      String(shell && shell.getAttribute('data-mp-auto-debug') || '') === '1';
  }

  function log(shell) {
    if (!hasDebug(shell) || !window.console || !console.log) {
      return;
    }
    console.log.apply(console, ['[MP ConnectedTitles AutoShelf]'].concat(array(arguments).slice(1)));
  }

  function reducedMotion() {
    return !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }

  function maxScroll(track) {
    return Math.max(0, track.scrollWidth - track.clientWidth);
  }

  function itemCenter(item) {
    return item.offsetLeft + (item.offsetWidth / 2);
  }

  function viewportCenter(track) {
    return track.scrollLeft + (track.clientWidth / 2);
  }

  function nearestIndex(track, items) {
    var center = viewportCenter(track);
    var closest = 0;
    var distance = Infinity;

    items.forEach(function (item, index) {
      var currentDistance = Math.abs(itemCenter(item) - center);
      if (currentDistance < distance) {
        closest = index;
        distance = currentDistance;
      }
    });

    return closest;
  }

  function setCurrent(shell, track, items, index) {
    var last = items.length - 1;

    index = Math.max(0, Math.min(index, last));
    shell.setAttribute('data-mp-current-index', String(index));
    shell.classList.toggle('is-mp-past-start', index > 0 || track.scrollLeft > 2);
    shell.classList.toggle('is-mp-at-end', index >= last || track.scrollLeft >= maxScroll(track) - 2);

    items.forEach(function (item, itemIndex) {
      var active = itemIndex === index;
      item.classList.toggle('is-current', active);
      item.classList.toggle('is-mp-current', active);
      if (active) {
        item.setAttribute('aria-current', 'true');
      } else {
        item.removeAttribute('aria-current');
      }
    });

    return index;
  }

  function scrollToIndex(shell, track, items, index, instant) {
    var item = items[index];
    var left;

    if (!item) {
      return;
    }

    left = item.offsetLeft - ((track.clientWidth - item.offsetWidth) / 2);
    left = Math.max(0, Math.min(left, maxScroll(track)));

    try {
      track.scrollTo({
        left: left,
        top: 0,
        behavior: instant || reducedMotion() ? 'auto' : 'smooth'
      });
    } catch (error) {
      track.scrollLeft = left;
    }

    log(shell, 'scrollToIndex', index, 'left=', left);
  }

  function initShelf(shell) {
    var track;
    var items;
    var index;
    var interval;
    var pauseTime;
    var timer = null;
    var scrollTimer = null;
    var paused = false;
    var reduce = reducedMotion();

    if (!shell || shell.getAttribute('data-mp-auto-ready') === '1') {
      return;
    }

    track = shell.querySelector('.mp-connected-auto-track, .mp-connected-carousel-track, .mp-connected-scroll-track');
    if (!track) {
      log(shell, 'no track found');
      return;
    }

    items = query(track, '.mp-connected-auto-item, .mp-connected-title-card, .mp-connected-scroll-item');
    if (items.length < 2) {
      log(shell, 'not enough items', items.length);
      return;
    }

    interval = Math.max(number(shell.getAttribute('data-mp-auto-interval'), 3600), 1400);
    pauseTime = Math.max(number(shell.getAttribute('data-mp-auto-resume-delay'), 6200), 1600);
    index = 0;

    shell.setAttribute('data-mp-auto-ready', '1');
    shell.classList.add('is-mp-auto-ready');
    track.setAttribute('tabindex', track.getAttribute('tabindex') || '0');
    track.setAttribute('aria-live', 'polite');

    function clearTimer() {
      if (timer) {
        window.clearTimeout(timer);
        timer = null;
      }
    }

    function schedule(delay) {
      clearTimer();
      if (paused || reduce || shell.getAttribute('data-mp-auto-play') === 'false') {
        return;
      }
      timer = window.setTimeout(function () {
        index = index >= items.length - 1 ? 0 : index + 1;
        setCurrent(shell, track, items, index);
        scrollToIndex(shell, track, items, index, false);
        schedule(interval);
      }, delay || interval);
    }

    function pause() {
      paused = true;
      shell.classList.add('is-mp-auto-paused');
      clearTimer();
      log(shell, 'paused');
    }

    function resumeAfterDelay() {
      clearTimer();
      timer = window.setTimeout(function () {
        paused = false;
        shell.classList.remove('is-mp-auto-paused');
        index = nearestIndex(track, items);
        index = setCurrent(shell, track, items, index);
        schedule(interval);
        log(shell, 'resumed at', index);
      }, pauseTime);
    }

    function onManualScroll() {
      if (scrollTimer) {
        window.clearTimeout(scrollTimer);
      }
      scrollTimer = window.setTimeout(function () {
        index = nearestIndex(track, items);
        index = setCurrent(shell, track, items, index);
        log(shell, 'manual scroll nearest', index);
      }, 90);
    }

    shell.addEventListener('mouseenter', pause);
    shell.addEventListener('mouseleave', resumeAfterDelay);
    shell.addEventListener('focusin', pause);
    shell.addEventListener('focusout', resumeAfterDelay);
    track.addEventListener('touchstart', pause, { passive: true });
    track.addEventListener('touchend', resumeAfterDelay, { passive: true });
    track.addEventListener('wheel', function () {
      pause();
      resumeAfterDelay();
    }, { passive: true });
    track.addEventListener('scroll', onManualScroll, { passive: true });

    track.addEventListener('keydown', function (event) {
      if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') {
        return;
      }
      event.preventDefault();
      pause();
      index = event.key === 'ArrowRight' ? Math.min(items.length - 1, index + 1) : Math.max(0, index - 1);
      index = setCurrent(shell, track, items, index);
      scrollToIndex(shell, track, items, index, false);
      resumeAfterDelay();
    });

    index = setCurrent(shell, track, items, 0);
    scrollToIndex(shell, track, items, 0, true);
    schedule(interval);
    log(shell, 'ready', items.length, 'items');
  }

  function init(content) {
    var root = rootOf(content);
    query(root, '.mp-js-connected-autoshelf, .mp-connected-carousel-shell, .mp-connected-scroll-shelf').forEach(initShelf);
  }

  feature.init = init;
  feature.refresh = function () {
    query(document, '.mp-js-connected-autoshelf, .mp-connected-carousel-shell, .mp-connected-scroll-shelf').forEach(function (shell) {
      shell.removeAttribute('data-mp-auto-ready');
      initShelf(shell);
    });
  };

  if (mw && mw.hook) {
    mw.hook('wikipage.content').add(init);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { init(document); });
  } else {
    init(document);
  }
}(window.mediaWiki || window.mw, window, document));