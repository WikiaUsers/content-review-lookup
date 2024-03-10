/* Any JavaScript here will be loaded for all users on every page load. */

var pagename = mw.config.get('wgPageName');
if (pagename === 'Sengoku_Asuka_ZERO_Wiki:Collection_tracker') {
	importArticles({
		type: 'script',
		article: 'MediaWiki:Collection tracker.js'
	}, {
		type: 'style',
		article: 'MediaWiki:Collection tracker.css'
	});
}