/* Any JavaScript here will be loaded for all users on every page load. */
/* Auto updating recent changes opt-in. See w:c:dev:AjaxRC for info & attribution */
AjaxRCRefreshText = 'Auto-Refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages = ["Special:RecentChanges","Special:WikiActivity","Special:UncategorizedPages","Special:AllPages"];
 
importArticles({
    type: 'script',
    articles: [
        'MediaWiki:Common.js/Toggler.js',
        'u:dev:ShowHide/code.js',
        'u:dev:ReferencePopups/code.js',
        'u:dev:Countdown/code.js',
        'u:dev:AjaxRC/code.js'
    ]
});

SpoilerAlert = {
    isSpoiler: function () {
        return -1 !== wgCategories.indexOf('Spoiler');
    }
};
importScriptPage('SpoilerAlert/code.js', 'dev');