(function DailyPurge(window, $, mw) {
    "use strict";
    /* Add pages to be purged every 1 hour directly below */
    const pagesList = [
        'Blog:Staff Blog Posts',
        'Category:Staff Blog Posts',
        'Special:Community'
    ].map(function(string) {
        return string.replace(/ /g, '_');
    });
    if (!pagesList.includes(mw.config.get('wgPageName'))) return;
    mw.loader.using('mediawiki.api').then(function() {
        try {
            const lastPurgeTimestamp = mw.config.get('wgPageParseReport').cachereport.timestamp;
            const lastPurgeTimeParts = lastPurgeTimestamp.match(/(....)(..)(..)(..)(..)(..)/);
            const lastPurgeTime = new Date(Date.UTC(
                lastPurgeTimeParts[1],
                lastPurgeTimeParts[2] - 1,
                lastPurgeTimeParts[3],
                lastPurgeTimeParts[4],
                lastPurgeTimeParts[5],
                lastPurgeTimeParts[6]
            ));
            if (Date.now() - lastPurgeTime.valueOf() <= 60 * 1000) return;ci
        } catch (e) {
            return;
        }
        (new mw.Api()).post({
            action: 'purge',
            titles: mw.config.get('wgPageName')
        });
    });
})(window, jQuery, mediaWiki);