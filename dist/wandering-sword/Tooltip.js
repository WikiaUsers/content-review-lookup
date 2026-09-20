mw.loader.using(['mediawiki.util', 'mediawiki.api']).then(function () {
  'use strict';

  var MOVESET_PAGE = 'Unarchived';

  var panel = document.createElement('div');
  panel.className = 'pk-ms-panel';
  panel.setAttribute('aria-hidden', 'true');
  document.body.appendChild(panel);

  var cache = {};

  function skillsFromTable(table) {
    var skills = [];
    table.querySelectorAll('th, td').forEach(function (cell) {
      var img = cell.querySelector('img');
      if (!img) return;

      var src =
        img.getAttribute('data-src') ||
        img.getAttribute('data-lazy-src') ||
        (img.dataset && (img.dataset.src || img.dataset.lazySrc)) ||
        img.getAttribute('src') ||
        img.src ||
        '';

      if (src.indexOf('data:') === 0) {
        src = img.getAttribute('data-src') || img.getAttribute('data-lazy-src') || '';
      }

      var nameEl = cell.querySelector('.pk-ms-name');
      var name = nameEl
        ? nameEl.textContent.trim()
        : (cell.textContent || '').replace(/\s+/g, ' ').trim();

      skills.push({ src: src, name: name });
    });
    return skills;
  }

  function indexRoot(root) {
    if (!root || !root.querySelectorAll) return;
    root.querySelectorAll('.pk-ms-source[data-ms-id]').forEach(function (table) {
      var id = table.getAttribute('data-ms-id');
      if (!id) return;
      cache[id] = skillsFromTable(table);
    });
  }

  // Same-page sources (if any)
  indexRoot(document);

  // Remote data page
  new mw.Api().get({
    action: 'parse',
    page: MOVESET_PAGE,
    prop: 'text',
    disablelimitreport: true
  }).done(function (data) {
    var html = data && data.parse && data.parse.text && data.parse.text['*'];
    if (!html) {
      console.warn('[pk-ms] empty parse for', MOVESET_PAGE);
      return;
    }
    var wrap = document.createElement('div');
    wrap.innerHTML = html;
    indexRoot(wrap);
    console.log('[pk-ms] loaded from', MOVESET_PAGE, 'ids:', Object.keys(cache));
  }).fail(function (err) {
    console.warn('[pk-ms] failed to load', MOVESET_PAGE, err);
  });

  function fillPanel(skills) {
    panel.innerHTML = '';
    skills.forEach(function (s) {
      var slot = document.createElement('div');
      slot.className = 'pk-ms-skill';

      if (s.src) {
        var img = document.createElement('img');
        img.src = s.src;
        img.alt = s.name || '';
        slot.appendChild(img);
      }

      var label = document.createElement('span');
      label.className = 'pk-ms-skill-name';
      label.textContent = s.name || '';
      slot.appendChild(label);

      panel.appendChild(slot);
    });
  }

  function placePanel(tip) {
    var r = tip.getBoundingClientRect();
    panel.style.top = (window.scrollY + r.bottom + 8) + 'px';
    panel.style.left = (window.scrollX + r.left) + 'px';

    requestAnimationFrame(function () {
      var pr = panel.getBoundingClientRect();
      if (pr.right > window.innerWidth - 8) {
        panel.style.left = Math.max(8, window.scrollX + window.innerWidth - pr.width - 8) + 'px';
      }
    });
  }

  function show(tip) {
    var id = tip.getAttribute('data-ms-id');
    if (!id) return;

    var skills = cache[id];
    if (!skills || !skills.length) {
      console.warn('[pk-ms] no skills for', id, 'cache keys:', Object.keys(cache));
      return;
    }

    fillPanel(skills);
    placePanel(tip);
    panel.classList.add('is-open');
    panel.setAttribute('aria-hidden', 'false');
  }

  function hide() {
    panel.classList.remove('is-open');
    panel.setAttribute('aria-hidden', 'true');
  }

  document.addEventListener('mouseover', function (e) {
    var tip = e.target.closest && e.target.closest('.pk-ms-tip');
    if (tip) show(tip);
  });

  document.addEventListener('mouseout', function (e) {
    var tip = e.target.closest && e.target.closest('.pk-ms-tip');
    if (!tip) return;
    var to = e.relatedTarget;
    if (to && tip.contains(to)) return;
    hide();
  });

  console.log('[pk-ms] ready');
});