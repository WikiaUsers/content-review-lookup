// This script was originally a fork of AjaxRC that used
// `wgCanonicalSpecialPageName` rather than `wgPageName` to
// decide what pages to run on. It now converts these settings
// and runs the original script. 

window.ajaxSpecialPages = Array.isArray(window.ajaxPages)
    ? window.ajaxPages
    : ['Recentchanges', 'Watchlist', 'Log'];

window.ajaxPages = [];

importArticle({
    type: 'script',
    article: 'u:dev:MediaWiki:AjaxRC.js'
});