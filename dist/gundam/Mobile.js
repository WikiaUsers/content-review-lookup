/* All JavaScript here will be loaded for users of the mobile site */
// register hook before import to avoid race conditions
mw.hook('dev.wds').add(function(wds) {
	$('.sub-wds-icons-pages-small').append( // Icon for Template:CopyButton
		$('<span>', {
			'id': 'dev-wds-icons-pages-small'
		})
	);
	wds.render('.sub-wds-icons-pages-small');
});

importArticles({
    type: 'script',
    articles: [
    	'u:dev:MediaWiki:WDSIcons/code.js',
    	'u:dev:MediaWiki:CopyText/code.js',
    ]
});