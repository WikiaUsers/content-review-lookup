/* Any JavaScript here will be loaded for all users on every page load. */
/*All credit for codes goes to Fandom developers wiki*/
//code below sets user tags
window.UserTagsJS = {
	modules: {},
	tags: {
		montheditor: { u:'Editor of the Month' },
		reaper: 'Reaper of Tides',
		children: 'Hoarder of Children',
		lore: 'Lore Simp',
		braincell: 'The Only Braincell',
		wolf: 'Official Wolf',
		colours: 'The Colour Empress',
		existence: 'An Existence',
		dragon: 'Verified Dragon',
		stalker: 'Stalker Flower',
		kitsune: 'Kitsune Assassin',
		feathery: 'Feathery Elf',
		silver: 'Silver Lion',
		activity: 'Discussions Activity Dominator',
		collector: 'Collector of Stories',
	}
};
UserTagsJS.modules.custom = {
	'TilanissaWildhawk': ['reaper', 'children'],
	'GingerAle0': ['lore', 'braincell'],
	'Firewind0111': ['wolf'],
	'Mintflower09': ['colours, existence'],
	'Moonshadow567': ['dragon'],
	'ALostWonderer': ['stalker'],
	'Featherfrost2907':['kitsune'],
	'BLuFeather':['feathery', 'activity'],
	'SilvermoonTC1234':['silver'],
	'Fincloud':['collector'],
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
//related discussions posts at the bottom of every page
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:RelatedDiscussionsPosts.js',
    ]
});