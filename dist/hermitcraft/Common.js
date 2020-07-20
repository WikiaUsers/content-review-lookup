/* Articles are interwiki links so that other wikis can use them. */
importArticles({
    type: 'script',
    articles: [
        'u:dev:ExtendedNavigation/code.js',
        'w:c:clashofclans:MediaWiki:Common.js/Sliders.js'
    ]
});

/* Auto Refresh */
AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages = ["Special:RecentChanges","Special:WikiActivity"];
importScriptPage('AjaxRC/code.js', 'dev');