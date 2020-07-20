/**
 * Imports
 * @returns {void}
 */
;(function () {
    /**
     * @type {any[]}
     */
    var articles = [
        {
            type: 'script',
            articles: [
                'u:admintools:MediaWiki:Wikia.js/accountNavigation.js'
            ]
        },
        {
            type: 'style',
            articles: [
                'u:dev:MediaWiki:RedesignedAdminDashboard.css',
                'u:dev:MediaWiki:FontAwesome.css',
                'u:dev:MediaWiki:ModernWikiActivity.css',
                'u:dev:MediaWiki:ModernProfile/Masthead.css',
                'u:dev:MediaWiki:ModernProfile/Wall.css',
                'u:dev:MediaWiki:ModernCommentsSection.css',
                'u:dev:MediaWiki:ModernWikiActivity.css',
                'u:dev:MediaWiki:FandomizedRailModules/code.css',
                'u:dev:MediaWiki:FandomizedThemeDesigner.css',
                'u:bloodborne:MediaWiki:Codeblocks.css',
                'u:bloodborne:MediaWiki:CodeblockIdentifiers.css'
            ]
        }
    ];
    
    importArticles.apply(this, articles);
})();