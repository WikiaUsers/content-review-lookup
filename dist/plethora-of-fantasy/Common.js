/* Any JavaScript here will be loaded for all users on every page load. */
/*All credit for codes goes to Fandom developers wiki*/
//code below sets user tags
window.UserTagsJS = {
	modules: {},
	tags: {
		montheditor: { u:'Editor of the Month' },
		reaper: 'Reaper of Tides',
		shadow: 'Scythe Bird',
		reality: 'Realitywarper',
		pringle: 'Single Pringle',
		wolf: 'Official Wolf',
		colours: 'Empress of Colours',
		dragon: 'Verified Dragon',
		stalker: 'Stalker Flower',
		kitsune: 'Kitsune Assassin',
		feathery: 'Feathery Elf',
		silver: 'Silver Lion'
	}
};
UserTagsJS.modules.custom = {
	'TilanissaWildhawk': ['reaper', 'shadow'],
	'GingerAle0': ['reality', 'pringle'],
	'Firewind0111': ['wolf'],
	'Mintflower09': ['colours'],
	'Moonshadow567': ['dragon'],
	'ALostWonderer': ['stalker'],
	'Featherfrost2907':['kitsune'],
	'BLuFeather':['feathery'],
	'SilvermoonTC1234':['silver']
};
//trying to activate the "inactive" user tag
UserTagsJS.modules.inactive = {
	days: 30,
	namespaces: [0],
	zeroIsInactive: true
};
//adding article preview
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:ArticlePreview/code.js',
    ]
});
//modern-looking achievements leaderboard
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:ModernLeaderboard.js',
    ]
});
//creating the discussions activity special page
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:DiscussionsActivity.js',
    ]
});
//realted discussions posts at the bottom of every page
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:RelatedDiscussionsPosts.js',
    ]
});