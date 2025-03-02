/* Any JavaScript here will be loaded for all users on every page load. */

window.ajaxRefresh = 30000;
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';
window.ajaxPages = [
    "Special:Watchlist",
    "Special:Allpages",
    "Special:Log",
    "Special:Contributions",
];

/* The following makes MediaWiki:Common.js/uploadform.js work */

if (['MultipleUpload', 'Upload'].indexOf(mw.config.get('wgCanonicalSpecialPageName')) > -1) {
        importScript('MediaWiki:Common.js/uploadform.js');
    }

/* prevents existing tags from being hidden */

(window.dev = window.dev || {}).profileTags = { noHideTags: true };