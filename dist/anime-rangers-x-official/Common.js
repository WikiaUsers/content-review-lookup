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

    var LEVEL_MULTI = { '50': 1.5625, '100': 2.25 };
    var STAT_MULTI = {
        'O-': { dmg:1.20, hp:1.20, rng:1.20, spd:1.20, acd:0.90 },
        'O':  { dmg:1.25, hp:1.25, rng:1.25, spd:1.25, acd:0.875 },
        'O+': { dmg:1.30, hp:1.30, rng:1.30, spd:1.30, acd:0.85  }
    };

    var RARITY_COLORS = {
        Rare:      { border:'#00BFFF', bg:'rgba(0,80,120,0.5)' },
        Epic:      { border:'#CC00FF', bg:'rgba(80,0,120,0.5)' },
        Legendary: { border:'#FFD700', bg:'rgba(120,90,0,0.5)' },
        Mythic:    { border:'#FF44FF', bg:'rgba(120,0,100,0.5)' },
        Secret:    { border:'#FF2200', bg:'rgba(120,0,0,0.5)'   }
    };

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

    function makePill(type, icon, value) {
        var p = el('div', 'arx-pill arx-pill-' + type);
        p.appendChild(el('span', 'arx-pill-icon', icon));
        p.appendChild(el('span', 'arx-pill-val', value));
        return p;
    }

    function renderRows(panel, upgrades, state) {
        panel.innerHTML = '';
        var keys = Object.keys(upgrades).map(Number).sort(function(a,b){return a-b;});
        keys.forEach(function(i) {
            var u = upgrades[i];
            if (!u) return;
            var s = calcStats(u, state);
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
            pills.appendChild(makePill('hp',  '♥',  fmt(s.hp)));
            pills.appendChild(makePill('dmg', '⚔',  fmt(s.dmg)));
            pills.appendChild(makePill('cd',  '⏳', fmtCd(s.cd)));
            pills.appendChild(makePill('rng', '🏹', fmt(s.rng)));
            pills.appendChild(makePill('spd', '👟', fmt(s.spd)));
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

    // ---- Gear card builder ----
    function makeGearCard(item) {
        var rc = RARITY_COLORS[item.Rarity] || RARITY_COLORS.Rare;
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

    // ---- Obtain section ----
    function renderObtain(container, obtain) {
        if (!obtain) return;
        var wrap = el('div','arx-info-section');
        wrap.appendChild(el('div','arx-info-title','HOW TO OBTAIN'));
        var box = el('div','arx-info-box');
        box.appendChild(el('p', null, obtain));
        wrap.appendChild(box);
        container.appendChild(wrap);
    }

    // ---- Evolve section ----
    function renderEvolve(container, evolveData, goldImg, displayName) {
        var wrap = el('div','arx-info-section');
        wrap.appendChild(el('div','arx-info-title','EVOLVE REQUIREMENTS'));
        var box = el('div','arx-info-box');

        if (!evolveData || !evolveData.EvolveTo || evolveData.EvolveTo === '') {
            var noEvolve = el('p','arx-no-evolve');
            noEvolve.innerHTML = '<i><b>' + displayName + '</b> does not evolve.</i>';
            box.appendChild(noEvolve);
        } else {
            var layout = el('div','arx-evolve-layout');

            // Left: unit cards
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

            // Right: requirements
            var req = el('div','arx-evolve-req');
            req.appendChild(el('div','arx-evolve-req-title','Requirement'));

            var itemsGrid = el('div','arx-evolve-items');
            (evolveData.Items || []).forEach(function(item) {
                var ic   = el('div','arx-evolve-item');
                var iImg = document.createElement('img');
                iImg.src = WIKI_FILE_BASE + item.Img;
                iImg.alt = item.Name;
                iImg.onerror = function() { iImg.style.display='none'; };
                var qty = el('div','arx-evolve-item-qty', item.Qty + 'x');
                var nm  = el('div','arx-evolve-item-name', item.Name);
                ic.appendChild(iImg);
                ic.appendChild(qty);
                ic.appendChild(nm);
                itemsGrid.appendChild(ic);
            });
            req.appendChild(itemsGrid);

            // Gold
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

    // ---- Gear recommendation section ----
    function renderGearRec(container, gearRec) {
        if (!gearRec || gearRec.length === 0) return;
        var wrap = el('div','arx-info-section');
        wrap.appendChild(el('div','arx-info-title','GEAR RECOMMENDATION'));
        var box  = el('div','arx-info-box');
        var grid = el('div','arx-gear-rec-grid');
        gearRec.forEach(function(item) {
            grid.appendChild(makeGearCard(item));
        });
        box.appendChild(grid);
        wrap.appendChild(box);
        container.appendChild(wrap);
    }
    
    function renderPassive(container, unit) {
        if (!unit.Passive || !unit.Passive.Info) return;
        var wrap = el('div','arx-info-section');
        wrap.appendChild(el('div','arx-info-title','PASSIVE'));
        var box = el('div','arx-info-box');
        var info = document.createElement('p');
        info.innerHTML = unit.Passive.Info;
        box.appendChild(info);
        wrap.appendChild(box);
        container.appendChild(wrap);
    }
    
    // ---- Modal item builder ----
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
        nameEl.className  = 'arx-modal-item-name';
        nameEl.textContent = trait.Name;
        var fxEl   = document.createElement('span');
        fxEl.className  = 'arx-modal-item-effect';
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
                nameEl.className  = 'arx-modal-item-name';
                nameEl.textContent = trait.Name;
                var fxEl   = document.createElement('span');
                fxEl.className  = 'arx-modal-item-effect';
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
        try {
            var unit = JSON.parse(payload);
            renderWidget(host, unitKey, unit);
        } catch(e) {
            host.textContent = 'Error parsing unit data: ' + e.message;
        }
    }

    function renderWidget(host, unitKey, unit) {
        var state = { level:null, stat:null, trait:null, gearSelections:{} };

        var displayName = host.getAttribute('data-displayname') || unitKey;
        var obtain      = host.getAttribute('data-obtain') || '';
        var evolveRaw   = host.getAttribute('data-evolve');
        var evolveData  = evolveRaw ? JSON.parse(evolveRaw) : null;
        var goldImg     = host.getAttribute('data-gold-img') || 'Gold.png';
        var gearRecRaw  = host.getAttribute('data-gear-rec');
        var gearRec     = gearRecRaw ? JSON.parse(gearRecRaw) : [];

        var container = el('div','arx-widget-container');

        // ---- Obtain + Evolve + Gear Rec ----
        renderObtain(container, obtain);
        renderEvolve(container, evolveData, goldImg, displayName);
        renderGearRec(container, gearRec);

        // ---- Stats sheet ----
        var sheet = el('div','arx-sheet');
        sheet.appendChild(el('div','arx-sheet-header','UPGRADE STATS — ' + displayName));

        var controls   = el('div','arx-controls');
        var leftCtrls  = el('div','arx-controls-left');
        var rightCtrls = el('div','arx-controls-right');

        var lvlRow = el('div','arx-btn-row');
        ['50','100'].forEach(function(lv) {
            var b = el('button','arx-btn','Level ' + lv);
            b.addEventListener('click', function() {
                if (state.level === lv) { state.level=null; b.classList.remove('active'); }
                else {
                    state.level = lv;
                    Array.prototype.forEach.call(lvlRow.children, function(c){c.classList.remove('active');});
                    b.classList.add('active');
                }
                renderRows(rowsPanel, unit.Upgrade, state);
            });
            lvlRow.appendChild(b);
        });
        leftCtrls.appendChild(lvlRow);

        var statRow = el('div','arx-btn-row');
        ['O-','O','O+'].forEach(function(st) {
            var b = el('button','arx-btn','Stats ' + st);
            b.addEventListener('click', function() {
                if (state.stat === st) { state.stat=null; b.classList.remove('active'); }
                else {
                    state.stat = st;
                    Array.prototype.forEach.call(statRow.children, function(c){c.classList.remove('active');});
                    b.classList.add('active');
                }
                renderRows(rowsPanel, unit.Upgrade, state);
            });
            statRow.appendChild(b);
        });
        leftCtrls.appendChild(statRow);

        var traitsBtn = el('button','arx-btn arx-btn-modal','Traits');
        traitsBtn.addEventListener('click', function() {
            var traitsData  = host.getAttribute('data-traits');
            var traits      = traitsData ? JSON.parse(traitsData) : {};
            var tiersRaw    = host.getAttribute('data-trait-tiers');
            var tiers       = tiersRaw ? JSON.parse(tiersRaw) : ['Mythic','Legendary','Epic','Rare'];
            makeModal('Traits', tiers, traits, function(trait) {
                state.trait = trait;
                traitsBtn.textContent = trait ? 'Trait: ' + trait.Name : 'Traits';
                traitsBtn.classList.toggle('active', !!trait);
                renderRows(rowsPanel, unit.Upgrade, state);
            });
        });

        var gearBtn = el('button','arx-btn arx-btn-modal','Gear');
        gearBtn.addEventListener('click', function() {
            var gearData  = host.getAttribute('data-gear');
            var gear      = gearData ? JSON.parse(gearData) : {};
            var slotsRaw  = host.getAttribute('data-gear-slots');
            var slots     = slotsRaw ? JSON.parse(slotsRaw) : ['Head','Body','Arms','Legs'];
            makeModalMulti('Gear', slots, gear, state.gearSelections, function(slot, item) {
                state.gearSelections[slot] = item;
                var hasAny = Object.keys(state.gearSelections).some(function(k){return state.gearSelections[k];});
                gearBtn.classList.toggle('active', hasAny);
                renderRows(rowsPanel, unit.Upgrade, state);
            });
        });

        rightCtrls.appendChild(traitsBtn);
        rightCtrls.appendChild(gearBtn);
        controls.appendChild(leftCtrls);
        controls.appendChild(rightCtrls);
        sheet.appendChild(controls);

        var rowsPanel = el('div','arx-rows');
        sheet.appendChild(rowsPanel);
        renderRows(rowsPanel, unit.Upgrade, state);

        container.appendChild(sheet);
        renderPassive(container, unit);
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