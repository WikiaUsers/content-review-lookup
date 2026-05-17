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
 * - Reveal-on-scroll states, including a repeat variant.
 *
 * Structure:
 * Wikitext, templates, and modules provide the content and mp-js-* hooks.
 * MainPage.css and related stylesheets control the visual design.
 * This script adds behaviour classes, text updates, and interaction states after page content renders.
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


///////////////////////////////////////////////////////////////////////////////////////////////////////////////


/**
 * Script identity and duplicate-load guard
 * The build identifier lets the same submitted build stop if it is accidentally loaded twice.
 * Reference:
 * https://community.fandom.com/wiki/Help:Advanced_CSS_and_JS#Duplicate_JavaScript
 */
  var SCRIPT = {
    name: 'Magical Princess Content Logic',
    version: '2026-05-12',
    features: 'wikitext-behaviours-featured-article-rotator-collapsible-containers'
  };
  SCRIPT.buildIdentifier = 'mp-content-logic:' + SCRIPT.features + ':' + SCRIPT.version;

  var MP = window.MagicalPrincess = window.MagicalPrincess || {};
  var logic = MP.contentLogic = MP.contentLogic || {};

  // Stop here if this exact build has already initialized on the page.
  if (logic.loadedBuildIdentifier === SCRIPT.buildIdentifier) {
    return;
  }

  logic.scriptName = SCRIPT.name;
  logic.version = SCRIPT.version;
  logic.featureSet = SCRIPT.features;
  logic.loadedBuildIdentifier = SCRIPT.buildIdentifier;
  logic.timers = logic.timers || {};
  logic.flags = logic.flags || {};


///////////////////////////////////////////////////////////////////////////////////////////////////////////////


/**
 * Wikitext behaviour selectors
 * Lists the rendered wikitext hooks that the script can enhance.
 * Pages without these markers are ignored by the initializer.
 */
  var SELECTOR = logic.selectors = {
    marker: [
      '.mp-js-rotator', '.mp-js-rotate',
      '.mp-js-achievement-summary',
      '.mp-js-toggle', '.mp-js-toggle-panel',
      '.mp-js-collapsible', '.mp-js-collapse', '.mp-js-collapse-toggle', '.mp-js-collapse-body',
      '.mp-js-filter', '.mp-js-filter-list', '.mp-js-filter-item',
      '.mp-js-count', '.mp-js-current-link', '.mp-navigationbar-link',
      '.mp-js-readmore', '.mp-js-reveal', '.mp-js-reveal-repeat'
    ].join(', '),
    refresh: [
      '.mp-js-achievement-summary', '.mp-js-count', '.mp-js-count-group',
      'table-progress-tracking', '.mp-achievement-list-wrap', '.mp-achievement-list'
    ].join(', '),
    rotator: '.mp-js-rotator, .mp-js-rotate',
    rotatorItem: '.mp-js-rotator-item, .mp-js-rotate-item',
    summary: '.mp-js-achievement-summary',
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
    reveal: '.mp-js-reveal, .mp-js-reveal-repeat'
  };


///////////////////////////////////////////////////////////////////////////////////////////////////////////////


/**
 * Shared helpers
 * General utilities for arrays, root resolution, selectors, value parsing,
 * text updates, data updates, and hidden/visible states.
 */
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
    if (/^[#.[]/.test(key)) {
      return query(document, key);
    }

    direct = document.getElementById(key);
    escaped = escapeAttr(key);
    selectors = baseSelector + '[' + dataName + '="' + escaped + '"], ' +
      baseSelector + '[data-' + dataName + '="' + escaped + '"]';

    return unique((direct ? [direct] : []).concat(query(document, selectors)));
  }


///////////////////////////////////////////////////////////////////////////////////////////////////////////////


/**
 * Page name helpers
 * Used by current-page navigation highlighting to compare links with the active page.
 */
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


///////////////////////////////////////////////////////////////////////////////////////////////////////////////


/**
 * Rotating text
 * Wikitext hooks:
 * .mp-js-rotator
 * .mp-js-rotate
 * .mp-js-rotator-item
 * .mp-js-rotate-item
 * 
 * Used for short rotating labels, notices, and the module-rendered Featured Article kicker.
 */
  function initRotators(root) {
    query(root, SELECTOR.rotator).forEach(function (rotator) {
      var mode = String(rotator.dataset.mpRotateMode || rotator.dataset.mpRotatorMode || 'sequence').toLowerCase();
      var interval = Math.max(number(rotator.dataset.mpRotateInterval || rotator.dataset.mpRotatorInterval, 10000), 1000);
      var count = Math.max(number(rotator.dataset.mpRotateCount || rotator.dataset.mpRotatorCount, 1), 1);
      var separator = rotator.dataset.mpRotateSeparator || rotator.dataset.mpRotatorSeparator || '|';
      var joiner = rotator.dataset.mpRotateJoin || '  ';
      var values = splitValues(rotator.dataset.mpRotateValues || rotator.dataset.mpRotatorValues, separator);
      var childItems = query(rotator, rotator.dataset.mpRotateItemSelector || SELECTOR.rotatorItem);
      var pool = values.length ? values : childItems;
      var index = Math.max(number(rotator.dataset.mpRotateStart || rotator.dataset.mpRotatorStart, 0), 0);
      var paused = false;

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

      function indexes() {
        var list = [];
        var offset;

        if (mode === 'daily') {
          index = stableIndex('day', pool.length);
        } else if (mode === 'weekly') {
          index = stableIndex('week', pool.length);
        } else if (mode === 'random') {
          return shuffle(pool.map(function (_, itemIndex) { return itemIndex; })).slice(0, count);
        }

        for (offset = 0; offset < count; offset += 1) {
          list.push((index + offset) % pool.length);
        }
        return list;
      }

      function render() {
        var list = indexes();

        rotator.classList.add('is-mp-rotator-changing', 'is-mp-rotating-text-changing');
        window.setTimeout(function () {
          if (values.length) {
            text(rotator, list.map(function (itemIndex) { return pool[itemIndex]; }).join(joiner));
          } else {
            childItems.forEach(function (item) { hidden(item, true); });
            list.forEach(function (itemIndex) { hidden(pool[itemIndex], false); });
          }
          rotator.classList.remove('is-mp-rotator-changing', 'is-mp-rotating-text-changing');
          rotator.classList.add('is-mp-rotator-active');
        }, 120);
      }

      function advance() {
        if (paused) {
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
        rotator.dataset.mpRotatorTimer = String(window.setInterval(advance, interval));
      }

      if (rotator.dataset.mpRotatePauseOnHover !== 'false') {
        rotator.addEventListener('mouseenter', function () { paused = true; });
        rotator.addEventListener('mouseleave', function () { paused = false; });
      }
    });
  }


///////////////////////////////////////////////////////////////////////////////////////////////////////////////


/**
 * Achievement summaries
 * Wikitext hook:
 * .mp-js-achievement-summary
 * 
 * Reads nearby achievement/progress-tracking rows and writes summary text or progress values.
 */
  function rowIsData(row) {
    return !!(
      row && row.querySelector && !row.querySelector('th') &&
      !row.querySelector('input[placeholder], input[type="search"], .dataTables_filter') &&
      row.textContent && row.textContent.trim() &&
      (row.querySelector('[data-row-id]') ||
        row.querySelector('.mp-achievement-list-achievement, .mp-achievement-list-entry, .mp-achievement-list-name') ||
        row.classList.contains('mp-js-achievement-row'))
    );
  }

  function rowIsChecked(row) {
    var firstCell = row && row.querySelector ? row.querySelector('td, th') : null;
    var textValue = firstCell ? firstCell.textContent || '' : '';
    var color;

    if (!row || !row.querySelector) {
      return false;
    }
    if (row.querySelector('input[type="checkbox"]:checked, [aria-checked="true"], [data-checked="true"], [data-progress-checked="true"], .checked, .is-checked, .complete, .completed, .is-complete, .is-completed')) {
      return true;
    }
    if (/|||/.test(textValue)) {
      return true;
    }
    if (firstCell && window.getComputedStyle) {
      color = window.getComputedStyle(firstCell).backgroundColor || '';
      return /rgb\(\s*(1[2-9][0-9]|2[0-5][0-9])\s*,\s*(1[5-9][0-9]|2[0-5][0-9])\s*,\s*(1[2-9][0-9]|2[0-5][0-9])/.test(color);
    }
    return false;
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

    dataRows = query(host, '[data-row-id], [data-tpt-row-id], [data-progress-row-id]').map(function (item) {
      return item.closest && item.closest('tr') ? item.closest('tr') : item;
    });

    return unique(dataRows).filter(function (item) {
      return item && item.textContent && item.textContent.trim();
    });
  }

  function achievementHost(summary) {
    var target = summary.dataset.mpAchievementTarget || summary.dataset.mpAchievementTable || '';
    var candidates = [];

    if (target) {
      candidates = candidates.concat(targetList(target, 'table-progress-tracking', 'table-id'));
      candidates = candidates.concat(query(document, 'table[data-table-id="' + escapeAttr(target) + '"], .table-progress-tracking[data-table-id="' + escapeAttr(target) + '"]'));
    }
    if (summary.parentElement) {
      candidates = candidates.concat(query(summary.parentElement, 'table-progress-tracking, .mp-achievement-list-wrap, .mp-achievement-list'));
    }
    candidates = candidates.concat(query(document, 'table-progress-tracking, .mp-achievement-list-wrap, .mp-achievement-list'));
    candidates = unique(candidates).filter(function (item) {
      return item && item !== summary && !summary.contains(item);
    });

    return candidates.filter(function (item) { return achievementRows(item).length; })[0] || candidates[0] || null;
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

    text(output, total ? format(message, {
      done: done,
      total: total,
      percent: percent,
      remaining: Math.max(total - done, 0)
    }) : empty);

    if (bar) {
      bar.style.width = percent + '%';
      bar.setAttribute('aria-valuenow', String(percent));
    }
  }

  function queueSummary(summary, delay) {
    if (summary.mpAchievementSummaryTimer) {
      window.clearTimeout(summary.mpAchievementSummaryTimer);
    }
    summary.mpAchievementSummaryTimer = window.setTimeout(function () {
      summary.mpAchievementSummaryTimer = null;
      renderAchievementSummary(summary);
    }, delay || 120);
  }

  function initAchievementSummaries(root) {
    query(root, SELECTOR.summary).forEach(function (summary) {
      var host;
      var observer;

      queueSummary(summary, 60);

      if (summary.dataset.mpAchievementSummaryReady === '1') {
        return;
      }

      summary.dataset.mpAchievementSummaryReady = '1';
      host = achievementHost(summary);

      if (host && window.MutationObserver && !host.contains(summary)) {
        observer = new MutationObserver(function () {
          queueSummary(summary, 120);
        });
        observer.observe(host, {
          childList: true,
          subtree: true,
          attributes: true,
          attributeFilter: ['class', 'style', 'checked', 'aria-checked', 'data-checked', 'data-progress-checked']
        });
      }

      [350, 1200, 2500].forEach(function (delay) {
        window.setTimeout(function () { queueSummary(summary, 0); }, delay);
      });
    });
  }


///////////////////////////////////////////////////////////////////////////////////////////////////////////////


/**
 * Toggle panels
 * Wikitext hooks:
 * .mp-js-toggle
 * .mp-js-toggle-panel
 * 
 * Adds button-like open/close behaviour to marked expandable wikitext sections.
 */
  function initToggles(root) {
    query(root, SELECTOR.toggle).forEach(function (toggle) {
      var panels;
      var key;
      var defaultOpen;

      if (toggle.dataset.mpToggleReady === '1') {
        return;
      }

      key = toggle.dataset.mpToggleTarget || toggle.getAttribute('href') || '';
      panels = targetList(key, SELECTOR.togglePanel, 'mp-toggle-panel');
      defaultOpen = toggle.dataset.mpToggleDefault === 'open';

      if (!panels.length) {
        return;
      }

      toggle.dataset.mpToggleReady = '1';
      toggle.setAttribute('role', toggle.getAttribute('role') || 'button');
      toggle.setAttribute('tabindex', toggle.getAttribute('tabindex') || '0');

      function open(value) {
        toggle.classList.toggle('is-mp-open', value);
        toggle.classList.toggle('is-mp-closed', !value);
        toggle.setAttribute('aria-expanded', value ? 'true' : 'false');
        panels.forEach(function (panel) {
          panel.classList.toggle('is-mp-open', value);
          panel.classList.toggle('is-mp-closed', !value);
          hidden(panel, !value);
        });
      }

      function activate(event) {
        event.preventDefault();
        open(toggle.getAttribute('aria-expanded') !== 'true');
      }

      open(defaultOpen);
      toggle.addEventListener('click', activate);
      toggle.addEventListener('keydown', function (event) {
        if (event.key === 'Enter' || event.key === ' ') {
          activate(event);
        }
      });
    });
  }




///////////////////////////////////////////////////////////////////////////////////////////////////////////////


/**
 * Collapsible containers
 * Wikitext hooks:
 * .mp-js-collapsible
 * .mp-js-collapse
 * .mp-js-collapse-heading
 * .mp-js-collapse-toggle
 * .mp-js-collapse-body
 *
 * Adds reusable collapse/expand behaviour to marked containers without touching
 * their inner wikitext table, progress tracking, filters, rows, or form inputs.
 */
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
      return body && body !== section && section.contains(body);
    });
  }

  function collapseHeader(section, bodies) {
    var key = section.dataset.mpCollapseHeading || section.dataset.mpCollapsibleHeading || '';
    var header = key ? section.querySelector(key) : null;

    if (!header) {
      header = section.querySelector(SELECTOR.collapseHeader);
    }
    if (!header && bodies.length) {
      header = bodies[0].previousElementSibling;
    }
    return header || section;
  }

  function collapseStorageKey(section, index) {
    var page = mw && mw.config && typeof mw.config.get === 'function'
      ? String(mw.config.get('wgPageName') || '')
      : String(window.location.pathname || '');
    var key = section.dataset.mpCollapseStorageKey || section.dataset.mpCollapseId || section.id || String(index);

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
      if (!body.id) {
        body.id = 'mp-collapse-body-' + index + '-' + bodyIndex;
      }
      return body.id;
    });
  }

  function initCollapsibles(root) {
    var allSections = query(document, SELECTOR.collapsible);

    query(root, SELECTOR.collapsible).forEach(function (section) {
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
      toggle = section.querySelector(SELECTOR.collapseToggle);
      controls = ensureCollapseIds(bodies, index);
      remember = booleanValue(section.dataset.mpCollapseRemember || section.dataset.mpCollapsibleRemember, false);
      storageKey = collapseStorageKey(section, index);
      savedState = remember ? storedCollapseState(storageKey) : null;
      defaultOpen = !/^(closed|collapsed|false|0)$/i.test(String(section.dataset.mpCollapseDefault || section.dataset.mpCollapsibleDefault || 'open'));
      openLabel = section.dataset.mpCollapseOpenLabel || section.dataset.mpCollapseCollapseLabel || 'Collapse';
      closedLabel = section.dataset.mpCollapseClosedLabel || section.dataset.mpCollapseExpandLabel || 'Expand';

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

      toggle.addEventListener('click', activate);
      toggle.addEventListener('keydown', function (event) {
        if (event.key === 'Enter' || event.key === ' ') {
          activate(event);
        }
      });

      if (savedState === 'open') {
        defaultOpen = true;
      } else if (savedState === 'closed') {
        defaultOpen = false;
      }

      setOpen(defaultOpen, false);
    });
  }


///////////////////////////////////////////////////////////////////////////////////////////////////////////////


/**
 * Filters
 * Wikitext hooks:
 * .mp-js-filter
 * .mp-js-filter-list
 * .mp-js-filter-item
 * 
 * Filters marked lists, rows, cards, or catalog-style content by value or text.
 */
  function itemText(item) {
    return String(item.dataset.mpFilterText || item.dataset.mpFilterTags || item.textContent || '').toLowerCase();
  }

  function itemMatches(item, queryValue, mode) {
    var haystack = itemText(item);
    var tags = splitValues(item.dataset.mpFilterTags || '', '|').map(function (tag) {
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
    var input = filter.matches('input, textarea') ? filter : filter.querySelector('input, textarea');
    var mode = String(filter.dataset.mpFilterMode || 'contains').toLowerCase();
    var value = (input ? input.value : filter.dataset.mpFilterValue || '').trim().toLowerCase();

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

    query(document, SELECTOR.filter + '[data-mp-filter-target="' + escapeAttr(key) + '"]').forEach(function (other) {
      var otherInput = other.matches('input, textarea') ? other : other.querySelector('input, textarea');
      var otherValue = (otherInput ? otherInput.value : other.dataset.mpFilterValue || '').trim().toLowerCase();
      other.classList.toggle('is-mp-filter-active', otherValue === value);
    });

    queueCounts(document, 0);
  }

  function initFilters(root) {
    query(root, SELECTOR.filter).forEach(function (filter) {
      var input;

      if (filter.dataset.mpFilterReady === '1' || (!filter.dataset.mpFilterTarget && !filter.dataset.mpFilterList)) {
        return;
      }

      filter.dataset.mpFilterReady = '1';
      input = filter.matches('input, textarea') ? filter : filter.querySelector('input, textarea');

      if (input) {
        input.addEventListener('input', function () { applyFilter(filter); });
      } else {
        filter.setAttribute('role', filter.getAttribute('role') || 'button');
        filter.setAttribute('tabindex', filter.getAttribute('tabindex') || '0');
        filter.addEventListener('click', function (event) { event.preventDefault(); applyFilter(filter); });
        filter.addEventListener('keydown', function (event) {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            applyFilter(filter);
          }
        });
      }

      if (/^(1|true)$/.test(filter.dataset.mpFilterDefault || '')) {
        applyFilter(filter);
      }
    });
  }


///////////////////////////////////////////////////////////////////////////////////////////////////////////////


/**
 * Counters
 * Wikitext hooks:
 * .mp-js-count
 * .mp-js-count-group
 * 
 * Counts marked items and updates visible/total/checked outputs.
 */
  function countItems(counter) {
    var key = counter.dataset.mpCountTarget || '';
    var selector = counter.dataset.mpCountItems || '.mp-js-count-item, .mp-js-filter-item, tr, li';
    var targets = targetList(key, '.mp-js-count-group', 'mp-count-group');
    var items = [];

    if (!targets.length && counter.parentElement) {
      targets = [counter.parentElement];
    }
    targets.forEach(function (target) {
      items = items.concat(query(target, selector));
    });

    return items.filter(function (item) {
      return item !== counter && !item.contains(counter) && !item.querySelector('th') &&
        !item.querySelector('input[placeholder], input[type="search"]') &&
        item.textContent && item.textContent.trim();
    });
  }

  function updateCounts(scope) {
    query(scope && scope.querySelectorAll ? scope : document, SELECTOR.count).forEach(function (counter) {
      var items = countItems(counter);
      var visible = items.filter(function (item) {
        return !item.hidden && !item.classList.contains('is-mp-filter-hidden');
      }).length;
      var checked = items.filter(function (item) {
        return rowIsChecked(item) || !!item.querySelector('input[type="checkbox"]:checked');
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
      text(counter, format(counter.dataset.mpCountFormat || '{visible} / {total} shown', values));
    });
  }

  function queueCounts(scope, delay) {
    if (logic.timers.count) {
      window.clearTimeout(logic.timers.count);
    }
    logic.timers.count = window.setTimeout(function () {
      logic.timers.count = null;
      updateCounts(scope || document);
    }, delay || 80);
  }

  function initCounts(root) {
    query(root, SELECTOR.count).forEach(function (counter) {
      counter.dataset.mpCountReady = '1';
    });
    queueCounts(root, 40);
  }


///////////////////////////////////////////////////////////////////////////////////////////////////////////////


/**
 * Current-page navigation highlighting
 * Wikitext hooks:
 * .mp-js-current-link
 * .mp-navigationbar-link
 * 
 * Adds the active state to navigation links that point to the current page.
 */
  function initCurrentLinks(root) {
    var current = currentPageName();

    query(root, SELECTOR.currentLink).forEach(function (link) {
      if (pageName(link.getAttribute('href')) === current) {
        link.classList.add('is-mp-current-link');
        if (link.parentElement) {
          link.parentElement.classList.add('is-mp-current-link');
        }
      }
    });
  }


///////////////////////////////////////////////////////////////////////////////////////////////////////////////


/**
 * Read-more text
 * Wikitext hook:
 * .mp-js-readmore
 * 
 * Shortens long plain-text notes and adds a small expand/collapse button.
 */
  function initReadMore(root) {
    query(root, SELECTOR.readMore).forEach(function (element) {
      var limit = Math.max(number(element.dataset.mpReadmoreLimit || element.dataset.mpReadMoreLimit, 360), 60);
      var fullText = element.textContent.trim();
      var shortText;
      var button;
      var expanded = false;

      if (element.dataset.mpReadMoreReady === '1' || fullText.length <= limit) {
        return;
      }

      shortText = fullText.slice(0, limit).replace(/\s+\S*$/, '') + '...';
      button = document.createElement('button');
      button.type = 'button';
      button.className = 'mp-js-readmore-button';
      element.dataset.mpReadMoreReady = '1';
      element.dataset.mpReadMoreFull = fullText;

      function render() {
        text(element, expanded ? fullText : shortText);
        text(button, expanded ? (element.dataset.mpReadmoreLess || element.dataset.mpReadMoreLess || 'Show less') : (element.dataset.mpReadmoreMore || element.dataset.mpReadMoreMore || 'Read more'));
        button.setAttribute('aria-expanded', expanded ? 'true' : 'false');
        element.classList.toggle('is-mp-readmore-expanded', expanded);
        element.classList.toggle('is-mp-readmore-collapsed', !expanded);
      }

      button.addEventListener('click', function () {
        expanded = !expanded;
        render();
      });

      element.parentNode.insertBefore(button, element.nextSibling);
      render();
    });
  }

  function revealRepeats(element) {
    var mode = String(element.dataset.mpRevealMode || '').toLowerCase();
    return element.classList.contains('mp-js-reveal-repeat') || /^(1|true)$/.test(element.dataset.mpRevealRepeat || '') || mode === 'repeat' || mode === 'toggle';
  }

  function initReveal(root) {
    var elements = query(root, SELECTOR.reveal);
    var observer;

    if (!elements.length) {
      return;
    }

    if (!('IntersectionObserver' in window)) {
      elements.forEach(function (element) {
        element.classList.add('is-mp-visible');
        element.classList.remove('is-mp-out-of-view');
      });
      return;
    }

    observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var repeat = revealRepeats(entry.target);

        if (entry.isIntersecting) {
          entry.target.classList.add('is-mp-visible');
          entry.target.classList.remove('is-mp-out-of-view');
          if (!repeat) {
            observer.unobserve(entry.target);
          }
        } else if (repeat) {
          entry.target.classList.remove('is-mp-visible');
          entry.target.classList.add('is-mp-out-of-view');
        }
      });
    }, { threshold: 0.12 });

    elements.forEach(function (element) {
      if (element.dataset.mpRevealReady === '1') {
        return;
      }
      element.dataset.mpRevealReady = '1';
      element.classList.add('is-mp-reveal-ready');
      if (revealRepeats(element)) {
        element.classList.add('is-mp-reveal-repeat-ready', 'is-mp-out-of-view');
      }
      observer.observe(element);
    });
  }


///////////////////////////////////////////////////////////////////////////////////////////////////////////////


/**
 * Achievement and counter refresh events
 * Refreshes marked achievement summaries and counters after progress-tracking clicks or changes.
 */
  function bindRefreshEvents() {
    if (logic.flags.refreshEventsBound) {
      return;
    }
    logic.flags.refreshEventsBound = true;

    ['change', 'click'].forEach(function (eventName) {
      document.addEventListener(eventName, function (event) {
        if (!event.target || !event.target.closest || !event.target.closest('table-progress-tracking, .mp-js-count-group, .mp-achievement-list-wrap, .mp-achievement-list')) {
          return;
        }
        queueCounts(document, eventName === 'change' ? 80 : 120);
        query(document, SELECTOR.summary).forEach(function (summary) {
          queueSummary(summary, eventName === 'change' ? 80 : 120);
        });
      });
    });
  }


///////////////////////////////////////////////////////////////////////////////////////////////////////////////


/**
 * Page content initialization
 * Runs the behaviour layer through MediaWiki's wikipage.content hook.
 * The initializer returns early unless Magical Princess mp-js-* markers are present.
 */
  function init(content) {
    var root = rootOf(content);

    if (!root || !root.querySelectorAll || !allowedPage() || !containsMarker(root, SELECTOR.marker)) {
      return;
    }

    initRotators(root);
    initAchievementSummaries(root);
    initToggles(root);
    initCollapsibles(root);
    initFilters(root);
    initCounts(root);
    initCurrentLinks(root);
    initReadMore(root);
    initReveal(root);

    if (containsMarker(root, SELECTOR.refresh)) {
      bindRefreshEvents();
    }
  }

  logic.hasMarkers = function (root) {
    return containsMarker(root || document, SELECTOR.marker);
  };
  logic.init = init;
  logic.initCollapsibles = initCollapsibles;
  logic.updateCounts = updateCounts;
  logic.updateAchievementSummaries = function () {
    query(document, SELECTOR.summary).forEach(function (summary) {
      queueSummary(summary, 0);
    });
  };


///////////////////////////////////////////////////////////////////////////////////////////////////////////////


/**
 * MediaWiki hook registration
 * Initializes the behaviour layer when wiki page content is added to the DOM.
 */
  if (mw && mw.hook) {
    mw.hook('wikipage.content').add(init);
  } else if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { init(document); });
  } else {
    init(document);
  }
}(window.mediaWiki || window.mw, window, document));