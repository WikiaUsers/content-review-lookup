/* Loot Statistics data + LootPercentages + LootValue */
importArticles({
    type: 'script',
    articles: [
        'MediaWiki:LootStatistics-Data.js',
        'MediaWiki:LootPercentages.js',
        'MediaWiki:LootValue.js',
    ]
});
/* End of Loot Statistics data + LootPercentages */
 
/* Loot Statistics */
if (wgPageName === 'Loot_Statistics') {
    importArticles({
        type: 'script',
        article: 'MediaWiki:LootStatistics.js'
    });
}
/* End of Loot Statistics */


$(function () {
	/* TibiaWiki:Reward_Container_Statistics */
	if (mw.config.get('wgPageName') === 'TibiaWiki:Reward_Container_Statistics') {
		importArticles({
			type: 'script',
			article: 'MediaWiki:RewardContainerStatistics.js'
		});
	}
	/* TibiaWiki:Reward_Container_Statistics End */
});