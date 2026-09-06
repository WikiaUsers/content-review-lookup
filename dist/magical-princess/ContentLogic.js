/*
 * Magical Princess Wiki - Content Logic Behaviours
 *
 * Purpose:
 * Adds optional, reusable behaviours to rendered wikitext through Magical Princess
 * mp-js-* marker classes. It is intended for wiki pages, templates, and module-rendered
 * sections that deliberately opt into small interface behaviours.
 *
 * Supported behaviour groups:
 * - Rotating text for short labels, notices, and Featured Article kicker text.
 * - Achievement summaries for marked achievement/progress-tracking areas.
 * - Toggle panels for expandable wikitext sections.
 * - Collapsible containers with generated toggle buttons for scrollable sections.
 * - Filters and counters for marked lists, cards, rows, and catalog-style content.
 * - Current-page link highlighting for Magical Princess navigation links.
 * - Read-more text for long plain-text notes.
 * - Spoiler-consent gates that require an explicit reader action before protected content is revealed.
 * - Reveal-on-scroll states, including a repeat variant.
 *
 * Structure:
 * Wikitext, templates, and modules provide the content and mp-js-* hooks.
 * MainPage.css and related stylesheets control the visual design.
 * This script adds behaviour classes, text updates, and interaction states after page content renders.
 *
 * Version 6 adds a module registry and managed per-element resources.
 * See contentlogic-guide.md for lifecycle, CSS bridge, and extension examples.
 *
 * Review references:
 * - CSS and JS customization:
 *   https://community.fandom.com/wiki/Help:CSS_and_JS_customization
 * - Duplicate JavaScript guidance:
 *   https://community.fandom.com/wiki/Help:Advanced_CSS_and_JS#Duplicate_JavaScript
 * - wikipage.content hook:
 *   https://doc.wikimedia.org/mediawiki-core/master/js/Hooks.html
 */

(function (mw, window, document) {
  'use strict';


  /* ---------------------------------------------------------------------- */

/**
 * Script identity and duplicate-load guard
 * First loaded version owns the document. Never mix live builds: replace the
 * imported file and reload the page to upgrade; the old build has no teardown API.
 * Reference:
 * https://community.fandom.com/wiki/Help:Advanced_CSS_and_JS#Duplicate_JavaScript
 */
  var SCRIPT = {
    name: 'Magical Princess Content Logic',
    version: '6.0.1',
    features: 'wikitext-behaviours-featured-article-rotator-collapsible-containers-full-article-spoiler-consent-gate-no-leaks'
  };
  SCRIPT.buildIdentifier = 'mp-content-logic:' + SCRIPT.features + ':' + SCRIPT.version;

  var MP = window.MagicalPrincess = window.MagicalPrincess || {};
  var logic = MP.contentLogic = MP.contentLogic || {};

  if (logic.loadedBuildIdentifier) {
    return;
  }

  if (!window.WeakMap || !document.querySelectorAll || !window.Element ||
      !window.Element.prototype.matches || !window.Element.prototype.closest) { return; }

  logic.scriptName = SCRIPT.name;
  logic.version = SCRIPT.version;
  logic.featureSet = SCRIPT.features;
  logic.loadedBuildIdentifier = SCRIPT.buildIdentifier;
  logic.timers = logic.timers || {};
  logic.flags = logic.flags || {};

  /* Module lifecycle. Public extension API is documented in contentlogic-guide.md.
   * No eval, markup injection, global DOM interception, or external dependencies.
   * Disable/destroy releases resources; it is not an undo of all rendered state.
   */
  var modules = Object.create(null);
  var order = [];
  var records = [];
  var active = null;
  var started = false;
  var removalObserver = null;
  var globalCleanups = [];
  var timeoutOwners = Object.create(null);
  var intervalOwners = Object.create(null);
  var config = logic.config = logic.config || {};
  config.features = config.features || {};
  config.options = config.options || {};
  logic.errors = [];

  function report(name, error) {
    logic.errors.push({ module: name, message: String(error && error.message || error) });
    if (logic.errors.length > 30) { logic.errors.shift(); }
    if (window.console && window.console.warn) {
      window.console.warn('[MP contentLogic] ' + name, error);
    }
  }

  function enabled(name) {
    return config.features[name] !== false;
  }

  function optedOut(element, name) {
    var value = element.getAttribute('data-mp-disable');
    return value === 'true' || splitValues(value, /\s+/).indexOf(name) !== -1;
  }

  function invoke(record, fn, args, receiver) {
    var previous = active;
    if (record && record.dead) { return; }
    active = record;
    try { return fn.apply(receiver || null, args || []); }
    catch (error) { report(record ? record.name : 'runtime', error); }
    finally { active = previous; }
  }

  function cleanup(fn) {
    (active ? active.cleanups : globalCleanups).push(fn);
    return fn;
  }

  function listen(target, type, handler, options) {
    var record = active;
    var wrapped = function (event) {
      return invoke(record, handler, [event], this);
    };
    target.addEventListener(type, wrapped, options || false);
    return cleanup(function () {
      target.removeEventListener(type, wrapped, options || false);
    });
  }

  function later(fn, delay) {
    var record = active;
    var id = window.setTimeout(function () {
      delete timeoutOwners[id];
      invoke(record, fn);
    }, delay);
    timeoutOwners[id] = record;
    return id;
  }

  function cancelLater(id) {
    window.clearTimeout(id);
    delete timeoutOwners[id];
  }

  function every(fn, delay) {
    var record = active;
    var id = window.setInterval(function () { invoke(record, fn); }, delay);
    intervalOwners[id] = record;
    return id;
  }

  function cancelEvery(id) {
    window.clearInterval(id);
    delete intervalOwners[id];
  }

  function option(key, fallback) {
    var options = active ? active.options : {};
    return options[key] === undefined ? fallback : options[key];
  }

  function emit(element, name, detail) {
    var event;
    if (typeof window.CustomEvent === 'function') {
      event = new window.CustomEvent(name, { bubbles: true, detail: detail });
    } else {
      event = document.createEvent('CustomEvent');
      event.initCustomEvent(name, true, false, detail);
    }
    element.dispatchEvent(event);
  }

  function state(element, name, value) {
    if (!/^[a-z][a-z0-9-]*$/.test(name)) {
      throw new Error('State names must be lowercase tokens.');
    }
    var old = element.getAttribute('data-mp-state-' + name);
    element.setAttribute('data-mp-state-' + name, String(value));
    if (typeof value === 'boolean') {
      element.classList.toggle('is-mp-' + name, value);
    }
    if (old !== String(value)) {
      emit(element, 'mp:statechange', { name: name, value: value, previous: old });
    }
  }

  function mergeOptions(defaults, overrides) {
    var result = {};
    [defaults || {}, overrides || {}].forEach(function (source) {
      Object.keys(source).forEach(function (key) {
        if (key !== '__proto__' && key !== 'constructor' && key !== 'prototype') {
          result[key] = source[key];
        }
      });
    });
    return result;
  }

  function context(record) {
    function bound(fn) {
      return function () { return invoke(record, fn, arr(arguments)); };
    }
    return {
      element: record.element,
      options: record.options,
      on: bound(listen),
      activate: bound(bindActivation),
      timeout: bound(later),
      interval: bound(every),
      clearTimeout: cancelLater,
      clearInterval: cancelEvery,
      cleanup: bound(cleanup),
      emit: bound(function (name, detail) { emit(record.element, name, detail); }),
      setState: bound(function (name, value) { state(record.element, name, value); }),
      observe: bound(function (target, options, callback) {
        if (!window.MutationObserver) { return null; }
        var observer = new window.MutationObserver(function (changes) {
          invoke(record, callback, [changes]);
        });
        observer.observe(target, options);
        cleanup(function () { observer.disconnect(); });
        return observer;
      })
    };
  }

  function mountEach(root, name, selector, callback) {
    if (!enabled(name) || !allowedPage()) { return; }
    var definition = modules[name];
    query(root, selector).forEach(function (element) {
      var record = definition.instances.get(element);
      if (optedOut(element, name)) {
        if (record) { dispose(record); }
        return;
      }
      if (!record) {
        record = { name: name, element: element, cleanups: [], dead: false,
          options: mergeOptions(definition.defaults, config.options[name]) };
        record.context = context(record);
        definition.instances.set(element, record);
        records.push(record);
        /* DOM ready flags are compatibility output, never the source of ownership.
         * A clone may contain these attributes but has no event listeners. */
        if (definition.ready) { delete element.dataset[definition.ready]; }
      }
      invoke(record, function () {
        try { callback(element, record.context); }
        catch (error) { dispose(record); throw error; }
      });
    });
  }

  function dispose(record) {
    if (record.dead) { return; }
    record.dead = true;
    Object.keys(timeoutOwners).forEach(function (id) {
      if (timeoutOwners[id] === record) { cancelLater(Number(id)); }
    });
    Object.keys(intervalOwners).forEach(function (id) {
      if (intervalOwners[id] === record) { cancelEvery(Number(id)); }
    });
    record.cleanups.reverse().forEach(function (fn) {
      try { fn(); } catch (error) { report(record.name + ':cleanup', error); }
    });
    var definition = modules[record.name];
    if (definition.ready) { delete record.element.dataset[definition.ready]; }
    definition.instances.delete(record.element);
    records.splice(records.indexOf(record), 1);
    record.cleanups = [];
  }

  function rootsOf(content) {
    if (content === undefined || content === null) { return [document]; }
    if (content.querySelectorAll) { return [content]; }
    return unique(arr(content).filter(function (root) { return root && root.querySelectorAll; }));
  }

  function run(name, root) {
    if (!enabled(name)) { return; }
    try { modules[name].init(root); }
    catch (error) { report(name, error); }
  }

  function sweep() {
    records.slice().forEach(function (record) {
      if (!document.documentElement.contains(record.element)) { dispose(record); }
    });
  }

  function init(content) {
    if (!allowedPage()) { return; }
    rootsOf(content).forEach(function (root) {
      order.slice().forEach(function (name) { run(name, root); });
      if (containsMarker(root, SELECTOR.refresh)) {
        run('summaries', document);
        queueCounts(document, 40);
      }
    });
  }

  function register(name, definition) {
    if (!/^[a-z][a-zA-Z0-9-]*$/.test(name) || modules[name]) {
      throw new Error('Invalid or duplicate module: ' + name);
    }
    if (!definition || !definition.selector || typeof definition.mount !== 'function') {
      throw new Error('A module needs selector and mount(element, context).');
    }
    /* Validate once, and fail visibly instead of silently accepting a bad selector. */
    document.querySelectorAll(definition.selector);
    var entry = {
      selector: definition.selector, defaults: mergeOptions(definition.defaults),
      instances: new WeakMap(),
      init: function (root) {
        mountEach(root, name, entry.selector, function (element, ctx) {
          if (!active.mounted) {
            /* Mark before invoking mount to make reentrant init idempotent. */
            active.mounted = true;
            try {
              var disposer = definition.mount(element, ctx);
              if (typeof disposer === 'function') { cleanup(disposer); }
            } catch (error) {
              dispose(active);
              throw error;
            }
          } else if (typeof definition.refresh === 'function') {
            definition.refresh(element, ctx);
          }
        });
      }
    };
    modules[name] = entry;
    order.push(name);
    if (started) { run(name, document); }
    return logic;
  }

  function adapter(name, selector, ready, initializer, defaults) {
    modules[name] = { selector: selector, ready: ready, init: initializer,
      defaults: defaults || {}, instances: new WeakMap() };
    order.push(name);
  }

  function destroy(content, name) {
    var roots = rootsOf(content);
    records.slice().reverse().forEach(function (record) {
      if ((!name || record.name === name) && roots.some(function (root) {
        return root === record.element || root.contains(record.element);
      })) { dispose(record); }
    });
    return logic;
  }

  function configure(patch) {
    patch = patch || {};
    var changed = [];
    ['features', 'options'].forEach(function (group) {
      Object.keys(patch[group] || {}).forEach(function (name) {
        if (!modules[name]) { throw new Error('Unknown module: ' + name); }
      });
    });
    Object.keys(patch.features || {}).forEach(function (name) {
      config.features[name] = patch.features[name] !== false;
      changed.push(name);
    });
    Object.keys(patch.options || {}).forEach(function (name) {
      config.options[name] = mergeOptions(config.options[name], patch.options[name]);
      changed.push(name);
    });
    unique(changed).forEach(function (name) {
      records.slice().reverse().forEach(function (record) {
        if (record.name === name) { dispose(record); }
      });
      if (started) { run(name, document); }
    });
    return logic;
  }

  function start() {
    if (started) { return logic; }
    started = true;
    bindGlobalEvents();
    if (mw && typeof mw.hook === 'function') {
      mw.hook('wikipage.content').add(init);
      globalCleanups.push(function () { mw.hook('wikipage.content').remove(init); });
    }
    if (document.readyState === 'loading') {
      listen(document, 'DOMContentLoaded', function () { init(document); });
    } else { init(document); }
    /* Only removals are observed here. New content uses wikipage.content/init.
     * This avoids a body-wide attribute observer reacting to our own rendering. */
    if (window.MutationObserver && document.documentElement) {
      removalObserver = new window.MutationObserver(function (changes) {
        if (changes.some(function (change) { return change.removedNodes.length; })) { sweep(); }
      });
      removalObserver.observe(document.documentElement, { childList: true, subtree: true });
    }
    return logic;
  }

  function stop() {
    started = false;
    if (removalObserver) { removalObserver.disconnect(); removalObserver = null; }
    records.slice().reverse().forEach(dispose);
    if (revealObserver) { revealObserver.disconnect(); revealObserver = null; }
    globalCleanups.splice(0).reverse().forEach(function (fn) { fn(); });
    Object.keys(timeoutOwners).forEach(function (id) { cancelLater(Number(id)); });
    Object.keys(intervalOwners).forEach(function (id) { cancelEvery(Number(id)); });
    logic.timers.count = null;
    return logic;
  }

  function nativeButton(element) {
    return element.matches('button, input[type="button"], input[type="submit"], input[type="reset"], input[type="checkbox"]');
  }

  function bindActivation(element, handler) {
    if (element.matches('button') && !element.hasAttribute('type')) { element.type = 'button'; }
    if (!nativeButton(element)) {
      if (!element.hasAttribute('role')) { element.setAttribute('role', 'button'); }
      if (!element.hasAttribute('tabindex')) { element.setAttribute('tabindex', '0'); }
    }
    function activate(event) {
      if (element.disabled || element.getAttribute('aria-disabled') === 'true') { return; }
      handler(event);
    }
    listen(element, 'click', activate);
    listen(element, 'keydown', function (event) {
      if (!event.repeat && !nativeButton(element) && (event.key === 'Enter' || event.key === ' ')) {
        activate(event);
      }
    });
  }



  /* ---------------------------------------------------------------------- */

  var SELECTOR = logic.selectors = {
    marker: [
      '.mp-js-rotator', '.mp-js-rotate',
      '.mp-js-achievement-summary', '.mp-js-achievement-step-check', '.mp-entry-like.advanced-tooltip',
      '.mp-js-toggle', '.mp-js-toggle-panel',
      '.mp-js-collapsible', '.mp-js-collapse', '.mp-js-collapse-toggle', '.mp-js-collapse-body',
      '.mp-js-filter', '.mp-js-filter-list', '.mp-js-filter-item',
      '.mp-js-count', '.mp-js-current-link', '.mp-navigationbar-link',
      '.mp-js-readmore', '.mp-js-spoiler-gate', '.mp-spoiler-shell', '.mp-spoiler-page-gate',
      '.mp-js-reveal', '.mp-js-reveal-repeat'
    ].join(', '),
    refresh: [
      '.mp-js-achievement-summary', '.mp-js-count', '.mp-js-count-group',
      'table-progress-tracking', '.mp-achievement-list-wrap', '.mp-achievement-list'
    ].join(', '),
    rotator: '.mp-js-rotator, .mp-js-rotate',
    rotatorItem: '.mp-js-rotator-item, .mp-js-rotate-item',
    summary: '.mp-js-achievement-summary',
    achievementStepCheck: '.mp-js-achievement-step-check',
    toggle: '.mp-js-toggle',
    togglePanel: '.mp-js-toggle-panel',
    collapsible: '.mp-js-collapsible, .mp-js-collapse',
    collapseHeader: '.mp-js-collapse-heading, .mp-achievement-list-title',
    collapseToggle: '.mp-js-collapse-toggle',
    collapseBody: '.mp-js-collapse-body',
    filter: '.mp-js-filter',
    filterList: '.mp-js-filter-list',
    filterItem: '.mp-js-filter-item',
    count: '.mp-js-count',
    currentLink: '.mp-js-current-link a, .mp-navigationbar-link a',
    readMore: '.mp-js-readmore',
    spoilerGate: '.mp-js-spoiler-gate, .mp-spoiler-shell',
    spoilerPageGate: '.mp-spoiler-page-gate',
    spoilerWarning: '.mp-spoiler-warning',
    spoilerButton: '.mp-spoiler-button',
    spoilerBody: '.mp-spoiler-body',
    reveal: '.mp-js-reveal, .mp-js-reveal-repeat'
  };


  /* ---------------------------------------------------------------------- */

  function arr(list) {
    return Array.prototype.slice.call(list || []);
  }

  function query(scope, selector) {
    try {
      var root = scope || document;
      return (root.matches && root.matches(selector) ? [root] : []).concat(arr(root.querySelectorAll(selector)));
    } catch (error) {
      return [];
    }
  }

  function containsMarker(root, selector) {
    return !!(
      root && root.querySelectorAll &&
      ((root.matches && root.matches(selector)) || root.querySelector(selector))
    );
  }

  function allowedPage() {
    var ns;
    var action;

    if (!mw || !mw.config || typeof mw.config.get !== 'function') {
      return true;
    }

    ns = mw.config.get('wgNamespaceNumber');
    action = String(mw.config.get('wgAction') || 'view').toLowerCase();

    return ns !== -1 && /^(view|purge|edit|submit)$/.test(action);
  }

  function number(value, fallback) {
    var parsed = parseInt(value, 10);
    return isNaN(parsed) ? fallback : parsed;
  }

  function booleanValue(value, fallback) {
    if (value === undefined || value === null || value === '') {
      return !!fallback;
    }
    return /^(1|true|yes|on)$/i.test(String(value));
  }

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function splitValues(value, separator) {
    return String(value || '').split(separator || '|').map(function (item) {
      return item.trim();
    }).filter(Boolean);
  }

  function escapeAttr(value) {
    return String(value || '').replace(/\\/g, '\\\\').replace(/"/g, '\\"');
  }

  function unique(items) {
    return items.filter(function (item, index, array) {
      return item && array.indexOf(item) === index;
    });
  }

  function text(element, value) {
    if (element && element.textContent !== value) {
      element.textContent = value;
    }
  }

  function data(element, key, value) {
    if (element && element.dataset[key] !== String(value)) {
      element.dataset[key] = String(value);
    }
  }

  function hidden(element, isHidden) {
    if (!element) {
      return;
    }
    element.hidden = !!isHidden;
    element.classList.toggle('is-mp-hidden', !!isHidden);
    element.classList.toggle('is-mp-visible', !isHidden);
  }

  function format(template, values) {
    return String(template || '').replace(/\{(done|total|percent|remaining|count|visible|checked)\}/g, function (_, key) {
      return values[key];
    });
  }

  function targetList(key, baseSelector, dataName) {
    var direct;
    var escaped;
    var selectors;

    if (!key) {
      return [];
    }

    if (/^[#.\[]/.test(key)) {
      return query(document, key);
    }

    direct = document.getElementById(key);
    escaped = escapeAttr(key);

    selectors = baseSelector.split(',').map(function (base) {
      return base.trim() + '[' + dataName + '="' + escaped + '"], ' +
        base.trim() + '[data-' + dataName + '="' + escaped + '"]';
    }).join(', ');

    return unique((direct ? [direct] : []).concat(query(document, selectors)));
  }


  /* ---------------------------------------------------------------------- */

  function pageName(value) {
    return String(value || '')
      .replace(/^https?:\/\/[^/]+\/wiki\//i, '')
      .replace(/^\/wiki\//i, '')
      .replace(/_/g, ' ')
      .replace(/[#?].*$/, '')
      .trim()
      .toLowerCase();
  }

  function currentPageName() {
    return mw && mw.config && typeof mw.config.get === 'function'
      ? pageName(mw.config.get('wgPageName'))
      : pageName(window.location.pathname);
  }

  function stableIndex(type, length) {
    var now = new Date();
    var start = Date.UTC(now.getUTCFullYear(), 0, type === 'week' ? 1 : 0);
    var today = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
    var span = type === 'week' ? 604800000 : 86400000;

    return length ? Math.floor((today - start) / span) % length : 0;
  }

  function shuffle(items) {
    var copy = items.slice();
    var index = copy.length;
    var random;
    var temp;

    while (index) {
      random = Math.floor(Math.random() * index--);
      temp = copy[index];
      copy[index] = copy[random];
      copy[random] = temp;
    }

    return copy;
  }


  /* ---------------------------------------------------------------------- */

  function initRotators(root) {
    mountEach(root, 'rotators', SELECTOR.rotator, function (rotator) {
      var mode = String(rotator.dataset.mpRotateMode || rotator.dataset.mpRotatorMode || option('mode', 'sequence')).toLowerCase();
      var interval = Math.max(number(rotator.dataset.mpRotateInterval || rotator.dataset.mpRotatorInterval, option('interval', 10000)), 1000);
      var count = Math.max(number(rotator.dataset.mpRotateCount || rotator.dataset.mpRotatorCount, option('count', 1)), 1);
      var separator = rotator.dataset.mpRotateSeparator || rotator.dataset.mpRotatorSeparator || '|';
      var joiner = rotator.dataset.mpRotateJoin || '  ';
      var values = splitValues(rotator.dataset.mpRotateValues || rotator.dataset.mpRotatorValues, separator);
      var childItems = query(rotator, rotator.dataset.mpRotateItemSelector || SELECTOR.rotatorItem);
      var pool = values.length ? values : childItems;
      var index = Math.max(number(rotator.dataset.mpRotateStart || rotator.dataset.mpRotatorStart, 0), 0);

      if (rotator.dataset.mpRotatorReady === '1' || !pool.length) {
        return;
      }

      if (mode === 'shuffle') {
        pool = shuffle(pool);
      }

      count = clamp(count, 1, pool.length);
      index = index % pool.length;
      rotator.dataset.mpRotatorReady = '1';
      rotator.classList.add('is-mp-rotator-ready');
      var pointerPaused = false;
      var focusPaused = false;
      cleanup(function () {
        delete rotator.dataset.mpRotatorTimer;
        rotator.classList.remove('is-mp-rotator-changing', 'is-mp-rotating-text-changing');
      });


      function indexes() {
        var list = [];
        var offset;

        if (mode === 'daily') {
          index = stableIndex('day', pool.length);
        } else if (mode === 'weekly') {
          index = stableIndex('week', pool.length);
        } else if (mode === 'random') {
          return shuffle(pool.map(function (_, itemIndex) {
            return itemIndex;
          })).slice(0, count);
        }

        for (offset = 0; offset < count; offset += 1) {
          list.push((index + offset) % pool.length);
        }

        return list;
      }

      function render() {
        var list = indexes();

        rotator.classList.add('is-mp-rotator-changing', 'is-mp-rotating-text-changing');

        later(function () {
          if (values.length) {
            text(rotator, list.map(function (itemIndex) {
              return pool[itemIndex];
            }).join(joiner));
          } else {
            childItems.forEach(function (item) {
              hidden(item, true);
            });

            list.forEach(function (itemIndex) {
              hidden(pool[itemIndex], false);
            });
          }

          rotator.classList.remove('is-mp-rotator-changing', 'is-mp-rotating-text-changing');
          rotator.classList.add('is-mp-rotator-active');
        }, 120);
      }

      function advance() {
        if (!document.documentElement.contains(rotator)) { return; }

        if (
          document.hidden ||
          (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches)
        ) {
          return;
        }

        if (pointerPaused || focusPaused) {
          return;
        }

        if (!/^(daily|weekly|random)$/.test(mode)) {
          index = (index + count) % pool.length;
        }

        if (mode === 'shuffle' && index === 0) {
          pool = shuffle(pool);
        }

        render();
      }

      render();

      if (mode !== 'once' && pool.length > count) {
        rotator.dataset.mpRotatorTimer = String(every(advance, interval));
      }

      listen(rotator, 'focusin', function () { focusPaused = true; });
      listen(rotator, 'focusout', function (event) {
        if (!rotator.contains(event.relatedTarget)) { focusPaused = false; }
      });
      if (rotator.dataset.mpRotatePauseOnHover !== 'false') {
        listen(rotator, 'mouseenter', function () {
          pointerPaused = true;
        });

        listen(rotator, 'mouseleave', function () {
          pointerPaused = false;
        });
      }
    });
  }


  /* ---------------------------------------------------------------------- */

  function rowIsData(row) {
    return !!(
      row &&
      row.querySelector &&
      !row.querySelector('th') &&
      !row.querySelector('input[placeholder], input[type="search"], .dataTables_filter') &&
      row.textContent &&
      row.textContent.trim() &&
      (
        row.querySelector('[data-row-id]') ||
        row.querySelector('.mp-achievement-list-achievement, .mp-achievement-list-entry, .mp-achievement-list-name') ||
        row.classList.contains('mp-js-achievement-row')
      )
    );
  }

  function rowIsChecked(row) {
    var checkbox;

    if (!row || !row.querySelector) {
      return false;
    }

    if (row.matches('[aria-checked="true"], [data-checked="true"], [data-progress-checked="true"]')) {
      return true;
    }

    checkbox = row.querySelector('input[type="checkbox"], [role="checkbox"], [data-progress-checked]');

    if (checkbox) {
      return checkbox.matches('input[type="checkbox"]')
        ? checkbox.checked
        : checkbox.getAttribute('aria-checked') === 'true' ||
            checkbox.getAttribute('data-progress-checked') === 'true';
    }

    return !!row.querySelector(
      '[data-checked="true"], .table-progress-tracking-checkbox.checked, .tpt-checkbox.checked'
    );
  }

  function achievementRows(host) {
    var rows;
    var dataRows;

    if (!host || !host.querySelectorAll) {
      return [];
    }

    rows = query(host, 'tr').filter(rowIsData);

    if (rows.length) {
      return rows;
    }

    dataRows = query(
      host,
      '[data-row-id], [data-tpt-row-id], [data-progress-row-id]'
    ).map(function (item) {
      return item.closest && item.closest('tr')
        ? item.closest('tr')
        : item;
    });

    return unique(dataRows).filter(function (item) {
      return item && item.textContent && item.textContent.trim();
    });
  }

  function achievementHost(summary) {
    var target = summary.dataset.mpAchievementTarget || summary.dataset.mpAchievementTable || '';
    var candidates = [];

    if (target) {
      candidates = candidates.concat(
        targetList(target, 'table-progress-tracking', 'table-id')
      );

      candidates = candidates.concat(
        query(
          document,
          'table[data-table-id="' + escapeAttr(target) + '"], ' +
          '.table-progress-tracking[data-table-id="' + escapeAttr(target) + '"]'
        )
      );
    }

    if (target) {
      return unique(candidates).filter(function (item) {
        return achievementRows(item).length;
      })[0] || null;
    }

    if (summary.parentElement) {
      candidates = candidates.concat(
        query(
          summary.parentElement,
          'table-progress-tracking, .mp-achievement-list-wrap, .mp-achievement-list'
        )
      );
    }

    candidates = candidates.concat(
      query(
        document,
        'table-progress-tracking, .mp-achievement-list-wrap, .mp-achievement-list'
      )
    );

    candidates = unique(candidates).filter(function (item) {
      return item && item !== summary && !summary.contains(item);
    });

    return candidates.filter(function (item) {
      return achievementRows(item).length;
    })[0] || candidates[0] || null;
  }

  function renderAchievementSummary(summary) {
    var rows = achievementRows(achievementHost(summary));
    var total = rows.length;
    var previousTotal = number(summary.dataset.mpAchievementTotal, 0);
    var done = rows.filter(rowIsChecked).length;
    var percent = total ? Math.round((done / total) * 100) : 0;
    var output = summary.querySelector('.mp-js-achievement-summary-text') || summary;
    var bar = summary.querySelector('.mp-js-achievement-summary-bar');
    var message = summary.dataset.mpSummaryFormat || '{done} / {total} achievements finished ({percent}%)';
    var empty = summary.dataset.mpSummaryEmpty || 'No achievements listed yet.';
    if (output === summary && bar) {
      output = document.createElement('span');
      output.className = 'mp-js-achievement-summary-text';
      summary.insertBefore(output, summary.firstChild);
    }


    if (!total && previousTotal > 0) {
      summary.classList.add('is-mp-achievement-pending');
      return;
    }

    summary.classList.remove('is-mp-achievement-pending');

    data(summary, 'mpAchievementDone', done);
    data(summary, 'mpAchievementTotal', total);
    data(summary, 'mpAchievementPercent', percent);

    summary.classList.toggle('is-mp-achievement-empty', total === 0);
    summary.classList.toggle('is-mp-achievement-complete', total > 0 && done === total);

    text(
      output,
      total
        ? format(message, {
            done: done,
            total: total,
            percent: percent,
            remaining: Math.max(total - done, 0)
          })
        : empty
    );

    if (bar) {
      bar.style.setProperty('--mp-achievement-progress', percent + '%');
      if (option('legacyProgressWidth', true)) { bar.style.width = percent + '%'; }
      else { bar.style.removeProperty('width'); }
      bar.setAttribute('aria-valuenow', String(percent));
    }
  }

  function queueSummary(summary, delay) {
    if (!enabled('summaries')) { return; }
    var owner = modules.summaries.instances.get(summary);
    if (!owner || owner.dead) { return; }
    if (summary.mpAchievementSummaryTimer) {
      cancelLater(summary.mpAchievementSummaryTimer);
    }

    invoke(owner, function () {
      summary.mpAchievementSummaryTimer = later(function () {
        summary.mpAchievementSummaryTimer = null;
        renderAchievementSummary(summary);
      }, delay === undefined ? 120 : delay);
    });
  }

  function initAchievementSummaries(root) {
    mountEach(root, 'summaries', SELECTOR.summary, function (summary) {
      var host;
      var observer;

      if (!active.summaryCleanup) {
        active.summaryCleanup = true;
        cleanup(function () {
          if (summary.mpAchievementObserver) { summary.mpAchievementObserver.disconnect(); }
          summary.mpAchievementObserver = null;
          summary.mpAchievementHost = null;
          cancelLater(summary.mpAchievementSummaryTimer);
          summary.mpAchievementSummaryTimer = null;
        });
      }
      queueSummary(summary, 60);

      host = achievementHost(summary);

      if (
        summary.mpAchievementHost === host &&
        summary.dataset.mpAchievementSummaryReady === '1'
      ) {
        return;
      }

      if (summary.mpAchievementObserver) {
        summary.mpAchievementObserver.disconnect();
      }

      summary.dataset.mpAchievementSummaryReady = '1';
      summary.mpAchievementHost = host;

      if (host && window.MutationObserver && !host.contains(summary)) {
        observer = new MutationObserver(function () {
          queueSummary(summary, 120);
        });

        observer.observe(host, {
          childList: true,
          subtree: true,
          attributes: true,
          attributeFilter: [
            'class',
            'checked',
            'aria-checked',
            'data-checked',
            'data-progress-checked'
          ]
        });

        summary.mpAchievementObserver = observer;
      }
    });
  }


  /* ---------------------------------------------------------------------- */

  function initToggles(root) {
    mountEach(root, 'toggles', SELECTOR.toggle, function (toggle) {
      var panels;
      var key;
      var defaultOpen;

      if (toggle.dataset.mpToggleReady === '1') {
        return;
      }

      key = toggle.dataset.mpToggleTarget || toggle.getAttribute('href') || '';
      panels = targetList(key, SELECTOR.togglePanel, 'mp-toggle-panel');
      defaultOpen = toggle.hasAttribute('aria-expanded')
        ? toggle.getAttribute('aria-expanded') === 'true'
        : (panels[0] && panels[0].classList.contains('is-mp-open'))
          ? true
          : (panels[0] && panels[0].classList.contains('is-mp-closed'))
            ? false
            : toggle.dataset.mpToggleDefault === 'open';

      if (!panels.length) {
        return;
      }

      toggle.dataset.mpToggleReady = '1';
      toggle.setAttribute('aria-controls', ensureCollapseIds(panels, 'toggle').join(' '));
      toggle.setAttribute('role', toggle.getAttribute('role') || 'button');
      toggle.setAttribute('tabindex', toggle.getAttribute('tabindex') || '0');

      function open(value) {
        panels = targetList(key, SELECTOR.togglePanel, 'mp-toggle-panel');
        toggle.classList.toggle('is-mp-open', value);
        toggle.classList.toggle('is-mp-closed', !value);
        toggle.setAttribute('aria-expanded', value ? 'true' : 'false');

        panels.forEach(function (panel) {
          panel.classList.toggle('is-mp-open', value);
          panel.classList.toggle('is-mp-closed', !value);
          hidden(panel, !value);
        });
        query(document, SELECTOR.toggle).forEach(function (other) {
          if (other !== toggle && other.dataset.mpToggleReady === '1' &&
              other.getAttribute('aria-controls') === toggle.getAttribute('aria-controls')) {
            other.setAttribute('aria-expanded', value ? 'true' : 'false');
            other.classList.toggle('is-mp-open', value);
            other.classList.toggle('is-mp-closed', !value);
          }
        });
        emit(toggle, 'mp:togglechange', { open: value, panels: panels });
      }

      function activate(event) {
        event.preventDefault();
        open(toggle.getAttribute('aria-expanded') !== 'true');
      }

      open(defaultOpen);

      bindActivation(toggle, activate);

    });
  }


  /* ---------------------------------------------------------------------- */

  function collapseTargets(section) {
    var key = section.dataset.mpCollapseTarget || section.dataset.mpCollapsibleTarget || '';
    var bodies = [];

    if (key) {
      bodies = query(section, key);

      if (!bodies.length) {
        bodies = targetList(key, SELECTOR.collapseBody, 'mp-collapse-body');
      }
    }

    if (!bodies.length) {
      bodies = query(section, SELECTOR.collapseBody);
    }

    if (!bodies.length && section.classList.contains('mp-achievement-list-wrap')) {
      bodies = query(section, '.mp-achievement-list-scroll');
    }

    return unique(bodies).filter(function (body) {
      return body &&
        body !== section &&
        body.closest(SELECTOR.collapsible) === section;
    });
  }

  function collapseHeader(section, bodies) {
    var key = section.dataset.mpCollapseHeading || section.dataset.mpCollapsibleHeading || '';
    var header = key ? query(section, key)[0] : null;

    if (!header) {
      header = section.querySelector(SELECTOR.collapseHeader);
    }

    if (!header && bodies.length) {
      header = bodies[0].previousElementSibling;
    }

    return header || section;
  }

  function collapseStorageKey(section, index) {
    var page =
      mw && mw.config && typeof mw.config.get === 'function'
        ? String(mw.config.get('wgPageName') || '')
        : String(window.location.pathname || '');

    var key =
      section.dataset.mpCollapseStorageKey ||
      section.dataset.mpCollapseId ||
      section.id ||
      String(index);

    return 'mp-content-logic:collapse:' + page + ':' + key;
  }

  function storedCollapseState(key) {
    try {
      return window.localStorage.getItem(key);
    } catch (error) {
      return null;
    }
  }

  function storeCollapseState(key, isOpen) {
    try {
      window.localStorage.setItem(key, isOpen ? 'open' : 'closed');
    } catch (error) {
      /* Storage may be unavailable; collapse still works for the current page view. */
    }
  }

  function ensureCollapseIds(bodies, index) {
    return bodies.map(function (body, bodyIndex) {
      if (!body.id || (document.getElementById(body.id) && document.getElementById(body.id) !== body)) {
        var base = 'mp-collapse-body-' + index + '-' + bodyIndex;
        var suffix = 0;

        while (document.getElementById(base + '-' + suffix)) {
          suffix += 1;
        }

        body.id = base + '-' + suffix;
      }

      return body.id;
    });
  }

  function initCollapsibles(root) {
    var allSections = query(document, SELECTOR.collapsible);

    mountEach(root, 'collapsibles', SELECTOR.collapsible, function (section) {
      var bodies;
      var header;
      var toggle;
      var controls;
      var index;
      var remember;
      var storageKey;
      var savedState;
      var defaultOpen;
      var openLabel;
      var closedLabel;

      if (section.dataset.mpCollapseReady === '1') {
        return;
      }

      bodies = collapseTargets(section);

      if (!bodies.length) {
        return;
      }

      index = Math.max(allSections.indexOf(section), 0);
      header = collapseHeader(section, bodies);

      toggle = query(section, SELECTOR.collapseToggle).filter(function (item) {
        return item.closest(SELECTOR.collapsible) === section;
      })[0];

      controls = ensureCollapseIds(bodies, index);

      remember = booleanValue(
        section.dataset.mpCollapseRemember ||
        section.dataset.mpCollapsibleRemember,
        false
      );

      storageKey = collapseStorageKey(section, index);
      savedState = remember ? storedCollapseState(storageKey) : null;

      defaultOpen = !/^(closed|collapsed|false|0)$/i.test(
        String(
          section.dataset.mpCollapseDefault ||
          section.dataset.mpCollapsibleDefault ||
          'open'
        )
      );

      openLabel =
        section.dataset.mpCollapseOpenLabel ||
        section.dataset.mpCollapseCollapseLabel ||
        'Collapse';

      closedLabel =
        section.dataset.mpCollapseClosedLabel ||
        section.dataset.mpCollapseExpandLabel ||
        'Expand';

      if (!toggle) {
        toggle = document.createElement('button');
        toggle.type = 'button';
        toggle.className = 'mp-js-collapse-toggle';

        if (section.dataset.mpCollapseButtonClass) {
          toggle.className += ' ' + section.dataset.mpCollapseButtonClass;
        }

        header.appendChild(toggle);
      }

      section.dataset.mpCollapseReady = '1';
      section.classList.add('is-mp-collapsible-ready');

      bodies.forEach(function (body) {
        body.classList.add('is-mp-collapse-body');
      });

      toggle.setAttribute('aria-controls', controls.join(' '));

      function setOpen(isOpen, shouldStore) {
        section.classList.toggle('is-mp-expanded', isOpen);
        section.classList.toggle('is-mp-collapsed', !isOpen);
        section.classList.toggle('is-expanded', isOpen);
        section.classList.toggle('is-collapsed', !isOpen);

        toggle.classList.toggle('is-mp-expanded', isOpen);
        toggle.classList.toggle('is-mp-collapsed', !isOpen);
        toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');

        text(toggle, isOpen ? openLabel : closedLabel);

        bodies.forEach(function (body) {
          hidden(body, !isOpen);
        });

        emit(section, 'mp:collapsechange', { open: isOpen });
        if (remember && shouldStore) {
          storeCollapseState(storageKey, isOpen);
        }
      }

      function activate(event) {
        if (event) {
          event.preventDefault();
        }

        setOpen(toggle.getAttribute('aria-expanded') !== 'true', true);
      }

      if (!toggle.matches('button')) {
        toggle.setAttribute('role', toggle.getAttribute('role') || 'button');
        toggle.setAttribute('tabindex', toggle.getAttribute('tabindex') || '0');
      }

      bindActivation(toggle, activate);

      if (savedState === 'open') {
        defaultOpen = true;
      } else if (savedState === 'closed') {
        defaultOpen = false;
      }

      if (toggle.hasAttribute('aria-expanded')) {
        defaultOpen = toggle.getAttribute('aria-expanded') === 'true';
      }
      setOpen(defaultOpen, false);
    });
  }


  /* ---------------------------------------------------------------------- */

  function itemText(item) {
    return String(
      item.dataset.mpFilterText ||
      item.dataset.mpFilterTags ||
      item.textContent ||
      ''
    ).toLowerCase();
  }

  function itemMatches(item, queryValue, mode) {
    var haystack = itemText(item);

    var tags = splitValues(
      item.dataset.mpFilterTags || '',
      '|'
    ).map(function (tag) {
      return tag.toLowerCase();
    });

    if (!queryValue || queryValue === 'all' || queryValue === '*') {
      return true;
    }

    if (mode === 'exact') {
      return haystack === queryValue || tags.indexOf(queryValue) !== -1;
    }

    if (mode === 'starts') {
      return haystack.indexOf(queryValue) === 0;
    }

    return haystack.indexOf(queryValue) !== -1;
  }

  function applyFilter(filter) {
    var key = filter.dataset.mpFilterTarget || filter.dataset.mpFilterList || '';
    var lists = targetList(key, SELECTOR.filterList, 'mp-filter-list');
    var input = filter.matches('input, textarea')
      ? filter
      : filter.querySelector('input, textarea');

    var mode = String(filter.dataset.mpFilterMode || option('mode', 'contains')).toLowerCase();

    var value = (
      input
        ? input.value
        : filter.dataset.mpFilterValue || ''
    ).trim().toLowerCase();

    lists.forEach(function (list) {
      var visible = 0;
      var items = query(list, SELECTOR.filterItem);

      items.forEach(function (item) {
        var match = itemMatches(item, value, mode);

        hidden(item, !match);

        item.classList.toggle('is-mp-filter-hidden', !match);
        item.classList.toggle('is-mp-filter-visible', match);

        visible += match ? 1 : 0;
      });

      data(list, 'mpFilterVisible', visible);
      data(list, 'mpFilterTotal', items.length);

      list.classList.toggle('is-mp-filter-empty', visible === 0);
    });

    query(
      document,
      SELECTOR.filter +
      '[data-mp-filter-target="' +
      escapeAttr(key) +
      '"]'
    ).forEach(function (other) {
      var otherInput = other.matches('input, textarea')
        ? other
        : other.querySelector('input, textarea');

      var otherValue = (
        otherInput
          ? otherInput.value
          : other.dataset.mpFilterValue || ''
      ).trim().toLowerCase();

      other.classList.toggle('is-mp-filter-active', otherValue === value);
    });

    emit(filter, 'mp:filterchange', { value: value, lists: lists });
    queueCounts(document, 0);
  }

  function initFilters(root) {
    mountEach(root, 'filters', SELECTOR.filter, function (filter) {
      var input;

      if (
        filter.dataset.mpFilterReady === '1' ||
        (!filter.dataset.mpFilterTarget && !filter.dataset.mpFilterList)
      ) {
        return;
      }

      filter.dataset.mpFilterReady = '1';

      input = filter.matches('input, textarea')
        ? filter
        : filter.querySelector('input, textarea');

      if (input) {
        listen(input, 'input', function () {
          applyFilter(filter);
        });
      } else {
        filter.setAttribute(
          'role',
          filter.getAttribute('role') || 'button'
        );

        filter.setAttribute(
          'tabindex',
          filter.getAttribute('tabindex') || '0'
        );

        bindActivation(filter, function (event) {
          event.preventDefault();
          applyFilter(filter);
        });
      }

      if (/^(1|true)$/.test(filter.dataset.mpFilterDefault || '')) {
        applyFilter(filter);
      }
    });
  }


  /* ---------------------------------------------------------------------- */

  function countItems(counter) {
    var key = counter.dataset.mpCountTarget || '';

    var selector =
      counter.dataset.mpCountItems ||
      '.mp-js-count-item, .mp-js-filter-item, tr, li';

    var targets = targetList(
      key,
      '.mp-js-count-group',
      'mp-count-group'
    );

    var items = [];

    if (!targets.length && counter.parentElement) {
      targets = [counter.parentElement];
    }

    targets.forEach(function (target) {
      items = items.concat(query(target, selector));
    });

    return unique(items).filter(function (item) {
      return item !== counter &&
        !item.contains(counter) &&
        !item.querySelector('th') &&
        !item.querySelector(
          'input[placeholder], input[type="search"]'
        ) &&
        item.textContent &&
        item.textContent.trim();
    });
  }

  function updateCounts(scope) {
    if (!enabled('counts')) { return; }
    query(
      scope && scope.querySelectorAll ? scope : document,
      SELECTOR.count
    ).forEach(function (counter) {
      if (optedOut(counter, 'counts')) { return; }
      var items = countItems(counter);

      var visible = items.filter(function (item) {
        return !item.hidden &&
          !item.classList.contains('is-mp-filter-hidden');
      }).length;

      var checked = items.filter(function (item) {
        return rowIsChecked(item) ||
          !!item.querySelector('input[type="checkbox"]:checked');
      }).length;

      var values = {
        count: items.length,
        total: items.length,
        visible: visible,
        checked: checked
      };

      data(counter, 'mpCountVisible', visible);
      data(counter, 'mpCountTotal', items.length);
      data(counter, 'mpCountChecked', checked);

      text(
        counter,
        format(
          counter.dataset.mpCountFormat || '{visible} / {total} shown',
          values
        )
      );
    });
  }

  function queueCounts(scope, delay) {
    if (!enabled('counts')) { return; }
    if (logic.timers.count) { cancelLater(logic.timers.count); }
    invoke(null, function () {
      logic.timers.count = later(function () {
        logic.timers.count = null;
        if (enabled('counts')) { updateCounts(document); }
      }, delay === undefined ? 80 : delay);
    });
  }

  function initCounts(root) {
    if (!containsMarker(root, SELECTOR.count)) { return; }
    mountEach(root, 'counts', SELECTOR.count, function (counter) {
      counter.dataset.mpCountReady = '1';
    });

    queueCounts(root, 40);
  }


  /* ---------------------------------------------------------------------- */

  function initCurrentLinks(root) {
    var current = currentPageName();

    mountEach(root, 'currentLinks', SELECTOR.currentLink, function (link) {
      if (pageName(link.getAttribute('href')) === current) {
        link.classList.add('is-mp-current-link');

        if (link.parentElement) {
          link.parentElement.classList.add('is-mp-current-link');
        }
      }
    });
  }


  /* ---------------------------------------------------------------------- */

  function initReadMore(root) {
    mountEach(root, 'readMore', SELECTOR.readMore, function (element) {
      var limit = Math.max(
        number(
          element.dataset.mpReadmoreLimit ||
          element.dataset.mpReadMoreLimit,
          option('limit', 360)
        ),
        60
      );

      var fullText = element.dataset.mpReadMoreFull || element.textContent.trim();
      var shortText;
      var button;
      var expanded = element.classList.contains('is-mp-readmore-expanded');

      if (
        element.dataset.mpReadMoreReady === '1' ||
        fullText.length <= limit
      ) {
        return;
      }

      shortText =
        fullText.slice(0, limit).replace(/\s+\S*$/, '') +
        '...';

      button = document.createElement('button');
      button.type = 'button';
      button.className = 'mp-js-readmore-button';

      element.dataset.mpReadMoreReady = '1';
      element.dataset.mpReadMoreFull = fullText;
      cleanup(function () {
        if (button.parentNode) { button.parentNode.removeChild(button); }
        text(element, fullText);
      });


      function render() {
        text(
          element,
          expanded ? fullText : shortText
        );

        text(
          button,
          expanded
            ? (
                element.dataset.mpReadmoreLess ||
                element.dataset.mpReadMoreLess ||
                'Show less'
              )
            : (
                element.dataset.mpReadmoreMore ||
                element.dataset.mpReadMoreMore ||
                'Read more'
              )
        );

        button.setAttribute(
          'aria-expanded',
          expanded ? 'true' : 'false'
        );

        element.classList.toggle(
          'is-mp-readmore-expanded',
          expanded
        );

        element.classList.toggle(
          'is-mp-readmore-collapsed',
          !expanded
        );
      }

      listen(button, 'click', function () {
        expanded = !expanded;
        render();
      });

      element.parentNode.insertBefore(
        button,
        element.nextSibling
      );

      render();
    });
  }


  /* ---------------------------------------------------------------------- */

  function revealRepeats(element) {
    var mode = String(
      element.dataset.mpRevealMode || ''
    ).toLowerCase();

    return (
      element.classList.contains('mp-js-reveal-repeat') ||
      /^(1|true)$/.test(element.dataset.mpRevealRepeat || '') ||
      mode === 'repeat' ||
      mode === 'toggle'
    );
  }

  var revealObserver = null;
  function initReveal(root) {
    mountEach(root, 'reveal', SELECTOR.reveal, function (element) {
      if (element.dataset.mpRevealReady === '1') { return; }
      element.dataset.mpRevealReady = '1';
      element.classList.add('is-mp-reveal-ready');
      if (!window.IntersectionObserver ||
          (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches)) {
        element.classList.add('is-mp-visible');
        element.classList.remove('is-mp-out-of-view');
        return;
      }
      if (!revealObserver) {
        revealObserver = new window.IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            if (!modules.reveal.instances.has(entry.target)) { return; }
            if (entry.isIntersecting || revealRepeats(entry.target)) {
              entry.target.classList.toggle('is-mp-visible', entry.isIntersecting);
              entry.target.classList.toggle('is-mp-out-of-view', !entry.isIntersecting);
            }
            if (entry.isIntersecting && !revealRepeats(entry.target)) {
              revealObserver.unobserve(entry.target);
            }
          });
        }, { threshold: 0.12 });
      }
      if (revealRepeats(element)) {
        element.classList.add('is-mp-reveal-repeat-ready', 'is-mp-out-of-view');
      }
      revealObserver.observe(element);
      cleanup(function () { if (revealObserver) { revealObserver.unobserve(element); } });
    });
  }


  /* ---------------------------------------------------------------------- */

/**
 * Spoiler consent gates
 *
 * Two modes are supported:
 * 1. .mp-spoiler-page-gate: a full-article consent gate. The gate remains visible while
 *    the rest of the rendered article is hidden until the reader explicitly continues.
 * 2. .mp-js-spoiler-gate / .mp-spoiler-shell with .mp-spoiler-body: the legacy inline
 *    protected-body gate.
 *
 * Both use the wiki's existing .mp-spoiler-* Wikitext/CSS component classes.
 * Initialization is attached through wikipage.content so previewed or dynamically replaced
 * wiki content receives the same behaviour as the initial page render.
 */
  function spoilerControlIsNative(control) {
    var tag = String(control && control.tagName || '').toLowerCase();

    return tag === 'button' || tag === 'input';
  }

  function prepareSpoilerControl(button, controlsId) {
    var nativeControl;

    if (!button) {
      return false;
    }

    nativeControl = spoilerControlIsNative(button);

    if (
      nativeControl &&
      String(button.tagName || '').toLowerCase() === 'button' &&
      !button.getAttribute('type')
    ) {
      button.setAttribute('type', 'button');
    } else if (!nativeControl) {
      button.setAttribute('role', 'button');

      if (!button.getAttribute('tabindex')) {
        button.setAttribute('tabindex', '0');
      }
    }

    if (controlsId) {
      button.setAttribute('aria-controls', controlsId);
    }

    if (!button.getAttribute('aria-label')) {
      button.setAttribute(
        'aria-label',
        String(
          button.textContent ||
          'I understand, continue'
        ).trim() ||
        'I understand, continue'
      );
    }

    return nativeControl;
  }

  function bindSpoilerConsent(button, nativeControl, accept) {
    bindActivation(button, accept);
  }

  function pageViewAllowsSpoilerGate() {
    var action;

    if (!mw || !mw.config || typeof mw.config.get !== 'function') {
      return true;
    }

    action = String(
      mw.config.get('wgAction') || 'view'
    ).toLowerCase();

    return /^(view|purge)$/.test(action);
  }

  function directArticleChild(article, element) {
    var node = element;

    while (
      node &&
      node.parentElement &&
      node.parentElement !== article
    ) {
      node = node.parentElement;
    }

    return node && node.parentElement === article
      ? node
      : element;
  }

  function storeSpoilerPageState(element) {
    var display;
    var priority;

    if (
      !element ||
      element.dataset.mpSpoilerPageStored === '1'
    ) {
      return;
    }

    element.dataset.mpSpoilerPageStored = '1';
    element.dataset.mpSpoilerPageWasHidden =
      element.hidden ? '1' : '0';

    element.dataset.mpSpoilerPageAriaHidden =
      element.hasAttribute('aria-hidden')
        ? element.getAttribute('aria-hidden')
        : '__none__';

    display = element.style && element.style.getPropertyValue
      ? element.style.getPropertyValue('display')
      : '';
    priority = element.style && element.style.getPropertyPriority
      ? element.style.getPropertyPriority('display')
      : '';

    element.dataset.mpSpoilerPageInlineDisplay =
      display || '__none__';
    element.dataset.mpSpoilerPageInlineDisplayPriority =
      priority || '__none__';
    element.dataset.mpSpoilerPageHadInert =
      element.hasAttribute('inert') ? '1' : '0';
  }

  function hideSpoilerPageContent(element) {
    storeSpoilerPageState(element);

    if (!element) {
      return;
    }

    element.hidden = true;
    element.setAttribute('aria-hidden', 'true');

    /*
     * Fandom skins and Portable Infobox/TOC styles may set display with high
     * specificity. The inline important lock prevents those components from
     * leaking through the spoiler gate while still allowing exact restoration.
     */
    if (element.style && element.style.setProperty) {
      element.style.setProperty('display', 'none', 'important');
    }

    if ('inert' in element) {
      element.inert = true;
    } else {
      element.setAttribute('inert', '');
    }
  }

  function restoreSpoilerPageContent(element) {
    var priorAria;
    var priorDisplay;
    var priorPriority;

    if (!element) {
      return;
    }

    if (element.dataset.mpSpoilerPageStored !== '1') {
      return;
    }

    element.hidden =
      element.dataset.mpSpoilerPageWasHidden === '1';

    priorAria =
      element.dataset.mpSpoilerPageAriaHidden;

    if (
      priorAria === '__none__' ||
      priorAria === undefined
    ) {
      element.removeAttribute('aria-hidden');
    } else {
      element.setAttribute(
        'aria-hidden',
        priorAria
      );
    }

    priorDisplay =
      element.dataset.mpSpoilerPageInlineDisplay;
    priorPriority =
      element.dataset.mpSpoilerPageInlineDisplayPriority;

    if (element.style && element.style.setProperty) {
      if (
        priorDisplay === '__none__' ||
        priorDisplay === undefined
      ) {
        element.style.removeProperty('display');
      } else {
        element.style.setProperty(
          'display',
          priorDisplay,
          priorPriority === '__none__' || priorPriority === undefined
            ? ''
            : priorPriority
        );
      }
    }

    if (element.dataset.mpSpoilerPageHadInert === '1') {
      element.setAttribute('inert', '');
      if ('inert' in element) {
        element.inert = true;
      }
    } else {
      element.removeAttribute('inert');
      if ('inert' in element) {
        element.inert = false;
      }
    }

    delete element.dataset.mpSpoilerPageStored;
    delete element.dataset.mpSpoilerPageWasHidden;
    delete element.dataset.mpSpoilerPageAriaHidden;
    delete element.dataset.mpSpoilerPageInlineDisplay;
    delete element.dataset.mpSpoilerPageInlineDisplayPriority;
    delete element.dataset.mpSpoilerPageHadInert;
  }

  function spoilerPageContentRoot(gate, article) {
    if (!gate || !gate.closest) {
      return article;
    }

    return gate.closest('#mw-content-text, .WikiaArticle, .page-content') || article;
  }

  function spoilerPageShell(gate, contentRoot) {
    if (!gate || !gate.closest) {
      return contentRoot;
    }

    return gate.closest('.page-content, .WikiaArticle, #content, .page__main, main') || contentRoot;
  }

  function addSpoilerProtectedItem(items, element) {
    if (!element || items.indexOf(element) !== -1) {
      return;
    }

    items.push(element);
    hideSpoilerPageContent(element);
  }

  function protectSpoilerPagePath(root, gate, protectedItems) {
    var path = [];
    var node = gate;
    var index;
    var parent;
    var keep;

    if (!root || !gate || !root.contains(gate)) {
      return false;
    }

    while (node && node !== root) {
      path.push(node);
      node = node.parentElement;
    }

    if (node !== root) {
      return false;
    }

    path.push(root);

    /*
     * Keep only the ancestor chain leading to the Wikitext gate. Hide siblings
     * at every nesting level, not merely direct .mw-parser-output children.
     * This covers Portable Infoboxes and FORCETOC output even when Fandom wraps
     * them together with article content differently from the core parser DOM.
     */
    for (index = path.length - 1; index > 0; index -= 1) {
      parent = path[index];
      keep = path[index - 1];

      arr(parent.children).forEach(function (child) {
        if (child !== keep) {
          addSpoilerProtectedItem(
            protectedItems,
            child
          );
        }
      });
    }

    return true;
  }

  function protectSpoilerLeakElements(scope, gate, protectedItems) {
    if (!scope || !scope.querySelectorAll) {
      return;
    }

    query(
      scope,
      '.portable-infobox, #toc, .toc, .mw-table-of-contents, .page__toc, .wds-table-of-contents'
    ).forEach(function (element) {
      if (
        element === gate ||
        element.contains(gate) ||
        gate.contains(element)
      ) {
        return;
      }

      addSpoilerProtectedItem(
        protectedItems,
        element
      );
    });
  }

  function initSpoilerPageGates(root) {
    mountEach(root, 'spoilerPages', SELECTOR.spoilerPageGate, function (gate) {
      var article;
      var contentRoot;
      var pageShell;
      var warning;
      var button;
      var nativeControl;
      var protectedItems = [];
      var pageObserver = null;

      if (
        gate.dataset.mpSpoilerPageReady === '1' ||
        gate.dataset.mpSpoilerState === 'accepted' ||
        !pageViewAllowsSpoilerGate()
      ) {
        return;
      }

      article = gate.closest
        ? gate.closest('.mw-parser-output')
        : null;

      warning =
        gate.querySelector(SELECTOR.spoilerWarning);

      button =
        gate.querySelector(SELECTOR.spoilerButton);

      /*
       * Fail open if the page marker is incomplete.
       * Never hide the article unless the consent UI
       * is actually present and usable.
       */
      if (!article || !warning || !button) {
        return;
      }

      contentRoot =
        spoilerPageContentRoot(gate, article);
      pageShell =
        spoilerPageShell(gate, contentRoot);

      if (!contentRoot || !contentRoot.contains(gate)) {
        return;
      }

      gate.dataset.mpSpoilerPageReady = '1';
      gate.dataset.mpSpoilerState = 'locked';

      gate.classList.add(
        'is-mp-spoiler-locked'
      );

      gate.classList.remove(
        'is-mp-spoiler-accepted'
      );

      logic.spoilerPageGateId =
        (logic.spoilerPageGateId || 0) + 1;

      if (!contentRoot.id) {
        contentRoot.id =
          'mp-spoiler-article-' +
          logic.spoilerPageGateId;
      }

      function enforceLockedState() {
        if (gate.dataset.mpSpoilerState !== 'locked') {
          return;
        }

        protectSpoilerPagePath(
          contentRoot,
          gate,
          protectedItems
        );

        protectSpoilerLeakElements(
          pageShell,
          gate,
          protectedItems
        );
      }

      enforceLockedState();

      if (window.MutationObserver) {
        pageObserver = new window.MutationObserver(function () {
          enforceLockedState();
        });

        pageObserver.observe(
          pageShell || contentRoot,
          {
            childList: true,
            subtree: true
          }
        );
      }

      cleanup(function () {
        if (pageObserver) {
          pageObserver.disconnect();
        }

        protectedItems.forEach(
          restoreSpoilerPageContent
        );

        restoreSpoilerPageContent(gate);
      });

      warning.setAttribute(
        'aria-hidden',
        'false'
      );

      gate.setAttribute(
        'role',
        gate.getAttribute('role') || 'region'
      );

      gate.setAttribute(
        'aria-label',
        gate.getAttribute('aria-label') ||
        'Spoiler warning'
      );

      nativeControl =
        prepareSpoilerControl(
          button,
          contentRoot.id
        );

      button.setAttribute(
        'aria-expanded',
        'false'
      );

      function accept(event) {
        var focusTarget;

        if (event) {
          event.preventDefault();
          event.stopPropagation();
        }

        if (
          gate.dataset.mpSpoilerState === 'accepted'
        ) {
          return;
        }

        if (pageObserver) {
          pageObserver.disconnect();
        }

        protectedItems.forEach(
          restoreSpoilerPageContent
        );

        gate.dataset.mpSpoilerState =
          'accepted';

        gate.classList.add(
          'is-mp-spoiler-accepted'
        );

        gate.classList.remove(
          'is-mp-spoiler-locked'
        );

        button.setAttribute(
          'aria-expanded',
          'true'
        );

        warning.setAttribute(
          'aria-hidden',
          'true'
        );

        /* Hide only the gate itself. Never hide a shared Fandom wrapper that
         * may also contain the infobox, TOC, or article body being revealed. */
        hideSpoilerPageContent(gate);

        focusTarget = query(article,
          'h2, h3, h4, a[href], button, input, select, textarea, [tabindex]'
        ).filter(function (candidate) {
          return !gate.contains(candidate) &&
            !candidate.closest('[hidden], [aria-hidden="true"]');
        })[0];

        if (
          focusTarget &&
          focusTarget.matches('h2, h3, h4') &&
          !focusTarget.hasAttribute('tabindex')
        ) {
          focusTarget.setAttribute('tabindex', '-1');
        }

        if (!focusTarget) {
          if (!article.getAttribute('tabindex')) {
            article.setAttribute(
              'tabindex',
              '-1'
            );

            article.dataset.mpSpoilerFocusTarget =
              '1';
          }

          focusTarget = article;
        }

        if (
          focusTarget &&
          typeof focusTarget.focus === 'function'
        ) {
          try {
            focusTarget.focus();
          } catch (focusError) {}
        }

        if (
          typeof window.CustomEvent === 'function'
        ) {
          gate.dispatchEvent(
            new window.CustomEvent(
              'mp:spoilerAccepted',
              {
                bubbles: true,
                detail: {
                  mode: 'page'
                }
              }
            )
          );
        }
      }

      bindSpoilerConsent(
        button,
        nativeControl,
        accept
      );
    });
  }

  function setSpoilerGateState(
    gate,
    warning,
    button,
    body,
    accepted
  ) {
    if (!gate || !button || !body) {
      return;
    }

    gate.dataset.mpSpoilerState =
      accepted ? 'accepted' : 'locked';

    gate.classList.toggle(
      'is-mp-spoiler-accepted',
      !!accepted
    );

    gate.classList.toggle(
      'is-mp-spoiler-locked',
      !accepted
    );

    if (warning) {
      hidden(warning, !!accepted);

      warning.setAttribute(
        'aria-hidden',
        accepted ? 'true' : 'false'
      );
    }

    hidden(body, !accepted);

    body.setAttribute(
      'aria-hidden',
      accepted ? 'false' : 'true'
    );

    button.setAttribute(
      'aria-expanded',
      accepted ? 'true' : 'false'
    );
  }

  function initSpoilerGates(root) {
    initSpoilerPageGates(root);

    mountEach(root, 'spoilers', SELECTOR.spoilerGate, function (gate) {
      var warning;
      var button;
      var body;
      var nativeControl;

      /*
       * Full-page gates are handled by
       * initSpoilerPageGates above.
       */
      if (
        gate.classList &&
        gate.classList.contains(
          'mp-spoiler-page-gate'
        )
      ) {
        return;
      }

      if (
        gate.dataset.mpSpoilerGateReady === '1'
      ) {
        return;
      }

      warning =
        gate.querySelector(
          SELECTOR.spoilerWarning
        );

      button =
        gate.querySelector(
          SELECTOR.spoilerButton
        );

      body =
        gate.querySelector(
          SELECTOR.spoilerBody
        );

      /*
       * Warning-only shells remain informational.
       * Never hide anything without both a consent
       * control and an explicit protected body.
       */
      if (!button || !body) {
        return;
      }

      gate.dataset.mpSpoilerGateReady = '1';
      cleanup(function () {
        hidden(body, false);
        body.setAttribute('aria-hidden', 'false');
      });


      logic.spoilerGateId =
        (logic.spoilerGateId || 0) + 1;

      if (!body.id) {
        body.id =
          'mp-spoiler-body-' +
          logic.spoilerGateId;
      }

      nativeControl =
        prepareSpoilerControl(
          button,
          body.id
        );

      setSpoilerGateState(
        gate,
        warning,
        button,
        body,
        gate.dataset.mpSpoilerState === 'accepted'
      );

      function accept(event) {
        if (gate.dataset.mpSpoilerState === 'accepted') { return; }
        if (event) {
          event.preventDefault();
          event.stopPropagation();
        }

        setSpoilerGateState(
          gate,
          warning,
          button,
          body,
          true
        );

        if (!body.getAttribute('tabindex')) {
          body.setAttribute(
            'tabindex',
            '-1'
          );

          body.dataset.mpSpoilerFocusTarget =
            '1';
        }

        if (
          typeof body.focus === 'function'
        ) {
          try {
            body.focus();
          } catch (focusError) {}
        }

        if (
          typeof window.CustomEvent === 'function'
        ) {
          gate.dispatchEvent(
            new window.CustomEvent(
              'mp:spoilerAccepted',
              {
                bubbles: true,
                detail: {
                  mode: 'inline'
                }
              }
            )
          );
        }
      }

      bindSpoilerConsent(
        button,
        nativeControl,
        accept
      );
    });
  }


  /* ---------------------------------------------------------------------- */

  function achievementStepStorageKey(check) {
    var page =
      mw && mw.config && typeof mw.config.get === 'function'
        ? String(mw.config.get('wgPageName') || '')
        : String(window.location.pathname || '');

    var guide =
      check.closest
        ? check.closest('.mp-achievement-guide')
        : null;

    var base =
      guide
        ? String(
            guide.dataset.mpStepStorageKey ||
            guide.dataset.mpCollapseStorageKey ||
            'guide'
          )
        : 'guide';

    var index =
      String(check.dataset.mpStepIndex || '0');

    return (
      'mp-content-logic:achievement-step:' +
      page +
      ':' +
      base +
      ':' +
      index
    );
  }

  function storedAchievementStepState(key) {
    try {
      return window.localStorage.getItem(key);
    } catch (error) {
      return null;
    }
  }

  function storeAchievementStepState(
    key,
    checked
  ) {
    try {
      window.localStorage.setItem(
        key,
        checked ? 'checked' : 'unchecked'
      );
    } catch (error) {
      /* Storage may be unavailable. */
    }
  }

  function setAchievementStepChecked(
    check,
    checked,
    shouldStore
  ) {
    var step =
      check.closest
        ? check.closest('.mp-achievement-step')
        : null;

    var key =
      achievementStepStorageKey(check);

    if (check.matches('input[type=checkbox]')) { check.checked = checked; }
    check.setAttribute(
      'aria-checked',
      checked ? 'true' : 'false'
    );

    check.setAttribute(
      'aria-label',
      'Procedure step ' +
      check.dataset.mpStepIndex +
      ': ' +
      (
        checked
          ? 'complete; mark incomplete'
          : 'incomplete; mark complete'
      )
    );

    check.classList.toggle(
      'is-mp-checked',
      checked
    );

    if (step) {
      step.classList.toggle(
        'is-mp-step-complete',
        checked
      );
    }

    if (shouldStore) {
      storeAchievementStepState(
        key,
        checked
      );

      query(
        document,
        SELECTOR.achievementStepCheck
      ).forEach(function (other) {
        if (
          other !== check &&
          achievementStepStorageKey(other) === key
        ) {
          setAchievementStepChecked(
            other,
            checked,
            false
          );
        }
      });
    }
  }

  function initAchievementStepChecks(root) {
    mountEach(root, 'achievementSteps', SELECTOR.achievementStepCheck, function (check) {
      var saved;

      if (
        check.dataset.mpStepCheckReady === '1'
      ) {
        return;
      }

      check.dataset.mpStepCheckReady = '1';

      check.setAttribute(
        'role',
        'checkbox'
      );

      check.setAttribute(
        'tabindex',
        check.getAttribute('tabindex') || '0'
      );

      saved =
        storedAchievementStepState(
          achievementStepStorageKey(check)
        );

      setAchievementStepChecked(
        check,
        saved === null
          ? (check.matches('input[type=checkbox]') ? check.checked : check.getAttribute('aria-checked') === 'true')
          : saved === 'checked',
        false
      );

      function activate(event) {
        if (event) {
          if (!check.matches('input[type=checkbox]')) { event.preventDefault(); }
          event.stopPropagation();
        }

        setAchievementStepChecked(
          check,
          check.matches('input[type=checkbox]') ? check.checked : check.getAttribute('aria-checked') !== 'true',
          true
        );
      }

      bindActivation(check, activate);

    });
  }


  /* ---------------------------------------------------------------------- */

  function initEntryTooltips(root) {
    mountEach(root, 'tooltips', '.mp-entry-like.advanced-tooltip', function (entry) {
      var tip;

      if (
        entry.dataset.mpTooltipReady === '1'
      ) {
        return;
      }

      entry.dataset.mpTooltipReady = '1';

      tip =
        entry.querySelector('.tooltip-contents');

      if (tip) {
        if (!tip.id) {
          logic.tooltipId =
            (logic.tooltipId || 0) + 1;

          tip.id =
            'mp-tooltip-' +
            logic.tooltipId;
        }

        tip.setAttribute(
          'role',
          'tooltip'
        );

        entry.setAttribute(
          'aria-describedby',
          tip.id
        );
      }

      listen(entry, 'keydown',
        function (event) {
          if (event.key === 'Escape') {
            entry.classList.add(
              'is-mp-tooltip-dismissed'
            );
          }

          if (
            event.key === 'Enter' &&
            event.target === entry &&
            !event.repeat
          ) {
            var link =
              entry.querySelector('a[href]');

            if (link) {
              event.preventDefault();
              link.click();
            }
          }
        }
      );

      ['focusin', 'mouseenter'].forEach(function (name) {
        listen(entry, name,
          function () {
            entry.classList.remove(
              'is-mp-tooltip-dismissed'
            );
          }
        );
      });
    });
  }


  /* ---------------------------------------------------------------------- */

  function bindGlobalEvents() {
    listen(window, 'storage', function (event) {
      if (!enabled('achievementSteps')) { return; }
      query(document, SELECTOR.achievementStepCheck).forEach(function (check) {
        if (!modules.achievementSteps.instances.has(check)) { return; }
        if (event.key === null || event.key === achievementStepStorageKey(check)) {
          setAchievementStepChecked(check, storedAchievementStepState(achievementStepStorageKey(check)) === 'checked', false);
        }
      });
    });
    ['change', 'click'].forEach(function (eventName) {
      listen(document, eventName, function (event) {
        if (!event.target || !event.target.closest || !event.target.closest(
            'table-progress-tracking, .mp-js-count-group, .mp-achievement-list-wrap, .mp-achievement-list, .mp-achievement-guide')) { return; }
        queueCounts(document, eventName === 'change' ? 80 : 120);
        query(document, SELECTOR.summary).forEach(function (summary) {
          queueSummary(summary, eventName === 'change' ? 80 : 120);
        });
      });
    });
  }

  adapter('rotators', SELECTOR.rotator, 'mpRotatorReady', initRotators,
    { mode: 'sequence', interval: 10000, count: 1 });
  adapter('summaries', SELECTOR.summary, 'mpAchievementSummaryReady', initAchievementSummaries,
    { legacyProgressWidth: true });
  adapter('toggles', SELECTOR.toggle, 'mpToggleReady', initToggles);
  adapter('collapsibles', SELECTOR.collapsible, 'mpCollapseReady', initCollapsibles);
  adapter('achievementSteps', SELECTOR.achievementStepCheck, 'mpStepCheckReady', initAchievementStepChecks);
  adapter('tooltips', '.mp-entry-like.advanced-tooltip', 'mpTooltipReady', initEntryTooltips);
  adapter('filters', SELECTOR.filter, 'mpFilterReady', initFilters, { mode: 'contains' });
  adapter('counts', SELECTOR.count, 'mpCountReady', initCounts);
  adapter('currentLinks', SELECTOR.currentLink, null, initCurrentLinks);
  adapter('readMore', SELECTOR.readMore, 'mpReadMoreReady', initReadMore, { limit: 360 });
  adapter('spoilerPages', SELECTOR.spoilerPageGate, 'mpSpoilerPageReady', initSpoilerPageGates);
  adapter('spoilers', SELECTOR.spoilerGate, 'mpSpoilerGateReady', initSpoilerGates);
  adapter('reveal', SELECTOR.reveal, 'mpRevealReady', initReveal);

  logic.hasMarkers = function (root) {
    return order.some(function (name) { return containsMarker(root || document, modules[name].selector); });
  };
  logic.init = init;
  logic.refresh = init;
  logic.register = register;
  logic.configure = configure;
  logic.enable = function (name) {
    var features = {}; features[name] = true; return configure({ features: features });
  };
  logic.disable = function (name) {
    var features = {}; features[name] = false; return configure({ features: features });
  };
  logic.destroy = destroy;
  logic.start = start;
  logic.stop = stop;
  logic.getModules = function () {
    return order.map(function (name) {
      return { name: name, enabled: enabled(name), selector: modules[name].selector,
        options: mergeOptions(modules[name].defaults, config.options[name]),
        instances: records.filter(function (record) { return record.name === name; }).length };
    });
  };
  logic.utils = { query: query, hidden: hidden, emit: emit, setState: state,
    number: number, booleanValue: booleanValue, targetList: targetList };
  /* Preserve published entry points. They share the same ownership/enable checks. */
  logic.initCollapsibles = function (content) { rootsOf(content).forEach(function (root) { run('collapsibles', root); }); };
  logic.initAchievementStepChecks = function (content) { rootsOf(content).forEach(function (root) { run('achievementSteps', root); }); };
  logic.initSpoilerGates = function (content) { rootsOf(content).forEach(function (root) { run('spoilerPages', root); run('spoilers', root); }); };
  logic.initSpoilerPageGates = function (content) { rootsOf(content).forEach(function (root) { run('spoilerPages', root); }); };
  logic.updateCounts = updateCounts;
  logic.updateAchievementSummaries = function () {
    query(document, SELECTOR.summary).forEach(function (summary) { queueSummary(summary, 0); });
  };

  start();
  if (mw && typeof mw.hook === 'function') { mw.hook('mp.contentLogic.ready').fire(logic); }

}(window.mediaWiki || window.mw, window, document));