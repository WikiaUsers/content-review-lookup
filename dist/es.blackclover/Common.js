window.railWAM = {
    logPage:"Project:WAM Log"
};

ajaxPages = ['Special:RecentChanges', 'Special:WikiActivity', 'Special:Watchlist', 'Special:Log', 'Special:Contributions', 'Special:NewFiles', 'Special:AbuseLog'];
AjaxRCRefreshText = 'Refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';

//==============
//IMPORTACIONES
//==============

importArticles({
    type: 'script',
    articles: [
        // Togglers (toggles the display of elements on a page)
        'MediaWiki:Common.js/Togglers.js',
        // Custom Edit Buttons
        'MediaWiki:Common.js/CustomButtons.js',
        'u:dev:ReferencePopups/code.js'
    ]
});