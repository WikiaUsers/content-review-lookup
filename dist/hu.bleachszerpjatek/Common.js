importArticles({
    type: 'script',
    articles: [
        // Ajax auto-refresh
        'u:dev:MediaWiki:AjaxRC/code.js',
        'u:dev:MediaWiki:BackToTopButton/code.js',
        //Referencepopups
        'u:dev:MediaWiki:ReferencePopups/code.js',
        // Togglers (toggles the display of elements on a page)
        'u:dev:MediaWiki:Toggler.js',
        'u:dev:MediaWiki:ShowHide/code.js',
    ]
});

AjaxRCRefreshText = 'Auto-Refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages = [
    'Special:RecentChanges',
    'Special:WikiActivity',
    'Special:Watchlist',
    'Special:Log',
    'Special:Contributions',
    'Special:NewFiles',
    'Special:AbuseLog'
];