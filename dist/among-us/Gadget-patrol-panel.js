// Script: [[w:c:dev:PatrolPanel]]

mw.loader.using('ext.fandom.ContentReview.legacyLoaders.js').then(function() {
	// Import script if on the right page
	if (mw.config.get('wgNamespaceNumber') == -1 && mw.config.get('wgTitle')  == "PatrolPanel") {
		importArticles({
			type: 'script',
			articles: [
				'u:dev:MediaWiki:PatrolPanel.js',
			]
		});
	}

	// Add link in community header buttons
	$(mw.config.get('skin') === 'fandomdesktop' ? '.wiki-tools > .wds-dropdown > .wds-dropdown__content > ul' : '.wds-community-header__wiki-buttons > .wds-dropdown > .wds-dropdown__content > ul').append('<li><a href="' + mw.util.getUrl('Special:PatrolPanel') + '">Patrol Panel</a></li>');
});