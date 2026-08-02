mw.loader.using([
    'mediawiki.api',
    'mediawiki.util'
]).then(() => {
    if (mw.config.get('wgNamespaceNumber') !== -1 || mw.config.get('wgTitle') !== 'PatrolPanel') {
        return;
    }

    const userGroups = mw.config.get('wgUserGroups') || [];
    const greetingGroup = userGroups.find(g => g !== '*' && g !== 'user') || 'user';

    const intro = `Howdy ${greetingGroup}! Welcome to the hub for managing unpatrolled edits. Here, you can see all edits that have not been patrolled by an <span style="color: var(--themed-button-background); font-weight: bold;">administrator/content moderator</span>. This feed doesn\'t show edits by any of the aformentioned groups and only shows edits within the main namespace.`;

    document.title = 'Patrol Panel';
    $('.page-header__title').text('Patrol Panel!');

    const api = new mw.Api();

    // unchanged rows are never rebuilt or repainted
    const rowCache = new Map();
    let tableInitialized = false;

    function buildDiffCell(v) {
        const delta = v.newlen - v.oldlen;
        if (delta > 0) {
            return $('<strong class="mw-plusminus-pos">+ ' + Math.abs(delta) + '</strong>');
        } else if (delta === 0) {
            return $('<strong style="color: grey;"> 0 </strong>');
        }
        return $('<strong class="mw-plusminus-neg">- ' + Math.abs(delta) + '</strong>');
    }

    function buildRow(v) {
        const tr = $('<tr>');
        tr.append($('<td><a href="' + mw.util.getUrl(v.title) + '">' + mw.html.escape(v.title) + '</a>\n<a style="color: grey; font-style:italic;" href="' + mw.util.getUrl('Special:Diff/' + v.revid) + '">(diff)</a>'))
            .append($('<td>', { html: buildDiffCell(v)[0] }))
            .append($('<td><a href="' + mw.util.getUrl('User:' + v.user) + '">' + mw.html.escape(v.user) + '</a>'))
            .append($('<td>', { html: v.parsedcomment }))
            .append($('<td>', { text: v.timestamp.slice(11, -1) }));
        return tr;
    }

    function updateTable() {
        api.get({
            action: 'query',
            list: 'recentchanges',
            rcnamespace: '0',
            rcprop: 'title|user|sizes|parsedcomment|timestamp|ids',
            rclimit: '500',
            rcshow: '!patrolled'
        }).done(data => {
            const changes = data.query.recentchanges;
            const currentRevIds = new Set(changes.map(v => v.revid));

            if (!tableInitialized) {
                const table = $('<table id="patrol-panel-table" class="wikitable" style="width:100%; table-layout:fixed; text-align: center; word-break: break-word"><th>Title</th><th>Change</th><th>User</th><th>Summary</th><th>Timestamp</th>');
                $('#mw-content-text').html(table);
                $('#mw-content-text').prepend(intro);
                tableInitialized = true;
            }

            const table = $('#patrol-panel-table');

            // Drop rows for revisions that are no longer in the unpatrolled list
            for (const [revid, tr] of rowCache) {
                if (!currentRevIds.has(revid)) {
                    tr.remove();
                    rowCache.delete(revid);
                }
            }

            // only touching the DOM for rows that are new or misplaced
            let anchor = table.find('tr').first()[0];
            changes.forEach(v => {
                let tr = rowCache.get(v.revid);
                if (!tr) {
                    tr = buildRow(v);
                    rowCache.set(v.revid, tr);
                }
                if (tr.prev()[0] !== anchor) {
                    tr.insertAfter(anchor);
                }
                anchor = tr[0];
            });

            // it's rebuilt every pass rather than cached.
            table.find('#patrol-panel-footer').remove();
            table.append('<tr id="patrol-panel-footer"><th colspan="5" style="font-size:9px;">Version 0.4 &middot; Original Authority & Fngplg &middot; <a href="https://originalauthortiy.fandom.com/wiki/User_talk:Original_Authority">Suggest Changes</a> &middot; Last refreshed: ' + new Date().toString().slice(16, -15) + '</th></tr>');
        }).fail((code, result) => {
            console.error('PatrolPanel: failed to fetch recent changes', code, result);
            if (!tableInitialized) {
                $('#mw-content-text').html(
                    '<div class="errorbox">Failed to load unpatrolled edits (error: ' + mw.html.escape(code) + '). Retrying automatically in 3 minutes.</div>'
                );
            }
            // If the table is already initialized, leave existing rows in
            // place on a failed refresh rather than wiping the page.
        });
    }

    updateTable();
    setInterval(updateTable, 180000);
});