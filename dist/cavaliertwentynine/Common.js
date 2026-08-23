/**
 * IP RELEASE CALENDAR — Fandom embed script
 * ------------------------------------------------------------
 * Paste this into MediaWiki:Common.js (site-wide JS, requires
 * admin/staff rights to edit). It runs on every page load, but only
 * does anything if it finds a <div class="ip-calendar-embed"></div>
 * on the page — so it's safe to leave in Common.js permanently.
 *
 * Uses JSONP (a <script> tag, not fetch/XHR) specifically so it does
 * NOT require CORS. The one dependency: Fandom's platform CSP needs
 * script.google.com allowed under script-src for the tag to load.
 *
 * Place the embed div on whatever page you want the calendar on:
 *   <div class="ip-calendar-embed"></div>
 */
(function () {
  'use strict';

  // <-- replace with your Apps Script Web App /exec URL
  var EXEC_URL = 'https://script.google.com/macros/s/AKfycbwqFL2b2e0SrfMbjOEebpiOl-Emm4W_c_23c9EYxGIF-hTNQYfeEe4--FVHoL4kCyof2g/exec';

  function loadCalendar(container, offset) {
    offset = offset || 0;
    // Shown immediately, before the fetch even starts — previously this
    // step (when it was a separate week-list fetch) showed nothing at
    // all, which is why the calendar looked broken rather than just slow.
    container.innerHTML = '<div class="ipcal-loading"><span class="ipcal-spinner"></span>Loading release calendar&hellip;</div>';

    var cbName = '__ipcalCallback_' + Date.now() + '_' + Math.floor(Math.random() * 10000);
    var script = document.createElement('script');

    window[cbName] = function (payload) {
      if (payload && payload.error) {
        container.innerHTML = '<div class="ipcal-error">' +
          escapeHtml(payload.message || 'Something went wrong loading the calendar.') + '</div>';
        cleanup();
        return;
      }
      container.__ipcalAvailableWeeks = payload.availableWeeks || [];
      renderWeeks(container, payload.weeks, offset);
      cleanup();
    };

    function cleanup() {
      delete window[cbName];
      if (script.parentNode) script.parentNode.removeChild(script);
    }

    script.onerror = function () {
      container.innerHTML = '<div class="ipcal-error">Could not load the release calendar. ' +
        'If this persists, check that script.google.com is allowed by this wiki\'s CSP.</div>';
      cleanup();
    };

    // One request returns both the calendar data AND the available-weeks
    // list together — this used to be two separate sequential fetches,
    // which doubled every navigation's round-trip time.
    script.src = EXEC_URL + '?format=jsonp&offset=' + encodeURIComponent(offset) +
      '&callback=' + encodeURIComponent(cbName);
    document.body.appendChild(script);
  }

  function renderWeeks(container, weeks, offset) {
    container.__ipcalWeeksData = weeks; // let the modal look up full records without re-fetching

    var navHtml = '<div class="ipcal-nav">' +
      '<a href="#" class="ipcal-nav-link" data-offset="' + (offset - 1) + '">&larr; earlier</a>' +
      '<span class="ipcal-label">Fandom<br>Premiere Release Tracker</span>' +
      '<a href="#" class="ipcal-nav-link" data-offset="' + (offset + 1) + '">later &rarr;</a>' +
      '</div>';

    var html = navHtml;
    var availableWeeks = container.__ipcalAvailableWeeks || [];
    var dropdownOptions = availableWeeks.map(function (wk) {
      var selected = wk.offset === offset ? ' selected' : '';
      var suffix = wk.relativeLabel ? ' (' + escapeHtml(wk.relativeLabel) + ')' : '';
      return '<option value="' + wk.offset + '"' + selected + '>' +
        escapeHtml(wk.weekStart) + ' \u2013 ' + escapeHtml(wk.weekEnd) + suffix + '</option>';
    }).join('');

    html += '<div class="ipcal-control-row">' +
      '<div class="ipcal-date-controls">' +
        '<select class="ipcal-week-jump-select" aria-label="Jump to a specific week">' + dropdownOptions + '</select>' +
        '<button class="ipcal-today-btn">Return to current week</button>' +
      '</div>' +
      '<div class="ipcal-filter-bar">' +
        '<button class="ipcal-filter-btn active" data-filter="all">All</button>' +
        '<button class="ipcal-filter-btn" data-filter="entertainment">Entertainment</button>' +
        '<button class="ipcal-filter-btn" data-filter="gaming">Gaming</button>' +
        '<button class="ipcal-filter-btn" data-filter="no-wiki">Start A Wiki</button>' +
      '</div>' +
    '</div>';

    weeks.forEach(function (w, i) {
      html += '<div class="ipcal-week' + (w.isCurrent ? ' current' : '') + '">';
      html += '<div class="ipcal-week-head"><span class="ipcal-dot"></span>' +
        '<span class="ipcal-eyebrow">' + (w.isCurrent ? 'This week' : (w.isPast ? 'Archive' : (w.isFuture ? 'Forthcoming' : ''))) + '</span>' +
        '<span class="ipcal-range">' + escapeHtml(w.weekStart) + ' &ndash; ' + escapeHtml(w.weekEnd) + '</span>' +
        '</div>';
      html += '<div class="ipcal-week-body">';

      if (!w.releases || w.releases.length === 0) {
        html += '<div class="ipcal-empty">No releases scheduled this week.</div>';
      } else {
        html += '<div class="ipcal-grid">';
        w.releases.forEach(function (r, j) {
          html += renderRelease(r, i, j);
        });
        html += '</div>';
        html += '<div class="ipcal-empty ipcal-filtered-empty" style="display:none">No releases match this filter this week.</div>';
      }
      html += '</div></div>';
    });

    html += navHtml;
    container.innerHTML = html;

    var links = container.querySelectorAll('.ipcal-nav-link');
    for (var i = 0; i < links.length; i++) {
      links[i].addEventListener('click', function (e) {
        e.preventDefault();
        loadCalendar(container, parseInt(e.currentTarget.getAttribute('data-offset'), 10));
      });
    }

    // Click-vs-link handling: if the click originated inside an <a> (View
    // Wiki / Adopt / Start A Wiki / the title link), let that link behave
    // normally and do NOT open the modal. Only a click landing on the tile
    // itself (not a link within it) opens the modal.
    var grids = container.querySelectorAll('.ipcal-grid');
    for (var g = 0; g < grids.length; g++) {
      grids[g].addEventListener('click', function (e) {
        if (e.target.closest('a')) return;
        var card = e.target.closest('.ipcal-release');
        if (card) openModalFromCard_(container, card);
      });
      grids[g].addEventListener('keydown', function (e) {
        if (e.key !== 'Enter' && e.key !== ' ') return;
        if (e.target.closest('a')) return;
        var card = e.target.closest('.ipcal-release');
        if (card) { e.preventDefault(); openModalFromCard_(container, card); }
      });
    }

    // ---- Category filter ----
    var filterBtns = container.querySelectorAll('.ipcal-filter-btn');
    for (var f = 0; f < filterBtns.length; f++) {
      filterBtns[f].addEventListener('click', function (e) {
        applyFilter_(container, e.currentTarget.getAttribute('data-filter'));
      });
    }

    // ---- Jump to a specific week ----
    var weekJumpSelect = container.querySelector('.ipcal-week-jump-select');
    if (weekJumpSelect) {
      // Explicit, authoritative: guarantees the closed dropdown preview
      // shows the right week regardless of how reliably the "selected"
      // attribute survives being parsed from an innerHTML-assigned
      // string, rather than parsed natively on page load.
      weekJumpSelect.value = String(offset);
      weekJumpSelect.addEventListener('change', function () {
        loadCalendar(container, parseInt(weekJumpSelect.value, 10));
      });
    }
    var todayBtn = container.querySelector('.ipcal-today-btn');
    if (todayBtn) {
      todayBtn.addEventListener('click', function () {
        loadCalendar(container, 0);
      });
    }
  }

  function applyFilter_(container, category) {
    var cards = container.querySelectorAll('.ipcal-release');
    for (var i = 0; i < cards.length; i++) {
      var show;
      if (category === 'all') {
        show = true;
      } else if (category === 'no-wiki') {
        show = cards[i].getAttribute('data-has-wiki') === 'false';
      } else {
        show = cards[i].getAttribute('data-category') === category;
      }
      cards[i].style.display = show ? '' : 'none';
    }

    // Recompute, per week, whether anything is still visible. A week with
    // genuinely zero releases at all already shows the server-side (well,
    // render-time) ".ipcal-empty" message and has no ".ipcal-grid" here —
    // this only concerns weeks that DO have releases, some or all of
    // which the current filter might be hiding.
    var bodies = container.querySelectorAll('.ipcal-week-body');
    for (var b = 0; b < bodies.length; b++) {
      var grid = bodies[b].querySelector('.ipcal-grid');
      if (!grid) continue;
      var tiles = grid.querySelectorAll('.ipcal-release');
      var anyVisible = false;
      for (var t = 0; t < tiles.length; t++) {
        if (tiles[t].style.display !== 'none') { anyVisible = true; break; }
      }
      grid.style.display = anyVisible ? 'flex' : 'none';
      var filteredEmpty = bodies[b].querySelector('.ipcal-filtered-empty');
      if (filteredEmpty) filteredEmpty.style.display = anyVisible ? 'none' : 'block';
    }

    var allBtns = container.querySelectorAll('.ipcal-filter-btn');
    for (var k = 0; k < allBtns.length; k++) {
      var isActive = allBtns[k].getAttribute('data-filter') === category;
      allBtns[k].classList.toggle('active', isActive);
    }
  }

  function openModalFromCard_(container, card) {
    var id = card.getAttribute('data-id'); // "w{weekIndex}-r{releaseIndex}"
    var match = id.match(/^w(\d+)-r(\d+)$/);
    if (!match) return;
    var weeks = container.__ipcalWeeksData;
    var release = weeks && weeks[+match[1]] && weeks[+match[1]].releases[+match[2]];
    if (release) openModal(release);
  }

  function renderRelease(r, wIndex, rIndex) {
    var wiki = r.wiki || {};
    var bg = wiki.imageUrl
      ? '<img class="ipcal-bg" src="' + escapeAttr(wiki.imageUrl) + '" alt="">'
      : '<div class="ipcal-placeholder-bg">' + escapeHtml((r.ipName || '?').charAt(0)) + '</div>';

    var nameHtml = wiki.exists
      ? '<a class="ipcal-name" href="' + escapeAttr(wiki.url) + '" target="_blank" rel="noopener">' +
        escapeHtml(r.ipName) + '</a>'
      : '<span class="ipcal-name">' + escapeHtml(r.ipName) + '</span>';

    var actions = '';
    if (wiki.exists) {
      actions += '<a class="ipcal-btn ipcal-btn-wiki" href="' + escapeAttr(wiki.url) +
        '" target="_blank" rel="noopener">View Wiki</a>';
      if (wiki.adoptable) {
        actions += '<a class="ipcal-btn ipcal-btn-adopt" href="https://community.fandom.com/wiki/Adoption:Requests" ' +
          'target="_blank" rel="noopener">Adopt</a>';
      }
    } else {
      actions += '<a class="ipcal-btn ipcal-btn-start" href="https://createnewwiki.fandom.com/wiki/Special:CreateNewWiki" ' +
        'target="_blank" rel="noopener">Start A Wiki</a>';
    }

    var details = [];
    if (r.studio) details.push(escapeHtml(r.studio));
    if (r.season) details.push('Season ' + escapeHtml(String(r.season)));
    if (r.platform) details.push(escapeHtml(r.platform));
    if (r.developer) details.push(escapeHtml(r.developer));
    if (r.publisher) details.push(escapeHtml(r.publisher));
    if (r.releaseFormat) details.push(escapeHtml(r.releaseFormat));

    return '<div class="ipcal-release"' +
      ' data-id="w' + wIndex + '-r' + rIndex + '" data-category="' + escapeAttr(r.category) + '"' +
      ' data-has-wiki="' + (wiki.exists ? 'true' : 'false') + '"' +
      ' tabindex="0" role="button"' +
      ' aria-label="View details for ' + escapeAttr(r.ipName) + '">' +
      bg +
      '<div class="ipcal-top-overlay">' +
        '<span class="ipcal-date">' + formatDate(r.date) + '</span>' +
        (r.status ? '<span class="ipcal-type">' + escapeHtml(r.status) + '</span>' : '') +
      '</div>' +
      '<div class="ipcal-bottom-overlay">' +
        nameHtml +
        (details.length ? '<div class="ipcal-platform">' + details.join(' &middot; ') + '</div>' : '') +
        '<div class="ipcal-actions">' + actions + '</div>' +
      '</div>' +
    '</div>';
  }

  function formatDate(isoString) {
    var d = new Date(isoString);
    if (isNaN(d.getTime())) return '';
    return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  }

  function formatDateLong(isoString) {
    var d = new Date(isoString);
    if (isNaN(d.getTime())) return '';
    return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
  }

  var modalEl = null;

  function ensureModal() {
    if (modalEl) return modalEl;
    modalEl = document.createElement('div');
    modalEl.className = 'ipcal-modal-overlay';
    modalEl.innerHTML =
      '<div class="ipcal-modal-box">' +
        '<button class="ipcal-modal-close" aria-label="Close">&times;</button>' +
        '<div class="ipcal-modal-image-wrap"></div>' +
        '<div class="ipcal-modal-body">' +
          '<div class="ipcal-modal-top-row">' +
            '<div class="ipcal-modal-title-wrap"></div>' +
            '<span class="ipcal-modal-date"></span>' +
          '</div>' +
          '<span class="ipcal-modal-type"></span>' +
          '<div class="ipcal-modal-meta"></div>' +
          '<div class="ipcal-modal-desc"></div>' +
          '<div class="ipcal-modal-actions"></div>' +
        '</div>' +
      '</div>';
    document.body.appendChild(modalEl);

    modalEl.querySelector('.ipcal-modal-close').addEventListener('click', closeModal);
    modalEl.addEventListener('click', function (e) {
      if (e.target === modalEl) closeModal();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeModal();
    });
    return modalEl;
  }

  function openModal(r) {
    var m = ensureModal();
    var wiki = r.wiki || {};

    m.querySelector('.ipcal-modal-image-wrap').innerHTML = wiki.imageUrl
      ? '<img class="ipcal-modal-image" src="' + escapeAttr(wiki.imageUrl) + '" alt="">'
      : '<div class="ipcal-modal-placeholder">' + escapeHtml((r.ipName || '?').charAt(0)) + '</div>';

    m.querySelector('.ipcal-modal-title-wrap').innerHTML = wiki.exists
      ? '<a class="ipcal-modal-title" href="' + escapeAttr(wiki.url) + '" target="_blank" rel="noopener">' +
        escapeHtml(r.ipName) + '</a>'
      : '<span class="ipcal-modal-title">' + escapeHtml(r.ipName) + '</span>';

    m.querySelector('.ipcal-modal-date').textContent = formatDateLong(r.date);

    var typeEl = m.querySelector('.ipcal-modal-type');
    if (r.status) { typeEl.textContent = r.status; typeEl.style.display = 'inline-block'; }
    else { typeEl.style.display = 'none'; }

    var metaParts = [];
    if (r.studio) metaParts.push(r.studio);
    if (r.season) metaParts.push('Season ' + r.season);
    if (r.platform) metaParts.push(r.platform);
    if (r.developer) metaParts.push(r.developer);
    if (r.publisher) metaParts.push(r.publisher);
    if (r.releaseFormat) metaParts.push(r.releaseFormat);
    if (r.genre) metaParts.push(r.genre);
    m.querySelector('.ipcal-modal-meta').textContent = metaParts.join(' \u00b7 ');

    var descEl = m.querySelector('.ipcal-modal-desc');
    if (wiki.description) { descEl.textContent = wiki.description; descEl.style.display = 'block'; }
    else { descEl.style.display = 'none'; }

    var actionsHtml = '';
    if (wiki.exists) {
      actionsHtml += '<a class="ipcal-btn ipcal-btn-wiki" href="' + escapeAttr(wiki.url) +
        '" target="_blank" rel="noopener">View Wiki</a>';
      if (wiki.adoptable) {
        actionsHtml += '<a class="ipcal-btn ipcal-btn-adopt" href="https://community.fandom.com/wiki/Adoption:Requests" ' +
          'target="_blank" rel="noopener">Adopt The Wiki</a>';
      }
    } else {
      actionsHtml += '<a class="ipcal-btn ipcal-btn-start" href="https://createnewwiki.fandom.com/wiki/Special:CreateNewWiki" ' +
        'target="_blank" rel="noopener">Start A Wiki</a>';
    }
    m.querySelector('.ipcal-modal-actions').innerHTML = actionsHtml;

    m.classList.add('ipcal-modal-open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (modalEl) modalEl.classList.remove('ipcal-modal-open');
    document.body.style.overflow = '';
  }

  function escapeHtml(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function escapeAttr(s) { return escapeHtml(s); }

  function init() {
    var containers = document.querySelectorAll('.ip-calendar-embed');
    for (var i = 0; i < containers.length; i++) {
      loadCalendar(containers[i], 0);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();