(function () {
    var CACHE_TTL_MS = 10 * 60 * 1000;
    var QP_LIMIT = 500;

    var REPORTS = [
        { key: 'wantedpages',          label: 'Wanted Pages',          icon: '⭐', special: 'WantedPages',          qppage: 'Wantedpages',          group: 'attention', desc: 'Linked from articles but not created yet' },
        { key: 'wantedcategories',     label: 'Wanted Categories',     icon: '⭐', special: 'WantedCategories',     qppage: 'Wantedcategories',     group: 'attention', desc: 'Used on pages but have no category page' },
        { key: 'wantedtemplates',      label: 'Wanted Templates',      icon: '⭐', special: 'WantedTemplates',      qppage: 'Wantedtemplates',      group: 'attention', desc: 'Called somewhere but don\u2019t exist' },
        { key: 'wantedfiles',          label: 'Wanted Files',          icon: '⭐', special: 'WantedFiles',          qppage: 'Wantedfiles',          group: 'attention', desc: 'Referenced but never uploaded' },
        { key: 'uncategorizedpages',   label: 'Uncategorized Pages',   icon: '📄', special: 'UncategorizedPages',   qppage: 'Uncategorizedpages',   group: 'attention', desc: 'No categories at all' },
        { key: 'uncategorizedcategories', label: 'Uncategorized Categories', icon: '🗂️', special: 'UncategorizedCategories', qppage: 'Uncategorizedcategories', group: 'attention', desc: 'Categories with no parent category' },
        { key: 'uncategorizedtemplates', label: 'Uncategorized Templates', icon: '📐', special: 'UncategorizedTemplates', qppage: 'Uncategorizedtemplates', group: 'attention', desc: 'Templates missing categories' },
        { key: 'uncategorizedfiles',   label: 'Uncategorized Files',   icon: '🖼️', special: 'UncategorizedFiles',   qppage: 'Uncategorizedimages',  group: 'attention', desc: 'Uploaded files with no category' },
        { key: 'unusedcategories',     label: 'Unused Categories',     icon: '🗑️', special: 'UnusedCategories',     qppage: 'Unusedcategories',     group: 'cleanup', desc: 'Exist but tag no pages' },
        { key: 'unusedtemplates',      label: 'Unused Templates',      icon: '🗑️', special: 'UnusedTemplates',      qppage: 'Unusedtemplates',      group: 'cleanup', desc: 'Not transcluded anywhere' },
        { key: 'unusedfiles',          label: 'Unused Files',          icon: '🗑️', special: 'UnusedFiles',          qppage: 'Unusedimages',         group: 'cleanup', desc: 'Uploaded but not used on any page' },
        { key: 'unorganizedtemplates', label: 'Unorganized Templates', icon: '🧩', special: 'UnorganizedTemplates', qppage: null, group: 'cleanup', desc: 'No live report \u2014 browse manually' },
        { key: 'unwatchedpages',       label: 'Unwatched Pages',       icon: '👀', special: 'UnwatchedPages',       qppage: 'Unwatchedpages',       group: 'cleanup', desc: 'Staff-only report', restricted: true }
    ];

    var GROUP_LABELS = {
        attention: '🎯 Needs Attention',
        cleanup: '🧹 Cleanup Candidates'
    };

    function cacheKey(qppage) { return 'iumd_cache_' + qppage; }

    function readCache(qppage) {
        try {
            var raw = window.sessionStorage.getItem(cacheKey(qppage));
            if (!raw) return null;
            var parsed = JSON.parse(raw);
            if (!parsed || (Date.now() - parsed.ts) > CACHE_TTL_MS) return null;
            return parsed.data;
        } catch (e) { return null; }
    }

    function writeCache(qppage, data) {
        try {
            window.sessionStorage.setItem(cacheKey(qppage), JSON.stringify({ ts: Date.now(), data: data }));
        } catch (e) { /* ignore */ }
    }

    function fetchReport(report) {
        if (!report.qppage) {
            return $.Deferred().resolve({ status: 'nodata' }).promise();
        }
        var cached = readCache(report.qppage);
        if (cached) return $.Deferred().resolve(cached).promise();

        return new mw.Api().get({
            action: 'query',
            list: 'querypage',
            qppage: report.qppage,
            qplimit: QP_LIMIT,
            format: 'json'
        }).then(function (data) {
            var qp = data.query && data.query.querypage;
            var rows = (qp && qp.results) || [];
            var result = {
                status: 'ok',
                count: rows.length,
                capped: rows.length >= QP_LIMIT,
                titles: rows.map(function (r) { return r.title; })
            };
            writeCache(report.qppage, result);
            return result;
        }).catch(function () {
            return { status: 'restricted' };
        });
    }

    function buildCard(report, result) {
        var card = document.createElement('div');
        card.className = 'iumd-card';

        var top = document.createElement('div');
        top.className = 'iumd-card-top';

        var label = document.createElement('div');
        label.className = 'iumd-card-label';
        var icon = document.createElement('span');
        icon.className = 'iumd-icon';
        icon.textContent = report.icon;
        var labelText = document.createElement('span');
        labelText.textContent = report.label;
        label.appendChild(icon);
        label.appendChild(labelText);

        var countEl = document.createElement('div');
        countEl.className = 'iumd-count';

        if (result.status === 'ok') {
            countEl.textContent = result.capped ? (result.count + '+') : String(result.count);
            if (result.count === 0) countEl.classList.add('iumd-count-zero');
        } else if (result.status === 'restricted') {
            countEl.classList.add('iumd-count-na');
            countEl.textContent = 'Staff only';
        } else {
            countEl.classList.add('iumd-count-na');
            countEl.textContent = '\u2014';
        }

        top.appendChild(label);
        top.appendChild(countEl);

        var desc = document.createElement('div');
        desc.className = 'iumd-desc';
        desc.textContent = report.desc;

        var footer = document.createElement('div');
        footer.className = 'iumd-card-footer';
        var link = document.createElement('a');
        link.className = 'iumd-view-link';
        link.href = mw.util.getUrl('Special:' + report.special);
        link.textContent = 'View full report \u2192';
        footer.appendChild(link);

        card.appendChild(top);
        card.appendChild(desc);
        card.appendChild(footer);

        if (result.status === 'ok' && result.count > 0) {
            card.appendChild(buildPreview(report, result));
        }

        return card;
    }

    function buildPreview(report, result, previewCount) {
        var details = document.createElement('details');
        details.className = 'iumd-preview';
        var summary = document.createElement('summary');
        summary.textContent = 'Show examples';
        details.appendChild(summary);

        var list = document.createElement('ul');
        list.className = 'iumd-preview-list';
        var shown = result.titles.slice(0, previewCount || 5);
        shown.forEach(function (title) {
            var li = document.createElement('li');
            var a = document.createElement('a');
            a.href = mw.util.getUrl(title);
            a.textContent = title;
            li.appendChild(a);
            list.appendChild(li);
        });
        details.appendChild(list);

        if (result.count > shown.length) {
            var more = document.createElement('div');
            more.className = 'iumd-preview-more';
            more.textContent = '+ ' + (result.count - shown.length) + ' more \u2014 see full report';
            details.appendChild(more);
        }

        return details;
    }

    function buildSkeletonCard(report) {
        var card = document.createElement('div');
        card.className = 'iumd-card';
        var top = document.createElement('div');
        top.className = 'iumd-card-top';
        var label = document.createElement('div');
        label.className = 'iumd-card-label';
        label.innerHTML = '<span class="iumd-icon">' + report.icon + '</span><span>' + report.label + '</span>';
        var skel = document.createElement('div');
        skel.className = 'iumd-skeleton';
        top.appendChild(label);
        top.appendChild(skel);
        card.appendChild(top);
        return card;
    }

    function initDashboard(container) {
        var previewCount = parseInt(container.dataset.preview, 10) || 5;

        var groups = {};
        ['attention', 'cleanup'].forEach(function (g) {
            var wrap = document.createElement('div');
            var title = document.createElement('div');
            title.className = 'iumd-section-title';
            title.textContent = GROUP_LABELS[g];
            var grid = document.createElement('div');
            grid.className = 'iumd-grid';
            wrap.appendChild(title);
            wrap.appendChild(grid);
            container.appendChild(wrap);
            groups[g] = grid;
        });

        var cardEls = {};
        REPORTS.forEach(function (report) {
            var skeleton = buildSkeletonCard(report);
            groups[report.group].appendChild(skeleton);
            cardEls[report.key] = skeleton;
        });

        REPORTS.forEach(function (report) {
            fetchReport(report).then(function (result) {
                var realCard = buildCard(report, result);
                var oldEl = cardEls[report.key];
                if (oldEl && oldEl.parentNode) {
                    oldEl.parentNode.replaceChild(realCard, oldEl);
                }
                cardEls[report.key] = realCard;
                // re-apply preview count if custom
                if (result.status === 'ok' && result.count > 0 && previewCount !== 5) {
                    var oldPreview = realCard.querySelector('.iumd-preview');
                    if (oldPreview) oldPreview.remove();
                    realCard.appendChild(buildPreview(report, result, previewCount));
                }
            });
        });
    }

    function init() {
        if (typeof mw === 'undefined' || !mw.Api) return;
        document.querySelectorAll('.maintenance-dashboard').forEach(function (el) {
            if (!el.dataset.loaded) {
                el.dataset.loaded = '1';
                initDashboard(el);
            }
        });
    }

    if (typeof mw !== 'undefined' && mw.hook) {
        mw.hook('wikipage.content').add(init);
    } else {
        document.addEventListener('DOMContentLoaded', init);
    }
})();