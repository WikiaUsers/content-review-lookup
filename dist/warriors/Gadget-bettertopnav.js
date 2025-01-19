// for an opt-in user gadget enabled via Special:Preferences (ie. not sitewide, just for people who want it)
// JS ported from https://dev.fandom.com/wiki/MediaWiki:BetterTopNav.js (author Mikevoir)

(window.dev = window.dev || {}).betterTopNav = {
	results: 10,
	resize: true,
	hovermenu: true,
	redirects: true,
	tools: [
		{
			'link': '/wiki/Special:RecentChanges',
			'text': 'Recent Changes',
			'icon': '<svg class=\"wds-icon wds-icon-small\"><use xlink:href=\"#wds-icons-activity-small\"></use></svg>'
		},
		{
			// Theme switch requires 'track' and 'class' for the default functionality to activate
			'track': 'theme-switch-'+{dark:'light', light:'dark'}[mw.user.options.values.theme],
			'class': 'wiki-tools__theme-switch',
			'link': '#',
			'text': {dark:'Light', light:'Dark'}[mw.user.options.values.theme]+' Theme',
			'icon': '<svg class=\"wds-icon wds-icon-small\"><use xlink:href=\"#wds-icons-'+{dark:'sun', light:'moon'}[mw.user.options.values.theme]+'-small\"></use></svg>'
		},
		{
			'link': '/wiki/Special:Upload',
			'text': 'Upload New File'
		},
		{
			'link': '/wiki/Special:SpecialPages',
			'text': 'Special Pages'
		}
	]
};

mw.loader.using('ext.fandom.ContentReview.legacyLoaders.js').then(function() {
	importArticles({
	    type: 'script',
	    articles: [
	        'u:dev:MediaWiki:BetterTopNav.js',
	    ]
	});
});