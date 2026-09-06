(function () {
    'use strict';

    var SLOTS = [
        { key: 'crossbow', label: 'Arbalet', inSet: false },
        { key: 'silver_sword', label: 'Gümüş Kılıç', inSet: true },
        { key: 'armor', label: 'Gövde Zırhı', inSet: true },
        { key: 'gloves', label: 'Eldiven', inSet: true },
        { key: 'steel_sword', label: 'Çelik Kılıç', inSet: true },
        { key: 'trousers', label: 'Pantolon', inSet: true },
        { key: 'boots', label: 'Çizme', inSet: true }
    ];
    var SET_SLOT_COUNT = SLOTS.filter(function (s) { return s.inSet; }).length; // 6

    var ICONS = {
        shield: '<svg viewBox="0 0 24 24"><path d="M12 2 4 5v6c0 5 3.4 9 8 11 4.6-2 8-6 8-11V5l-8-3Z"/></svg>',
        heart: '<svg viewBox="0 0 24 24"><path d="M12 21s-7-4.5-9.5-9C.6 8.3 2.7 4.5 6.5 4.5c2 0 3.4 1 4.5 2.5 1.1-1.5 2.5-2.5 4.5-2.5 3.8 0 5.9 3.8 4 7.5C19 16.5 12 21 12 21Z"/></svg>',
        lightning: '<svg viewBox="0 0 24 24"><path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z"/></svg>',
        sword: '<svg viewBox="0 0 24 24"><path d="M20 3 10.5 12.5l2 2L23 5V3h-3Zm-9.9 9.9L4 19l1 1 6.1-6.1-1-1ZM3 21l3-1-2-2-1 3Z"/></svg>',
        arrow: '<svg viewBox="0 0 24 24"><path d="M4 20 20 4M20 4h-7M20 4v7"/></svg>',
        hammer: '<svg viewBox="0 0 24 24"><path d="M17 3l4 4-4 4-2-2-7 7-2-2 7-7-2-2 4-4 2 2Z"/></svg>',
        fire: '<svg viewBox="0 0 24 24"><path d="M12 2c1 4-3 5-3 9a3 3 0 0 0 6 0c0-1-1-2-1-3 2 1 3 3 3 6a5 5 0 0 1-10 0c0-5 3-6 5-12Z"/></svg>',
        poison: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8"/><path d="M12 8v5M12 16h.01" stroke="#0a0a0c" stroke-width="1.6" fill="none" stroke-linecap="round"/></svg>',
        target: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" fill="none" stroke-width="2"/><circle cx="12" cy="12" r="4"/></svg>',
        burst: '<svg viewBox="0 0 24 24"><path d="M12 2 14 9 21 9 15.5 13 17.5 20 12 16 6.5 20 8.5 13 3 9 10 9Z"/></svg>',
        wind: '<svg viewBox="0 0 24 24"><path d="M3 8h13a3 3 0 1 0-3-3M3 16h16a3 3 0 1 1-3 3"/></svg>',
        fang: '<svg viewBox="0 0 24 24"><path d="M8 3c-2 2-2 6-1 9l2 9 2-7 2 7 2-9c1-3 1-7-1-9-1 2-2 3-3 3s-2-1-3-3Z"/></svg>',
        generic: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/></svg>'
    };

    var itemsData = null;
    var iconCache = {};
    var equipped = {};
    var selectedMutagens = [];
    var selectedPotions = [];
    var activeFilter = {};
    var activeSort = {};
    var activeSearch = {};
    var previewName = {}; // slotKey -> geçici olarak detayda gösterilen ama kuşanılmamış isim

    var STORAGE_KEY = 'bs_build_v1';

    function statIcon(key) { return ICONS[key] || ICONS.generic; }

    function loadData(cb) {
        if (itemsData) { cb(itemsData); return; }
        new mw.Api().get({
            action: 'parse', page: 'Şablon:BuildJSON', prop: 'text', format: 'json'
        }).done(function (res) {
            var html = res.parse.text['*'];
            var text = $('<div>').html(html).text().trim();
            try {
                var parsed = JSON.parse(text);
                itemsData = {
                    items: parsed.items || {},
                    mutagens: parsed.mutagens || {},
                    potions: parsed.potions || {},
                    setBonuses: parsed.setBonuses || {},
                    summaryStats: parsed.summaryStats || [],
                    config: parsed.config || {}
                };
                loadSavedBuild();
                cb(itemsData);
            } catch (e) { console.error('Build verisi ayrıştırılamadı:', e); }
        }).fail(function (err) { console.error('Build verisi çekilemedi:', err); });
    }

    function loadSavedBuild() {
        try {
            var raw = localStorage.getItem(STORAGE_KEY);
            if (raw) {
                var saved = JSON.parse(raw);
                equipped = saved.equipped || {};
                selectedMutagens = saved.mutagens || [];
                selectedPotions = saved.potions || [];
            }
        } catch (e) { /* yoksay */ }
    }

    function saveBuild() {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify({
                equipped: equipped, mutagens: selectedMutagens, potions: selectedPotions
            }));
            mw.notify('Build kaydedildi.');
        } catch (e) { console.error('Build kaydedilemedi:', e); }
    }

    function resetBuild() {
        equipped = {}; selectedMutagens = []; selectedPotions = []; previewName = {};
        try { localStorage.removeItem(STORAGE_KEY); } catch (e) {}
        $(document).trigger('bs:refresh');
    }

    function loadIcons(fileNames, cb) {
    var missing = fileNames.filter(function (f) { return f && !iconCache[f]; });
    if (missing.length === 0) { cb(); return; }

    // Her orijinal dosya adının, API'ye gönderdiğimiz "File:..." başlığını tutuyoruz
    var requestedTitles = missing.map(function (f) { return 'File:' + f; });

    new mw.Api().get({
        action: 'query',
        titles: requestedTitles.join('|'),
        prop: 'imageinfo', iiprop: 'url', iiurlwidth: 200, format: 'json'
    }).done(function (res) {
        var pages = res.query.pages || {};
        // API'nin normalize ettiği başlıkları eşlemek için harita kur:
        // normalized: [{from: "gönderdiğimiz", to: "normalize edilmiş"}, ...]
        var normMap = {};
        (res.query.normalized || []).forEach(function (n) { normMap[n.from] = n.to; });

        missing.forEach(function (f) {
            var reqTitle = 'File:' + f;
            var actualTitle = normMap[reqTitle] || reqTitle; // normalize edildiyse asıl aranacak başlık bu
            var found = null;
            for (var id in pages) {
                if (pages[id].title === actualTitle) { found = pages[id]; break; }
            }
            if (found && found.imageinfo && found.imageinfo[0]) {
                // ÖNEMLİ: cache'i API'nin döndürdüğü isimle DEĞİL, orijinal Lua string'i "f" ile kaydediyoruz
                iconCache[f] = found.imageinfo[0].thumburl || found.imageinfo[0].url;
            } else {
                console.warn('İkon bulunamadı: ' + reqTitle + (actualTitle !== reqTitle ? ' (normalize edilmiş hali: ' + actualTitle + ')' : ''));
            }
        });
        cb();
    }).fail(function (err) { console.error('İkon çekme hatası:', err); cb(); });
}

    function iconBox(name, cls) {
        var box = $('<div class="bs-icon-box ' + (cls || '') + '"></div>');
        if (!name) { box.html('<span class="bs-plus">+</span>'); return box; }
        if (iconCache[name]) box.html('<img src="' + iconCache[name] + '">');
        else loadIcons([name], function () {
            if (iconCache[name]) box.html('<img src="' + iconCache[name] + '">');
            else box.html('<span class="bs-plus bs-err" title="İkon bulunamadı">!</span>');
        });
        return box;
    }

    function wolfMedallion() {
        return '<svg viewBox="0 0 100 100" class="bs-wolf-medallion"><circle cx="50" cy="50" r="46"/>' +
            '<path class="bs-wolf-mark" d="M50 20c-9 6-14 15-14 26 0 4 1 8 3 11-6-2-10-7-11-13-3 9 1 19 9 24-8 1-15-3-19-10 1 12 11 21 23 21h18c12 0 22-9 23-21-4 7-11 11-19 10 8-5 12-15 9-24-1 6-5 11-11 13 2-3 3-7 3-11 0-11-5-20-14-26-2 3-4 6-5 9-1-3-3-6-5-9Z"/></svg>';
    }

    function itemsForSlot(items, slotKey) {
        return Object.keys(items).filter(function (n) { return items[n].slot === slotKey; });
    }

    function parseNum(v) {
        if (typeof v === 'number') return v;
        var m = /(-?\d+(\.\d+)?)/.exec(String(v));
        return m ? parseFloat(m[1]) : null;
    }

    // ---- Set bonusu hesaplama ----
    function computeSetBonuses(items) {
        var counts = {};
        SLOTS.forEach(function (s) {
            if (!s.inSet) return;
            var name = equipped[s.key];
            if (!name || !items[name]) return;
            var school = items[name].school;
            if (!school) return;
            counts[school] = (counts[school] || 0) + 1;
        });
        var active = [];
        Object.keys(counts).forEach(function (school) {
            var tiers = (itemsData.setBonuses || {})[school];
            if (!tiers) return;
            var best = null;
            tiers.forEach(function (t) { if (counts[school] >= t.pieces) best = t; });
            if (best) {
                active.push({ school: school, count: counts[school], tier: best });
            }
        });
        return active;
    }

    // ---- Alt bar (summaryStats) hesaplama ----
    function computeSummary(items) {
        return (itemsData.summaryStats || []).map(function (cfg) {
            var val = 0, hasVal = false;
            if (cfg.source === 'primary') {
                var name = equipped[cfg.slot];
                if (name && items[name] && items[name].primary) { val = parseNum(items[name].primary.value) || 0; hasVal = true; }
            } else if (cfg.source === 'sum') {
                SLOTS.forEach(function (s) {
                    var name = equipped[s.key];
                    if (!name || !items[name]) return;
                    (items[name].detail || []).forEach(function (d) {
                        if (d.label === cfg.statLabel) { var n = parseNum(d.value); if (n !== null) { val += n; hasVal = true; } }
                    });
                });
            }
            return { label: cfg.label, icon: cfg.icon, value: hasVal ? val : null };
        });
    }

    function renderBottomBar(root, items) {
        var bar = root.find('.bs-bottom-bar');
        bar.empty();

        var statsBox = $('<div class="bs-bottom-panel"><div class="bs-bottom-title">HESAPLANAN İSTATİSTİKLER</div></div>');
        var statsGrid = $('<div class="bs-summary-grid"></div>');
        computeSummary(items).forEach(function (s) {
            var cell = $('<div class="bs-summary-cell"></div>');
            cell.append('<div class="bs-summary-lbl">' + statIcon(s.icon) + '<span>' + s.label + '</span></div>');
            cell.append('<div class="bs-summary-val">' + (s.value === null ? '—' : s.value) + '</div>');
            statsGrid.append(cell);
        });
        statsBox.append(statsGrid);

        var bonusBox = $('<div class="bs-bottom-panel bs-bonus-panel"><div class="bs-bottom-title">AKTİF BONUSLAR</div></div>');
        var bonuses = computeSetBonuses(items);
        if (bonuses.length === 0) {
            bonusBox.append('<div class="bs-panel-empty">Henüz aktif set bonusu yok. Aynı okuldan en az 2 parça kuşan.</div>');
        } else {
            bonuses.forEach(function (b) {
                var row = $('<div class="bs-bonus-row"></div>');
                row.append('<div class="bs-bonus-icon">' + wolfMedallion() + '</div>');
                row.append('<div class="bs-bonus-info"><div class="bs-bonus-name">' + b.school + ' Okulu Bonusu (' + b.count + '/' + SET_SLOT_COUNT + ')</div>' +
                    '<div class="bs-bonus-detail"><span class="bs-bonus-val">' + b.tier.value + '</span> ' + b.tier.label + '</div></div>');
                bonusBox.append(row);
            });
        }

        bar.append(statsBox).append(bonusBox);
    }

    // ---- Detay paneli (delta göstergeli) ----
    function renderDetail(panel, items, slotKey, name, isPreview) {
        var it = items[name];
        panel.empty();
        var equippedName = equipped[slotKey];
        var equippedIt = equippedName ? items[equippedName] : null;

        var head = $('<div class="bs-detail-head"></div>');
        head.append('<div><div class="bs-detail-name">' + name + '</div>' + (it.school ? '<div class="bs-detail-type">' + it.school + ' Okulu</div>' : '') + '</div>');
        panel.append(head);

        panel.append($('<div class="bs-detail-icon-wrap"></div>').append(iconBox(it.icon, 'bs-detail-icon')));

        if (it.primary) {
            var delta = null;
            if (equippedIt && equippedIt.primary && equippedName !== name) {
                var d = parseNum(it.primary.value) - parseNum(equippedIt.primary.value);
                if (!isNaN(d) && d !== 0) delta = d;
            }
            var primWrap = $('<div class="bs-detail-primary"></div>');
            primWrap.append('<span class="bs-detail-primary-val">' + it.primary.value + '</span>');
            if (delta !== null) primWrap.append('<span class="bs-delta ' + (delta > 0 ? 'bs-delta-up' : 'bs-delta-down') + '">' + (delta > 0 ? '+' : '') + delta + ' ' + (delta > 0 ? '▲' : '▼') + '</span>');
            primWrap.append('<span class="bs-detail-primary-lbl">' + it.primary.label.toUpperCase() + '</span>');
            panel.append(primWrap);
        }
        if (it.weightClass || it.level) {
            var meta = $('<div class="bs-detail-meta"></div>');
            if (it.weightClass) meta.append('<span>' + it.weightClass + '</span>');
            if (it.level) meta.append('<span>Gerekli Seviye ' + it.level + '</span>');
            panel.append(meta);
        }

        if ((it.detail || []).length) {
            var list = $('<div class="bs-detail-stats"></div>');
            it.detail.forEach(function (row) {
                var line = $('<div class="bs-detail-stat"></div>');
                line.append('<span class="bs-detail-stat-lbl">' + statIcon(row.icon) + row.label + '</span>');
                var right = $('<span class="bs-detail-stat-val">' + row.value + '</span>');
                if (equippedIt && equippedName !== name) {
                    var oldRow = (equippedIt.detail || []).filter(function (r) { return r.label === row.label; })[0];
                    if (oldRow) {
                        var dd = parseNum(row.value) - parseNum(oldRow.value);
                        if (!isNaN(dd) && dd !== 0) right.append(' <span class="bs-delta ' + (dd > 0 ? 'bs-delta-up' : 'bs-delta-down') + '">' + (dd > 0 ? '+' : '') + dd + '</span>');
                    }
                }
                line.append(right);
                list.append(line);
            });
            panel.append(list);
        }
        if (it.desc) panel.append('<div class="bs-detail-desc">' + it.desc + '</div>');

        var btnLabel = (equippedName === name) ? 'KUŞANILDI ✓' : 'KUŞAN';
        var equipBtn = $('<button class="bs-equip-btn' + (equippedName === name ? ' bs-equipped-btn' : '') + '">' + btnLabel + '</button>');
        equipBtn.on('click', function () {
            equipped[slotKey] = name;
            $(document).trigger('bs:refresh');
        });
        panel.append(equipBtn);
    }

    function renderList(panel, detailPanel, items, slotKey, label) {
        panel.empty();
        var names = itemsForSlot(items, slotKey);
        var headRow = $('<div class="bs-list-head"></div>');
        headRow.append('<div class="bs-panel-title">' + label.toUpperCase() + ' SEÇ</div>');
        panel.append(headRow);

        var controls = $('<div class="bs-list-controls"></div>');
        var types = Array.from(new Set(names.map(function (n) { return items[n].weightClass; }).filter(Boolean)));
        var filterSel = $('<select class="bs-select"><option value="">Tüm Seçenekler</option></select>');
        types.forEach(function (t) { filterSel.append('<option value="' + t + '">' + t + '</option>'); });
        filterSel.val(activeFilter[slotKey] || '');
        filterSel.on('change', function () { activeFilter[slotKey] = $(this).val(); drawList(); });

        var sortSel = $('<select class="bs-select"><option value="level">Sırala: Seviye</option><option value="value">Sırala: Değer</option><option value="name">Sırala: İsim</option></select>');
        sortSel.val(activeSort[slotKey] || 'level');
        sortSel.on('change', function () { activeSort[slotKey] = $(this).val(); drawList(); });

        var searchBox = $('<input type="text" class="bs-search" placeholder="Ara...">');
        searchBox.val(activeSearch[slotKey] || '');
        searchBox.on('input', function () { activeSearch[slotKey] = $(this).val(); drawList(); });

        controls.append(filterSel).append(sortSel).append(searchBox);
        panel.append(controls);

        var list = $('<div class="bs-item-list"></div>');
        var countLbl = $('<div class="bs-count-lbl"></div>');
        panel.append(list).append(countLbl);

        function drawList() {
            list.empty();
            var filter = activeFilter[slotKey];
            var search = (activeSearch[slotKey] || '').toLowerCase();
            var sortKey = activeSort[slotKey] || 'level';
            var filtered = names.filter(function (n) {
                if (filter && items[n].weightClass !== filter) return false;
                if (search && n.toLowerCase().indexOf(search) === -1) return false;
                return true;
            });
            filtered.sort(function (a, b) {
                if (sortKey === 'name') return a.localeCompare(b);
                if (sortKey === 'value') return (parseNum(items[b].primary && items[b].primary.value) || 0) - (parseNum(items[a].primary && items[a].primary.value) || 0);
                return (items[a].level || 0) - (items[b].level || 0);
            });
            countLbl.text(filtered.length + ' eşya bulundu');
            filtered.forEach(function (n) {
                var it = items[n];
                var row = $('<div class="bs-item-row"></div>');
                if (equipped[slotKey] === n) row.addClass('bs-selected');
                row.append(iconBox(it.icon));
                var info = $('<div class="bs-item-info"></div>');
                info.append('<div class="bs-item-name">' + n + '</div>');
                if (it.school) info.append('<div class="bs-item-type">' + it.school + ' Okulu</div>');
                row.append(info);
                if (it.primary) row.append('<div class="bs-item-primary"><span class="bs-item-primary-val">' + it.primary.value + '</span><span class="bs-item-primary-lbl">' + it.primary.label.toUpperCase() + '</span></div>');
                var chips = $('<div class="bs-chip-row"></div>');
                (it.chips || []).slice(0, 3).forEach(function (c) {
                    chips.append('<div class="bs-chip"><span class="bs-chip-val">' + c.value + '</span><span class="bs-chip-lbl">' + c.label + '</span></div>');
                });
                row.append(chips);
                var selectBtn = $('<button class="bs-select-btn">SEÇ</button>');
                selectBtn.on('click', function (e) {
                    e.stopPropagation();
                    renderDetail(detailPanel, items, slotKey, n);
                    list.find('.bs-item-row').removeClass('bs-selected');
                    row.addClass('bs-selected');
                });
                row.append(selectBtn);
                row.on('click', function () { renderDetail(detailPanel, items, slotKey, n); });
                list.append(row);
            });
        }
        drawList();
    }

    function refreshLeftPanel(root, items) {
        var grid = root.find('.bs-slot-grid');
        grid.find('.bs-slot').each(function () {
            var slotKey = $(this).data('slot');
            var name = equipped[slotKey];
            if (!name || !items[name]) { $(this).html('<span class="bs-plus">+</span>').removeClass('bs-filled'); return; }
            $(this).empty().append(iconBox(items[name].icon)).addClass('bs-filled');
        });
    }

    function renderEquipmentTab(root, items) {
        var body = root.find('.bs-tab-body');
        body.empty();
        var wrap = $('<div class="bs-equipment"></div>');

        var leftCol = $('<div class="bs-left-col"><div class="bs-left-title">SEÇİLEN EKİPMAN</div></div>');
        var grid = $('<div class="bs-slot-grid"></div>');
        SLOTS.forEach(function (s) {
            var box = $('<div class="bs-slot-box"></div>');
            box.append('<div class="bs-slot-label">' + s.label + '</div>');
            var slotEl = $('<div class="bs-slot" data-slot="' + s.key + '"><span class="bs-plus">+</span></div>');
            slotEl.on('click', function () { activateSlot(s.key, s.label); });
            box.append(slotEl);
            grid.append(box);
        });
        leftCol.append(grid);
        var clearBtn = $('<button class="bs-back-btn bs-clear-all">EŞYALARI TEMİZLE</button>');
        clearBtn.on('click', function () { resetBuild(); });
        leftCol.append(clearBtn);

        var middlePanel = $('<div class="bs-panel bs-panel-center"></div>');
        var rightPanel = $('<div class="bs-panel bs-panel-center"></div>');

        function showEmptyState() {
            middlePanel.empty().addClass('bs-panel-center').append(wolfMedallion())
                .append('<div class="bs-panel-title bs-center">EKİPMAN SEÇ</div>')
                .append('<div class="bs-panel-empty bs-center">Soldaki slotlardan birine tıklayarak başla.</div>');
            rightPanel.empty().addClass('bs-panel-center').append(wolfMedallion())
                .append('<div class="bs-panel-empty bs-center">Bir eşya seçtiğinde detayları burada görünecek.</div>');
        }

        function activateSlot(slotKey, label) {
            middlePanel.removeClass('bs-panel-center');
            rightPanel.removeClass('bs-panel-center');
            renderList(middlePanel, rightPanel, items, slotKey, label);
            var current = equipped[slotKey];
            if (current) renderDetail(rightPanel, items, slotKey, current);
            else rightPanel.empty().addClass('bs-panel-center').append(wolfMedallion()).append('<div class="bs-panel-empty bs-center">Listeden bir eşya seç.</div>');
        }

        showEmptyState();
        wrap.append(leftCol).append(middlePanel).append(rightPanel);
        body.append(wrap);
        refreshLeftPanel(root, items);
    }

    function renderCountTab(root, items, kind) {
        var body = root.find('.bs-tab-body');
        body.empty();
        var pool = kind === 'mutagen' ? itemsData.mutagens : itemsData.potions;
        var max = (itemsData.config && (kind === 'mutagen' ? itemsData.config.maxMutagens : itemsData.config.maxPotions)) || 3;
        var titleLbl = kind === 'mutagen' ? 'MUTAJENLER' : 'İKSİRLER';
        var selected = kind === 'mutagen' ? selectedMutagens : selectedPotions;

        var wrap = $('<div class="bs-count-tab"></div>');
        var left = $('<div class="bs-count-left"></div>');
        var right = $('<div class="bs-count-right bs-panel-center"></div>').append(wolfMedallion());
        wrap.append(left).append(right);

        function showChooser() {
            left.empty();
            left.append('<div class="bs-panel-title">' + titleLbl + '</div>');
            left.append('<div class="bs-panel-sub">Kaç adet ' + (kind === 'mutagen' ? 'mutajen' : 'iksir') + ' kullanmak istiyorsun? (En fazla ' + max + ')</div>');
            var n = selected.length || 0;
            var row = $('<div class="bs-count-row"></div>');
            var minus = $('<button class="bs-count-btn">−</button>');
            var val = $('<span class="bs-count-val">' + n + '</span>');
            var plus = $('<button class="bs-count-btn">+</button>');
            minus.on('click', function () { n = Math.max(0, n - 1); val.text(n); });
            plus.on('click', function () { n = Math.min(max, n + 1); val.text(n); });
            row.append(minus).append(val).append(plus);
            left.append(row);
            var confirm = $('<button class="bs-select-btn bs-confirm-btn">ONAYLA</button>');
            confirm.on('click', function () {
                selected.length = 0;
                for (var i = 0; i < n; i++) selected.push(null);
                showSlots();
            });
            left.append(confirm);
        }

        function showSlots() {
            left.empty();
            left.append('<div class="bs-panel-title">' + titleLbl + '</div>');
            var row = $('<div class="bs-count-slots"></div>');
            selected.forEach(function (name, idx) {
                var box = $('<div class="bs-count-slot-box"></div>');
                var slot = $('<div class="bs-slot"></div>');
                if (name && pool[name]) slot.append(iconBox(pool[name].icon)).addClass('bs-filled');
                else slot.html('<span class="bs-plus">+</span>');
                box.append('<div class="bs-slot-index">' + (idx + 1) + '</div>').append(slot);
                row.append(box);
            });
            left.append(row);
            var clearBtn = $('<button class="bs-back-btn">TÜMÜNÜ TEMİZLE</button>');
            clearBtn.on('click', function () { selected.length = 0; showChooser(); });
            left.append(clearBtn);
            if (Object.keys(pool).length === 0) {
                left.append('<div class="bs-panel-empty" style="margin-top:14px;">Bu kategori için veritabanında henüz eşya yok.</div>');
            }
        }

        showChooser();
        body.append(wrap);
    }

    function renderStatsTab(root, items) {
        var body = root.find('.bs-tab-body');
        body.empty();
        var wrap = $('<div class="bs-stats"></div>');
        var equippedList = SLOTS.map(function (s) { return { s: s, name: equipped[s.key] }; }).filter(function (x) { return x.name; });

        var left = $('<div class="bs-stats-left"></div>');
        if (equippedList.length === 0) left.append('<div class="bs-panel-empty">Henüz eşya kuşanmadın.</div>');
        else equippedList.forEach(function (x) {
            var it = items[x.name];
            var row = $('<div class="bs-stats-equip-row"></div>');
            row.append(iconBox(it.icon));
            row.append('<div class="bs-item-info"><div class="bs-item-name">' + x.name + '</div><div class="bs-item-type">' + (it.school || '') + '</div></div>');
            left.append(row);
        });

        var right = $('<div class="bs-stats-right"></div>');
        right.append('<div class="bs-panel-title">TOPLAM İSTATİSTİKLER</div>');
        var table = $('<div class="bs-stats-table"></div>');
        computeSummary(items).forEach(function (s) {
            table.append('<div class="bs-stats-row"><span>' + statIcon(s.icon) + s.label + '</span><span>' + (s.value === null ? '—' : s.value) + '</span></div>');
        });
        right.append(table);

        var exportBtn = $('<button class="bs-equip-btn bs-export-btn">BUILD\'İ DIŞA AKTAR</button>');
        exportBtn.on('click', function () {
            var lines = equippedList.map(function (x) { return x.name; });
            var txt = lines.join('\n') || 'Henüz eşya seçilmedi';
            if (navigator.clipboard) navigator.clipboard.writeText(txt);
            mw.notify('Build panoya kopyalandı.');
        });

        wrap.append(left).append(right);
        body.append(wrap).append(exportBtn);
    }

    function buildUI(container, items) {
        var tabDefs = [
            { key: 'equipment', label: 'EKİPMAN' },
            { key: 'mutagens', label: 'MUTAJENLER' },
            { key: 'potions', label: 'İKSİRLER' },
            { key: 'stats', label: 'İSTATİSTİKLER' }
        ];
        var root = $('<div class="build-simulator"></div>');
        var header = $('<div class="bs-header"></div>');
        header.append('<span class="bs-header-title">BUILD SIMULATOR</span>');
        var headerRight = $('<div class="bs-header-right"></div>');
        headerRight.append($('<span class="bs-header-badge"></span>').html(wolfMedallion()));
        var saveBtn = $('<button class="bs-header-btn">BUILDİ KAYDET</button>').on('click', saveBuild);
        var resetBtn = $('<button class="bs-header-icon-btn" title="Sıfırla">⟲</button>').on('click', function () {
            if (confirm('Tüm build sıfırlansın mı?')) resetBuild();
        });
        headerRight.append(saveBtn).append(resetBtn);
        header.append(headerRight);

        var tabs = $('<div class="bs-tabs"></div>');
        tabDefs.forEach(function (t) {
            var el = $('<span class="bs-tab" data-tab="' + t.key + '">' + t.label + '</span>');
            el.on('click', function () { showTab(t.key); });
            tabs.append(el);
        });

        var body = $('<div class="bs-tab-body"></div>');
        var bottomBar = $('<div class="bs-bottom-bar"></div>');

        root.append(header).append(tabs).append(body).append(bottomBar);
        container.empty().append(root);

        var currentTab = 'equipment';
        function showTab(key) {
            currentTab = key;
            tabs.find('.bs-tab').removeClass('active');
            tabs.find('[data-tab="' + key + '"]').addClass('active');
            if (key === 'equipment') renderEquipmentTab(root, items);
            else if (key === 'mutagens') renderCountTab(root, items, 'mutagen');
            else if (key === 'potions') renderCountTab(root, items, 'potion');
            else renderStatsTab(root, items);
            renderBottomBar(root, items);
        }

        $(document).on('bs:refresh', function () { showTab(currentTab); });
        showTab('equipment');
    }

$(function () {
    var containers = $('.build-simulator-container');
    if (containers.length === 0) return;
    loadData(function (items) {
        containers.each(function () { buildUI($(this), items.items); });
    });
});
})();