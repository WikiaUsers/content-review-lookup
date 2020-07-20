/* Any JavaScript here will be loaded for all users on every page load. */
importArticles( {
	type: 'script',
	articles: [
	    'MediaWiki:Mixitup/code.js',
	    'u:dev:OggPlayer.js',
	    'u:dev:ChatReload/code.js',
	    'u:dev:Tooltips.js',
	    'u:dev:MediaWiki:MassCategorization/code.js',
	    'w:c:dev:MediaWiki:Countdown/code.js'
	]
});

window.MassCategorizationGroups = ['sysop', 'content-moderator'];