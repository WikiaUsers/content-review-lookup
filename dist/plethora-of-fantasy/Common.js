/* Any JavaScript here will be loaded for all users on every page load. */
/*All credit for codes goes to Fandom developers wiki*/
//code below sets user tags
window.UserTagsJS = {
	modules: {},
	tags: {
		montheditor: { u:'Editor of the Month' },
		tilantidewaters1: 'Reaper of Tides',
		tilantidewaters2: 'Hoarder of Children',
		gingerale1: 'merely dreaming',
		mintflower1: 'An Existence',
		firewind1: 'Official Wolf',
		moonshadow1: 'Verified Dragon',
        alostwonderer1: 'Stalker Flower',
        alostwonderer2: 'Almighty Ruler Of The Mortal Realm',
		featherfrost1: 'Kitsune Assassin',
		blufeather1: 'Feathery Elf',
		blufeather2: 'Discussions Activity Dominator',
		silvermoon1: 'Silver Lion',
		fincloud1: 'Collector of Stories',
		thornflower1: 'Keeper of Knowledge',
		zephyrsingingtree1: 'Ace of Spades',
		reveriiie1: 'soft fuzzy man',
		onyxclaw1: 'river supremacy',
		onyxclaw2: 'braincells? none',
		nyferineraidenwandersinger1: 'Songwriter',
		arangagangagang1: 'Working, hardly',

	}
};
UserTagsJS.modules.custom = {
	'Tilan-Tidewaters': ['tilantidewaters1', 'tilantidewaters2'],
	'GingerAle0': ['gingerale1'],
	'Firewind0111': ['firewind1'],
	'Mintflower09': ['mintflower1'],
	'Moonshadow567': ['moonshadow1'],
	'ALostWonderer': ['alostwonderer1'],
	'Featherfrost2907':['featherfrost1'],
	'BLuFeather':['bluefeather1', 'blufeather2'],
	'SilvermoonTC1234':['silvermoon1'],
	'Fincloud':['fincloud1'],
	'Thornflower91454':['thornflower1'],
	'Zephyr Singingtree':['zephyrsingingtree1'],
	'Reveriiie':['reveriiie1'],
	'Onyxclaw00':['onyxclaw1', 'onyxclaw2'],
	'Nyferine-RaidenWandersinger':['nyferineraidenwandersinger1'],
	"Arangagangagang":['arangagangagang1'],
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