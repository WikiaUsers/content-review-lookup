require([
    'jquery', 'mediawiki', 'wikia.window', 'wikia.nirvana', 
    'ext.wikia.design-system.loading-spinner'
], function($, mw, window, nirvana, Spinner){
    importArticles({
        type: 'script',
        articles: ['WDSIcons', 'Colors', 'I18n-js']
            .map(function(name){
                
            })
    });
});