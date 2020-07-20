require(['mw'], function(mw) {
    'use strict';
    // We need stdsummaries, period.
    importArticle({
        type: 'style',
        article: 'MediaWiki:CustomSummaries.css'
    });
    mw.loader.load('http://swfanon.wikia.com/index.php?action=raw&title=MediaWiki:CustomSummaries.js&ctype=text/javascript');
});