/** See MediaWiki:ImportJS for standalone scripts in use */

(function () {
    /* Auto-refresh */
    window.AjaxRCRefreshText = 'Auto-refresh';
    window.AjaxRCRefreshHoverText = 'Automatically refresh the page';
    window.ajaxPages = [
        'Special:WikiActivity',
        'Special:RecentChanges',
        'Special:Log'
    ];
    window.ajaxRefresh = 30000;
}());