/**
 * Imports
 */
;(function() {
    var imports = [
        {
            type: 'script',
            articles: [
                'u:bloodborne:JSHighlightFixes.js',
                'u:bloodborne:ColorConverter.js',
                'u:bloodborne:DOMTools.js',
                'u:bloodborne:Tooltips.js'
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
    
    importArticles.apply(this, imports);
})();