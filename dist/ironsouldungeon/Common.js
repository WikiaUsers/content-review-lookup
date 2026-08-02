/* Iron Soul: Dungeon — Item List filtering + modal */
// Please tell us the line if theres any problem thank you!
/* ── Load Playfair Display font ── */
(function () {
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&display=swap';
    document.head.appendChild(link);
})();

(function () {
    function initItemList() {
        var grids = document.querySelectorAll('.isd-item-grid');
        if (!grids.length) return;

        function safeImageSrc(url) {
            return (typeof url === 'string' && url.indexOf('https://static.wikia.nocookie.net/') === 0)
                ? url
                : '';
        }

        // Falls back to the thumbnail already shown in the grid if a card
        // never had a separate data-image URL set.
        function resolveImageSrc(card, d) {
            var direct = safeImageSrc(d.image);
            if (direct) return direct;
            var thumb = card.querySelector('.isd-grid-img img, .isd-item-card img');
            return thumb ? safeImageSrc(thumb.src) : '';
        }

        // Sets an image on a modal/tooltip img element, with a graceful
        // dark-themed fallback (instead of a broken-image icon) when there's
        // no valid src yet, or the src 404s (placeholder URLs, unset art, etc).
        function setCardImage(wrapEl, imgEl, src) {
            imgEl.onerror = null;
            if (!src) {
                wrapEl.classList.add('isd-no-image');
                imgEl.removeAttribute('src');
                return;
            }
            wrapEl.classList.remove('isd-no-image');
            imgEl.onerror = function () {
                wrapEl.classList.add('isd-no-image');
            };
            imgEl.src = src;
        }

        function setObtainmentField(el, price, source) {
            el.textContent = '';
            if (price) {
                var priceSpan = document.createElement('span');
                priceSpan.className = 'isd-price';
                priceSpan.textContent = price;
                el.appendChild(priceSpan);
                if (source) {
                    el.appendChild(document.createTextNode(' from '));
                    var sourceSpan = document.createElement('span');
                    sourceSpan.className = 'isd-source';
                    sourceSpan.textContent = source;
                    el.appendChild(sourceSpan);
                }
            } else {
                el.textContent = source || '—';
            }
        }

        // ── Build one shared modal ──
        var overlay = document.createElement('div');
        overlay.className = 'isd-item-modal-overlay';
        overlay.innerHTML =
            '<div class="isd-item-modal">' +
                '<div class="isd-item-modal-header">' +
                    '<span class="isd-item-modal-title"></span>' +
                    '<span class="isd-item-modal-close">&times;</span>' +
                '</div>' +
                '<div class="isd-item-modal-img-wrap">' +
                    '<img class="isd-item-modal-img" src="" alt="">' +
                    '<div class="isd-item-modal-img-fallback">No image yet</div>' +
                '</div>' +
                '<div class="isd-item-modal-section">' +
                    '<div class="isd-item-modal-value isd-item-modal-rarity"></div>' +
                '</div>' +
                '<div class="isd-item-modal-section isd-m-description-section">' +
                    '<div class="isd-item-modal-value isd-m-description"></div>' +
                '</div>' +
                '<div class="isd-item-modal-section isd-m-stats-section">' +
                    '<div class="isd-item-modal-label">Stats</div>' +
                    '<div class="isd-item-modal-value isd-m-stats"></div>' +
                '</div>' +
                '<div class="isd-item-modal-section">' +
                    '<div class="isd-item-modal-label">Obtainment</div>' +
                    '<div class="isd-item-modal-value isd-item-modal-obtainment"></div>' +
                '</div>' +
            '</div>';
        document.body.appendChild(overlay);

        function closeModal() {
            overlay.classList.remove('isd-active');
        }
        overlay.addEventListener('click', function (e) {
            if (e.target === overlay) closeModal();
        });
        overlay.querySelector('.isd-item-modal-close').addEventListener('click', closeModal);

        function openModal(card) {
            var d = card.dataset;
            overlay.querySelector('.isd-item-modal-title').textContent = d.name || '';
            setCardImage(
                overlay.querySelector('.isd-item-modal-img-wrap'),
                overlay.querySelector('.isd-item-modal-img'),
                resolveImageSrc(card, d)
            );
            overlay.querySelector('.isd-item-modal-rarity').textContent =
                (d.rarity ? d.rarity.charAt(0).toUpperCase() + d.rarity.slice(1) : '') +
                (d.category ? ' ' + d.category.charAt(0).toUpperCase() + d.category.slice(1) : '');

            var descSection = overlay.querySelector('.isd-m-description-section');
            if (d.description) {
                descSection.style.display = '';
                overlay.querySelector('.isd-m-description').textContent = d.description;
            } else {
                descSection.style.display = 'none';
            }

            var statsSection = overlay.querySelector('.isd-m-stats-section');
            if (d.stats) {
                statsSection.style.display = '';
                overlay.querySelector('.isd-m-stats').textContent = d.stats;
            } else {
                statsSection.style.display = 'none';
            }

            setObtainmentField(overlay.querySelector('.isd-item-modal-obtainment'), d.price, d.obtainment);

            overlay.classList.add('isd-active');
        }

        // ── Hover tooltip (quick preview, no click needed) ──
        var tooltip = document.createElement('div');
        tooltip.className = 'isd-item-tooltip';
        tooltip.innerHTML =
            '<div class="isd-item-tooltip-header"></div>' +
            '<div class="isd-item-tooltip-img-wrap">' +
                '<img src="" alt="">' +
                '<div class="isd-item-tooltip-img-fallback">No image yet</div>' +
            '</div>' +
            '<div class="isd-item-tooltip-section">' +
                '<div class="isd-item-tooltip-rarity"></div>' +
                '<div class="isd-item-tooltip-category"></div>' +
            '</div>' +
            '<div class="isd-item-tooltip-section isd-tt-description-section">' +
                '<div class="isd-item-tooltip-value isd-tt-description"></div>' +
            '</div>' +
            '<div class="isd-item-tooltip-section isd-tt-stats-section">' +
                '<div class="isd-item-tooltip-label">Stats</div>' +
                '<div class="isd-item-tooltip-value isd-tt-stats"></div>' +
            '</div>' +
            '<div class="isd-item-tooltip-section">' +
                '<div class="isd-item-tooltip-label">Obtainment</div>' +
                '<div class="isd-item-tooltip-value isd-tt-obtainment"></div>' +
            '</div>';
        document.body.appendChild(tooltip);

        var rarityColors = {
            common: '#9a9a9a',
            uncommon: '#4caf50',
            rare: '#3b82f6',
            epic: '#a855f7',
            legendary: '#d98c2b',
            mythical: '#ec4899'
        };

        function capitalizeWord(s) {
            return s ? s.split('-').map(function (w) {
                return w.charAt(0).toUpperCase() + w.slice(1);
            }).join(' ') : '';
        }

        function showTooltip(card) {
            var d = card.dataset;
            tooltip.querySelector('.isd-item-tooltip-header').textContent = d.name || '';
            setCardImage(
                tooltip.querySelector('.isd-item-tooltip-img-wrap'),
                tooltip.querySelector('.isd-item-tooltip-img-wrap img'),
                resolveImageSrc(card, d)
            );

            var rarityEl = tooltip.querySelector('.isd-item-tooltip-rarity');
            rarityEl.textContent = capitalizeWord(d.rarity);
            rarityEl.style.color = rarityColors[d.rarity] || '#e8ddd4';

            tooltip.querySelector('.isd-item-tooltip-category').textContent = capitalizeWord(d.category);

            var ttDescSection = tooltip.querySelector('.isd-tt-description-section');
            if (d.description) {
                ttDescSection.style.display = '';
                tooltip.querySelector('.isd-tt-description').textContent = d.description;
            } else {
                ttDescSection.style.display = 'none';
            }

            var ttStatsSection = tooltip.querySelector('.isd-tt-stats-section');
            if (d.stats) {
                ttStatsSection.style.display = '';
                tooltip.querySelector('.isd-tt-stats').textContent = d.stats;
            } else {
                ttStatsSection.style.display = 'none';
            }

            setObtainmentField(tooltip.querySelector('.isd-tt-obtainment'), d.price, d.obtainment);
            var rect = card.getBoundingClientRect();
            var tooltipWidth = 260;
            var left = rect.right + 10;
            if (left + tooltipWidth > window.innerWidth) {
                left = rect.left - tooltipWidth - 10;
            }
            if (left < 5) left = 5;

            tooltip.style.left = left + 'px';
            tooltip.style.top = rect.top + 'px';
            tooltip.classList.add('isd-active');

            // vertical clamp — measure after showing, then adjust if it overflows the viewport
            var tooltipRect = tooltip.getBoundingClientRect();
            var top = rect.top;
            if (tooltipRect.bottom > window.innerHeight) {
                top = window.innerHeight - tooltipRect.height - 10;
            }
            if (top < 5) top = 5;
            tooltip.style.top = top + 'px';
        }

        function hideTooltip() {
            tooltip.classList.remove('isd-active');
        }

        // ── For each grid: attach card clicks + build a toolbar above it ──
        grids.forEach(function (grid) {
            var cards = grid.querySelectorAll('.isd-item-card');

            cards.forEach(function (card) {
                card.addEventListener('click', function () { openModal(card); });
                card.addEventListener('mouseenter', function () { showTooltip(card); });
                card.addEventListener('mouseleave', hideTooltip);
            });

            // collect distinct categories present in this grid
            var categories = [];
            cards.forEach(function (card) {
                var c = card.dataset.category;
                if (c && categories.indexOf(c) === -1) categories.push(c);
            });

            function capitalize(s) {
                return s.split('-').map(function (word) {
                    return word.charAt(0).toUpperCase() + word.slice(1);
                }).join(' ');
            }

            var toolbar = document.createElement('div');
            toolbar.className = 'isd-item-toolbar';

            var categorySelect = null;
            if (categories.length > 1) {
                categorySelect = document.createElement('select');
                categorySelect.className = 'isd-item-filter';
                categorySelect.innerHTML = '<option value="all">All Types</option>';
                categories.forEach(function (c) {
                    var opt = document.createElement('option');
                    opt.value = c;
                    opt.textContent = capitalize(c);
                    categorySelect.appendChild(opt);
                });
                toolbar.appendChild(categorySelect);
            }

            var searchInput = document.createElement('input');
            searchInput.type = 'text';
            searchInput.className = 'isd-item-search';
            searchInput.placeholder = 'Enter name...';
            toolbar.appendChild(searchInput);

            grid.parentNode.insertBefore(toolbar, grid);

            function applyFilters() {
                var term = searchInput.value.trim().toLowerCase();
                var category = categorySelect ? categorySelect.value : 'all';

                cards.forEach(function (card) {
                    var name = (card.dataset.name || '').toLowerCase();
                    var cardCategory = card.dataset.category || '';

                    var matches =
                        (term === '' || name.indexOf(term) !== -1) &&
                        (category === 'all' || category === cardCategory);

                    card.style.display = matches ? '' : 'none';
                });
            }

            searchInput.addEventListener('input', applyFilters);
            if (categorySelect) categorySelect.addEventListener('change', applyFilters);
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initItemList);
    } else {
        initItemList();
    }
})();

/* ── Main Page sidebar float fix ── */
(function () {
    function fixSidebarPosition() {
        var content = document.querySelector('#mw-content-text .mw-parser-output');
        if (!content) return;
        var sidebar = content.querySelector('.isd-sidebar');
        if (!sidebar) return;
        if (content.firstElementChild === sidebar) return; 

        content.insertBefore(sidebar, content.firstChild);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', fixSidebarPosition);
    } else {
        fixSidebarPosition();
    }
})();

/* ── Copy Code Button (Codes page) ── */
mw.hook('wikipage.content').add(function ($content) {
    $content.on('click', '.copy-btn', function () {
        var btn = $(this);
        if (btn.hasClass('copied')) return;
        var code = btn.attr('data-code');

        function onSuccess() {
            btn.text('Copied!').addClass('copied');
            setTimeout(function () {
                btn.text('Copy').removeClass('copied');
            }, 2000);
        }

        function onFail() {
            btn.text('Failed!');
            setTimeout(function () { btn.text('Copy'); }, 2000);
        }

        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(code).then(onSuccess).catch(function () {
                fallbackCopy(code, onSuccess, onFail);
            });
        } else {
            fallbackCopy(code, onSuccess, onFail);
        }
    });

    function fallbackCopy(code, onSuccess, onFail) {
        var temp = $('<textarea>').css({
            position: 'fixed', top: 0, left: 0,
            opacity: 0, pointerEvents: 'none'
        });
        $('body').append(temp);
        temp.val(code).focus().select();
        try {
            document.execCommand('copy');
            onSuccess();
        } catch (e) {
            onFail();
        }
        temp.remove();
    }
});

/* ====== Forge Calculator module — replace the previous Forge Calculator block in Common.js with this ====== */
mw.hook('wikipage.content').add(function () {

  var appEl = document.getElementById('fc-app');
  if (!appEl || appEl.getAttribute('data-fc-init') === '1') return;
  appEl.setAttribute('data-fc-init', '1');

  var WEAPONS = {
    Sword: [
      {id:'Single_KnightSword_T1_Epiphqny', atk:6, price:65},
      {id:'Single_AshWarden_T1_Star', atk:7, price:70},
      {id:'Single_Gray_T1_LK', atk:8, price:75},
      {id:'Single_TwoEdged_T1_Shaman', atk:9, price:80},
      {id:'Single_BroadSword_T1_Lava', atk:5, price:60},
      {id:'Single_HighHeaven', atk:10, price:85},
      {id:'Single_Hell_T1', atk:12, price:110, hell:true},
      {id:'Single_HighHell_T1', atk:12.5, price:115, hell:true},
      {id:'Single_Genji_T1', atk:11, price:100},
      {id:'Single_RoseRapier_T2', atk:9, price:80},
      {id:'Single_Claw_Hell_T1', atk:14, price:125, hell:true},
      {id:'Single_SkySword_S2', atk:1, price:80, special:true}
    ],
    Heavy: [
      {id:'Heavy_Axe_T1_Odin', atk:11, price:90},
      {id:'Heavy_TwistedAxe_T1_Alchemy', atk:12, price:95},
      {id:'Heavy_Warhammer_T1_Brownie', atk:13, price:100},
      {id:'Heavy_OrcAxe_T1_Demon', atk:14, price:105},
      {id:'Heavy_Hammer_T1_Lava', atk:10, price:85},
      {id:'Heavy_WingHeaven', atk:15, price:110},
      {id:'Heavy_Hell_T1', atk:16, price:130, hell:true},
      {id:'Heavy_WingHell_T1', atk:16.5, price:140, hell:true},
      {id:'Heavy_Ironman_T1', atk:15, price:110},
      {id:'Heavy_Claw_Hell_T1', atk:17, price:150, hell:true}
    ],
    Staff: [
      {id:'Staff_Horn_T1_Devil', atk:9, price:80},
      {id:'Staff_Wing_T1_Cosmo', atk:10, price:85},
      {id:'Staff_Acient_T1_White', atk:8, price:75},
      {id:'Staff_Priest_T1', atk:11, price:95},
      {id:'Staff_Deer_T1', atk:12, price:95},
      {id:'Staff_Hell_T1', atk:12, price:105, hell:true},
      {id:'Staff_Lucifer_T1', atk:12.5, price:110, hell:true},
      {id:'Staff_Claw_Hell_T1', atk:14, price:125, hell:true},
      {id:'Staff_Dragon_T1', atk:12, price:85, special:true}
    ],
    Sickle: [
      {id:'Sickle_Ordinary_red_T1', atk:13, price:95}
    ],
    Bow: [],
    Fist: [
      {id:'Fist_Wild_T1_Ice', atk:13, price:95}
    ]
  };

  var ORES = [
    {id:'Kenki', name:'Kenki', rarity:'mythic', price:240, mult:85},
    {id:'Apocalypse', name:'Apocalypse', rarity:'mythic', price:220, mult:76},
    {id:'DarkBlossom', name:'Dark Blossom', rarity:'mythic', price:200, mult:73},
    {id:'Hellstone6', name:'Rotten Lotus', rarity:'mythic', price:140, mult:66, hell:true},
    {id:'Gwindel', name:'Gwindel', rarity:'mythic', price:124, mult:63},
    {id:'Corundum', name:'Corundum', rarity:'mythic', price:114, mult:57},
    {id:'Heatshell', name:'Heatshell', rarity:'mythic', price:96, mult:48},
    {id:'Hellstone4', name:'Witherite', rarity:'mythic', price:68, mult:34, hell:true},
    {id:'Starfall', name:'Starfall', rarity:'mythic', price:60, mult:30},
    {id:'Redsunder', name:'Redsunder', rarity:'mythic', price:54, mult:27},
    {id:'VoidcubeCrystal', name:'Fluorite', rarity:'mythic', price:24, mult:12},
    {id:'RoseTourmaline', name:'Ruby', rarity:'mythic', price:20, mult:10},
    {id:'IgneousCore', name:'Topaz', rarity:'mythic', price:14, mult:7},
    {id:'SmokyQuartz', name:'Magnetite', rarity:'mythic', price:10, mult:5},
    {id:'Blackhole', name:'BlackHole', rarity:'legendary', price:180, mult:70},
    {id:'BloodHeart', name:'Blood Heart', rarity:'legendary', price:160, mult:68},
    {id:'CoralReef', name:'Coralreef', rarity:'legendary', price:104, mult:52},
    {id:'Hellstone5', name:'Eye of Hatred', rarity:'legendary', price:92, mult:46.5, hell:true},
    {id:'Glacium', name:'Glacium', rarity:'legendary', price:50, mult:25},
    {id:'Earthmaw', name:'Earthmaw', rarity:'legendary', price:46, mult:23},
    {id:'Hellstone3', name:'Torbernite', rarity:'legendary', price:44, mult:22, hell:true},
    {id:'Voidstar', name:'Voidstar', rarity:'legendary', price:40, mult:20},
    {id:'Hellstone2', name:'Painstone', rarity:'legendary', price:26, mult:13, hell:true},
    {id:'BerylFragment', name:'Opal', rarity:'legendary', price:16, mult:8},
    {id:'AmethystCluster', name:'Moonstone', rarity:'legendary', price:12, mult:6},
    {id:'IceCrystalOre', name:'Frostine', rarity:'legendary', price:8, mult:4},
    {id:'Romanstone', name:'Romanstone', rarity:'epic', price:80, mult:42, lv:48},
    {id:'Aquamarine', name:'Aquamarine', rarity:'epic', price:72, mult:38, lv:47},
    {id:'Sunflare', name:'Sunflare', rarity:'epic', price:38, mult:19},
    {id:'Hellstone1', name:'Darkcube', rarity:'epic', price:9, mult:4.5, hell:true},
    {id:'FlameEye', name:'Flame Eye', rarity:'epic', price:120, mult:60},
    {id:'Saturn', name:'Saturn', rarity:'epic', price:110, mult:55},
    {id:'Sunstone', name:'Sunstone', rarity:'epic', price:7, mult:3.4},
    {id:'Raindrop', name:'Raindrop', rarity:'rare', price:64, mult:35, lv:45},
    {id:'Bloodshard', name:'Bloodshard', rarity:'rare', price:18, mult:9},
    {id:'RustyIron', name:'Rusty Iron', rarity:'rare', price:94, mult:47},
    {id:'Epidote', name:'Epidote', rarity:'rare', price:5, mult:2.6},
    {id:'Jade', name:'Jade', rarity:'uncommon', price:56, mult:31, lv:42},
    {id:'Hexbane', name:'Hexbane', rarity:'uncommon', price:22, mult:11},
    {id:'Verdanite', name:'Verdanite', rarity:'uncommon', price:14, mult:7},
    {id:'ObsidianChunk', name:'Azurite', rarity:'uncommon', price:4, mult:2},
    {id:'Pyrite', name:'Copper', rarity:'uncommon', price:3, mult:1.5},
    {id:'Sandstone', name:'Sand Rock', rarity:'common', price:2, mult:1.2},
    {id:'Genestone', name:'Genestone', rarity:'legendary', price:88, mult:45, lv:50},
    {id:'Rarity7Ore', name:'??? (Divine)', rarity:'divine', price:100, mult:60, hell:true}
  ];

  var RARITY_COLORS = {
    common: '#9a9a9a', uncommon: '#4caf50', rare: '#3b82f6',
    epic: '#a855f7', legendary: '#d98c2b', mythic: '#ec4899', divine: '#ffffff'
  };

  var CLASS_COLORS = {
    Sword: '#d98c2b', Heavy: '#ef4444', Staff: '#a855f7',
    Sickle: '#4caf50', Bow: '#3b82f6', Fist: '#ec4899'
  };

  var classes = ['Sword', 'Heavy', 'Staff', 'Sickle', 'Bow', 'Fist'];

  var state = {
    cls: 'Sword',
    weaponId: WEAPONS.Sword[0].id,
    stackOrder: [],
    qty: {},
    mode: 'weapon',
    oreSearch: ''
  };

  function oreById(id) {
    for (var i = 0; i < ORES.length; i++) { if (ORES[i].id === id) return ORES[i]; }
    return null;
  }
  function weaponById(id) {
    for (var c = 0; c < classes.length; c++) {
      var list = WEAPONS[classes[c]];
      for (var i = 0; i < list.length; i++) { if (list[i].id === id) return list[i]; }
    }
    return null;
  }
  function totalOreCount() {
    var total = 0;
    for (var i = 0; i < state.stackOrder.length; i++) { total += state.qty[state.stackOrder[i]]; }
    return total;
  }
  function weightedAvgMult() {
    var total = totalOreCount();
    if (!total) return 0;
    var sum = 0;
    for (var i = 0; i < state.stackOrder.length; i++) {
      var id = state.stackOrder[i];
      sum += oreById(id).mult * state.qty[id];
    }
    return sum / total;
  }
  function initials(id) {
    var clean = id.replace(/^(Single_|Heavy_|Staff_|Sickle_|Fist_)/, '').replace(/_/g, ' ');
    var parts = clean.split(' ');
    return (parts[0] ? parts[0][0] : '') + (parts[1] ? parts[1][0] : '');
  }

  appEl.innerHTML =
    '<h2 class="fc-title">Forge Calculator</h2>' +
    '<p class="fc-subtitle">v3 &middot; Weapons only &middot; Tier 1 &middot; all weapons share the same forge chance for now &middot; minimum 3 ores required</p>' +
    '<div class="fc-columns">' +

      '<div class="fc-panel">' +
        '<div class="fc-panel-head">Weapons <span class="fc-pill" id="fc-class-pill"></span></div>' +
        '<div class="fc-tabs" id="fc-tabs"></div>' +
        '<div class="fc-weapon-grid" id="fc-weapon-grid"></div>' +
      '</div>' +

      '<div class="fc-panel">' +
        '<div class="fc-panel-head">The Forge</div>' +
        '<div class="fc-forge-body">' +
          '<div class="fc-selected-weapon" id="fc-selected-weapon"></div>' +
          '<div class="fc-slots" id="fc-slots">' +
            '<div class="fc-slot" data-slot="0">Empty</div>' +
            '<div class="fc-slot" data-slot="1">Empty</div>' +
            '<div class="fc-slot" data-slot="2">Empty</div>' +
            '<div class="fc-slot" data-slot="3">Empty</div>' +
          '</div>' +
          '<div class="fc-mult-readout">Multiplier: <b id="fc-mult">0</b></div>' +
          '<div class="fc-composition" id="fc-composition"></div>' +
          '<div class="fc-actions">' +
            '<span class="fc-btn" id="fc-reset">Reset</span>' +
            '<span class="fc-btn fc-primary fc-disabled" id="fc-forge">Forge</span>' +
          '</div>' +
          '<div class="fc-hint">Requires a selected weapon and at least 3 ores total (up to 4 stacked ore types). Tap a stack to remove one.</div>' +
          '<div class="fc-result" id="fc-result"></div>' +
        '</div>' +
      '</div>' +

      '<div class="fc-panel">' +
        '<div class="fc-panel-head">Ores <span class="fc-toggle" id="fc-toggle">' +
          '<span class="fc-toggle-btn fc-active" data-mode="weapon">Weapon</span>' +
          '<span class="fc-toggle-btn" data-mode="armor">Armor</span>' +
        '</span></div>' +
        '<div class="fc-search-wrap"><input type="text" class="fc-search-input" id="fc-ore-search" placeholder="Search ore by name..."></div>' +
        '<div class="fc-ore-grid" id="fc-ore-grid"></div>' +
      '</div>' +

    '</div>';

  var tabsEl = document.getElementById('fc-tabs');
  var weaponGridEl = document.getElementById('fc-weapon-grid');
  var oreGridEl = document.getElementById('fc-ore-grid');
  var classPillEl = document.getElementById('fc-class-pill');
  var selectedWeaponEl = document.getElementById('fc-selected-weapon');
  var multEl = document.getElementById('fc-mult');
  var compositionEl = document.getElementById('fc-composition');
  var forgeBtn = document.getElementById('fc-forge');
  var resetBtn = document.getElementById('fc-reset');
  var resultEl = document.getElementById('fc-result');
  var slotEls = appEl.querySelectorAll('.fc-slot');
  var toggleEl = document.getElementById('fc-toggle');
  var searchEl = document.getElementById('fc-ore-search');

  function renderTabs() {
    tabsEl.innerHTML = '';
    classes.forEach(function (c) {
      var btn = document.createElement('div');
      btn.className = 'fc-tab' + (c === state.cls ? ' fc-active' : '');
      btn.textContent = c;
      btn.addEventListener('click', function () {
        state.cls = c;
        state.weaponId = WEAPONS[c].length ? WEAPONS[c][0].id : null;
        renderTabs();
        renderWeaponGrid();
        renderPill();
        renderSelectedWeapon();
        renderForgeButtonState();
      });
      tabsEl.appendChild(btn);
    });
  }

  function renderPill() {
    classPillEl.textContent = '100% ' + state.cls + ' Weapon';
  }

  function renderSelectedWeapon() {
    var w = weaponById(state.weaponId);
    if (!w) {
      selectedWeaponEl.innerHTML = 'No weapon selected.';
      return;
    }
    selectedWeaponEl.innerHTML = 'Crafting: <b>' + w.id + '</b> &middot; ATK ' + w.atk + ' &middot; ' + w.price + 'g base';
  }

  function renderWeaponGrid() {
    weaponGridEl.innerHTML = '';
    var list = WEAPONS[state.cls];
    if (!list.length) {
      var note = document.createElement('div');
      note.className = 'fc-empty-note';
      note.textContent = 'No Tier 1 ' + state.cls + ' weapons in the data yet.';
      weaponGridEl.appendChild(note);
      return;
    }
    list.forEach(function (w) {
      var card = document.createElement('div');
      card.className = 'fc-weapon-card' + (w.id === state.weaponId ? ' fc-selected' : '');
      card.innerHTML =
        '<div class="fc-weapon-swatch" style="background:' + CLASS_COLORS[state.cls] + '">' + initials(w.id) + '</div>' +
        '<span class="fc-weapon-card-name">' + w.id + '</span>' +
        '<span class="fc-weapon-card-meta">ATK ' + w.atk + ' &middot; ' + w.price + 'g</span>' +
        (w.hell ? '<span class="fc-tag-hell">HELL</span>' : '') +
        (w.special ? '<span class="fc-tag-special">SPECIAL</span>' : '');
      card.addEventListener('click', function () {
        state.weaponId = w.id;
        renderWeaponGrid();
        renderSelectedWeapon();
        renderForgeButtonState();
      });
      weaponGridEl.appendChild(card);
    });
  }

  function renderOreGrid() {
    oreGridEl.innerHTML = '';
    if (state.mode === 'armor') {
      var ph = document.createElement('div');
      ph.className = 'fc-armor-placeholder';
      ph.textContent = 'Armor forging isn\u2019t modeled yet — the ore pool and formula for armor haven\u2019t been confirmed.';
      oreGridEl.appendChild(ph);
      return;
    }
    var distinctUsed = state.stackOrder.length;
    var query = state.oreSearch.trim().toLowerCase();
    ORES.filter(function (o) {
      return !query || o.name.toLowerCase().indexOf(query) !== -1;
    }).forEach(function (o) {
      var alreadyStacked = state.qty[o.id] > 0;
      var full = distinctUsed >= 4 && !alreadyStacked;
      var btn = document.createElement('div');
      btn.className = 'fc-ore-btn' + (full ? ' fc-disabled' : '');
      btn.innerHTML =
        '<div class="fc-ore-swatch" style="background:' + (RARITY_COLORS[o.rarity] || '#302621') + '"></div>' +
        '<span class="fc-ore-name">' + o.name + '</span>' +
        '<span class="fc-ore-mult">x' + o.mult + '</span>' +
        (o.lv ? '<span class="fc-ore-lv">Lv.' + o.lv + '</span>' : '') +
        (o.hell ? '<span class="fc-ore-hell">HELL</span>' : '');
      if (!full) {
        btn.addEventListener('click', function () { addOre(o.id); });
      }
      oreGridEl.appendChild(btn);
    });
    if (query && !oreGridEl.children.length) {
      var none = document.createElement('div');
      none.className = 'fc-empty-note';
      none.textContent = 'No ores match "' + state.oreSearch + '".';
      oreGridEl.appendChild(none);
    }
  }

  function addOre(oreId) {
    if (!state.qty[oreId]) {
      if (state.stackOrder.length >= 4) return;
      state.stackOrder.push(oreId);
      state.qty[oreId] = 0;
    }
    state.qty[oreId] += 1;
    renderSlots();
    renderOreGrid();
    renderForgeButtonState();
  }

  function removeOneFromSlot(index) {
    var oreId = state.stackOrder[index];
    if (!oreId) return;
    state.qty[oreId] -= 1;
    if (state.qty[oreId] <= 0) {
      delete state.qty[oreId];
      state.stackOrder.splice(index, 1);
    }
    renderSlots();
    renderOreGrid();
    renderForgeButtonState();
  }

  function renderSlots() {
    slotEls.forEach(function (el, i) {
      var oreId = state.stackOrder[i];
      if (oreId) {
        var o = oreById(oreId);
        el.classList.add('fc-filled');
        el.textContent = o.name + ' \u00d7' + state.qty[oreId];
        el.style.borderColor = RARITY_COLORS[o.rarity] || '#4a3a30';
      } else {
        el.classList.remove('fc-filled');
        el.textContent = 'Empty';
        el.style.borderColor = '';
      }
    });
    var total = totalOreCount();
    multEl.textContent = total ? weightedAvgMult().toFixed(1) : '0';
    renderComposition(total);
  }

  function renderComposition(total) {
    if (!total) { compositionEl.innerHTML = ''; return; }
    var rows = state.stackOrder.map(function (id) {
      var pct = ((state.qty[id] / total) * 100).toFixed(1);
      return '<div class="fc-composition-row"><span>' + oreById(id).name + '</span><b>' + pct + '%</b></div>';
    }).join('');
    compositionEl.innerHTML = rows;
  }

  function renderForgeButtonState() {
    var ok = state.weaponId && totalOreCount() >= 3;
    if (ok) { forgeBtn.classList.remove('fc-disabled'); }
    else { forgeBtn.classList.add('fc-disabled'); }
  }

  slotEls.forEach(function (el, i) {
    el.addEventListener('click', function () { removeOneFromSlot(i); });
  });

  resetBtn.addEventListener('click', function () {
    state.stackOrder = [];
    state.qty = {};
    resultEl.classList.remove('fc-show');
    resultEl.innerHTML = '';
    renderSlots();
    renderOreGrid();
    renderForgeButtonState();
  });

  forgeBtn.addEventListener('click', function () {
    if (forgeBtn.classList.contains('fc-disabled')) return;
    var w = weaponById(state.weaponId);
    var avgMult = weightedAvgMult();
    var dmg = w.atk * avgMult;
    var price = Math.round(dmg * 10);
    resultEl.innerHTML =
      '<div class="fc-result-title">' + w.id + '</div>' +
      '<div class="fc-result-tag">Masterwork(100%)</div>' +
      '<div class="fc-result-row"><span>Category</span><b>' + state.cls + ' Weapon</b></div>' +
      '<div class="fc-result-row"><span>Price</span><b>' + price + 'g</b></div>' +
      '<div class="fc-result-dmg">' + (Math.round(dmg * 100) / 100) + ' DMG</div>' +
      '<div class="fc-limitation">Substats (Crit Rate / CD Reduction), class-chance gating, crafting-pool variance, and Mastery% are not yet modeled — this is a pure BaseATK &times; weighted-average ore multiplier calculation.</div>';
    resultEl.classList.add('fc-show');
  });

  toggleEl.addEventListener('click', function (e) {
    var btn = e.target.closest ? e.target.closest('.fc-toggle-btn') : null;
    if (!btn) return;
    var mode = btn.getAttribute('data-mode');
    if (mode === state.mode) return;
    state.mode = mode;
    Array.prototype.forEach.call(toggleEl.querySelectorAll('.fc-toggle-btn'), function (b) {
      b.classList.toggle('fc-active', b.getAttribute('data-mode') === mode);
    });
    renderOreGrid();
  });

  searchEl.addEventListener('input', function () {
    state.oreSearch = searchEl.value;
    renderOreGrid();
  });

  renderTabs();
  renderPill();
  renderWeaponGrid();
  renderSelectedWeapon();
  renderOreGrid();
  renderSlots();
  renderForgeButtonState();
});
/* ====== end Forge Calculator module ====== */