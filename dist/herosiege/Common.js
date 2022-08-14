/* Any JavaScript here will be loaded for all users on every page load. */

/*Item Search*/
    if (mw.config.get('wgPageName') === 'RezlessTestPage') {
        $(function () {
            importArticles({
                type: 'script',
                article: 'MediaWiki:Itemsearch.js'
            }, {
                type: 'style',
                article: 'MediaWiki:Itemsearch.css'
            }, {
            	type: 'script',
                article: 'https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js'
            });
        });
    }
    
    /*End: Item Search*/
/*Blanch Item Search*/
    if (mw.config.get('wgPageName') === 'BlanchTestPage') {
        $(function () {
            importArticles({
                type: 'script',
                article: 'MediaWiki:Blanchtest.js'
            }, {
                type: 'style',
                article: 'MediaWiki:Blanchtest.css'
            });
        });
    }
    /*End: Item Search*/