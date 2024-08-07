mw.loader.using([
    'mediawiki.api',
    'mediawiki.util'
]).then(function() {
    if (mw.config.get('wgNamespaceNumber') !== -1 || mw.config.get('wgTitle') !== 'PatrolPanel') {
        return;
    }
    var intro = 'Howdy ' + mw.config.get('wgUserGroups')[0] + '! Welcome to the hub for managing unpatrolled edits. Here, you can see all edits that have not been patrolled by an <span style="color: var(--themed-button-background); font-weight: bold;">administrator/content moderator</span>. This feed doesn\'t show edits by any of the aformentioned groups and only shows edits within the main namespace.';
    document.title = 'Patrol Panel';
    $('.page-header__title').text('Patrol Panel!');
    var api = new mw.Api();
    function updateTable() {
        api.get({
            action: 'query',
            list: 'recentchanges',
            rcnamespace: '0',
            rcprop: 'title|user|sizes|parsedcomment|timestamp|ids',
            rclimit: '407',
            rcend: '2017-08-17T19:44:17Z',
            rcshow: '!patrolled'
        }).done(function(data) {
            var changes = data.query.recentchanges;
            var lis = $('<table class="wikitable" style="width:100%; table-layout:fixed; text-align: center; word-break: break-word"><th>Title</th><th>Change</th><th>User</th><th>Summary</th><th>Timestamp</th>');
            $.each(changes, function(i, v) {
                var diff;
                if ((v.newlen - v.oldlen) > 0) {
                    diff = $('<strong class=\"mw-plusminus-pos\">+ ' + Math.abs(v.newlen - v.oldlen) + '</strong>');
                } else if ((v.newlen - v.oldlen) === 0) {
                    diff = $('<strong style=\"color: grey\";"> 0 </strong>');
                } else {
                    diff = $('<strong class=\"mw-plusminus-neg\">- ' + Math.abs(v.newlen - v.oldlen) + '</strong>');
                }
                var tr = $('<tr>');
                tr.append($('<td><a href="' + mw.util.getUrl(v.title) + '">' + mw.html.escape(v.title) + '</a>\n<a style="color: grey; font-style:italic;" href="' + mw.util.getUrl('Special:Diff/' + v.revid) + '">(diff)</a>'))
                    .append($('<td>', {
                        html: diff[0]
                    }))
                    .append($('<td><a href="' + mw.util.getUrl('User:' + v.user) + '">' + mw.html.escape(v.user) + '</a>'))
                    .append($('<td>', {
                        html: v.parsedcomment
                    }))
                    .append($('<td>', {
                        text: v.timestamp.slice(11, -1)
                    }));
                lis.append(tr);
            });
            lis.append('<tr><th colspan="5" style="font-size:9px;">Version 0.2 &middot; Original Authority & Fngplg &middot; <a href="https://originalauthortiy.fandom.com/wiki/User_talk:Original_Authority">Suggest Changes</a> &middot; Last refreshed: ' + new Date().toString().slice(16, -15) + '</th></tr>');
            $('#mw-content-text').html(lis);
            $('#mw-content-text').prepend(intro);
        });
    }
    updateTable();
    setInterval(updateTable, 180000);
});