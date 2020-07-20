importArticles({
    type: "script",
    articles: [
        'u:dev:MediaWiki:Medals/code.js',
        'u:dev:MediaWiki:AjaxRC/code.js'
    ]
});

window.ajaxPages = [
    "Служебная:WikiActivity", "Служебная:RecentChanges"
];
window.AjaxRCRefreshText = 'Автообновление';