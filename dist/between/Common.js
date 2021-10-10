

// AjaxRC  Config

window.ajaxPages = ["Between Wiki:Appeal unblock requests"];
window.ajaxSpecialPages = ["Recentchanges", "WikiActivity", "Watchlist", "Log", "Contributions"];
window.ajaxIndicator = 'https://images.wikia.nocookie.net/software/images/a/a9/Indicator.gif';
window.ajaxRefresh = 30000;
$.extend(true, window, {dev: {i18n: {overrides: {AjaxRC: {
    'ajaxrc-refresh-text': 'AJAX',
    'ajaxrc-refresh-hover': 'Enable page auto-refresh',
}}}}});


// preventing 'Forum talk:{{{1}}}'. For make new suggestions to the forum:index, do it on BW:APZ.
$(function () { /* Redirects */
    if (mw.config.get('wgNamespaceNumber') == 101) location.href = mw.config.get('wgServer') + '/wiki/Forum:' + mw.config.get('wgTitle');