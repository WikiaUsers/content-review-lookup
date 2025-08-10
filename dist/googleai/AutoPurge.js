(function DailyPurge(window, $, mw) {
    "use strict";

    mw.loader.using('mediawiki.api').then(function() {
        try {
            const ts = mw.config.get('wgPageParseReport')?.cachereport?.timestamp;
            if (!ts) return;

            const parts = ts.match(/(....)(..)(..)(..)(..)(..)/);
            const lastPurge = new Date(Date.UTC(
                parts[1], parts[2] - 1, parts[3],
                parts[4], parts[5], parts[6]
            ));

            // Only purge if the page was last purged more than 1 hour ago
            if (Date.now() - lastPurge.valueOf() <= 24 * 60 * 60 * 1000) return;
        } catch (e) {
            return;
        }

        new mw.Api().post({
            action: 'purge',
            titles: mw.config.get('wgPageName')
        });
    });
})(window, jQuery, mediaWiki);