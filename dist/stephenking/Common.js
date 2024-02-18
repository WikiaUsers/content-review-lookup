//MarkForDeletion Config
window.MarkForDeletion = {
    promptedDeleteReason: "This page is not needed/is vandalistic and/or spam",
    replace: true,
};

// Animation snow
if (mw.config.get('wgPageName') === 'User:Moonwatcher_x_Qibli' && mw.config.get('wgAction') !== 'edit') {
    importArticles({
        type: 'script',
        articles: [
            'u:dev:MediaWiki:SnowStorm.js',
        ]
    });
}

// Enablement of Google forms on articles
mw.hook('wikipage.content').add(function($content) {
    if (!$content) {
        return;
    }
    $content.find('.googleforms').each(function() {
        var $this = $(this),
            id = $this.attr('data-forms-id'),
            widget = $this.attr('data-widget') || true,
            css = {
                width: 'inherit',
                height: 'inherit',
                border: 0
            };
        $this.html(
            $('<iframe>', {
                src: 'https://docs.google.com/forms/d/e/' + id + '/viewform?embedded=true&hl=' + mw.config.get('wgUserLanguage'),
                css: css
            })
        );
    });
});

// Automatic daily purge of listed pages
(function DailyPurge(window, $, mw) {
    "use strict";
    /*add pages to be purged every 24 hours directly below*/
    const pagesList = [
        'Blog:Staff Blog Posts',
        'Category:Staff Blog Posts',
        'Special:Community'
    ].map(function(string) {
        return string.replaceAll(' ', '_');
    });
    if (!pagesList.includes(mw.config.get('wgPageName'))) return;

    mw.loader.using('mediawiki.api').then(function() {
        try {
            const lastPurgeTimestamp =
                mw.config.get('wgPageParseReport')
                .cachereport
                .timestamp;

            const lastPurgeTimeParts = lastPurgeTimestamp.match(/(....)(..)(..)(..)(..)(..)/);
            const lastPurgeTime = new Date(Date.UTC(
                lastPurgeTimeParts[1],
                lastPurgeTimeParts[2] - 1,
                lastPurgeTimeParts[3],
                lastPurgeTimeParts[4],
                lastPurgeTimeParts[5],
                lastPurgeTimeParts[6]
            ));

            if (Date.now() - lastPurgeTime.valueOf() <= 24 * 60 * 60 * 1000) return;

        } catch (e) {
            return;
        }

        (new mw.Api()).post({
            action: 'purge',
            titles: mw.config.get('wgPageName')
        });
    });

})(window, jQuery, mediaWiki);

// Only import these scripts for content mods and admins so we don't waste the
// bandwidth of users who can't actually use them.
if (
    mw.config.get("wgUserGroups").includes("content-moderator") ||
    mw.config.get("wgUserGroups").includes("sysop")
) {
    importArticles({
        type: "script",
        articles: [
        'u:dev:MediaWiki:WHAM/code.2.js',
        'u:dev:MediaWiki:MassCategorization/code.js',
        'u:dev:MediaWiki:ImportJSPage/code.js',
        'u:dev:MediaWiki:QuickPurge.js',
        'u:dev:MediaWiki:QQX/code.js',
        'u:dev:MediaWiki:User Admin Tools.js',
        'u:dev:MediaWiki:MassProtect/code.js',
        'u:dev:MediaWiki:MassEdit/code.js',
        'u:dev:MediaWiki:AutoCreateUserPages.js',
        'u:dev:MediaWiki:Stella.js',
        'u:dev:MediaWiki:Matrix.js',
        'u:dev:MediaWiki:EditConflictAlert/code.js',
        'u:dev:MediaWiki:Rollback/code.js',
        'u:dev:MediaWiki:ThemeToggler.js',
        'u:dev:MediaWiki:MultipleFileDelete/code.js',
        'u:dev:MediaWiki:UserBlockNotification.js',
        'u:dev:MediaWiki:MassNullEdit/code.js',
        'u:dev:MediaWiki:UserAndIPTools.js',
        'u:dev:MediaWiki:RestoreRevButton.js',
        'u:dev:MediaWiki:AjaxBatchDelete.js',
        'u:dev:MediaWiki:MessageBlock/code.js',
        ],
    });
}