/*
 * Magical Princess Wiki - ItemInfobox collapsible Sources
 *
 * Enhances Template:ItemInfobox source output rendered by Module:ItemInfobox.
 * The script only collapses Sources and source entries after JavaScript loads.
 * Without JavaScript, all source details remain visible and accessible.
 */
(function () {
  'use strict';

  var DATA_SELECTOR = [
    '.portable-infobox .pi-data[data-item-name="item-sources"]',
    '.portable-infobox .pi-data[data-source="sources"]'
  ].join(',');

  var PANEL_SELECTOR = [
    '[data-mp-item-infobox-sources="content"]',
    '.mp-item-infobox-sources-panel',
    '.mp-item-infobox-sources'
  ].join(',');

  var ENTRY_SELECTOR = [
    '[data-mp-item-infobox-source-entry="entry"]',
    '.mp-item-infobox-source'
  ].join(',');

  var ENTRY_HEADER_SELECTOR = [
    '[data-mp-item-infobox-source-header="label"]',
    '.mp-item-infobox-source-header'
  ].join(',');

  var ENTRY_TITLE_SELECTOR = '.mp-item-infobox-source-header-title';

  var ENTRY_DETAILS_SELECTOR = [
    '[data-mp-item-infobox-source-details="content"]',
    '.mp-item-infobox-source-details'
  ].join(',');

  var ENHANCED_CLASS = 'mp-item-infobox-sources-js-ready';
  var COLLAPSED_CLASS = 'mp-item-infobox-sources-is-collapsed';
  var EXPANDED_CLASS = 'mp-item-infobox-sources-is-expanded';

  var ENTRY_ENHANCED_CLASS = 'mp-item-infobox-source-js-ready';
  var ENTRY_COLLAPSED_CLASS = 'mp-item-infobox-source-is-collapsed';
  var ENTRY_EXPANDED_CLASS = 'mp-item-infobox-source-is-expanded';

  var uid = 0;

  function makeId(prefix, index) {
    uid += 1;
    return prefix + '-' + index + '-' + uid;
  }

  function cleanText(value) {
    return (value || '').replace(/\s+/g, ' ').trim();
  }

  function setButtonText(button, expanded) {
    var state = button.querySelector('.mp-item-infobox-sources-toggle-state');

    button.setAttribute('aria-expanded', expanded ? 'true' : 'false');

    if (state) {
      state.textContent = expanded ? 'Hide' : 'Show';
    }
  }

  function setExpanded(sourceRow, button, panel, expanded) {
    sourceRow.classList.toggle(COLLAPSED_CLASS, !expanded);
    sourceRow.classList.toggle(EXPANDED_CLASS, expanded);
    panel.setAttribute('aria-hidden', expanded ? 'false' : 'true');
    setButtonText(button, expanded);
  }

  function createMainToggle(panelId) {
    var button = document.createElement('button');
    var label = document.createElement('span');
    var state = document.createElement('span');
    var arrow = document.createElement('span');

    button.type = 'button';
    button.className = 'mp-item-infobox-sources-toggle';
    button.setAttribute('aria-controls', panelId);
    button.setAttribute('aria-expanded', 'false');

    label.className = 'mp-item-infobox-sources-toggle-label';
    label.textContent = 'Sources';

    state.className = 'mp-item-infobox-sources-toggle-state';
    state.textContent = 'Show';

    arrow.className = 'mp-item-infobox-sources-toggle-arrow';
    arrow.setAttribute('aria-hidden', 'true');
    arrow.textContent = '▾';

    button.appendChild(label);
    button.appendChild(state);
    button.appendChild(arrow);

    return button;
  }

  function sourceEntryTitle(entry, header) {
    var titleNode = header && header.querySelector(ENTRY_TITLE_SELECTOR);
    var titleText = cleanText(titleNode ? titleNode.textContent : '');
    var fallbackText = cleanText(header ? header.textContent : '');

    if (titleText) {
      return titleText;
    }

    if (fallbackText) {
      return fallbackText;
    }

    return cleanText(entry.getAttribute('data-mp-item-infobox-source-title')) || 'Source entry';
  }

  function setEntryButtonText(button, expanded) {
    var state = button.querySelector('.mp-item-infobox-source-toggle-state');

    button.setAttribute('aria-expanded', expanded ? 'true' : 'false');

    if (state) {
      state.textContent = expanded ? 'Hide' : 'Show';
    }
  }

  function setEntryExpanded(entry, button, details, expanded) {
    entry.classList.toggle(ENTRY_COLLAPSED_CLASS, !expanded);
    entry.classList.toggle(ENTRY_EXPANDED_CLASS, expanded);
    details.setAttribute('aria-hidden', expanded ? 'false' : 'true');
    setEntryButtonText(button, expanded);
  }

  function createEntryToggle(titleText, detailsId) {
    var button = document.createElement('button');
    var label = document.createElement('span');
    var state = document.createElement('span');
    var arrow = document.createElement('span');

    button.type = 'button';
    button.className = 'mp-item-infobox-source-toggle';
    button.setAttribute('aria-controls', detailsId);
    button.setAttribute('aria-expanded', 'false');

    label.className = 'mp-item-infobox-source-toggle-label';
    label.textContent = titleText || 'Source entry';

    state.className = 'mp-item-infobox-source-toggle-state';
    state.textContent = 'Show';

    arrow.className = 'mp-item-infobox-source-toggle-arrow';
    arrow.setAttribute('aria-hidden', 'true');
    arrow.textContent = '▾';

    button.appendChild(label);
    button.appendChild(state);
    button.appendChild(arrow);

    return button;
  }

  function enhanceSourceEntry(entry, index) {
    var details = entry.querySelector(ENTRY_DETAILS_SELECTOR);
    var header = entry.querySelector(ENTRY_HEADER_SELECTOR);
    var detailsId;
    var button;
    var titleText;

    if (!details || entry.classList.contains(ENTRY_ENHANCED_CLASS)) {
      return;
    }

    detailsId = details.id || makeId('mp-item-infobox-source-details', index);
    details.id = detailsId;

    if (!header) {
      header = document.createElement('span');
      header.className = 'mp-item-infobox-source-header';
      entry.insertBefore(header, details);
    }

    titleText = sourceEntryTitle(entry, header);
    button = createEntryToggle(titleText, detailsId);

    while (header.firstChild) {
      header.removeChild(header.firstChild);
    }

    header.appendChild(button);

    button.addEventListener('click', function () {
      var expanded = button.getAttribute('aria-expanded') !== 'true';
      setEntryExpanded(entry, button, details, expanded);
    });

    entry.classList.add(ENTRY_ENHANCED_CLASS);
    setEntryExpanded(entry, button, details, false);
  }

  function enhanceSourceEntries(panel) {
    var entries = panel.querySelectorAll(ENTRY_SELECTOR);
    Array.prototype.forEach.call(entries, enhanceSourceEntry);
  }

  function enhanceSourceRow(sourceRow, index) {
    var value = sourceRow.querySelector('.pi-data-value') || sourceRow;
    var panel = value.querySelector(PANEL_SELECTOR);
    var panelId;
    var button;

    if (!panel) {
      return;
    }

    enhanceSourceEntries(panel);

    if (sourceRow.classList.contains(ENHANCED_CLASS)) {
      return;
    }

    panelId = panel.id || makeId('mp-item-infobox-sources-panel', index);
    panel.id = panelId;

    button = createMainToggle(panelId);

    button.addEventListener('click', function () {
      var expanded = button.getAttribute('aria-expanded') !== 'true';
      setExpanded(sourceRow, button, panel, expanded);
    });

    value.insertBefore(button, panel);
    sourceRow.classList.add(ENHANCED_CLASS);
    setExpanded(sourceRow, button, panel, false);
  }

  function normalizeContext(context) {
    if (!context) {
      return document;
    }

    if (context.jquery && context[0]) {
      return context[0];
    }

    if (context.querySelectorAll) {
      return context;
    }

    return document;
  }

  function init(context) {
    var root = normalizeContext(context);
    var rows = root.querySelectorAll(DATA_SELECTOR);

    Array.prototype.forEach.call(rows, enhanceSourceRow);
  }

  function ready(callback) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', callback);
    } else {
      callback();
    }
  }

  ready(function () {
    init(document);

    if (window.mw && mw.hook) {
      mw.hook('wikipage.content').add(init);
    }
  });
}());