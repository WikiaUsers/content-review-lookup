/*
 * LCTD Damage Calculator
 *
 * Turns <div class="lctd-calc"></div> on a page into an interactive damage calculator.
 * Optional: data-tower="Tower name" locks the tower select to one tower.
 * The page URL may preselect values: ?tower=Marksman&enemy=Carapace-Brute
 *
 * All numbers come from the wiki itself: Module:TowerStat (function "calcjson")
 * reads Module:TowerData, Module:EnemyData and Module:BossData and returns JSON.
 * This script only reads that JSON through the MediaWiki API (action=expandtemplates)
 * and does not send data anywhere else.
 */
(function () {
    'use strict';

    var IS_RU = window.mw && mw.config.get('wgContentLanguage') === 'ru';
    var API_BASE = IS_RU ? '/ru' : '';

    var TEXT_RU = {
        head: '// DAMAGE CALCULATOR',
        tower: 'Башня',
        level: 'Уровень',
        enemy: 'Враг',
        platform: 'Платформа Вышки',
        none: 'Нет',
        regular: 'Обычные враги',
        nexus: 'Нексусы',
        bosses: 'Боссы',
        base: 'Базовый DPS',
        mult: 'Множитель',
        net: 'Чистый DPS',
        ttk: 'Время убийства',
        cost: 'Вложено',
        eff: 'DPS на ¤1000',
        sec: 'сек',
        hits: 'попад.',
        reloads: 'перезар.',
        delay: 'задержка',
        immune: 'Иммунитет',
        weak: 'Уязвим',
        strong: 'Стоек',
        neutral: 'Нейтрально',
        loading: 'Загрузка данных…',
        fail: 'Не удалось загрузить данные калькулятора.',
        approx: 'Точные резисты этого врага неизвестны — результат приблизительный',
        note: 'Время считается с первого выстрела. Перезарядка магазина учитывается ' +
            'во времени убийства, но не в DPS. Без учёта брони по уровням волны, ' +
            'баффов союзников и особых эффектов. Бонус платформы Вышки доступен ' +
            'только Cliff-башням (Marksman).',
        types: {
            kinetic: 'Кинетический',
            hyper: 'Гиперскоростной',
            melee: 'Ближний бой',
            electric: 'Электрический',
            fire: 'Огонь',
            explosion: 'Взрыв',
            toxin: 'Токсин'
        }
    };

    var TEXT_EN = {
        head: '// DAMAGE CALCULATOR',
        tower: 'Tower',
        level: 'Level',
        enemy: 'Enemy',
        platform: 'Watchtower platform',
        none: 'None',
        regular: 'Regular enemies',
        nexus: 'Nexuses',
        bosses: 'Bosses',
        base: 'Base DPS',
        mult: 'Multiplier',
        net: 'Net DPS',
        ttk: 'Time to kill',
        cost: 'Invested',
        eff: 'DPS per ¤1000',
        sec: 's',
        hits: 'hits',
        reloads: 'reloads',
        delay: 'delay',
        immune: 'Immune',
        weak: 'Weak',
        strong: 'Resistant',
        neutral: 'Neutral',
        loading: 'Loading data…',
        fail: 'Could not load calculator data.',
        approx: 'Exact resistances for this enemy are unknown — the result is approximate',
        note: 'Time is counted from the first shot. Magazine reloads are included in ' +
            'time to kill but not in DPS. Does not include wave armor scaling, ' +
            'ally buffs or special effects. The Watchtower platform bonus is only ' +
            'available to Cliff towers (Marksman).',
        types: {
            kinetic: 'Kinetic',
            hyper: 'Hypervelocity',
            melee: 'Melee',
            electric: 'Electric',
            fire: 'Fire',
            explosion: 'Explosive',
            toxin: 'Toxin'
        }
    };

    var L = IS_RU ? TEXT_RU : TEXT_EN;

    // Watchtower platform damage bonuses (percent) that a Cliff tower can receive
    var PLATFORM_OPTIONS = [
        [0, L.none],
        [10, '+10% (Armored Tower / Antenna)'],
        [20, '+20% (Ammo Box)']
    ];

    /* ---------- helpers ---------- */

    // Sort key for level ids: Lvl0, Lvl1, then branch A (2A, 3A, 4AA, 4AB), then branch B
    function levelSortKey(id) {
        var m = /^Lvl(\d)([AB]?)([AB]?)$/.exec(id) || [];
        var n = Number(m[1]) || 0;
        var branch = n <= 1 ? '0' : (m[2] === 'B' ? '2' : '1');
        return branch + n + (m[3] || '');
    }

    // All levels a player has to buy to reach the given level
    function upgradePath(id) {
        var m = /^Lvl(\d)([AB]?)([AB]?)$/.exec(id);
        if (!m) {
            return [id];
        }
        var n = Number(m[1]);
        var branch = m[2];
        var sub = m[3];
        var path = ['Lvl0'];
        if (n >= 1) {
            path.push('Lvl1');
        }
        if (n >= 2) {
            path.push('Lvl2' + branch);
        }
        if (n >= 3) {
            path.push('Lvl3' + branch);
        }
        if (n >= 4) {
            path.push('Lvl4' + branch + sub);
        }
        return path;
    }

    // Whole number with thin spaces between thousands: 15000 -> "15 000"
    function formatInt(value) {
        return String(Math.round(value)).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    }

    // Creates an element. Text is always set via textContent, never parsed as HTML.
    function makeElement(tag, className, text) {
        var element = document.createElement(tag);
        if (className) {
            element.className = className;
        }
        if (text !== undefined && text !== null) {
            element.textContent = String(text);
        }
        return element;
    }

    // Converts any value coming from the wiki data into a safe finite number
    function toNumber(value) {
        var n = Number(value);
        return isFinite(n) ? n : 0;
    }

    function addOption(parent, value, text) {
        var option = document.createElement('option');
        option.value = value;
        option.textContent = text;
        parent.appendChild(option);
        return option;
    }

    function makeSelect(container, label) {
        var field = makeElement('label', 'lctd-calc-f');
        field.appendChild(makeElement('span', 'lctd-calc-k', label));
        var select = document.createElement('select');
        select.className = 'lctd-calc-sel';
        field.appendChild(select);
        container.appendChild(field);
        return select;
    }

    // Result tile: a label and a value. "value" is plain text or a DOM node, "small" is optional text.
    function makeTile(label, value, className, small) {
        var tile = makeElement('div', 'lctd-calc-tile' + (className ? ' ' + className : ''));
        tile.appendChild(makeElement('div', 'lctd-calc-tk', label));
        var body = makeElement('div', 'lctd-calc-tv');
        if (value instanceof Node) {
            body.appendChild(value);
        } else {
            body.appendChild(document.createTextNode(String(value)));
        }
        if (small) {
            body.appendChild(makeElement('small', null, small));
        }
        tile.appendChild(body);
        return tile;
    }

    /* ---------- data loading ---------- */

    var dataPromise = null;

    function loadData() {
        if (!dataPromise) {
            var url = API_BASE + '/api.php?action=expandtemplates&prop=wikitext&format=json' +
                '&title=X&text=' + encodeURIComponent('{{#invoke:TowerStat|calcjson}}');
            dataPromise = fetch(url)
                .then(function (response) {
                    return response.json();
                })
                .then(function (json) {
                    return JSON.parse(json.expandtemplates.wikitext);
                });
        }
        return dataPromise;
    }

    /* ---------- calculation ---------- */

    // Returns everything the result tiles need for one tower level vs one enemy
    function calculate(tower, level, levelId, enemy, platformBonus) {
        // Only known damage types are accepted; anything else falls back to kinetic
        var damageType = level.type || tower.type;
        if (!Object.prototype.hasOwnProperty.call(L.types, damageType)) {
            damageType = 'kinetic';
        }
        var resist = enemy.res ? enemy.res[damageType] : undefined;
        resist = (resist === undefined || resist === null) ? 100 : toNumber(resist);
        var dps = toNumber(level.dps);
        var hit = toNumber(level.hit);

        var multiplier = (resist / 100) * (1 + platformBonus / 100);
        var netDps = dps * multiplier;

        var cost = upgradePath(levelId).reduce(function (sum, id) {
            var step = tower.levels[id];
            return sum + (step ? toNumber(step.price) : 0);
        }, 0);

        var hits = 0;
        var reloads = 0;
        var timeToKill;
        var damagePerHit = hit * multiplier;

        if (damagePerHit > 0 && dps > 0) {
            // Simulate shots: bursts of "burst" hits, "bfr" seconds apart inside a burst,
            // one full cycle per burst, plus a magazine reload every "mag" hits.
            hits = Math.ceil(toNumber(enemy.hp) / damagePerHit);
            var burst = toNumber(level.burst) || 1;
            var burstGap = toNumber(level.bfr);
            var cycle = burst * hit / dps;
            var lastShot = hits - 1;

            var mag = toNumber(level.mag);
            var reloadTime = toNumber(level.reload);
            if (mag > 0 && reloadTime > 0 && mag < 1e6) {
                reloads = Math.floor(lastShot / mag);
            }

            timeToKill = toNumber(level.delay) +
                Math.floor(lastShot / burst) * cycle +
                (lastShot % burst) * burstGap +
                reloads * reloadTime;
        } else {
            timeToKill = netDps > 0 ? toNumber(enemy.hp) / netDps : Infinity;
        }

        return {
            dps: dps,
            delay: toNumber(level.delay),
            damageType: damageType,
            resist: resist,
            netDps: netDps,
            cost: cost,
            hits: hits,
            reloads: reloads,
            timeToKill: timeToKill,
            efficiency: cost > 0 ? netDps / cost * 1000 : 0
        };
    }

    /* ---------- rendering ---------- */

    // Draws the six result tiles. Everything is built with DOM nodes and textContent,
    // so values from the wiki data are never interpreted as HTML.
    function renderResult(out, warn, enemy, platformBonus, r) {
        var resistClass = '';
        var resistLabel = L.neutral;
        if (r.resist === 0) {
            resistClass = 'lctd-calc-imm';
            resistLabel = L.immune;
        } else if (r.resist > 100) {
            resistClass = 'lctd-calc-weak';
            resistLabel = L.weak;
        } else if (r.resist < 100) {
            resistClass = 'lctd-calc-strong';
            resistLabel = L.strong;
        }

        // Damage type badge + resistance percent
        var typeClass = r.damageType === 'explosion' ? 'explosive' : r.damageType;
        var multiplierRow = makeElement('span', 'lctd-calc-mrow');
        multiplierRow.appendChild(makeElement('span', 'lctd-dmg lctd-dmg-' + typeClass, L.types[r.damageType]));
        multiplierRow.appendChild(makeElement('span', 'lctd-calc-badge ' + resistClass, r.resist + '%'));
        var multiplierNote = resistLabel + (platformBonus ? ' · +' + platformBonus + '%' : '');

        // Time to kill + details line
        var ttkText;
        if (!isFinite(r.timeToKill)) {
            ttkText = '∞';
        } else if (r.timeToKill < 100) {
            ttkText = r.timeToKill.toFixed(1) + ' ' + L.sec;
        } else {
            ttkText = formatInt(r.timeToKill) + ' ' + L.sec;
        }
        var details = '';
        if (r.hits) {
            details = formatInt(r.hits) + ' ' + L.hits;
            if (r.reloads) {
                details += ' · ' + r.reloads + ' ' + L.reloads;
            }
            if (r.delay) {
                details += ' · ' + L.delay + ' ' + r.delay + ' ' + L.sec;
            }
        }

        var efficiencyClass = '';
        if (r.cost > 0 && r.efficiency >= 20) {
            efficiencyClass = 'lctd-calc-good';
        } else if (r.cost > 0 && r.efficiency < 5) {
            efficiencyClass = 'lctd-calc-bad';
        }

        while (out.firstChild) {
            out.removeChild(out.firstChild);
        }
        out.appendChild(makeTile(L.base, r.dps.toFixed(1)));
        out.appendChild(makeTile(L.mult, multiplierRow, '', multiplierNote));
        out.appendChild(makeTile(L.net, r.netDps.toFixed(1), 'lctd-calc-main'));
        out.appendChild(makeTile(L.ttk, ttkText, r.timeToKill > 60 ? 'lctd-calc-slow' : '', details));
        out.appendChild(makeTile(L.cost, '¤' + formatInt(r.cost)));
        out.appendChild(makeTile(L.eff, r.cost > 0 ? r.efficiency.toFixed(2) : '—', efficiencyClass));

        warn.style.display = enemy.approx ? '' : 'none';
        warn.textContent = '[ ≈ ] ' + L.approx;
    }

    function build(box, data) {
        var params = new URLSearchParams(location.search);
        var fixedTower = box.getAttribute('data-tower');

        var grid = makeElement('div', 'lctd-calc-grid');
        box.appendChild(grid);
        var towerSelect = makeSelect(grid, L.tower);
        var levelSelect = makeSelect(grid, L.level);
        var enemySelect = makeSelect(grid, L.enemy);
        var platformSelect = makeSelect(grid, L.platform);

        // Towers
        Object.keys(data.towers).sort().forEach(function (name) {
            addOption(towerSelect, name, name);
        });
        if (fixedTower && data.towers[fixedTower]) {
            towerSelect.value = fixedTower;
            towerSelect.disabled = true;
            towerSelect.parentNode.classList.add('lctd-calc-fixed');
        } else if (params.get('tower') && data.towers[params.get('tower')]) {
            towerSelect.value = params.get('tower');
        }

        // Enemies, grouped and sorted by HP
        var enemyGroups = [
            [L.regular, function (name, e) { return !e.boss && !/^Nexus/.test(name); }],
            [L.nexus, function (name) { return /^Nexus/.test(name); }],
            [L.bosses, function (name, e) { return e.boss; }]
        ];
        enemyGroups.forEach(function (group) {
            var optgroup = document.createElement('optgroup');
            optgroup.label = group[0];
            Object.keys(data.enemies)
                .filter(function (name) {
                    return group[1](name, data.enemies[name]);
                })
                .sort(function (a, b) {
                    return toNumber(data.enemies[a].hp) - toNumber(data.enemies[b].hp);
                })
                .forEach(function (name) {
                    addOption(optgroup, name, name + ' · ' + formatInt(toNumber(data.enemies[name].hp)) + ' HP');
                });
            enemySelect.appendChild(optgroup);
        });
        if (params.get('enemy') && data.enemies[params.get('enemy')]) {
            enemySelect.value = params.get('enemy');
        }

        // Watchtower platform
        PLATFORM_OPTIONS.forEach(function (option) {
            addOption(platformSelect, option[0], option[1]);
        });

        var out = makeElement('div', 'lctd-calc-out');
        var warn = makeElement('div', 'lctd-calc-warn');
        box.appendChild(out);
        box.appendChild(warn);
        box.appendChild(makeElement('div', 'lctd-calc-note', L.note));

        function fillLevels() {
            var tower = data.towers[towerSelect.value];
            var previous = levelSelect.value;
            while (levelSelect.firstChild) {
                levelSelect.removeChild(levelSelect.firstChild);
            }
            Object.keys(tower.levels)
                .sort(function (a, b) {
                    return levelSortKey(a) < levelSortKey(b) ? -1 : 1;
                })
                .forEach(function (id) {
                    var level = tower.levels[id];
                    addOption(levelSelect, id, id + ' · ' + String(level.name) + ' — ' + toNumber(level.dps).toFixed(1) + ' DPS');
                });
            if (tower.levels[previous]) {
                levelSelect.value = previous;
            } else if (tower.levels.Lvl0) {
                levelSelect.value = 'Lvl0';
            }
        }

        // Only Cliff towers (they stand on a Watchtower) get the platform option
        function syncPlatform() {
            var isCliff = Boolean(data.towers[towerSelect.value].cliff);
            platformSelect.parentNode.style.display = isCliff ? '' : 'none';
            if (!isCliff) {
                platformSelect.value = '0';
            }
            grid.classList.toggle('lctd-calc-grid3', !isCliff);
        }

        function update() {
            var tower = data.towers[towerSelect.value];
            var level = tower.levels[levelSelect.value];
            var enemy = data.enemies[enemySelect.value];
            if (!level || !enemy) {
                return;
            }
            var platformBonus = Number(platformSelect.value);
            var result = calculate(tower, level, levelSelect.value, enemy, platformBonus);
            renderResult(out, warn, enemy, platformBonus, result);
        }

        towerSelect.addEventListener('change', function () {
            syncPlatform();
            fillLevels();
            update();
        });
        levelSelect.addEventListener('change', update);
        enemySelect.addEventListener('change', update);
        platformSelect.addEventListener('change', update);

        syncPlatform();
        fillLevels();
        update();
    }

    function mount(box) {
        if (box.getAttribute('data-ready')) {
            return;
        }
        box.setAttribute('data-ready', '1');
        while (box.firstChild) {
            box.removeChild(box.firstChild);
        }
        box.appendChild(makeElement('div', 'lctd-calc-h', L.head));

        var status = makeElement('div', 'lctd-calc-status', L.loading);
        box.appendChild(status);

        loadData().then(
            function (data) {
                status.remove();
                build(box, data);
            },
            function () {
                status.textContent = L.fail;
            }
        );
    }

    function init(root) {
        (root || document).querySelectorAll('.lctd-calc').forEach(mount);
    }

    mw.hook('wikipage.content').add(function ($content) {
        init($content && $content[0]);
    });
})();