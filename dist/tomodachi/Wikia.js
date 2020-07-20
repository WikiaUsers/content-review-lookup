/*{{Template:Category|Wiki CSS & JS}}*/
importScriptPage('InactiveUsers/code.js', 'dev');
importScript('MediaWiki:Wikia.js/userRightsIcons.js');
InactiveUsers = { months: 4 };
importArticles({
    type: "script",
    articles: [
        'w:c:dev:Countdown/code.js',
        'w:c:dev:RevealAnonIP/code.js',
        'w:c:fang:AJAX Auto-refresh/code.js',
    ]
});