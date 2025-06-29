/* Any JavaScript here will be loaded for all users on every page load. */
$(function() {
    mw.loader.using(['mediawiki.api', 'mediawiki.util'], function () {
        var api = new mw.Api();
        var page = mw.config.get('wgPageName');

        api.get({
            action: 'query',
            prop: 'revisions',
            titles: page,
            rvprop: 'user|timestamp',
            rvlimit: 1,
            formatversion: 2
        }).done(function(data) {
            if (!data.query || !data.query.pages || !data.query.pages[0].revisions) return;

            var rev = data.query.pages[0].revisions[0];
            var infoBox = document.createElement('div');
            infoBox.textContent = 'Last edited by ' + rev.user + ' on ' + new Date(rev.timestamp).toLocaleString();
            infoBox.style.cssText = 'background:#1e1e1e;color:white;padding:6px 12px;margin:12px 0;font-size:14px;border-radius:6px';

            var content = document.getElementById('mw-content-text');
            if (content) content.insertBefore(infoBox, content.firstChild);
        });
    });
});