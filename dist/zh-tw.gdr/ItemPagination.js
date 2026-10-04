/* Item pagination. Same-wiki parse requests; no external services or storage. */
(function () {
    'use strict';
    function init(root) {
        if (root.dataset.ready) return;
        var catalog;
        try {
            catalog = JSON.parse(root.dataset.catalog);
        } catch (e) {
            return;
        }
        if (!Array.isArray(catalog) || !catalog.length) return;
        root.dataset.ready = '1';
        var api = new mw.Api(),
            results = root.querySelector('.gdr-item-results');
        var form = document.createElement('form'),
            nav = document.createElement('div');
        form.style.cssText = 'display:flex;flex-wrap:wrap;gap:12px;align-items:end;margin:16px 0';
        nav.style.cssText = 'display:flex;flex-wrap:wrap;gap:12px;align-items:center;margin:12px 0';
        function select(label, rows) {
            var wrap = document.createElement('label'),
                el = document.createElement('select');
            wrap.textContent = label + ' ';
            el.setAttribute('aria-label', label);
            el.style.cssText = 'max-width:100%;padding:6px';
            rows.forEach(function (row) {
                el.add(new Option(row[1], row[0]));
            });
            wrap.appendChild(el);
            form.appendChild(wrap);
            return el;
        }
        var types = catalog
            .map(function (r) {
                return r[0];
            })
            .filter(function (v, i, a) {
                return a.indexOf(v) === i;
            });
        var type = select(
            '種類',
            types.map(function (t) {
                return [t, t];
            })
        );
        var category = select('分類', []);
        function categories() {
            category.textContent = '';
            catalog
                .filter(function (r) {
                    return r[0] === type.value;
                })
                .forEach(function (r) {
                    category.add(new Option(r[1], r[1]));
                });
        }
        categories();
        var label = document.createElement('label'),
            query = document.createElement('input');
        label.textContent = '關鍵字 ';
        query.type = 'search';
        query.maxLength = 100;
        query.placeholder = '名稱或效果';
        query.setAttribute('aria-label', '關鍵字');
        query.style.cssText = 'padding:6px;max-width:100%';
        label.appendChild(query);
        form.appendChild(label);
        var size = select('每頁筆數', [
            ['25', '25'],
            ['50', '50'],
            ['100', '100']
        ]);
        size.value = '50';
        var sort = select('排序', [
            ['original', '原始順序'],
            ['levelAsc', '等級：低到高'],
            ['levelDesc', '等級：高到低'],
            ['name', '名稱']
        ]);
        var submit = document.createElement('button');
        submit.type = 'submit';
        submit.textContent = '搜尋';
        form.appendChild(submit);
        var status = document.createElement('p');
        status.setAttribute('role', 'status');
        status.setAttribute('aria-live', 'polite');
        var full = document.createElement('a');
        full.textContent = '開啟完整分類列表';
        function button(text, action) {
            var b = document.createElement('button');
            b.type = 'button';
            b.textContent = text;
            b.addEventListener('click', action);
            nav.appendChild(b);
            return b;
        }
        var page = 1,
            pages = 1,
            applied,
            busy = false,
            serial = 0,
            failed = false,
            requestedPage = 1;
        var first = button('第一頁', function () {
            load(1);
        });
        var prev = button('上一頁', function () {
            load(page - 1);
        });
        var count = document.createElement('span');
        nav.appendChild(count);
        var next = button('下一頁', function () {
            load(page + 1);
        });
        var last = button('最後一頁', function () {
            load(pages);
        });
        var retry = button('重試', function () {
            load(requestedPage);
        });
        retry.hidden = true;
        function update() {
            first.disabled = prev.disabled = busy || failed || page <= 1;
            next.disabled = last.disabled = busy || failed || page >= pages;
            count.textContent = '第 ' + page + '／' + pages + ' 頁';
            submit.disabled = busy;
            retry.disabled = busy;
            results.setAttribute('aria-busy', String(busy));
        }
        function apply() {
            applied = {
                t: type.value,
                c: category.value,
                q: query.value.trim(),
                size: size.value,
                sort: sort.value
            };
            load(1);
        }
        function load(wanted) {
            var current = ++serial,
                args = Object.assign({}, applied, { page: Math.max(1, wanted) });
            requestedPage = args.page;
            failed = false;
            busy = true;
            retry.hidden = true;
            status.textContent = '正在查詢所選分類的全部資料…';
            update();
            var text =
                '{{#invoke:ItemPagination|query' +
                Object.keys(args)
                    .map(function (k) {
                        return '|' + k + '=' + encodeURIComponent(args[k]);
                    })
                    .join('') +
                '}}';
            api.post({
                action: 'parse',
                text: text,
                contentmodel: 'wikitext',
                prop: 'text',
                disablelimitreport: 1,
                formatversion: 2
            })
                .then(function (data) {
                    if (current !== serial) return;
                    var html = data && data.parse && data.parse.text;
                    if (typeof html !== 'string') throw new Error('Invalid parse response');
                    var doc = new DOMParser().parseFromString(html, 'text/html'),
                        box = doc.querySelector('.gdr-item-page');
                    if (!box || doc.querySelector('.gdr-page-error,.scribunto-error'))
                        throw new Error('Invalid result');
                    box.querySelectorAll('script,iframe,object,embed,style,link').forEach(
                        function (el) {
                            el.remove();
                        }
                    );
                    box.querySelectorAll('*').forEach(function (el) {
                        Array.from(el.attributes).forEach(function (a) {
                            if (
                                /^on/i.test(a.name) ||
                                (/^(href|src|xlink:href|action)$/i.test(a.name) &&
                                    /^\s*(javascript|data|vbscript):/i.test(a.value))
                            )
                                el.removeAttribute(a.name);
                        });
                    });
                    page = Number(box.dataset.page);
                    pages = Number(box.dataset.pages);
                    if (
                        !Number.isInteger(page) ||
                        !Number.isInteger(pages) ||
                        page < 1 ||
                        pages < page
                    )
                        throw new Error('Invalid pagination');
                    results.replaceChildren(document.importNode(box, true));
                    full.href = mw.util.getUrl('【物品列表】' + args.t + '/' + args.c);
                    status.textContent =
                        args.t +
                        '／' +
                        args.c +
                        '：共 ' +
                        box.dataset.total +
                        ' 筆' +
                        (args.q ? '，關鍵字「' + args.q + '」' : '') +
                        '。搜尋與排序涵蓋此分類全部資料。';
                    busy = false;
                    update();
                    mw.hook('wikipage.content').fire($(results));
                })
                .catch(function () {
                    if (current !== serial) return;
                    busy = false;
                    failed = true;
                    status.textContent = '查詢失敗，保留上次結果。請重試或開啟完整分類列表。';
                    retry.hidden = false;
                    update();
                });
        }
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            apply();
        });
        type.addEventListener('change', function () {
            categories();
            apply();
        });
        category.addEventListener('change', apply);
        size.addEventListener('change', apply);
        sort.addEventListener('change', apply);
        root.insertBefore(form, results);
        root.insertBefore(status, results);
        root.insertBefore(nav, results);
        root.insertBefore(full, results);
        full.href = mw.util.getUrl('【物品列表】' + type.value + '/' + category.value);
        var pending = root.querySelector('.gdr-pending');
        if (pending) pending.remove();
        apply();
    }
    mw.loader.using(['mediawiki.api', 'mediawiki.util']).then(function () {
        mw.hook('wikipage.content').add(function (content) {
            content.find('.gdr-item-browser').each(function () {
                init(this);
            });
        });
    });
})();