/**
 * Imports
 * @namespace Wikia.js
 */
 
// jshint browser: true, devel: true, jquery: true
// jshint strict: true, freeze: true, eqeqeq: true, futurehostile: true
// jshint newcap: true, noarg: true, quotmark: single, shadow: outer
// jshint latedef: true, undef: true, unused: true
/* global mw */
 
/**
 * @typedef Article
 * @property {string} type - script article or style article.
 * @property {string[]} articles - interwiki article links.
 */
 
/**
 * Initialization IIFE.
 * @returns {void}
 */
;(function () {
	'use strict';
    /**
     * @type {Article[]}
     */
    var articles = [
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
    
    mw.hook('wikipage.content').add(function () {
    	setTimeout(function () {
    		window.importArticles.apply(null, articles);
    	}, 0);
    });
})();
 
/*@end@*/