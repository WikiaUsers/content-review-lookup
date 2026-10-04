/* REBORN pet lookup. Database supplied by Module:REBORN寵物; no remote requests. */
(function () {
    'use strict';
    function combinations(main, vice, wanted) {
        if (wanted.length !== 3 || new Set(wanted).size !== 3) return [];
        if (
            !vice.slice(0, 2).every(function (s) {
                return wanted.indexOf(s) !== -1;
            })
        )
            return [];
        var found = [];
        for (var a = 0; a < 2; a++)
            for (var b = 0; b < 2; b++) {
                var row = [a ? vice[0] : main[0], b ? vice[1] : main[1], main[2]];
                if (
                    new Set(row).size === 3 &&
                    row.every(function (s) {
                        return wanted.indexOf(s) !== -1;
                    })
                ) {
                    if (
                        !found.some(function (x) {
                            return x.join('|') === row.join('|');
                        })
                    )
                        found.push(row);
                }
            }
        return found;
    }
    // Export helpers only in Node.js tests. Fandom may expose a CommonJS-like
    // `module` object in the browser, so also require the absence of `window`.
    if (typeof window === 'undefined' && typeof module === 'object' && module.exports) {
        module.exports = { combinations: combinations };
        return;
    }
    function init(root) {
        if (root.dataset.ready) return;
        var data;
        try {
            data = JSON.parse(root.querySelector('.gdr-pets-data').textContent);
        } catch (e) {
            root.querySelector('.gdr-pets-status').textContent =
                '資料未能載入，請使用下方表格並回報錯誤。';
            return;
        }
        root.dataset.ready = '1';
        var pets = data.pets,
            skills = data.skills,
            ui = root.querySelector('.gdr-pets-ui');
        function el(tag, text, parent, cls) {
            var x = document.createElement(tag);
            if (text !== undefined) x.textContent = text;
            if (cls) x.className = cls;
            if (parent) parent.appendChild(x);
            return x;
        }
        function name(id) {
            return skills[id] ? skills[id].n : '待核對（' + id + '）';
        }
        function select(parent, title, options) {
            var label = el('label', title, parent),
                s = el('select', undefined, label);
            options.forEach(function (o) {
                var t = el('option', o[1], s);
                t.value = o[0];
            });
            return s;
        }

        // Native option elements cannot reliably show multiline, mixed-size text.
        // Use a disclosure with ordinary keyboard-accessible buttons instead.
        function skillSelect(parent, title, options) {
            var box = el('div', undefined, parent, 'gdr-skill-choice');
            el('div', title, box, 'gdr-skill-label');
            var menu = el('details', undefined, box, 'gdr-skill-menu');
            var summary = el('summary', undefined, menu);
            summary.setAttribute('aria-label', title);
            var selectedName = el('strong', '任意', summary);
            var selectedEffect = el('small', '展開查看技能效果', summary, 'gdr-skill-effect');
            var panel = el('div', undefined, menu, 'gdr-skill-panel');
            var query = input(panel, '搜尋名稱或效果', 'search', '');
            var list = el('div', undefined, panel, 'gdr-skill-options');
            var empty = el('p', '沒有符合的技能', panel);
            empty.hidden = true;
            var value = '',
                listeners = [],
                entries = [];
            function effect(id) {
                return id && skills[id] ? skills[id].d : '不限技能';
            }
            function update(id) {
                value = id;
                selectedName.textContent = id ? name(id) : '任意';
                selectedEffect.textContent = id ? effect(id) : '展開查看技能效果';
                entries.forEach(function (entry) {
                    entry.button.setAttribute('aria-pressed', String(entry.id === id));
                });
            }
            var control = {
                get value() {
                    return value;
                },
                set value(id) {
                    update(id);
                },
                addEventListener: function (type, fn) {
                    if (type === 'change') listeners.push(fn);
                }
            };
            options.forEach(function (option) {
                var b = button(list, undefined, function () {
                    update(option[0]);
                    menu.open = false;
                    summary.focus();
                    listeners.forEach(function (fn) {
                        fn.call(control);
                    });
                });
                b.className = 'gdr-skill-option';
                el('strong', option[1], b);
                el('small', effect(option[0]), b, 'gdr-skill-effect');
                b.setAttribute('aria-pressed', String(!option[0]));
                entries.push({ id: option[0], button: b });
            });
            query.addEventListener('input', function () {
                var term = query.value.trim().toLocaleLowerCase(),
                    count = 0;
                entries.forEach(function (entry) {
                    entry.button.hidden =
                        entry.button.textContent.toLocaleLowerCase().indexOf(term) === -1;
                    if (!entry.button.hidden) count++;
                });
                empty.hidden = count !== 0;
            });
            menu.addEventListener('toggle', function () {
                if (menu.open)
                    root.querySelectorAll('.gdr-skill-menu').forEach(function (other) {
                        if (other !== menu) other.open = false;
                    });
            });
            menu.addEventListener('keydown', function (event) {
                if (event.key === 'Escape') {
                    menu.open = false;
                    summary.focus();
                }
            });
            return control;
        }
        function input(parent, title, type, value) {
            var l = el('label', title, parent),
                i = el('input', undefined, l);
            i.type = type;
            i.value = value || '';
            return i;
        }
        function button(parent, text, fn) {
            var b = el('button', text, parent);
            b.type = 'button';
            b.addEventListener('click', fn);
            return b;
        }
        function details(parent, p, key, count) {
            var d = el('details', undefined, parent);
            el(
                'summary',
                (key === 'f' ? '戰鬥' : '附身') +
                    '：' +
                    p[key].slice(0, count).map(name).join('、'),
                d
            );
            var ul = el('ul', undefined, d);
            p[key].slice(0, count).forEach(function (id, i) {
                el(
                    'li',
                    i +
                        1 +
                        '. ' +
                        name(id) +
                        '：' +
                        (skills[id]
                            ? skills[id].d
                            : '此代碼尚未對到固定技能，可能為技能池；不作配對依據。'),
                    ul
                );
            });
        }
        function petCell(tr, p, count, key) {
            var td = el('td', undefined, tr);
            if (p.image) {
                var img = el('img', undefined, td);
                img.src = p.imageUrl;
                img.alt = p.n;
                img.width = 48;
                img.height = 48;
                img.loading = 'lazy';
                img.style.objectFit = 'contain';
                img.style.marginRight = '8px';
            } else {
                el('small', '暫無圖片', td);
            }
            el('strong', p.n, td);
            el('small', p.t, td);
            el('small', '舊版等級：' + (p.l || '待核對') + '；' + (p.g || '舊版取得未收錄'), td);
            if (key) details(td, p, key, count);
            else {
                details(td, p, 'f', count);
                details(td, p, 'e', count);
            }
            return td;
        }
        var message,
            results,
            pager,
            current = 0,
            found = [],
            limit = 20;
        function pageButtons(render) {
            pager = el('div', undefined, ui, 'gdr-pet-pager');
            button(pager, '上一頁', function () {
                if (current > 0) {
                    current--;
                    render();
                }
            });
            el('span', '', pager);
            button(pager, '下一頁', function () {
                if ((current + 1) * limit < found.length) {
                    current++;
                    render();
                }
            });
        }
        function updatePager() {
            pager.querySelector('span').textContent =
                '第 ' +
                (current + 1) +
                ' / ' +
                Math.max(1, Math.ceil(found.length / limit)) +
                ' 頁';
            var bs = pager.querySelectorAll('button');
            bs[0].disabled = current === 0;
            bs[1].disabled = (current + 1) * limit >= found.length;
        }
        var qcount = { 綠: 2, 藍: 3, 紫: 4, 金: 5 };
        if (root.dataset.mode === '列表') {
            var filters = el('div', undefined, ui, 'gdr-pet-filters'),
                query = input(filters, '名稱或技能', 'search', ''),
                type = select(
                    filters,
                    '寵物類型',
                    [['', '全部類型']].concat(
                        ['生命型', '攻擊型', '防禦型', '一般型'].map(function (x) {
                            return [x, x];
                        })
                    )
                ),
                quality = select(
                    filters,
                    '基本品質',
                    [['', '全部品質']].concat(
                        Object.keys(qcount).map(function (x) {
                            return [x, x];
                        })
                    )
                );
            message = el('div', '', ui, 'gdr-pet-message');
            message.setAttribute('role', 'status');
            results = el('div', undefined, ui, 'gdr-pet-results');
            function renderList() {
                results.replaceChildren();
                var t = el('table', undefined, results, 'wikitable'),
                    head = el('tr', undefined, t);
                ['寵物與技能', '基本品質／來源'].forEach(function (x) {
                    el('th', x, head);
                });
                found.slice(current * limit, (current + 1) * limit).forEach(function (p) {
                    var tr = el('tr', undefined, t);
                    petCell(tr, p, qcount[p.q]);
                    el('td', p.q + '／' + p.s, tr);
                });
                updatePager();
            }
            pageButtons(renderList);
            function filter() {
                var q = query.value.trim().toLocaleLowerCase();
                found = pets.filter(function (p) {
                    return (
                        (!type.value || p.t === type.value) &&
                        (!quality.value || p.q === quality.value) &&
                        (!q ||
                            [p.id, p.n]
                                .concat(
                                    p.f
                                        .concat(p.e)
                                        .filter(function (i) {
                                            return skills[i];
                                        })
                                        .map(name)
                                )
                                .join(' ')
                                .toLocaleLowerCase()
                                .indexOf(q) !== -1)
                    );
                });
                current = 0;
                message.textContent =
                    '找到 ' + found.length + ' 筆客戶端記錄（同名但資料不同的寵物分列）。';
                renderList();
            }
            [query, type, quality].forEach(function (x) {
                x.addEventListener('input', filter);
            });
            filter();
        } else {
            var controls = el('div', undefined, ui, 'gdr-pet-controls');
            function side(title, quality, cls) {
                var f = el('fieldset', undefined, controls, cls);
                el('legend', title, f);
                var eligible = pets
                    .filter(function (p) {
                        return p.qs.indexOf(quality) !== -1;
                    })
                    .sort(function (a, b) {
                        return a.n.localeCompare(b.n, 'zh-Hant') || a.id.localeCompare(b.id);
                    });
                var pet = select(
                    f,
                    '寵物',
                    [['', '任意寵物']].concat(
                        eligible.map(function (p) {
                            return [p.id, p.n + '〔' + p.t + '／' + p.q + '〕'];
                        })
                    )
                );
                var max = input(f, '等級上限（舊版參考）', 'number', '99');
                max.min = '1';
                max.max = '999';
                var src = select(f, '取得方式', [
                    ['', '任意取得'],
                    ['商城收藏冊', '商城收藏冊（錄影核對）'],
                    ['捕捉', '捕捉（舊版參考）'],
                    ['副本', '副本（舊版參考）'],
                    ['其他', '其他／未知']
                ]);
                return { pet: pet, max: max, src: src, eligible: eligible };
            }
            var m = side('主寵：藍品質', '藍', 'gdr-pet-main'),
                v = side('副寵：綠品質', '綠', 'gdr-pet-vice'),
                skillField = el('fieldset', undefined, controls);
            el('legend', '選滿 3 項戰鬥或 3 項附身技能', skillField);
            var groups = el('div', undefined, skillField, 'gdr-pet-skill-group'),
                ss = { f: [], e: [] },
                key = 'e';
            ['f', 'e'].forEach(function (k) {
                var col = el('div', undefined, groups),
                    unique = new Set();
                pets.forEach(function (p) {
                    p[k].slice(0, 3).forEach(function (i) {
                        if (skills[i]) unique.add(i);
                    });
                });
                var opts = [['', '任意']].concat(
                    Array.from(unique)
                        .sort(function (a, b) {
                            return name(a).localeCompare(name(b), 'zh-Hant');
                        })
                        .map(function (i) {
                            return [i, name(i)];
                        })
                );
                for (var j = 0; j < 3; j++) {
                    var s = skillSelect(
                        col,
                        (k === 'f' ? '戰鬥' : '附身') + '技能 ' + (j + 1),
                        opts
                    );
                    ss[k].push(s);
                    s.addEventListener('change', function () {
                        if (this.value) {
                            key = k;
                            ss[k === 'f' ? 'e' : 'f'].forEach(function (x) {
                                x.value = '';
                            });
                        }
                    });
                }
            });
            el(
                'p',
                '切換技能類別會清空另一組。技能選擇順序不限；結果依原始技能格位檢查。',
                skillField
            );
            button(ui, '搜尋配對', search);
            button(ui, '範例：攻擊／爆擊／爆傷', function () {
                key = 'e';
                ss.f.forEach(function (s) {
                    s.value = '';
                });
                ['56068', '56073', '56074'].forEach(function (id, i) {
                    ss.e[i].value = id;
                });
                search();
            });
            button(ui, '重設', function () {
                [m, v].forEach(function (s) {
                    s.pet.value = '';
                    s.max.value = '99';
                    s.src.value = '';
                });
                ss.f.concat(ss.e).forEach(function (s) {
                    s.value = '';
                });
                found = [];
                current = 0;
                message.textContent = '請選擇三項不同的戰鬥或附身技能。';
                results.replaceChildren();
                updatePager();
            });
            message = el('div', '請選擇三項不同的戰鬥或附身技能。', ui, 'gdr-pet-message');
            message.setAttribute('role', 'status');
            results = el('div', undefined, ui, 'gdr-pet-results');
            function renderPairs() {
                results.replaceChildren();
                if (found.length) {
                    var t = el('table', undefined, results, 'wikitable'),
                        head = el('tr', undefined, t);
                    ['藍主寵', '綠副寵', '可達成的技能格位（非成功保證）'].forEach(function (x) {
                        el('th', x, head);
                    });
                    found.slice(current * limit, (current + 1) * limit).forEach(function (pair) {
                        var tr = el('tr', undefined, t);
                        petCell(tr, pair.m, 3, key);
                        petCell(tr, pair.v, 2, key);
                        el(
                            'td',
                            pair.paths
                                .map(function (path) {
                                    return path
                                        .map(function (id, i) {
                                            return i + 1 + '. ' + name(id);
                                        })
                                        .join(' → ');
                                })
                                .join('\n'),
                            tr
                        );
                    });
                }
                updatePager();
            }
            pageButtons(renderPairs);
            updatePager();
            function available(p, side) {
                var max = Number(side.max.value),
                    src = side.src.value;
                return (
                    (!side.pet.value || p.id === side.pet.value) &&
                    (!p.l || p.l <= max) &&
                    (!src ||
                        (src === '商城收藏冊'
                            ? p.s === src
                            : src === '捕捉'
                              ? /補抓|捕捉/.test(p.g)
                              : src === '副本'
                                ? /副本/.test(p.g)
                                : p.s !== '商城收藏冊' && !/補抓|捕捉|副本/.test(p.g)))
                );
            }
            function search() {
                var wanted = ss[key].map(function (s) {
                    return s.value;
                });
                found = [];
                current = 0;
                if (
                    wanted.some(function (s) {
                        return !s;
                    }) ||
                    new Set(wanted).size !== 3
                ) {
                    message.textContent = '請選滿同一類別的 3 項不同技能。';
                    renderPairs();
                    return;
                }
                if (
                    [m, v].some(function (s) {
                        var n = Number(s.max.value);
                        return !Number.isInteger(n) || n < 1 || n > 999;
                    })
                ) {
                    message.textContent = '等級上限請填 1 至 999 的整數。';
                    renderPairs();
                    return;
                }
                var mains = m.eligible.filter(function (p) {
                        return available(p, m) && wanted.indexOf(p[key][2]) !== -1;
                    }),
                    vices = v.eligible.filter(function (p) {
                        return (
                            available(p, v) &&
                            p[key].slice(0, 2).every(function (i) {
                                return wanted.indexOf(i) !== -1;
                            })
                        );
                    });
                mains.forEach(function (main) {
                    vices.forEach(function (vice) {
                        var paths = combinations(main[key], vice[key], wanted);
                        if (paths.length) found.push({ m: main, v: vice, paths: paths });
                    });
                });
                message.textContent =
                    '找到 ' +
                    found.length +
                    ' 組技能候選配對。依舊站同格繼承模型推算，非 REBORN 實測保證；品質、取得、星等與等級條件仍須在遊戲確認。等級未知者保留顯示。';
                renderPairs();
            }
        }
        root.querySelector('.gdr-pets-status').textContent =
            'REBORN 客戶端資料 · 2026-09-30 · ' + pets.length + ' 筆。資料存在不代表目前開放取得。';
        root.querySelector('.gdr-pets-fallback').hidden = true;
    }
    function run() {
        document.querySelectorAll('.gdr-pets').forEach(init);
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run);
    else run();
    if (typeof mw !== 'undefined' && mw.hook) mw.hook('wikipage.content').add(run);
})();