/* Any JavaScript here will be loaded for all users on every page load. */
/*Table Filter from https://pad.fandom.com/wiki/MediaWiki:FilterTable.js*/
importArticles(
    {    
        type: 'script',
        articles: [   
            'u:pad:MediaWiki:FilterTable.js',
            'u:dev:MediaWiki:MassEdit/code.js',
        ]
    }
);