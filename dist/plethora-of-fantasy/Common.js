/* Any JavaScript here will be loaded for all users on every page load. */
/*All credit for codes goes to Fandom developers wiki*/
//code below sets user tags
window.UserTagsJS = {
	modules: {},
	tags: {
		montheditor: { u:'Editor of the Month' },
		reaper: 'Reaper of Tides',
		shadow: 'And from the Darkness I Hear the Sound of Her Wings...',
		reality: 'Realitywarper',
		pringle: 'Single Pringle',
		wolf: 'Official Wolf',
		colours: 'Empress of Colours',
		dragon: 'Verified Dragon',
		stalker: 'Stalker Flower',
		kitsune: 'Kitsune Assassin',
		feathery: 'Feathery Elf'
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
	'BLuFeather':['feathery']
};
//trying to activate the "inactive" user tag
UserTagsJS.modules.inactive = {
	days: 30,
	namespaces: [0],
	zeroIsInactive: true
};
//adding edit leaderboard to wiki
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:EditLeaderboard.js',
    ]
});
//adding article preview
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:ArticlePreview/code.js',
    ]
});