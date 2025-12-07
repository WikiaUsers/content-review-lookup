// Auto-fill current month and year for the Calendar module
document.addEventListener("DOMContentLoaded", function() {
    // Find all elements that use the Calendar template
    document.querySelectorAll('[data-mw*="Calendar|main"]').forEach(function(el) {
        const today = new Date();
        const month = today.getMonth() + 1; // JS months are 0–11
        const year = today.getFullYear();

        // Get the original wikitext
        let text = el.textContent;

        // Replace month/year parameters if they exist, otherwise add them
        if (text.includes("month=")) {
            text = text.replace(/month=\{\{\{month\|.*?\}\}\}/, `month=${month}`);
        } else {
            text = text.replace("Calendar|main", `Calendar|main|month=${month}`);
        }

        if (text.includes("year=")) {
            text = text.replace(/year=\{\{\{year\|.*?\}\}\}/, `year=${year}`);
        } else {
            text = text.replace("month=" + month, `month=${month}|year=${year}`);
        }

        // Replace the element’s contents with the updated template
        el.textContent = text;
    });
});

/* Character Stats Radar - creates SVG polygons from simple data attributes.
   Place a container: <div class="stats-radar" data-vocals="3" ...></div>
   JS will generate the SVG, path, and labels. Works with Ajax page changes. */

( function ( mw, window, document ) {
  'use strict';

  // helper: create an SVG element in the SVG namespace
  function svgEl(name, attrs) {
    const el = document.createElementNS('http://www.w3.org/2000/svg', name);
    if (attrs) Object.keys(attrs).forEach(k => el.setAttribute(k, attrs[k]));
    return el;
  }

  // Build a single radar chart inside the given container
  function buildRadar(container) {
    // avoid double-build
    if (container.dataset.radarBuilt === '1') return;
    container.dataset.radarBuilt = '1';

    const max = 5;
    // read values (coerce to numbers and clamp 0..max)
const vals = [
  Number(container.dataset.mental || 0),
  Number(container.dataset.vocals || 0),
  Number(container.dataset.potential || 0),
  Number(container.dataset.intelligence || 0),
  Number(container.dataset.athletics || 0),
  Number(container.dataset.social || 0)
].map(v => Math.min(max, Math.max(0, Number.isFinite(v) ? v : 0)));

    // create svg area
    const wrapper = document.createElement('div');
    wrapper.className = 'radar-canvas';
    const svg = svgEl('svg', { viewBox: '0 0 200 200', preserveAspectRatio: 'xMidYMid meet', 'aria-hidden': 'true' });

    // optional: create a subtle outer pent/hex grid (6 levels)
    const grid = svgEl('g', { class: 'radar-grid' });
    const centerX = 100, centerY = 100;
    const levels = 5;
    const outer = 85; // px radius for max
    const axes = vals.length;
    for (let L = levels; L >= 1; L--) {
      const r = outer * (L / levels);
      // polygon points for this level
      let pts = [];
      for (let i = 0; i < axes; i++) {
        const angle = (Math.PI * 2 / axes) * i - Math.PI/2;
        const x = centerX + Math.cos(angle) * r;
        const y = centerY + Math.sin(angle) * r;
        pts.push(`${x},${y}`);
      }
      const poly = svgEl('polygon', {
        points: pts.join(' '),
        fill: L % 2 === 0 ? 'rgba(255,255,255,0.018)' : 'rgba(0,0,0,0.012)',
        class: 'radar-outline'
      });
      grid.appendChild(poly);
    }
    svg.appendChild(grid);

    // create the fill polygon (programmatically so it's not in template HTML)
    const poly = svgEl('polygon', { class: 'radar-fill' });
    svg.appendChild(poly);

    // optionally add small nodes at points
    const nodesGroup = svgEl('g', { class: 'radar-nodes' });
    svg.appendChild(nodesGroup);

    wrapper.appendChild(svg);
    // add labels overlay
const labels = document.createElement('div');
labels.className = 'radar-labels';
labels.innerHTML = ''
  + '<span class="label label-mental">Mental</span>'
  + '<span class="label label-vocals">Vocals</span>'
  + '<span class="label label-potential">Potential</span>'
  + '<span class="label label-intelligence">Intelligence</span>'
  + '<span class="label label-athletics">Athletics</span>'
  + '<span class="label label-social">Social</span>';

    container.appendChild(wrapper);
    container.appendChild(labels);

    // compute polygon points for the values
    function setShape() {
      const pts = vals.map((val, i) => {
        const angle = (Math.PI * 2 / vals.length) * i - Math.PI/2;
        const radius = outer * (val / max);
        const x = (centerX + Math.cos(angle) * radius).toFixed(4);
        const y = (centerY + Math.sin(angle) * radius).toFixed(4);
        return `${x},${y}`;
      }).join(' ');
      poly.setAttribute('points', pts);

      // create/position nodes
      while (nodesGroup.firstChild) nodesGroup.removeChild(nodesGroup.firstChild);
      vals.forEach((val, i) => {
        const angle = (Math.PI * 2 / vals.length) * i - Math.PI/2;
        const radius = outer * (val / max);
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        const c = svgEl('circle', { cx: x, cy: y, r: 3, class: 'radar-node' });
        nodesGroup.appendChild(c);
      });
    }

    setShape();

    // store reference so we can update later if needed
    container._radar = { svg, poly, setShape };
  }

  // find all containers and build them
  function buildAll() {
    const charts = document.querySelectorAll('.stats-radar');
    charts.forEach(buildRadar);
  }

  // on DOM ready and on mw ajax content replaced
  function onReady() {
    buildAll();
  }

  if ( document.readyState === 'complete' || document.readyState === 'interactive' ) {
    setTimeout(onReady, 10);
  } else {
    document.addEventListener('DOMContentLoaded', onReady);
  }

  // If MediaWiki hooks exist, listen for content replacement
  if (mw && mw.hook) {
    mw.hook('wikipage.content').add(buildAll);
  }

  // expose a small API for updating values via JS if desired
  window.FandomRadar = {
    rebuild: buildAll,
    updateContainer: function(container, data) {
      // accept an element or selector and values object
      const el = (typeof container === 'string') ? document.querySelector(container) : container;
      if (!el || !el._radar) return;
      ['vocals','stamina','talent','mental','star','visuals'].forEach(k => {
        if (k in data) el.dataset[k] = data[k];
      });
      // refresh internal cached vals by forcing rebuild (simple approach)
      // easiest is to remove built marker and rebuild
      el.dataset.radarBuilt = '';
      buildRadar(el);
    }
  };

} )( mw, window, document );

/* ==========================================
   Auto-load pages tagged under Category:Tales
   And detect: Canon / Non-canon tags
   ========================================== */

mw.loader.using('mediawiki.api').then(function () {
    var api = new mw.Api();

    function loadFanfics() {
        var container = document.getElementById("fanfics-container");
        if (!container) return;

        api.get({
            action: "query",
            list: "categorymembers",
            cmtitle: "Category:Tales",
            cmlimit: "500",
            format: "json"
        }).done(function (data) {
            container.innerHTML = "";
            var pages = data.query.categorymembers;

            if (!pages.length) {
                container.innerHTML = "<div>No fanfics found in Category:Tales.</div>";
                return;
            }

            // For each page, fetch categories
            pages.forEach(function (page) {
                api.get({
                    action: "query",
                    prop: "categories",
                    titles: page.title,
                    cllimit: "max",
                    format: "json"
                }).done(function (catData) {

                    var pageId = Object.keys(catData.query.pages)[0];
                    var categories = catData.query.pages[pageId].categories || [];

                    // Detect canon vs noncanon
                    var tagType = null;

                    categories.forEach(function (c) {
                        var name = c.title.replace("Category:", "").toLowerCase();
                        if (name === "canon") tagType = "canon";
                        if (name === "non-canon" || name === "noncanon") tagType = "noncanon";
                    });

                    // Build entry
                    var div = document.createElement("div");
                    div.className = "fanfics-entry";

                    var link = document.createElement("a");
                    link.href = mw.util.getUrl(page.title);
                    link.textContent = page.title;

                    div.appendChild(link);

                    // Add tag if detected
                    if (tagType) {
                        var tag = document.createElement("span");
                        tag.className = "fanfics-tag " + tagType;
                        tag.textContent = tagType === "canon" ? "Canon" : "Non-canon";
                        div.appendChild(tag);
                    }

                    container.appendChild(div);
                });
            });
        });
    }

    loadFanfics();
});

// Planet status colorizer
$(function () {
    $('.planet-box, .planet-holo, .galaxy-card').each(function () {
        const status = ($(this).data('status') || "").toLowerCase();

        if (status.includes("uncolonized") && status.includes("uninhabitable")) {
            $(this).addClass('planet-danger');
            $(this).addClass('danger-holo');
            $(this).addClass('galaxy-alert');
        }
    });
});

/* === User Edit-Badges (put in MediaWiki:Common.js) ===
   Adds 1 badge per 1000 edits up to 10 (10000+)
   Caches results in localStorage for 15 minutes.
*/

( function () {
  // only run on profile pages
  if ( typeof mw === 'undefined' || typeof jQuery === 'undefined' ) return;
  mw.loader.using( ['mediawiki.api', 'mediawiki.util'], function () {
    $(function () {
      try {
        var api = new mw.Api();

        // helpful function to get the username of the profile being viewed
        function getProfileUsername() {
          // Try wgRelevantUserName (common in Fandom)
          var uname = mw.config.get('wgRelevantUserName');
          if ( uname ) return uname;
          // Fallback: if on User:Page form
          var title = mw.config.get('wgPageName') || mw.config.get('wgTitle') || '';
          if ( title.indexOf('User:') === 0 ) {
            return title.replace(/^User:/i, '').replace(/_/g, ' ');
          }
          // Last resort: try to parse from URL
          var m = location.pathname.match(/\/wiki\/User:(.+)/);
          if ( m && m[1] ) return decodeURIComponent(m[1]).replace(/_/g,' ');
          return null;
        }

        var username = getProfileUsername();
        if (!username) return; // not a user profile or cannot detect

        // Local cache key
        var cacheKey = 'editbadges:' + username;
        var cacheTTL = 15 * 60 * 1000; // 15 minutes

        function readCache() {
          try {
            var raw = localStorage.getItem(cacheKey);
            if (!raw) return null;
            var data = JSON.parse(raw);
            if (!data || !data.ts) return null;
            if ((Date.now() - data.ts) > cacheTTL) {
              localStorage.removeItem(cacheKey);
              return null;
            }
            return data;
          } catch (e) { return null; }
        }
        function writeCache(editcount) {
          try {
            var data = { ts: Date.now(), editcount: editcount };
            localStorage.setItem(cacheKey, JSON.stringify(data));
          } catch (e) { /* ignore */ }
        }

        function createBadgeElement(level, editcount) {
          var $b = $('<div>', {
            'class': 'user-edit-badge tier-' + level,
            'tabindex': 0,
            'role': 'img',
            'aria-label': 'Edit badge level ' + level,
            'title': level + ' badge — ' + (level*1000) + '+ edits'
          });

          // Number inside badge (e.g., "1k", or medal number)
          var numText = (level === 10) ? '10k' : (level + 'k');
          $b.text(numText);

          // Optional small label for tiny screens
          var label = $('<div/>', { 'class': 'badge-label', text: rankName(level) });
          $b.append(label);

          return $b;
        }

        // Map tier to friendly rank/title (customize as you like)
        function rankName(n) {
          var ranks = {
            1: 'Rookie',
            2: 'Contributor',
            3: 'Editor',
            4: 'Keeper',
            5: 'Veteran',
            6: 'Sage',
            7: 'Master',
            8: 'Legend',
            9: 'Icon',
            10: 'Mythic'
          };
          return ranks[n] || ('Tier ' + n);
        }

        function placeBadgesInHeader($badges) {
          // Preferred container: .user-identity-header__badges (if extension exists)
          var $header = $('.user-identity-header');
          if ( !$header.length ) {
            // fallback: top of .user-identity-box
            $header = $('.user-identity-box').first();
          }
          if ( !$header.length ) return;

          var $container = $header.find('.user-edit-badges');
          if ( !$container.length ) {
            // put after header actions if present, otherwise append to header
            var $actions = $header.find('.user-identity-header__actions').first();
            $container = $('<div>', { 'class': 'user-edit-badges', 'aria-live': 'polite' });
            if ( $actions.length ) {
              $actions.after($container);
            } else {
              $header.append($container);
            }
          } else {
            $container.empty();
          }

          $container.append($badges);
        }

        function updateBadges(editcount) {
          // compute badges: 1 per 1000 edits, up to 10
          var badges = Math.min(10, Math.floor(editcount / 1000));
          if (badges < 1) return; // no badges to show
          var $frag = $();
          for (var i = 1; i <= badges; i++) {
            $frag = $frag.add(createBadgeElement(i, editcount));
          }
          placeBadgesInHeader($frag);
        }

        // Main flow
        var cached = readCache();
        if (cached && typeof cached.editcount === 'number') {
          updateBadges(cached.editcount);
        } else {
          // Query API for user's editcount
          api.get({
            action: 'query',
            list: 'users',
            ususers: username,
            usprop: 'editcount',
            format: 'json'
          }).done(function (data) {
            try {
              var u = data && data.query && data.query.users && data.query.users[0];
              var edits = (u && u.editcount) ? Number(u.editcount) : 0;
              writeCache(edits);
              updateBadges(edits);
            } catch (e) { /* silent fail */ }
          }).fail(function () {
            // API failed — do nothing
            return;
          });
        }

      } catch (e) {
        // fail softly
        console.error('Edit-badges error', e);
      }
    });
  });
})();