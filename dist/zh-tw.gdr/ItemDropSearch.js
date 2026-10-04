/* Wiki drop reverse lookup. No remote requests, tracking, or HTML from data. */
(function () {
    'use strict';
    function norm(s) {
        return String(s || '')
            .normalize('NFKC')
            .toLowerCase()
            .replace(/[\s．·・:：]/g, '');
    }
    function split(s) {
        return String(s || '')
            .split(/[,，、;；\n]+/)
            .map(function (x) {
                return x.trim();
            })
            .filter(function (x) {
                return x && x !== '無' && x !== '沒有資料';
            });
    }
    function index(rows) {
        var items = new Map();
        rows.forEach(function (r) {
            [
                ['a', '一般掉落'],
                ['b', '盔甲破壞']
            ].forEach(function (pair) {
                split(r[pair[0]]).forEach(function (name) {
                    if (!items.has(name)) items.set(name, []);
                    var hits = items.get(name),
                        key = JSON.stringify([r.k, r.m, r.n, r.l, r.p, pair[1]]);
                    if (
                        !hits.some(function (h) {
                            return h.key === key;
                        })
                    )
                        hits.push({ key: key, r: r, method: pair[1] });
                });
            });
        });
        return items;
    }
    function suggestions(names, query) {
        var q = norm(query);
        if (!q) return [];
        return names
            .filter(function (n) {
                return norm(n).includes(q);
            })
            .sort(function (a, b) {
                function rank(n) {
                    var s = norm(n);
                    return s === q ? 0 : s.indexOf(q) === 0 ? 1 : 2;
                }
                return rank(a) - rank(b) || a.localeCompare(b, 'zh-Hant');
            });
    }
    // Export helpers only in Node.js tests. Fandom may expose a CommonJS-like
    // `module` object in the browser, so also require the absence of `window`.
    if (typeof window === 'undefined' && typeof module !== 'undefined' && module.exports) {
        module.exports = { norm: norm, split: split, index: index, suggestions: suggestions };
        return;
    }
    function el(tag, text, parent) {
        var e = document.createElement(tag);
        if (text !== undefined) e.textContent = text;
        if (parent) parent.appendChild(e);
        return e;
    }
    function start(root) {
        if (root.dataset.ready) return;
        var status = root.querySelector('.gdr-drop-status'),
            data;
        try {
            data = JSON.parse(root.querySelector('.gdr-drop-data').textContent);
        } catch (e) {
            status.textContent = '資料讀取失敗，請重新整理頁面。';
            return;
        }
        root.dataset.ready = '1';
        var items = index(data.rows),
            names = Array.from(items.keys()).sort(function (a, b) {
                return a.localeCompare(b, 'zh-Hant');
            });
        var ui = root.querySelector('.gdr-drop-ui'),
            form = el('form', undefined, ui);
        var label = el('label', '物品名稱', form),
            input = el('input', undefined, label);
        input.type = 'search';
        input.placeholder = '例如：樹境之核、寵物、強化卷';
        input.autocomplete = 'off';
        input.setAttribute('aria-label', '物品名稱');
        var list = el('datalist', undefined, form);
        list.id = 'gdr-drop-suggestions';
        input.setAttribute('list', list.id);
        var button = el('button', '搜尋', form);
        button.type = 'submit';
        var filterLabel = el('label', '地圖類型', form),
            filter = el('select', undefined, filterLabel);
        el('option', '全部類型', filter).value = '';
        Array.from(
            new Set(
                data.rows.map(function (r) {
                    return r.k;
                })
            )
        ).forEach(function (k) {
            el('option', k, filter).value = k;
        });
        var hint = el(
                'p',
                '輸入部分名稱可取得建議，選好道具後按「搜尋」。也可直接搜尋關鍵字。',
                ui
            ),
            results = el('div', undefined, ui);
        results.setAttribute('aria-live', 'polite');
        status.textContent =
            '已載入 ' +
            names.length +
            ' 種掉落物品、' +
            data.rows.length +
            ' 筆怪物紀錄。' +
            (data.errors.length ? '部分分類載入失敗：' + data.errors.join('、') : '');
        input.addEventListener('input', function () {
            list.replaceChildren();
            suggestions(names, input.value)
                .slice(0, 30)
                .forEach(function (n) {
                    el('option', undefined, list).value = n;
                });
        });
        form.addEventListener('submit', function (event) {
            event.preventDefault();
            results.replaceChildren();
            var query = input.value.trim();
            if (!query) {
                el('p', '請先輸入物品名稱。', results);
                input.focus();
                return;
            }
            var matches = items.has(query) ? [query] : suggestions(names, query),
                hits = [];
            matches.forEach(function (n) {
                items.get(n).forEach(function (h) {
                    if (!filter.value || h.r.k === filter.value) hits.push({ name: n, h: h });
                });
            });
            if (!hits.length) {
                el(
                    'p',
                    '目前收錄資料找不到符合的掉落紀錄。可縮短關鍵字或切換為全部類型；沒有結果不代表遊戲內不會掉落。',
                    results
                );
                return;
            }
            el('p', '找到 ' + hits.length + ' 筆掉落紀錄。一般掉落與盔甲破壞分開列出。', results);
            var wrap = el('div', undefined, results);
            wrap.className = 'gdr-drop-table-wrap';
            var table = el('table', undefined, wrap);
            table.className = 'wikitable';
            var header = el('tr', undefined, el('thead', undefined, table));
            ['物品', '怪物', '等級', '掉落方式', '地圖／副本', '位置'].forEach(function (t) {
                el('th', t, header);
            });
            var body = el('tbody', undefined, table),
                cursor = 0,
                more = el('button', '顯示更多', results);
            more.type = 'button';
            function chunk() {
                hits.slice(cursor, cursor + 100).forEach(function (x) {
                    var r = x.h.r,
                        tr = el('tr', undefined, body);
                    [x.name, r.n, String(r.l), x.h.method].forEach(function (t) {
                        el('td', t, tr);
                    });
                    var loc = el('td', undefined, tr);
                    el('small', r.k + ' · ', loc);
                    if (r.m) {
                        var link = el('a', r.m, loc);
                        link.href = mw.util.getUrl('【怪物列表】' + r.k + '/' + r.m);
                    } else el('span', '地圖未提供', loc);
                    el('td', r.p || '未提供座標', tr);
                });
                cursor += 100;
                more.hidden = cursor >= hits.length;
                more.textContent = '顯示更多（尚有 ' + Math.max(0, hits.length - cursor) + ' 筆）';
            }
            more.addEventListener('click', chunk);
            chunk();
        });
    }
    mw.hook('wikipage.content').add(function () {
        document.querySelectorAll('.gdr-drop-search').forEach(start);
    });
})();