/* Any JavaScript here will be loaded for all users on every page load. */

WebFontConfig = {
    google: { families: [ 'Rokkitt::latin', 'Lobster::latin', 'UnifrakturCook:700:latin', 'Cinzel+Decorative::latin', 'Special+Elite::latin', 'Bangers::latin', 'Abril+Fatface::latin', 'Great+Vibes::latin', 'Black+Ops+One::latin' ] }
};

(function() {
    var wf = document.createElement('script');
    wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
      '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
    wf.type = 'text/javascript';
    wf.async = 'true';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(wf, s);
})();

/*AutoRefresh*/
window.ajaxPages = [
    "Special:WikiActivity",
    "Special:RecentChanges",
    "Special:Watchlist",
    "Special:Log",
    "Special:Contributions"
];

importArticles({
    type: 'script',
    articles: [
        'u:dev:AjaxRC/code.js',
        'u:dev:DisplayClock/code.js',
        'u:dev:MediaWiki:PurgeButton/code.js'
    ]
});