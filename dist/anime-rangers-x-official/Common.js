/* Any JavaScript here will be loaded for all users on every page load. */
mw.hook('wikipage.content').add(function($content) {
    if (window.copyCodeLoaded) return;
    window.copyCodeLoaded = true;
    $(document).on('click', '.copy-code', function() {
        var $el = $(this);
        var text = $el.attr('data-copy') || $el.text();
        var originalHTML = $el.html();
        var $temp = $("<input>");
        $("body").append($temp);
        $temp.val(text).select();
        try {
            document.execCommand("copy");
            $el.html('<span style="color:#00ff00;">✔ Copied!</span>');
            $el.css('border-color','#00ff00');
            setTimeout(function() { $el.html(originalHTML); $el.css('border-color','#ff8200'); }, 1000);
        } catch(err) { console.error('Copy failed', err); }
        $temp.remove();
    });
});

/* === ARX Upgrade Stat Widget === */
/* Any JavaScript here will be loaded for all users on every page load. */
mw.hook('wikipage.content').add(function($content) {
    if (window.copyCodeLoaded) return;
    window.copyCodeLoaded = true;
    $(document).on('click', '.copy-code', function() {
        var $el = $(this);
        var text = $el.attr('data-copy') || $el.text();
        var originalHTML = $el.html();
        var $temp = $("<input>");
        $("body").append($temp);
        $temp.val(text).select();
        try {
            document.execCommand("copy");
            $el.html('<span style="color:#00ff00;">✔ Copied!</span>');
            $el.css('border-color','#00ff00');
            setTimeout(function() { $el.html(originalHTML); $el.css('border-color','#ff8200'); }, 1000);
        } catch(err) { console.error('Copy failed', err); }
        $temp.remove();
    });
});

/* === ARX Upgrade Stat Widget === */
(function () {
    'use strict';

    var LEVEL_MULTI   = {};
    var STAT_MULTI    = {};
    var RARITY_COLORS = {};
    var STAT_ICONS    = {};
    var LEVEL_BUTTONS = [];
    var STAT_BUTTONS  = [];

    var WIKI_FILE_BASE = 'https://anime-rangers-x-official.fandom.com/wiki/Special:FilePath/';

    function fmt(n) {
        if (n == null) return '—';
        return Math.floor(n).toLocaleString('en-US');
    }
    function fmtCd(n) {
        if (n == null) return '—';
        return (Math.floor(n * 10) / 10).toString();
    }
    function el(tag, cls, txt) {
        var e = document.createElement(tag);
        if (cls) e.className = cls;
        if (txt != null) e.textContent = txt;
        return e;
    }

    function calcStats(u, state) {
        var lm = state.level ? LEVEL_MULTI[state.level] : 1;
        var sm = state.stat  ? STAT_MULTI[state.stat]   : { dmg:1, hp:1, rng:1, spd:1, acd:1 };
        var tm = state.trait ? state.trait.Mult          : {};
        var gm = { dmg:1, hp:1, rng:1, spd:1, cost:1 };
        Object.keys(state.gearSelections).forEach(function(slot) {
            var g = state.gearSelections[slot];
            if (g && g.Mult) {
                Object.keys(g.Mult).forEach(function(stat) {
                    gm[stat] = (gm[stat] || 1) * g.Mult[stat];
                });
            }
        });
        var dmg = (u.Damage || 0) * lm * sm.dmg * (tm.dmg||1) * (gm.dmg||1);
        var hp  = (u.Health || 0) * lm * sm.hp  * (tm.hp ||1) * (gm.hp ||1);
        var cd  = (u.AttackCooldown || 1);
        var rng = (u.Range  || 0) * sm.rng * (tm.rng||1) * (gm.rng||1);
        var spd = (u.Speed  || 0) * sm.spd * (tm.spd||1) * (gm.spd||1);
        var dps = cd > 0 ? dmg / cd : 0;
        return { dmg:dmg, hp:hp, cd:cd, rng:rng, spd:spd, dps:dps };
    }

    function makePill(type, iconFile, value) {
        var p = el('div', 'arx-pill arx-pill-' + type);
        var iconSpan = el('span', 'arx-pill-icon');
        if (iconFile) {
            var iImg = document.createElement('img');
            iImg.src = WIKI_FILE_BASE + iconFile;
            iImg.alt = type;
            iImg.className = 'arx-pill-icon-img';
            iImg.onerror = function() { iImg.style.display='none'; };
            iconSpan.appendChild(iImg);
        }
        p.appendChild(iconSpan);
        p.appendChild(el('span', 'arx-pill-val', value));
        return p;
    }

    function renderRows(panel, upgrades, state, unit) {
        panel.innerHTML = '';
        var keys = Object.keys(upgrades).map(Number).sort(function(a,b){return a-b;});
        keys.forEach(function(i) {
            var u = upgrades[i];
            if (!u) return;
            var s = calcStats(u, state);

            var abilityDmgPct = (unit.AbilityDamage || 0);
            var finalAdmg     = s.dmg * (1 + abilityDmgPct / 100);
            var abilityCd     = fmtCd(unit.AbilityCooldown || 0) + 's';

            var row  = el('div','arx-row');
            var head = el('div','arx-row-head');
            head.appendChild(el('span','arx-row-label','UPGRADE'));
            var tm = state.trait ? state.trait.Mult : {};
            var gm = { cost:1 };
            Object.keys(state.gearSelections).forEach(function(slot) {
                var g = state.gearSelections[slot];
                if (g && g.Mult && g.Mult.cost) gm.cost *= g.Mult.cost;
            });
            var displayCost = (u.Cost||0) * (tm.cost||1) * (gm.cost||1);
            head.appendChild(el('span','arx-row-cost','¥ ' + fmt(displayCost)));
            head.appendChild(el('span','arx-row-idx','[' + i + ']'));
            row.appendChild(head);

            var pills = el('div','arx-pills');
            pills.appendChild(makePill('hp',   STAT_ICONS.hp   || 'Health.png',          fmt(s.hp)));
            pills.appendChild(makePill('dmg',  STAT_ICONS.dmg  || 'Damage.png',          fmt(s.dmg)));
            pills.appendChild(makePill('cd',   STAT_ICONS.cd   || 'Cooldown.png',         fmtCd(s.cd)));
            pills.appendChild(makePill('rng',  STAT_ICONS.rng  || 'Range.png',            fmt(s.rng)));
            pills.appendChild(makePill('spd',  STAT_ICONS.spd  || 'Speed.png',            fmt(s.spd)));
            pills.appendChild(makePill('admg', STAT_ICONS.admg || 'AbilityDamage.webp',   fmt(finalAdmg)));
            pills.appendChild(makePill('acd',  STAT_ICONS.acd  || 'AbilityCooldown.webp', abilityCd));
            row.appendChild(pills);

            var foot = el('div','arx-row-foot');
            if (u.Note) foot.appendChild(el('span','arx-note', u.Note));
            var dps = el('span','arx-dps');
            dps.innerHTML = 'DPS: <b>' + fmt(s.dps) + '/s</b>';
            foot.appendChild(dps);
            row.appendChild(foot);
            panel.appendChild(row);
        });
    }

    function makeGearCard(item) {
        var rc = RARITY_COLORS[item.Rarity] || { border:'#00BFFF', bg:'rgba(0,80,120,0.5)' };
        var card = el('div','arx-gear-card');
        card.style.borderColor     = rc.border;
        card.style.backgroundColor = rc.bg;
        card.style.boxShadow       = '0 0 10px ' + rc.border;
        var img = document.createElement('img');
        img.className = 'arx-gear-card-img';
        img.src = WIKI_FILE_BASE + item.Img;
        img.alt = item.Name;
        img.onerror = function() { img.style.display='none'; };
        card.appendChild(img);
        card.appendChild(el('div','arx-gear-card-name', item.Name));
        return card;
    }

    function renderRangerDetail(container, unit, unitKey) {
        var fullImg  = unit.FullImg || '';
        var upgrades = unit.Upgrade || {};
        var keys     = Object.keys(upgrades).map(Number).sort(function(a,b){return a-b;});
        var baseU    = upgrades[keys[0]] || {};
        var maxU     = upgrades[keys[keys.length-1]] || {};

        var wrap = el('div','arx-info-section');
        wrap.appendChild(el('div','arx-info-title','RANGER DETAIL'));
        var body = el('div','arx-detail-body');

        var imgWrap = el('div','arx-detail-imgwrap');
        var img = document.createElement('img');
        img.className = 'arx-detail-img';
        img.src = WIKI_FILE_BASE + fullImg;
        img.alt = unit.DisplayName || unitKey;
        img.onerror = function() { imgWrap.style.opacity='0.3'; };
        imgWrap.appendChild(img);
        body.appendChild(imgWrap);

        var info = el('div','arx-detail-info');

        function detailRow(label, value, cls) {
            var row = el('div','arx-detail-row');
            row.appendChild(el('span','arx-detail-label', label + ': '));
            row.appendChild(el('span','arx-detail-value' + (cls ? ' '+cls : ''), value));
            return row;
        }

        function perfRow(icon, label, base, max) {
            var row = el('div','arx-detail-row');
            var ic  = el('span','arx-detail-icon');
            if (icon) {
                if (icon.endsWith('.png') || icon.endsWith('.svg') || icon.endsWith('.webp')) {
                    var iImg = document.createElement('img');
                    iImg.src = WIKI_FILE_BASE + icon;
                    iImg.alt = label;
                    iImg.className = 'arx-detail-icon-img';
                    iImg.onerror = function() { iImg.style.display='none'; };
                    ic.appendChild(iImg);
                } else {
                    ic.textContent = icon;
                }
            }
            row.appendChild(ic);
            row.appendChild(el('span','arx-detail-label', label + ': '));
            var val;
            if (max !== null && base !== max) {
                val = el('span','arx-detail-value');
                val.innerHTML = '<span class="arx-perf-base">' + base + '</span>' +
                                ' <span class="arx-perf-arrow">→</span> ' +
                                '<span class="arx-perf-max">' + max + '</span>';
            } else {
                val = el('span','arx-detail-value', base);
            }
            row.appendChild(val);
            return row;
        }

        info.appendChild(el('div','arx-detail-section-title','General'));
        var genList = el('div','arx-detail-list');
        genList.appendChild(detailRow('Name',           unit.DisplayName   || '—'));
        genList.appendChild(detailRow('Attack Element', unit.PrimaryAttack || '—', 'arx-val-physical'));
        genList.appendChild(detailRow('Attack Type',    unit.AttackType    || '—'));
        genList.appendChild(detailRow('Element',        unit.Element       || '—'));
        genList.appendChild(detailRow('Rarity',         unit.Rarity        || '—'));
        info.appendChild(genList);

        info.appendChild(el('div','arx-detail-section-title','Performance'));
        var perfList = el('div','arx-detail-list');
        perfList.appendChild(perfRow('💰', 'Cost',             '¥ '+fmt(unit.Cost||0), null));
        perfList.appendChild(perfRow('⏱',  'Send Cooldown',    (unit.SendCooldown||0)+'s', null));
        perfList.appendChild(perfRow('∞',  'Limit Spawn',      (unit.SpawnCap||0)+' (Unit)', null));
        perfList.appendChild(perfRow(STAT_ICONS.hp   || 'Health.png',          'Health',            fmt(baseU.Health||0),               fmt(maxU.Health||0)));
        perfList.appendChild(perfRow(STAT_ICONS.dmg  || 'Damage.png',          'Damage',            fmt(baseU.Damage||0),               fmt(maxU.Damage||0)));
        perfList.appendChild(perfRow(STAT_ICONS.cd   || 'Cooldown.png',        'Cooldown',          fmtCd(baseU.AttackCooldown||0)+'s', fmtCd(maxU.AttackCooldown||0)+'s'));
        perfList.appendChild(perfRow(STAT_ICONS.rng  || 'Range.png',           'Range',             fmt(baseU.Range||0),                fmt(maxU.Range||0)));
        perfList.appendChild(perfRow(STAT_ICONS.spd  || 'Speed.png',           'Speed',             fmt(baseU.Speed||0),                fmt(maxU.Speed||0)));
        perfList.appendChild(perfRow(STAT_ICONS.acc  || '',                    'Accuracy',          (unit.Accuracy||0)+'%',             null));
        perfList.appendChild(perfRow(STAT_ICONS.admg || 'AbilityDamage.webp',  'Ability Damage',    (unit.AbilityDamage||0)+'%',        null));
        perfList.appendChild(perfRow(STAT_ICONS.acd  || 'AbilityCooldown.webp','Ability Cooldown',  fmtCd(unit.AbilityCooldown||0)+'s', null));
        perfList.appendChild(perfRow(STAT_ICONS.size || '',                    'Ability Size',      (unit.AbilitySize||0)+'',           null));
        info.appendChild(perfList);

        body.appendChild(info);
        wrap.appendChild(body);
        container.appendChild(wrap);
    }

    function renderObtain(container, obtain) {
        if (!obtain) return;
        var wrap = el('div','arx-info-section');
        wrap.appendChild(el('div','arx-info-title','HOW TO OBTAIN'));
        var box = el('div','arx-info-box');
        box.appendChild(el('p', null, obtain));
        wrap.appendChild(box);
        container.appendChild(wrap);
    }

    function renderEvolve(container, evolveData, goldImg, displayName) {
        var wrap = el('div','arx-info-section');
        wrap.appendChild(el('div','arx-info-title','EVOLVE REQUIREMENTS'));
        var box = el('div','arx-info-box');
        if (!evolveData || !evolveData.EvolveTo || evolveData.EvolveTo === '') {
            var noEvolve = el('p','arx-no-evolve');
            noEvolve.innerHTML = '<i><b>' + displayName + '</b> does not evolve.</i>';
            box.appendChild(noEvolve);
        } else {
            var layout    = el('div','arx-evolve-layout');
            var unitCards = el('div','arx-evolve-units');
            var fromCard  = el('div','arx-evolve-unit-card');
            var fromImg   = document.createElement('img');
            fromImg.src   = WIKI_FILE_BASE + evolveData.EvolveFrom + '.png';
            fromImg.alt   = evolveData.EvolveFrom;
            fromImg.onerror = function() { fromImg.style.display='none'; };
            fromCard.appendChild(fromImg);
            fromCard.appendChild(el('div','arx-evolve-unit-name', evolveData.EvolveFrom));
            var arrow = el('div','arx-evolve-arrow','▶');
            var toCard  = el('div','arx-evolve-unit-card');
            var toImg   = document.createElement('img');
            toImg.src   = WIKI_FILE_BASE + evolveData.EvolveTo + '.png';
            toImg.alt   = evolveData.EvolveTo;
            toImg.onerror = function() { toImg.style.display='none'; };
            toCard.appendChild(toImg);
            toCard.appendChild(el('div','arx-evolve-unit-name', evolveData.EvolveTo));
            unitCards.appendChild(fromCard);
            unitCards.appendChild(arrow);
            unitCards.appendChild(toCard);
            layout.appendChild(unitCards);
            var req = el('div','arx-evolve-req');
            req.appendChild(el('div','arx-evolve-req-title','Requirement'));
            var itemsGrid = el('div','arx-evolve-items');
            (evolveData.Items || []).forEach(function(item) {
                var ic   = el('div','arx-evolve-item');
                var iImg = document.createElement('img');
                iImg.src = WIKI_FILE_BASE + item.Img;
                iImg.alt = item.Name;
                iImg.onerror = function() { iImg.style.display='none'; };
                ic.appendChild(iImg);
                ic.appendChild(el('div','arx-evolve-item-qty', item.Qty + 'x'));
                ic.appendChild(el('div','arx-evolve-item-name', item.Name));
                itemsGrid.appendChild(ic);
            });
            req.appendChild(itemsGrid);
            var goldRow = el('div','arx-evolve-gold');
            var gImg    = document.createElement('img');
            gImg.src    = WIKI_FILE_BASE + goldImg;
            gImg.alt    = 'Gold';
            gImg.className = 'arx-evolve-gold-icon';
            gImg.onerror = function() { gImg.style.display='none'; };
            goldRow.appendChild(gImg);
            goldRow.appendChild(el('span', null, fmt(evolveData.Gold) + ' Gold'));
            req.appendChild(goldRow);
            layout.appendChild(req);
            box.appendChild(layout);
        }
        wrap.appendChild(box);
        container.appendChild(wrap);
    }

    function renderGearRec(container, gearRec) {
        if (!gearRec || gearRec.length === 0) return;
        var wrap = el('div','arx-info-section');
        wrap.appendChild(el('div','arx-info-title','GEAR RECOMMENDATION'));
        var box  = el('div','arx-info-box');
        var grid = el('div','arx-gear-rec-grid');
        gearRec.forEach(function(item) { grid.appendChild(makeGearCard(item)); });
        box.appendChild(grid);
        wrap.appendChild(box);
        container.appendChild(wrap);
    }

    function renderPassive(container, unit) {
        if (!unit.Passive || !unit.Passive.Info) return;
        var wrap = el('div','arx-info-section');
        wrap.appendChild(el('div','arx-info-title','PASSIVE'));
        var box  = el('div','arx-info-box');
        var info = document.createElement('p');
        info.innerHTML = unit.Passive.Info;
        box.appendChild(info);
        wrap.appendChild(box);
        container.appendChild(wrap);
    }

    function renderUnitContent(container, unit, unitKey, goldImg, host) {
        renderRangerDetail(container, unit, unitKey);
        renderObtain(container, unit.Obtain || '');

        var evolveRaw  = unit._evolveJson;
        var evolveData = evolveRaw ? JSON.parse(evolveRaw) : null;
        renderEvolve(container, evolveData, goldImg, unit.DisplayName || unitKey);

        var gearRec = unit._gearRec ? JSON.parse(unit._gearRec) : [];
        renderGearRec(container, gearRec);

        var sheet = el('div','arx-sheet');
        sheet.appendChild(el('div','arx-sheet-header','UPGRADE STATS — ' + (unit.DisplayName || unitKey)));

        var state      = { level:null, stat:null, trait:null, gearSelections:{} };
        var controls   = el('div','arx-controls');
        var leftCtrls  = el('div','arx-controls-left');
        var rightCtrls = el('div','arx-controls-right');

        var lvlRow = el('div','arx-btn-row');
        LEVEL_BUTTONS.forEach(function(lv) {
            var b = el('button','arx-btn','Level ' + lv);
            b.addEventListener('click', function() {
                if (state.level === lv) { state.level=null; b.classList.remove('active'); }
                else {
                    state.level = lv;
                    Array.prototype.forEach.call(lvlRow.children, function(c){c.classList.remove('active');});
                    b.classList.add('active');
                }
                renderRows(rowsPanel, unit.Upgrade, state, unit);
            });
            lvlRow.appendChild(b);
        });
        leftCtrls.appendChild(lvlRow);

        var statRow = el('div','arx-btn-row');
        STAT_BUTTONS.forEach(function(st) {
            var b = el('button','arx-btn','Stats ' + st);
            b.addEventListener('click', function() {
                if (state.stat === st) { state.stat=null; b.classList.remove('active'); }
                else {
                    state.stat = st;
                    Array.prototype.forEach.call(statRow.children, function(c){c.classList.remove('active');});
                    b.classList.add('active');
                }
                renderRows(rowsPanel, unit.Upgrade, state, unit);
            });
            statRow.appendChild(b);
        });
        leftCtrls.appendChild(statRow);

        var traitsBtn = el('button','arx-btn arx-btn-modal','Traits');
        traitsBtn.addEventListener('click', function() {
            var traitsData = host.getAttribute('data-traits');
            var traits     = traitsData ? JSON.parse(traitsData) : {};
            var tiersRaw   = host.getAttribute('data-trait-tiers');
            var tiers      = tiersRaw ? JSON.parse(tiersRaw) : ['Mythic','Legendary','Epic','Rare'];
            makeModal('Traits', tiers, traits, function(trait) {
                state.trait = trait;
                traitsBtn.textContent = trait ? 'Trait: ' + trait.Name : 'Traits';
                traitsBtn.classList.toggle('active', !!trait);
                renderRows(rowsPanel, unit.Upgrade, state, unit);
            });
        });

        var gearBtn = el('button','arx-btn arx-btn-modal','Gear');
        gearBtn.addEventListener('click', function() {
            var gearRaw  = unit._gearModal || host.getAttribute('data-gear');
            var gear     = gearRaw ? JSON.parse(gearRaw) : {};
            var slotsRaw = host.getAttribute('data-gear-slots');
            var slots    = slotsRaw ? JSON.parse(slotsRaw) : ['Head','Body','Arms','Legs'];
            makeModalMulti('Gear', slots, gear, state.gearSelections, function(slot, item) {
                state.gearSelections[slot] = item;
                var hasAny = Object.keys(state.gearSelections).some(function(k){return state.gearSelections[k];});
                gearBtn.classList.toggle('active', hasAny);
                renderRows(rowsPanel, unit.Upgrade, state, unit);
            });
        });

        rightCtrls.appendChild(traitsBtn);
        rightCtrls.appendChild(gearBtn);
        controls.appendChild(leftCtrls);
        controls.appendChild(rightCtrls);
        sheet.appendChild(controls);

        var rowsPanel = el('div','arx-rows');
        sheet.appendChild(rowsPanel);
        renderRows(rowsPanel, unit.Upgrade, state, unit);

        container.appendChild(sheet);
        renderPassive(container, unit);
    }

    function makeModalItem(trait, col, sel, onSelect) {
        var item   = document.createElement('div');
        item.className = 'arx-modal-item';
        var imgEl  = document.createElement('img');
        imgEl.className = 'arx-modal-item-icon';
        imgEl.src  = WIKI_FILE_BASE + trait.Img;
        imgEl.alt  = trait.Name;
        imgEl.onerror = function() { imgEl.style.display='none'; };
        var info   = document.createElement('div');
        info.className = 'arx-modal-item-info';
        var nameEl = document.createElement('span');
        nameEl.className   = 'arx-modal-item-name';
        nameEl.textContent = trait.Name;
        var fxEl   = document.createElement('span');
        fxEl.className   = 'arx-modal-item-effect';
        fxEl.textContent = trait.Effect;
        info.appendChild(nameEl);
        info.appendChild(fxEl);
        item.appendChild(imgEl);
        item.appendChild(info);
        item.addEventListener('click', function() {
            if (sel.current && sel.current !== item) sel.current.classList.remove('selected');
            if (sel.current === item) {
                item.classList.remove('selected');
                sel.current = null;
                onSelect(null);
            } else {
                item.classList.add('selected');
                sel.current = item;
                onSelect(trait);
            }
        });
        col.appendChild(item);
    }

    function buildModalShell(title) {
        var overlay = el('div','arx-modal-overlay');
        var panel   = el('div','arx-modal');
        var close   = el('button','arx-modal-close','✕');
        function closeModal() {
            panel.classList.remove('visible');
            overlay.classList.remove('visible');
            setTimeout(function() { overlay.remove(); }, 250);
        }
        close.addEventListener('click', closeModal);
        overlay.addEventListener('click', function(e) { if (e.target===overlay) closeModal(); });
        panel.addEventListener('click', function(e) { e.stopPropagation(); });
        panel.appendChild(close);
        panel.appendChild(el('h2','arx-modal-title', title));
        overlay.appendChild(panel);
        document.body.appendChild(overlay);
        setTimeout(function() {
            overlay.classList.add('visible');
            panel.classList.add('visible');
        }, 16);
        return { panel: panel };
    }

    function makeModal(title, columns, data, onSelect) {
        var shell = buildModalShell(title);
        var grid  = el('div','arx-modal-grid');
        var sel   = { current: null };
        columns.forEach(function(colName) {
            var c = el('div','arx-modal-col');
            c.appendChild(el('div','arx-modal-col-title', colName));
            var items = data && data[colName] && Array.isArray(data[colName]) ? data[colName] : [];
            if (items.length === 0) {
                for (var i=1; i<=5; i++) {
                    makeModalItem({Name:'Placeholder '+i,Img:'',Effect:'',Mult:{}}, c, sel, onSelect||function(){});
                }
            } else {
                items.forEach(function(trait) {
                    makeModalItem(trait, c, sel, onSelect||function(){});
                });
            }
            grid.appendChild(c);
        });
        shell.panel.appendChild(grid);
    }

    function makeModalMulti(title, columns, data, prevSelections, onSelect) {
        var shell = buildModalShell(title);
        var grid  = el('div','arx-modal-grid');
        columns.forEach(function(colName) {
            var c   = el('div','arx-modal-col');
            var sel = { current: null };
            c.appendChild(el('div','arx-modal-col-title', colName));
            var items = data && data[colName] && Array.isArray(data[colName]) ? data[colName] : [];
            function addItem(trait) {
                var item   = document.createElement('div');
                item.className = 'arx-modal-item';
                var imgEl  = document.createElement('img');
                imgEl.className = 'arx-modal-item-icon';
                imgEl.src  = WIKI_FILE_BASE + trait.Img;
                imgEl.alt  = trait.Name;
                imgEl.onerror = function() { imgEl.style.display='none'; };
                var info   = document.createElement('div');
                info.className = 'arx-modal-item-info';
                var nameEl = document.createElement('span');
                nameEl.className   = 'arx-modal-item-name';
                nameEl.textContent = trait.Name;
                var fxEl   = document.createElement('span');
                fxEl.className   = 'arx-modal-item-effect';
                fxEl.textContent = trait.Effect || '';
                info.appendChild(nameEl);
                info.appendChild(fxEl);
                item.appendChild(imgEl);
                item.appendChild(info);
                if (prevSelections[colName] && prevSelections[colName].Name === trait.Name) {
                    item.classList.add('selected');
                    sel.current = item;
                }
                item.addEventListener('click', function() {
                    if (sel.current && sel.current !== item) sel.current.classList.remove('selected');
                    if (sel.current === item) {
                        item.classList.remove('selected');
                        sel.current = null;
                        onSelect(colName, null);
                    } else {
                        item.classList.add('selected');
                        sel.current = item;
                        onSelect(colName, trait);
                    }
                });
                c.appendChild(item);
            }
            if (items.length === 0) {
                for (var i=1; i<=5; i++) {
                    addItem({Name:'Placeholder '+i,Img:'',Effect:'',Mult:{}});
                }
            } else {
                items.forEach(addItem);
            }
            grid.appendChild(c);
        });
        shell.panel.appendChild(grid);
    }

    function buildWidget(host) {
        var unitKey = host.getAttribute('data-unit');
        var error   = host.getAttribute('data-error');
        var payload = host.getAttribute('data-payload');
        if (!unitKey) { host.textContent = 'No unit specified.'; return; }
        if (error)    { host.textContent = 'Error: ' + error; return; }
        if (!payload) { host.textContent = 'No data found for: ' + unitKey; return; }

        var configRaw = host.getAttribute('data-config');
        if (configRaw) {
            var cfg = JSON.parse(configRaw);
            LEVEL_MULTI   = cfg.LevelMulti   || {};
            STAT_MULTI    = cfg.StatMulti     || {};
            RARITY_COLORS = cfg.RarityColors  || {};
            STAT_ICONS    = cfg.StatIcons     || {};
            LEVEL_BUTTONS = cfg.LevelButtons  || ['50','100'];
            STAT_BUTTONS  = cfg.StatButtons   || ['O-','O','O+'];
        }

        try {
            var unit = JSON.parse(payload);
            renderWidget(host, unitKey, unit);
        } catch(e) {
            host.textContent = 'Error parsing unit data: ' + e.message;
        }
    }

    function renderWidget(host, unitKey, unit) {
        var goldImg      = host.getAttribute('data-gold-img') || 'Gold.png';
        var groupKeysRaw = host.getAttribute('data-group-keys');
        var groupDataRaw = host.getAttribute('data-group-data');
        var groupKeys    = groupKeysRaw ? JSON.parse(groupKeysRaw) : [unitKey];
        var groupData    = groupDataRaw ? JSON.parse(groupDataRaw) : {};

        var container = el('div','arx-widget-container');

        if (groupKeys.length > 1) {
            var tabBar = el('div','arx-tab-bar');
            groupKeys.forEach(function(key) {
                var gd   = groupData[key] || {};
                var name = gd.displayname || key;
                var tab  = el('button','arx-tab', name);
                if (key === unitKey) tab.classList.add('active');
                tab.addEventListener('click', function() {
                    if (tab.classList.contains('active')) return;
                    Array.prototype.forEach.call(tabBar.children, function(t){ t.classList.remove('active'); });
                    tab.classList.add('active');
                    while (container.children.length > 1) {
                        container.removeChild(container.lastChild);
                    }
                    var u = JSON.parse(gd.payload || '{}');
                    u._evolveJson = gd.evolve || null;
                    u._gearRec    = gd.gearRec || '[]';
                    u._gearModal  = gd.gear || '{}';
                    renderUnitContent(container, u, key, goldImg, host);
                });
                tabBar.appendChild(tab);
            });
            container.appendChild(tabBar);
        }

        var evolveRaw  = host.getAttribute('data-evolve');
        var gearRecRaw = host.getAttribute('data-gear-rec');
        unit._evolveJson = evolveRaw;
        unit._gearRec    = gearRecRaw;
        unit._gearModal  = host.getAttribute('data-gear');

        renderUnitContent(container, unit, unitKey, goldImg, host);

        host.innerHTML = '';
        host.appendChild(container);
    }

    function init() {
        var hosts = document.querySelectorAll('.arx-unit-widget');
        Array.prototype.forEach.call(hosts, buildWidget);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();