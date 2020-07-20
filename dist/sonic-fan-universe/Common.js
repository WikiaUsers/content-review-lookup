(function () {
    var cats = mw.config.get('wgCategories'),
        spoiler = $.inArray('Spoilers', cats) !== -1,
        underconstruction  = $.inArray('Under Construction',cats) !== -1;
    window.SpoilerAlert = {};
    window.SpoilerAlert.isSpoiler = function () {    
        return spoiler || underconstruction;
    };
    if (spoiler && underconstruction) {
        window.SpoilerAlert.question = 'This page contains unfinished content and spoilers, would you like to continue?';
        window.SpoilerAlert.no = 'No, I will wait until it is done.';
        window.SpoilerAlert.yes = 'Yes, I would like to read this page.';
    } else if (spoiler) {
        window.SpoilerAlert.question = 'This page contains spoilers, would you like to continue?';
        window.SpoilerAlert.no = 'No, I will read it later.';
        window.SpoilerAlert.yes = 'Yes, I would like to read this page.';
    } else if (underconstruction) {
        window.SpoilerAlert.question = 'This page is currently unfinished, would you like to continue reading?';
        window.SpoilerAlert.no = 'No, I will wait until it is done.';
        window.SpoilerAlert.yes = 'Yes, I would like to continue reading.';
    }
}());

window.category = 'Candidates for deletion';
window.reason = 'Marked for Deletion';

importArticles({
    type: 'script',
    articles: [
        // other scripts
        'u:dev:QuickDelete/code.js',
        'MediaWiki:SpoilerAlert.js',
        'MediaWiki:Chat.js',
        'u:dev:CategoryRenameAuto-update/code.js'
        // other scripts
    ]
});

// 1. AjaxRC configuration option
var ajaxRefresh = 30000;
window.ajaxPages = ["Special:RecentChanges","Special:Watchlist","Special:Log","Special:Contributions", "Special:WikiActivity"];
 
// 2. AjaxRC import statement
importScriptPage('AjaxRC/code.js','dev')