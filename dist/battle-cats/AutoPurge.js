/*
Script to make select pages be purged after a lower threshold than the usual cache expiry limits.

Format of MediaWiki:Custom-AutoPurge-pages.json is `"pagename": delay_seconds`

Do not try to make the expiry 0 seconds, it will fail
*/
var params = {
    action: 'query',
    prop: 'revisions',
    titles: 'MediaWiki:Custom-AutoPurge-pages.json',
    rvprop: 'content',
    rvslots: 'main',
    formatversion: '2',
    format: 'json'
}

mw.loader.using('mediawiki.api').then(function () {
    api = new mw.Api();
    api.get(params).done(function (data) {
        var content = data.query.pages[0].revisions[0].slots.main.content
        var map = new Map(Object.entries(JSON.parse(content)))

        var page = mw.config.get('wgPageName');
        const delay_seconds = map.get(page.replaceAll('_', ' '))
        if (!delay_seconds) {
            return;
        }

        function parseDate(s) {
            var m = s.match(/^(?<yyyy>\d{4})(?<mm>\d{2})(?<dd>\d{2})?(?<hh>\d{2})?(?<m>\d{2})?(?<ss>\d{2})?(?<ms>\d{4})?$/);
            m[2] -= 1

            return new Date(Date.UTC.apply(Date, m.slice(1).map(function (v) { return +v }).filter(Boolean)));
        }

        var parserReport = mw.config.get('wgPageParseReport');
        var date = parseDate(parserReport.cachereport.timestamp);
        var now = new Date();

        const REFRESH_TIME_MS = delay_seconds * 1000

        if (now - date > REFRESH_TIME_MS) {
            api.post({
                action: 'purge',
                titles: page
            }).done(function () {
                location.reload();
            });
        }
    });
})