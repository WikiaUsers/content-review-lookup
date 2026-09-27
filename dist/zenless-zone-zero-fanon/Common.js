/* Homepage contributors: public page revisions on this wiki, across all namespaces.
 * A one-hour local cache and public API cache avoid a full scan on every visit.
 * The dated wikitext snapshot remains visible if JavaScript or the API is unavailable.
 */
(function () {
    'use strict';
    var cacheKey = 'zzz-fanon-top-contributors-v1';
    var cacheLifetime = 60 * 60 * 1000;
    var pending;

    function validSnapshot(value) {
        return value && Number.isFinite(value.updatedAt) && Array.isArray(value.users) &&
            value.users.length > 0 && value.users.every(function (user) {
                return typeof user.name === 'string' && user.name.length > 0 &&
                    Number.isSafeInteger(user.count) && user.count > 0;
            });
    }

    function readCache() {
        try {
            var value = JSON.parse(localStorage.getItem(cacheKey));
            return validSnapshot(value) ? value : null;
        } catch (error) { return null; }
    }

    function fetchRanking() {
        var counts = new Map();
        function nextBatch(continuation, batch) {
            if (batch >= 100) { return Promise.reject(new Error('Contributors pagination limit reached')); }
            var params = new URLSearchParams(Object.assign({
                action: 'query', list: 'allrevisions', arvprop: 'user|userid',
                arvlimit: '500', arvdir: 'newer', format: 'json',
                maxage: '3600', smaxage: '3600'
            }, continuation));
            var abort = new AbortController();
            var timeout = setTimeout(function () { abort.abort(); }, 15000);
            return fetch(mw.util.wikiScript('api') + '?' + params, {
                credentials: 'omit', signal: abort.signal
            }).then(function (response) {
                if (!response.ok) { throw new Error('Contributors API request failed'); }
                return response.json();
            }).then(function (data) {
                clearTimeout(timeout);
                return data;
            }, function (error) {
                clearTimeout(timeout);
                throw error;
            }).then(function (data) {
            if (data.error || !data.query || !Array.isArray(data.query.allrevisions)) {
                throw new Error('Invalid contributors response');
            }
            data.query.allrevisions.forEach(function (page) {
                page.revisions.forEach(function (revision) {
                    if (revision.userid > 0 && revision.user && !('userhidden' in revision)) {
                        counts.set(revision.user, (counts.get(revision.user) || 0) + 1);
                    }
                });
            });
            if (!data.continue) {
                var users = Array.from(counts, function (entry) {
                    return { name: entry[0], count: entry[1] };
                }).sort(function (a, b) {
                    return b.count - a.count || a.name.localeCompare(b.name, 'en');
                }).slice(0, 5);
                var snapshot = { users: users, updatedAt: Date.now() };
                if (!validSnapshot(snapshot)) { throw new Error('Empty contributors response'); }
                try { localStorage.setItem(cacheKey, JSON.stringify(snapshot)); } catch (error) { /* Storage may be disabled. */ }
                return snapshot;
            }
                return nextBatch(data.continue, batch + 1);
            });
        }
        return nextBatch({}, 0);
    }

    function element(tag, style, text) {
        var node = document.createElement(tag);
        node.style.cssText = style;
        if (text !== undefined) { node.textContent = text; }
        return node;
    }

    function render(root, snapshot) {
        var aliases = { InfiniteMotion: 'Infinite Motion', MaxenceMarquette24: 'MaxieMarq' };
        var fragment = document.createDocumentFragment();
        snapshot.users.forEach(function (user, index) {
            var row = element('div', 'padding:13px 14px;' + (index ? 'border-top:1px solid #2d3025;' : ''));
            var line = element('div', 'display:flex;align-items:center;gap:10px;');
            line.appendChild(element('div', 'flex:0 0 25px;width:25px;height:25px;line-height:25px;text-align:center;border-radius:7px;font-size:13px;font-weight:700;background:' + (index ? '#2b3020;color:#edfe6a;' : '#edfe6a;color:#111111;'), String(index + 1)));
            var name = element('div', 'flex:1;min-width:0;font-size:14px;line-height:1.4;font-weight:700;');
            var userLink = element('a', '', aliases[user.name] || user.name);
            userLink.href = mw.util.getUrl('User:' + user.name);
            name.appendChild(userLink);
            line.appendChild(name);
            var count = element('a', 'flex:0 0 auto;font-size:16px;font-weight:700;', String(user.count));
            count.href = mw.util.getUrl('Special:Contributions/' + user.name);
            line.appendChild(count);
            row.appendChild(line);
            var track = element('div', 'height:4px;margin:10px 0 0 35px;background:#2b3020;border-radius:3px;overflow:hidden;');
            track.appendChild(element('div', 'height:4px;background:#d7f300;width:' + Math.round(100 * user.count / snapshot.users[0].count) + '%;'));
            row.appendChild(track);
            fragment.appendChild(row);
        });
        var rows = root.querySelector('.mainpage-contributor-rows');
        var status = root.querySelector('.mainpage-contributor-status');
        if (!rows || !status) { return; }
        rows.replaceChildren(fragment);
        var timestamp = new Date(snapshot.updatedAt).toLocaleString('en-GB', {
            day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', timeZone: 'UTC'
        });
        status.textContent = 'All time · updated ' + timestamp + ' UTC';
        status.title = 'Updates automatically on page visits, with a one-hour cache. Counts public revisions; deleted edits are excluded.';
    }

    mw.hook('wikipage.content').add(function ($content) {
        var root = $content[0].querySelector('#mainpage-contributors[data-auto-contributors="all-time"]');
        if (!root || root.dataset.contributorsStarted) { return; }
        root.dataset.contributorsStarted = '1';
        mw.loader.using('mediawiki.util').then(function () {
            var cached = readCache();
            if (cached) { render(root, cached); }
            var age = cached ? Date.now() - cached.updatedAt : Infinity;
            if (age >= 0 && age < cacheLifetime) { return; }
            if (!pending) { pending = fetchRanking(); }
            return pending.then(function (snapshot) { render(root, snapshot); });
        }).catch(function () {
            // Keep the dated snapshot: a failed or partial response must never replace it.
        });
    });
}());