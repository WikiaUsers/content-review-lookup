// Messages: [[Among Us Wiki:Staff messages]]
// Script: [[w:c:dev:DiscussionTemplates]]

mw.loader.using('ext.fandom.ContentReview.legacyLoaders.js').then(function() {
	if(mw.config.get('wgNamespaceNumber') == 1200) { // Message Wall
		window.DiscussionTemplates = {
			templates: {},
			allowedGroups: ['bureaucrat', 'sysop', 'content-moderator', 'threadmoderator', 'wiki-representative']
		};
		
		$.getJSON('/index.php?title=MediaWiki:Gadget-message-template.json&action=raw&ctype=application/json', function(templateData) {
			window.DiscussionTemplates.templates = templateData;
		});
		
		// Message overrides
		window.dev = window.dev || {};
		window.dev.i18n = window.dev.i18n || {};
		window.dev.i18n.overrides = window.dev.i18n.overrides || {};
		window.dev.i18n.overrides['DiscussionTemplates'] = window.dev.i18n.overrides['DiscussionTemplates'] || {};
		
		window.dev.i18n.overrides['DiscussionTemplates']['title-not-supported'] = 'The title of this template has been copied into your clipboard, so please make sure to add it to the message.\n\n Also, don\'t forget to add the warning number (if applicable) and any links to where the problem happened.';
		window.dev.i18n.overrides['DiscussionTemplates']['title-not-supported-nocopy'] = 'Don\'t forget to add the post title and warning number (if applicable). Also include any links to where the problem happened.';
		window.dev.i18n.overrides['DiscussionTemplates']['title'] = 'Message Template';
		
		// Import
		importArticles({
			type: 'script',
			articles: [
				'u:dev:MediaWiki:DiscussionTemplates.js',
			]
		});
	};
});