importArticles({
    type: 'script',
    articles: [
        'u:dev:Quiz/code.js',
        'u:dev:Tooltips/code.js',
        'u:dev:PurgeButton/code.js',
        'w:c:dev:ReferencePopups/code.js'
    ]
})

// Style per category

if (mw.config.get('wgCategories').length > 0 && mw.config.get('wgCategories').indexOf('MC3') > -1) {
    importStylesheetPage('MediaWiki:MC3.css', function() {
        if (window.location.host.split('.')[0].length == 2) {
            return window.location.host.split('.')[1];
        } else {
            return window.location.host.split('.')[0];
        }
    });
}