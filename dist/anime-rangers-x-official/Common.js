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

    function calcStats(u, state, unit) {
        var lm = state.level ? LEVEL_MULTI[state.level] : 1;
        var sm = state.stat  ? STAT_MULTI[state.stat]   : { dmg:1, hp:1, rng:1, spd:1, acd:1 };
        var tm = state.trait ? state.trait.Mult          : {};
        var gm = {};
        Object.keys(state.gearSelections).forEach(function(slot) {
            var g = state.gearSelections[slot];
            if (g && g.Mult) {
                Object.keys(g.Mult).forEach(function(stat) {
                    if (stat === 'cc' || stat === 'cd_dmg' || stat === 'admg') {
                        gm[stat] = (gm[stat] || 0) + g.Mult[stat];
                    } else {
                        gm[stat] = (gm[stat] || 1) * g.Mult[stat];
                    }
                });
            }
        });

        var dmg  = (u.Damage          || 0) * lm * (sm.dmg||1) * (tm.dmg||1) * (gm.dmg||1);
        var hp   = (u.Health          || 0) * lm * (sm.hp ||1) * (tm.hp ||1) * (gm.hp ||1);
        var cd   = (u.AttackCooldown  || 1)      * (sm.acd||1) * (tm.cd ||1) * (gm.cd ||1);
        var rng  = (u.Range           || 0)      * (sm.rng||1) * (tm.rng||1) * (gm.rng||1);
        var spd  = (u.Speed           || 0)      * (sm.spd||1) * (tm.spd||1) * (gm.spd||1);
        var acd        = (unit ? (unit.AbilityCooldown || 0) : 0) * (tm.acd||1) * (gm.acd||1);
        var scd  = (u.SendCooldown    || 0)      * (sm.scd||1)               * (gm.scd||1);
        var cost = (u.Cost            || 0)                    * (tm.cost||1) * (gm.cost||1);

        var baseAdmg   = (unit ? (unit.AbilityDamage   || 0) : 0);
        var admgBonus = (tm.admg || 0) + (gm.admg || 0);
        var admgMult  = 1 + (baseAdmg + admgBonus) / 100;

        var critChance = (unit ? (unit.CriticalChance  || 0) : 0) + (gm.cc     || 0);
        var critDamage = (unit ? (unit.CriticalDamage  || 0) : 0) + (gm.cd_dmg || 0);
        var critMult   = 1 + (critChance / 100) * (critDamage / 100);
        var dmgFinal   = dmg * critMult;
        var admgFinal  = dmgFinal * admgMult;

        var dps      = cd  > 0 ? dmgFinal  / cd  : 0;
        var admgDps  = acd > 0 ? admgFinal / acd : 0;
        var totalDps = dps + admgDps;

        return { dmg:dmgFinal, hp:hp, cd:cd, rng:rng, spd:spd, admg:admgFinal, acd:acd, scd:scd, cost:cost, dps:dps, totalDps:totalDps };
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
            var s = calcStats(u, state, unit);

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
            pills.appendChild(makePill('hp',   'Health.png',           fmt(s.hp)));
            pills.appendChild(makePill('dmg',  'Damage.png',           fmt(s.dmg)));
            pills.appendChild(makePill('cd',   'Cooldown.png',         fmtCd(s.cd) + 's'));
            pills.appendChild(makePill('rng',  'Range.png',            fmt(s.rng)));
            pills.appendChild(makePill('spd',  'Speed.png',            fmt(s.spd)));
            pills.appendChild(makePill('admg', 'AbilityDamage.png',    fmt(s.admg)));
            pills.appendChild(makePill('acd',  'AbilityCooldown.png',  fmtCd(s.acd) + 's'));
            row.appendChild(pills);

            var foot = el('div','arx-row-foot');
            if (u.Note) foot.appendChild(el('span','arx-note', u.Note));
            var dpsEl = el('span','arx-dps');
            dpsEl.innerHTML = 'DPS: <b>' + fmt(s.totalDps) + '/s</b>';
            foot.appendChild(dpsEl);
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
                var iImg = document.createElement('img');
                iImg.src = WIKI_FILE_BASE + icon;
                iImg.alt = label;
                iImg.className = 'arx-detail-icon-img';
                iImg.onerror = function() { iImg.style.display='none'; };
                ic.appendChild(iImg);
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
        perfList.appendChild(perfRow('Cost.png',             'Cost',             '¥ '+fmt(unit.Cost||0),                              null));
        perfList.appendChild(perfRow('SendCooldown.png',     'Send Cooldown',    (unit.SendCooldown||0)+'s',                          null));
        perfList.appendChild(perfRow('LimitSpawn.png',       'Limit Spawn',      (unit.SpawnCap||0)+' (Unit)',                        null));
        perfList.appendChild(perfRow('Health.png',           'Health',           fmt(baseU.Health||0),           fmt(maxU.Health||0)));
        perfList.appendChild(perfRow('Damage.png',           'Damage',           fmt(baseU.Damage||0),           fmt(maxU.Damage||0)));
        perfList.appendChild(perfRow('Cooldown.png',         'Cooldown',         fmtCd(baseU.AttackCooldown||0)+'s', fmtCd(maxU.AttackCooldown||0)+'s'));
        perfList.appendChild(perfRow('Range.png',            'Range',            fmt(baseU.Range||0),            fmt(maxU.Range||0)));
        perfList.appendChild(perfRow('Speed.png',            'Speed',            fmt(baseU.Speed||0),            fmt(maxU.Speed||0)));
        perfList.appendChild(perfRow('Accuracy.png',         'Accuracy',         (unit.Accuracy||0)+'%',                              null));
        perfList.appendChild(perfRow('CritChance.png',       'Crit Chance',      (unit.CriticalChance||0)+'%',                        null));
        perfList.appendChild(perfRow('CritDamage.png',       'Crit Damage',      (unit.CriticalDamage||0)+'%',                        null));
        perfList.appendChild(perfRow('AbilityDamage.png',    'Ability Damage',   (unit.AbilityDamage||0)+'%',                         null));
        perfList.appendChild(perfRow('AbilityCooldown.png',  'Ability Cooldown', fmtCd(unit.AbilityCooldown||0)+'s',                  null));
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
            noEvolve.innerHTML = '<i><b>' + mw.html.escape(displayName) + '</b> does not evolve.</i>';
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
        info.textContent = unit.Passive.Info;
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

/* === ARX Unit Navigation Widget === */
(function () {
    var WIKI_BASE = 'https://anime-rangers-x-official.fandom.com/wiki/';
    var FILE_BASE = 'https://anime-rangers-x-official.fandom.com/wiki/Special:FilePath/';

    var RARITY_ORDER = ['Ranger','Singularity','Exclusive','Secret','Mythic','Legendary','Epic','Rare'];

    function makeCard(u) {
        var rarityClass = u.rarity.toLowerCase() + '-ranger-card';
        var pageName = u.name.replace(/ /g, '_');

        var card = document.createElement('a');
        card.href = WIKI_BASE + pageName;
        card.className = rarityClass;
        card.style.textDecoration = 'none';
        card.style.display = 'inline-block';
        card.setAttribute('data-name', u.name.toLowerCase());
        card.setAttribute('data-rarity', u.rarity.toLowerCase());

        var img = document.createElement('img');
        img.className = 'ranger-image';
        img.src = FILE_BASE + u.img;
        img.alt = u.name;
        img.onerror = function() { img.style.opacity = '0.3'; };

        var name = document.createElement('div');
        name.className = 'ranger-name';
        name.textContent = u.name;

        card.appendChild(img);
        card.appendChild(name);
        return card;
    }

    function buildNav(host) {
        var raw = host.getAttribute('data-units');
        if (!raw) return;
        var units;
        try { units = JSON.parse(raw); } catch(e) { return; }

        units.sort(function(a, b) { return a.name.localeCompare(b.name); });

        var byRarity = {};
        RARITY_ORDER.forEach(function(r) { byRarity[r] = { evo: [], normal: [] }; });
        units.forEach(function(u) {
            var r = u.rarity;
            if (!byRarity[r]) byRarity[r] = { evo: [], normal: [] };
            if (u.evo) byRarity[r].evo.push(u);
            else byRarity[r].normal.push(u);
        });

        var container = document.createElement('div');
        container.className = 'arx-nav-container';

        var searchWrap = document.createElement('div');
        searchWrap.className = 'arx-nav-search-wrap';
        var searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.placeholder = 'Type unit name...';
        searchInput.className = 'arx-nav-search';
        searchWrap.appendChild(searchInput);
        container.appendChild(searchWrap);

        var tabBar = document.createElement('div');
        tabBar.className = 'arx-nav-tab-bar';
        container.appendChild(tabBar);

        var panelsWrap = document.createElement('div');

        var searchPanel = document.createElement('div');
        searchPanel.className = 'arx-nav-search-results';
        searchPanel.style.display = 'none';
        var searchGrid = document.createElement('div');
        searchGrid.className = 'arx-nav-grid';
        searchPanel.appendChild(searchGrid);
        panelsWrap.appendChild(searchPanel);

        var firstTab = null;
        var allPanels = [];
        var allTabs   = [];

        RARITY_ORDER.forEach(function(rarity) {
            var group = byRarity[rarity];
            if (!group || (group.evo.length === 0 && group.normal.length === 0)) return;

            var tab = document.createElement('div');
            tab.className = 'arx-nav-tab';
            tab.textContent = rarity;
            tab.setAttribute('data-rarity', rarity.toLowerCase());
            tabBar.appendChild(tab);
            allTabs.push(tab);
            if (!firstTab) firstTab = tab;

            var panel = document.createElement('div');
            panel.className = 'arx-nav-panel-content';
            panel.setAttribute('data-panel', rarity.toLowerCase());

            var hasBoth = group.evo.length > 0 && group.normal.length > 0;

            if (hasBoth) {
                var subTabBar = document.createElement('div');
                subTabBar.className = 'arx-nav-subtab-bar';
                panel.appendChild(subTabBar);

                var subTabs   = [];
                var subPanels = [];

                ['Evolved', 'Normal'].forEach(function(subName) {
                    var subTab = document.createElement('div');
                    subTab.className = 'arx-nav-subtab';
                    subTab.textContent = subName;
                    subTabBar.appendChild(subTab);
                    subTabs.push(subTab);

                    var subPanel = document.createElement('div');
                    subPanel.className = 'arx-nav-subpanel';
                    var grid = document.createElement('div');
                    grid.className = 'arx-nav-grid';
                    var items = subName === 'Evolved' ? group.evo : group.normal;
                    items.forEach(function(u) { grid.appendChild(makeCard(u)); });
                    subPanel.appendChild(grid);
                    panel.appendChild(subPanel);
                    subPanels.push(subPanel);

                    subTab.addEventListener('click', function() {
                        subTabs.forEach(function(t) { t.classList.remove('active'); });
                        subPanels.forEach(function(p) { p.style.display = 'none'; });
                        subTab.classList.add('active');
                        subPanel.style.display = 'block';
                    });
                });

                subTabs[0].click();

            } else {
                var onlyItems = group.evo.length > 0 ? group.evo : group.normal;
                var grid = document.createElement('div');
                grid.className = 'arx-nav-grid';
                onlyItems.forEach(function(u) { grid.appendChild(makeCard(u)); });
                panel.appendChild(grid);
            }

            panelsWrap.appendChild(panel);
            allPanels.push(panel);

            tab.addEventListener('click', function() {
                searchInput.value = '';
                searchPanel.style.display = 'none';
                allTabs.forEach(function(t) { t.classList.remove('active'); });
                allPanels.forEach(function(p) { p.style.display = 'none'; });
                tab.classList.add('active');
                panel.style.display = 'block';
            });
        });

        container.appendChild(panelsWrap);

        searchInput.addEventListener('input', function() {
            var query = searchInput.value.trim().toLowerCase();
            if (!query) {
                searchPanel.style.display = 'none';
                var activeTab = tabBar.querySelector('.arx-nav-tab.active');
                if (activeTab) {
                    var rPanel = panelsWrap.querySelector('[data-panel="' + activeTab.getAttribute('data-rarity') + '"]');
                    if (rPanel) rPanel.style.display = 'block';
                }
                return;
            }
            allPanels.forEach(function(p) { p.style.display = 'none'; });
            searchGrid.innerHTML = '';
            units.forEach(function(u) {
                if (u.name.toLowerCase().indexOf(query) !== -1) {
                    searchGrid.appendChild(makeCard(u));
                }
            });
            searchPanel.style.display = 'block';
        });

        host.innerHTML = '';
        host.appendChild(container);

        if (firstTab) firstTab.click();
    }

    function init() {
        var navs = document.querySelectorAll('.arx-unit-nav');
        Array.prototype.forEach.call(navs, buildNav);
    }

    if (document.readyState === 'loading') {a
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();


/* === ARX Item Navigation Widget === */
(function () {
    var FILE_BASE = 'https://anime-rangers-x-official.fandom.com/wiki/Special:FilePath/';
    var soulTiersCache = null;
    var RARITY_ORDER = { Singularity:1, Exclusive:2, Secret:3, Mythic:4, Legendary:5, Epic:6, Rare:7 };

    function fetchSoulTiers(callback) {
        if (soulTiersCache) { callback(soulTiersCache); return; }
        fetch('/api.php?action=query&prop=revisions&titles=Module:ItemData%2FSouls&rvprop=content&rvslots=main&format=json&origin=*')
            .then(function(r) { return r.json(); })
            .then(function(data) {
                var pages = data.query.pages;
                var page = pages[Object.keys(pages)[0]];
                var content = page.revisions[0].slots.main['*'];
                var result = {};
                var soulRe = /\["([^"]+)"\]\s*=\s*\{([\s\S]*?)\},?\s*(?=\["|^return)/g;
                var m;
                while ((m = soulRe.exec(content)) !== null) {
                    var soulName = m[1];
                    var block = m[2];
                    var tiers = [];
                    if (block.indexOf('Tiers') !== -1) {
                        var tiersBlockMatch = block.match(/Tiers\s*=\s*\{([\s\S]*?)\}/);
                        if (tiersBlockMatch) {
                            var tiersBlock = tiersBlockMatch[1];
                            var tr = /\[(\d+)\]\s*=\s*"([\s\S]*?)(?<!\\)",?/g;
                            var tm;
                            while ((tm = tr.exec(tiersBlock)) !== null) {
                                tiers.push({ tier: parseInt(tm[1]), text: tm[2] });
                            }
                        }
                    }
                    result[soulName] = tiers;
                }
                soulTiersCache = result;
                callback(result);
            })
            .catch(function() { callback({}); });
    }

    function getInitials(name) {
        var words = name.split(/\s+/);
        var out = "";
        for (var i = 0; i < words.length; i++) {
            if (words[i]) out += words[i].charAt(0);
            if (out.length >= 2) break;
        }
        return out.toUpperCase();
    }

    function makeThumb(imgFile, name, cls) {
        var span = document.createElement('span');
        span.className = cls;
        if (imgFile) {
            if (!imgFile.match(/\.\w+$/)) imgFile += '.png';
            var img = document.createElement('img');
            img.src = FILE_BASE + encodeURIComponent(imgFile);
            img.alt = name;
            img.onerror = function() { img.style.display = 'none'; };
            span.appendChild(img);
        }
        var initials = document.createElement('span');
        initials.className = 'arxif-initials';
        initials.textContent = getInitials(name);
        span.appendChild(initials);
        return span;
    }

    function renderTiers(tiers, body) {
        if (!tiers || tiers.length === 0) return;
        var fTiers = document.createElement('div');
        fTiers.className = 'arxif-field arxif-tiers-field';

        var tiersLabel = document.createElement('div');
        tiersLabel.className = 'arxif-label';
        tiersLabel.textContent = 'Tiers';
        fTiers.appendChild(tiersLabel);

        var tabbar = document.createElement('div');
        tabbar.className = 'arxif-tier-tabbar';

        var contentArea = document.createElement('div');
        contentArea.className = 'arxif-tier-content';

        var activeTab = null;
        var activeContent = null;

        tiers.forEach(function(t) {
            var tab = document.createElement('button');
            tab.className = 'arxif-tier-tab';
            tab.textContent = t.tier === 0 ? 'Base' : t.tier.toString();

            var content = document.createElement('div');
            content.className = 'arxif-tier-panel';
            content.textContent = t.text;
            content.style.display = 'none';

            tab.addEventListener('click', function() {
                if (activeTab) activeTab.classList.remove('arxif-tier-tab-active');
                if (activeContent) activeContent.style.display = 'none';
                tab.classList.add('arxif-tier-tab-active');
                content.style.display = 'block';
                activeTab = tab;
                activeContent = content;
            });

            tabbar.appendChild(tab);
            contentArea.appendChild(content);
        });

        fTiers.appendChild(tabbar);
        fTiers.appendChild(contentArea);
        body.appendChild(fTiers);

        if (tabbar.firstChild) tabbar.firstChild.click();
    }

    function showPopup(it, catKey, catLabel) {
        var existing = document.getElementById('arxif-active-popup');
        if (existing) existing.remove();

        var overlay = document.createElement('div');
        overlay.id = 'arxif-active-popup';
        overlay.className = 'arxif-overlay arxif-cat-' + catKey + ' arxif-rar-' + it.rarity;

        var backdrop = document.createElement('div');
        backdrop.className = 'arxif-backdrop';
        overlay.appendChild(backdrop);

        var popup = document.createElement('div');
        popup.className = 'arxif-popup';

        var close = document.createElement('button');
        close.className = 'arxif-close';
        close.innerHTML = '&#10005;';

        function hidePopup() { overlay.remove(); }
        close.addEventListener('click', hidePopup);
        backdrop.addEventListener('click', hidePopup);

        popup.appendChild(close);

        var header = document.createElement('div');
        header.className = 'arxif-pop-header';
        header.appendChild(makeThumb(it.img, it.name, 'arxif-pop-thumb'));

        var popName = document.createElement('div');
        popName.className = 'arxif-pop-name';
        popName.textContent = it.name;
        header.appendChild(popName);

        var chips = document.createElement('div');
        chips.className = 'arxif-chips';
        if (it.rarity) {
            var rChip = document.createElement('span');
            rChip.className = 'arxif-chip arxif-chip-rar';
            rChip.textContent = it.rarity;
            chips.appendChild(rChip);
        }
        var cChip = document.createElement('span');
        cChip.className = 'arxif-chip arxif-chip-cat';
        cChip.textContent = catLabel;
        chips.appendChild(cChip);
        header.appendChild(chips);
        popup.appendChild(header);

        var body = document.createElement('div');
        body.className = 'arxif-pop-body';

        if (it.obtainment) {
            var fObt = document.createElement('div');
            fObt.className = 'arxif-field';
            fObt.innerHTML = '<div class="arxif-label">Obtainment</div><div class="arxif-value">' + mw.html.escape(it.obtainment) + '</div>';
            body.appendChild(fObt);
        }
        if (it.description) {
            var fDesc = document.createElement('div');
            fDesc.className = 'arxif-field';
            fDesc.innerHTML = '<div class="arxif-label">Description</div><div class="arxif-value">' + mw.html.escape(it.description) + '</div>';
            body.appendChild(fDesc);
        }

        if (it.tiers && it.tiers.length > 0) {
            renderTiers(it.tiers, body);
        } else if (catKey === 'Souls' || catKey === 'Soul') {
            var loadingDiv = document.createElement('div');
            loadingDiv.className = 'arxif-field';
            loadingDiv.innerHTML = '<div class="arxif-label">Tiers</div><div class="arxif-value arxif-loading">Loading...</div>';
            body.appendChild(loadingDiv);
            fetchSoulTiers(function(tiersMap) {
                loadingDiv.remove();
                renderTiers(tiersMap[it.name] || [], body);
            });
        }

        if (it.usedFor) {
            var uf = document.createElement('div');
            uf.className = 'arxif-usedfor';
            uf.textContent = (it.catKey === 'EvoMaterial' ? 'Used for evolving ' : 'Used for ') + it.usedFor + '.';
            body.appendChild(uf);
        }
        if (it.pity && it.pity > 0) {
            var pw = document.createElement('div');
            pw.className = 'arxif-pity-wrap';
            pw.innerHTML = '<span class="arxif-pity">Pity: ' + mw.html.escape(it.pity) + '</span>';
            body.appendChild(pw);
        }

        popup.appendChild(body);
        overlay.appendChild(popup);
        document.body.appendChild(overlay);

        setTimeout(function() { overlay.classList.add('arxif-visible'); }, 16);
    }

    function makeCard(it, catKey, catLabel) {
        var card = document.createElement('div');
        card.className = 'arxif-card arxif-rar-' + it.rarity;
        card.setAttribute('data-name', it.name.toLowerCase());
        card.appendChild(makeThumb(it.img, it.name, 'arxif-thumb'));

        var nameSpan = document.createElement('span');
        nameSpan.className = 'arxif-card-name';
        nameSpan.textContent = it.name;
        card.appendChild(nameSpan);

        card.addEventListener('click', function() {
            showPopup(it, catKey, catLabel);
        });

        return card;
    }

    function buildItemNav(host) {
        var raw = host.getAttribute('data-payload');
        if (!raw) return;
        var data;
        try { data = JSON.parse(raw); } catch(e) { return; }
        var cats = data.categories || data || [];

        cats.forEach(function(c) {
            c.items.sort(function(a, b) {
                var ra = RARITY_ORDER[a.rarity] || 99;
                var rb = RARITY_ORDER[b.rarity] || 99;
                if (ra !== rb) return ra - rb;
                return a.name < b.name ? -1 : 1;
            });
        });

        var allItems = [];
        cats.forEach(function(c) {
            c.items.forEach(function(it) {
                it.catKey   = c.key;
                it.catLabel = c.label;
                allItems.push(it);
            });
        });

        allItems.sort(function(a, b) {
            var ra = RARITY_ORDER[a.rarity] || 99;
            var rb = RARITY_ORDER[b.rarity] || 99;
            if (ra !== rb) return ra - rb;
            return a.name < b.name ? -1 : 1;
        });

        var root = document.createElement('div');
        root.className = 'arxif-root';

        var searchWrap = document.createElement('div');
        searchWrap.className = 'arxif-search-wrap';
        var searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.className = 'arxif-search';
        searchInput.placeholder = 'Search for an item...';
        searchWrap.appendChild(searchInput);
        root.appendChild(searchWrap);

        var tabbar = document.createElement('div');
        tabbar.className = 'arxif-tabbar';

        var allTabsRefs   = [];
        var allPanelsRefs = [];

        var allTab = document.createElement('a');
        allTab.className = 'arxif-tab arxif-tab-all arxif-active';
        allTab.href = 'javascript:void(0);';
        allTab.innerHTML = '<span class="arxif-tab-dot"></span>All<span class="arxif-count">' + Number(allItems.length) + '</span>';
        tabbar.appendChild(allTab);
        allTabsRefs.push(allTab);

        var panelsContainer = document.createElement('div');
        panelsContainer.className = 'arxif-panels';

        var allPanel = document.createElement('div');
        allPanel.className = 'arxif-panel arxif-panel-all arxif-active';
        allPanelsRefs.push(allPanel);

        function switchTab(targetTab, targetPanel) {
            allTabsRefs.forEach(function(t)   { t.classList.remove('arxif-active'); });
            allPanelsRefs.forEach(function(p) { p.classList.remove('arxif-active'); });
            targetTab.classList.add('arxif-active');
            targetPanel.classList.add('arxif-active');
        }

        allTab.addEventListener('click', function(e) {
            e.preventDefault();
            switchTab(allTab, allPanel);
        });

        cats.forEach(function(cat) {
            var tab = document.createElement('a');
            tab.className = 'arxif-tab arxif-cat-' + cat.key;
            tab.href = 'javascript:void(0);';
            tab.innerHTML = '<span class="arxif-tab-dot"></span>' + mw.html.escape(cat.label) + '<span class="arxif-count">' + Number(cat.items.length) + '</span>';
            tabbar.appendChild(tab);
            allTabsRefs.push(tab);

            var panel = document.createElement('div');
            panel.className = 'arxif-panel';
            allPanelsRefs.push(panel);

            tab.addEventListener('click', function(e) {
                e.preventDefault();
                switchTab(tab, panel);
            });

            var section = document.createElement('div');
            section.className = 'arxif-section';
            var secTitle = document.createElement('div');
            secTitle.className = 'arxif-section-title arxif-cat-' + cat.key;
            secTitle.innerHTML = '<span class="arxif-secdot"></span>' + mw.html.escape(cat.label) + '<span class="arxif-count">' + Number(cat.items.length) + '</span>';
            section.appendChild(secTitle);

            var grid = document.createElement('div');
            grid.className = 'arxif-grid';
            cat.items.forEach(function(it) { grid.appendChild(makeCard(it, cat.key, cat.label)); });
            section.appendChild(grid);
            allPanel.appendChild(section);

            var specificGrid = document.createElement('div');
            specificGrid.className = 'arxif-grid';
            cat.items.forEach(function(it) { specificGrid.appendChild(makeCard(it, cat.key, cat.label)); });
            panel.appendChild(specificGrid);
        });

        root.appendChild(tabbar);
        panelsContainer.appendChild(allPanel);
        allPanelsRefs.forEach(function(p) {
            if (!p.classList.contains('arxif-panel-all')) panelsContainer.appendChild(p);
        });
        root.appendChild(panelsContainer);

        var resultsPanel = document.createElement('div');
        resultsPanel.className = 'arxif-results';
        var resultsGrid = document.createElement('div');
        resultsGrid.className = 'arxif-grid';

        var searchCardsRefs = [];
        allItems.forEach(function(it) {
            var card = makeCard(it, it.catKey, it.catLabel);
            resultsGrid.appendChild(card);
            searchCardsRefs.push(card);
        });

        var noResults = document.createElement('div');
        noResults.className = 'arxif-noresults';
        noResults.textContent = 'No items found.';
        noResults.style.display = 'none';
        resultsGrid.appendChild(noResults);
        resultsPanel.appendChild(resultsGrid);
        root.appendChild(resultsPanel);

        searchInput.addEventListener('input', function(e) {
            var term = e.target.value.toLowerCase().trim();
            if (term === "") {
                resultsPanel.style.display = 'none';
                panelsContainer.style.display = 'block';
                return;
            }
            panelsContainer.style.display = 'none';
            resultsPanel.style.display = 'block';
            var matches = 0;
            searchCardsRefs.forEach(function(card) {
                var name = card.getAttribute('data-name') || '';
                if (name.indexOf(term) !== -1) {
                    card.style.display = 'block';
                    matches++;
                } else {
                    card.style.display = 'none';
                }
            });
            noResults.style.display = (matches === 0) ? 'block' : 'none';
        });

        host.innerHTML = '';
        host.appendChild(root);
    }

    function initItemNav() {
        var hosts = document.querySelectorAll('.arx-item-nav-widget');
        Array.prototype.forEach.call(hosts, buildItemNav);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initItemNav);
    } else {
        initItemNav();
    }
})();