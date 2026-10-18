

/* ===== LCTD Damage Calculator — mounts into <div class="lctd-calc" data-tower="..."></div> ===== */
(function () {
    'use strict';
    var IS_RU = (window.mw && mw.config.get('wgContentLanguage') === 'ru') || /\/ru\//.test(location.pathname);
    var BASE = IS_RU ? '/ru' : '';
    var L = IS_RU ? {
        head: '// DAMAGE CALCULATOR', tower: 'Башня', level: 'Уровень', enemy: 'Враг', platform: 'Платформа Вышки',
        none: 'Нет', regular: 'Обычные враги', nexus: 'Нексусы', bosses: 'Боссы',
        base: 'Базовый DPS', mult: 'Множитель', net: 'Чистый DPS', ttk: 'Время убийства', cost: 'Вложено', eff: 'DPS на ¤1000',
        sec: 'сек', hits: 'попад.', reloads: 'перезар.', delay: 'задержка', approx: 'Точные резисты этого врага неизвестны — результат приблизительный',
        immune: 'Иммунитет', weak: 'Уязвим', strong: 'Стоек', neutral: 'Нейтрально',
        types: {kinetic: 'Кинетический', hyper: 'Гиперскоростной', melee: 'Ближний бой', electric: 'Электрический', fire: 'Огонь', explosion: 'Взрыв', toxin: 'Токсин'},
        loading: 'Загрузка данных…', fail: 'Не удалось загрузить данные калькулятора.',
        note: 'Время считается с первого выстрела. Перезарядка магазина учитывается во времени убийства, но не в DPS. Без учёта брони по уровням волны, баффов союзников и особых эффектов. Бонус платформы Вышки доступен только Cliff-башням (Marksman).'
    } : {
        head: '// DAMAGE CALCULATOR', tower: 'Tower', level: 'Level', enemy: 'Enemy', platform: 'Watchtower platform',
        none: 'None', regular: 'Regular enemies', nexus: 'Nexuses', bosses: 'Bosses',
        base: 'Base DPS', mult: 'Multiplier', net: 'Net DPS', ttk: 'Time to kill', cost: 'Invested', eff: 'DPS per ¤1000',
        sec: 's', hits: 'hits', reloads: 'reloads', delay: 'delay', approx: 'Exact resistances for this enemy are unknown — the result is approximate',
        immune: 'Immune', weak: 'Weak', strong: 'Resistant', neutral: 'Neutral',
        types: {kinetic: 'Kinetic', hyper: 'Hypervelocity', melee: 'Melee', electric: 'Electric', fire: 'Fire', explosion: 'Explosive', toxin: 'Toxin'},
        loading: 'Loading data…', fail: 'Could not load calculator data.',
        note: 'Time is counted from the first shot. Magazine reloads are included in time to kill but not in DPS. Does not include wave armor scaling, ally buffs or special effects. The Watchtower platform bonus is only available to Cliff towers (Marksman).'
    };
    function lvlKey(id) { var m = /^Lvl(\d)([AB]?)([AB]?)$/.exec(id) || []; var n = +m[1] || 0; return (n <= 1 ? '0' : (m[2] === 'B' ? '2' : '1')) + n + (m[3] || ''); }
    function pathOf(id) { var m = /^Lvl(\d)([AB]?)([AB]?)$/.exec(id); if (!m) return [id]; var n = +m[1], br = m[2], sub = m[3], p = ['Lvl0']; if (n >= 1) p.push('Lvl1'); if (n >= 2) p.push('Lvl2' + br); if (n >= 3) p.push('Lvl3' + br); if (n >= 4) p.push('Lvl4' + br + sub); return p; }
    function fmt(n) { return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ' '); }
    function el(tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; }
    function opt(sel, value, text) { var o = document.createElement('option'); o.value = value; o.textContent = text; sel.appendChild(o); return o; }
    var dataPromise = null;
    function loadData() {
        if (!dataPromise) {
            var url = BASE + '/api.php?action=expandtemplates&prop=wikitext&format=json&title=X&text=' + encodeURIComponent('{{#invoke:TowerStat|calcjson}}');
            dataPromise = fetch(url).then(function (r) { return r.json(); }).then(function (j) { return JSON.parse(j.expandtemplates.wikitext); });
        }
        return dataPromise;
    }
    function mount(box) {
        if (box.getAttribute('data-ready')) return;
        box.setAttribute('data-ready', '1'); box.innerHTML = '';
        box.appendChild(el('div', 'lctd-calc-h', L.head));
        var status = el('div', 'lctd-calc-status', L.loading); box.appendChild(status);
        loadData().then(function (D) { status.remove(); build(box, D); }, function () { status.textContent = L.fail; });
    }
    function field(grid, label) { var f = el('label', 'lctd-calc-f'); f.appendChild(el('span', 'lctd-calc-k', label)); var s = document.createElement('select'); s.className = 'lctd-calc-sel'; f.appendChild(s); grid.appendChild(f); return s; }
    function build(box, D) {
        var fixed = box.getAttribute('data-tower');
        var grid = el('div', 'lctd-calc-grid'); box.appendChild(grid);
        var sT = field(grid, L.tower), sL = field(grid, L.level), sE = field(grid, L.enemy), sP = field(grid, L.platform);
        Object.keys(D.towers).sort().forEach(function (n) { opt(sT, n, n); });
        if (fixed && D.towers[fixed]) { sT.value = fixed; sT.disabled = true; sT.parentNode.classList.add('lctd-calc-fixed'); }
        else { var qt = new URLSearchParams(location.search).get('tower'); if (qt && D.towers[qt]) sT.value = qt; }
        [[L.regular, function (n, e) { return !e.boss && !/^Nexus/.test(n); }], [L.nexus, function (n) { return /^Nexus/.test(n); }], [L.bosses, function (n, e) { return e.boss; }]].forEach(function (g) {
            var og = document.createElement('optgroup'); og.label = g[0];
            Object.keys(D.enemies).filter(function (n) { return g[1](n, D.enemies[n]); }).sort(function (a, b) { return D.enemies[a].hp - D.enemies[b].hp; }).forEach(function (n) { opt(og, n, n + ' · ' + fmt(D.enemies[n].hp) + ' HP'); });
            sE.appendChild(og);
        });
        [[0, L.none], [10, '+10% (Armored Tower / Antenna)'], [20, '+20% (Ammo Box)']].forEach(function (p) { opt(sP, p[0], p[1]); });
        var out = el('div', 'lctd-calc-out'); box.appendChild(out);
        var warn = el('div', 'lctd-calc-warn'); box.appendChild(warn);
        box.appendChild(el('div', 'lctd-calc-note', L.note));
        function fillLevels() {
            var t = D.towers[sT.value], prev = sL.value; sL.innerHTML = '';
            Object.keys(t.levels).sort(function (a, b) { return lvlKey(a) < lvlKey(b) ? -1 : 1; }).forEach(function (id) { var lv = t.levels[id]; opt(sL, id, id + ' · ' + lv.name + ' — ' + lv.dps.toFixed(1) + ' DPS'); });
            if (t.levels[prev]) sL.value = prev;
        }
        function tile(k, v, cls) { return '<div class="lctd-calc-tile ' + (cls || '') + '"><div class="lctd-calc-tk">' + k + '</div><div class="lctd-calc-tv">' + v + '</div></div>'; }
        function calc() {
            var t = D.towers[sT.value], lv = t.levels[sL.value], e = D.enemies[sE.value];
            if (!lv || !e) return;
            var dt = lv.type || t.type; var r = e.res[dt]; r = (r == null ? 100 : r);
            var plat = +sP.value;
            var net = lv.dps * (r / 100) * (1 + plat / 100);
            var cost = pathOf(sL.value).reduce(function (s, id) { return s + ((t.levels[id] && t.levels[id].price) || 0); }, 0);
            var mcls = r === 0 ? 'lctd-calc-imm' : r > 100 ? 'lctd-calc-weak' : r < 100 ? 'lctd-calc-strong' : '';
            var mlab = r === 0 ? L.immune : r > 100 ? L.weak : r < 100 ? L.strong : L.neutral;
            var mul = (r / 100) * (1 + plat / 100), perHit = (lv.hit || 0) * mul, hits = 0, reloads = 0, ttk;
            if (perHit > 0 && lv.dps > 0) {
                hits = Math.ceil(e.hp / perHit);
                var burst = lv.burst || 1, bfr = lv.bfr || 0, cycle = burst * lv.hit / lv.dps, k = hits - 1;
                reloads = (lv.mag && lv.reload && lv.mag < 1e6) ? Math.floor(k / lv.mag) : 0;
                ttk = (lv.delay || 0) + Math.floor(k / burst) * cycle + (k % burst) * bfr + (reloads ? reloads * lv.reload : 0);
            } else { ttk = net > 0 ? e.hp / net : Infinity; }
            var effv = cost > 0 ? net / cost * 1000 : 0;
            out.innerHTML =
                tile(L.base, lv.dps.toFixed(1)) +
                tile(L.mult, '<span class="lctd-calc-mrow"><span class="lctd-dmg lctd-dmg-' + (dt === 'explosion' ? 'explosive' : dt) + '">' + L.types[dt] + '</span><span class="lctd-calc-badge ' + mcls + '">' + r + '%</span></span><small>' + mlab + (plat ? ' · +' + plat + '%' : '') + '</small>', '') +
                tile(L.net, net.toFixed(1), 'lctd-calc-main') +
                tile(L.ttk, (!isFinite(ttk) ? '∞' : (ttk < 100 ? ttk.toFixed(1) : fmt(ttk)) + ' ' + L.sec) + (hits ? '<small>' + fmt(hits) + ' ' + L.hits + (reloads ? ' · ' + reloads + ' ' + L.reloads : '') + (lv.delay ? ' · ' + L.delay + ' ' + lv.delay + ' ' + L.sec : '') + '</small>' : ''), ttk > 60 ? 'lctd-calc-slow' : '') +
                tile(L.cost, '¤' + fmt(cost)) +
                tile(L.eff, cost > 0 ? effv.toFixed(2) : '—', cost > 0 ? (effv >= 20 ? 'lctd-calc-good' : effv < 5 ? 'lctd-calc-bad' : '') : '');
            warn.style.display = e.approx ? '' : 'none';
            warn.textContent = '[ ≈ ] ' + L.approx;
        }
        function syncPlatform() { var cliff = !!D.towers[sT.value].cliff; sP.parentNode.style.display = cliff ? '' : 'none'; if (!cliff) sP.value = '0'; grid.classList.toggle('lctd-calc-grid3', !cliff); }
        sT.addEventListener('change', function () { syncPlatform(); fillLevels(); calc(); });
        [sL, sE, sP].forEach(function (s) { s.addEventListener('change', calc); });
        syncPlatform(); fillLevels();
        var qe = new URLSearchParams(location.search).get('enemy'); if (qe && D.enemies[qe]) sE.value = qe;
        if (D.towers[sT.value].levels.Lvl0) sL.value = 'Lvl0';
        calc();
    }
    function init(root) { (root || document).querySelectorAll('.lctd-calc').forEach(mount); }
    if (window.mw && mw.hook) mw.hook('wikipage.content').add(function ($c) { init($c && $c[0]); });
    init();
})();