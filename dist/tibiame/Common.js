/* Any JavaScript here will be loaded for all users on every page load. */

$(function () {
	/* Outfitter */
	if (mw.config.get('wgPageName') === 'Outfitter') {
    	importArticles({
        	type: 'script',
        	articles: ['MediaWiki:Outfitter.js']
	    });
    	importArticles({
        	type: 'style',
        	articles: ['MediaWiki:Outfitter.css']
	    });
	}
	/* End of Outfitter */

	/* Load /wiki/Creature_Ranks.css */
	importArticles({
	    type: 'style',
	    article: 'MediaWiki:CreatureRanks.css'
	});
	/* end of Load /wiki/Creature_Ranks.css */
});