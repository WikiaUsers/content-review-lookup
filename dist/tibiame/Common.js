/* Any JavaScript here will be loaded for all users on every page load. */

$(function () {
	/* Load /wiki/Creature_Ranks.css */
	importArticles({
	    type: 'style',
	    article: 'MediaWiki:CreatureRanks.css'
	});
	/* end of Load /wiki/Creature_Ranks.css */
});