// for opt-in user gadget enabled via Special:Preferences
// from https://dev.fandom.com/wiki/DedicatedTalkButton
// adds a dedicated talk page button, thus pulling it out of the dropdown, making it easier for editors to access talk pages for article discussion
mw.loader.using('ext.fandom.ContentReview.legacyLoaders.js').then(function() {
	importArticles({
	    type: 'script',
	    articles: [
	        'u:dev:MediaWiki:DedicatedTalkButton.js',
	    ]
	});
});