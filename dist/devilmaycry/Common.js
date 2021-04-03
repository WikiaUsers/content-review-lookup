// Please check the MediaWiki:ImportJS feature
// before attempting to steal anything here directly.

// --Flia, 2019-05-04


///Config for AjaxRC
window.ajaxSpecialPages = ["Recentchanges", "WikiActivity", "Watchlist", "Log", "Contributions"];
window.ajaxIndicator = 'https://vignette.wikia.nocookie.net/devilmaycry/images/6/6a/Snake_throbber.gif';
$.extend(true, window, {dev: {i18n: {overrides: {AjaxRC: {
    'ajaxrc-refresh-text': 'Auto-refresh',
    'ajaxrc-refresh-hover': 'Automatically refresh the page',
}}}}});

///The following makes MediaWiki:Common.js/uploadform.js work
if (['MultipleUpload', 'Upload'].indexOf(mw.config.get('wgCanonicalSpecialPageName')) > -1) {
        importScript('MediaWiki:Common.js/uploadform.js');
    }