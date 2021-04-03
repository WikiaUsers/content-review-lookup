importArticles({
    type: 'script',
    articles: [
        'u:dev:AjaxBatchDelete/code.2.js',
        'u:dev:QuickDelete/code.js',
    ]
});

window.railWAM = {
    logPage:"Project:WAM Log"
};

window.rwaOptions = {
	limit: 50,
	namespaces: [ 0, 1, 2, 3, 4, 5, 6, 7, 110, 111, 500, 501, 828, 829 ],
	autoInit: true 
};

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:WikiActivity.js',
        
        importArticles({
    type: "script",
    articles: [
        "w:c:dev:MediaWiki:Countdown/code.js"
    ]
});
    ]
});
importArticles({
    type: 'script',
    articles: [
        'u:dev:AjaxBatchDelete/code.2.js',
        'u:dev:QuickDelete/code.js',
    ]
});

MediaWiki:Common.js/insertusername.js", /* User name replace for Template:USERNAME */

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:RailWAM/code.js',
    ]
});