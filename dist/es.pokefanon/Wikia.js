/* desplegable */  
var ShowHideConfig = { linkBefore:true };  
importScriptPage('ShowHide/code.js', 'dev');

//WikiActivity
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:WikiActivity.js',
    ]
});