/**
 * Imports
 */
;(function() {
    var imports = [
        {
            type: 'script',
            articles: [
                'u:bloodborne:MediaWiki:JSHighlightFixes.js',
                'u:bloodborne:MediaWiki:ColorConverter.js',
                'u:bloodborne:MediaWiki:DOMTools.js',
                'u:bloodborne:MediaWiki:Tooltips.js'
            ]
        },
        {
            type: 'style',
            articles: [
                'u:bloodborne:MediaWiki:Codeblocks.css',
                'u:bloodborne:MediaWiki:CodeblockIdentifiers.css'
            ]
        }
    ];
    
    function wait () {
    	if (document.readyState !== 'complete') return setTimeout(wait, 1000);
    	setTimeout(function () {
    		importArticles.apply(this, imports);
    	}, 0);
    }
    
    wait();
})();