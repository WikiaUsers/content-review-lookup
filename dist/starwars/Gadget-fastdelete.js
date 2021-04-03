mw.loader.using('ext.fandom.ContentReview.legacyLoaders.js').then(function() {
	window.fdButtons = [
	    {
	        summary: '-- 1.3 [[Wookieepedia:Vandalism|Vandalism]]',
	        label: 'V'
	    },
	    {
	        summary: '-- 1.2 Nonsense',
	        label: 'N'
	    },
	    {
	        summary: '-- 1.1 [[Wookieepedia:Sourcing|Fanon]]',
	        label: 'fN'
	    },
	    {
	        summary: '-- 1.3a Total failure to follow instructions',
	        label: 'TF'
	    },
	    {
	        summary: '-- 1.4 Spam',
	        label: 'S'
	    },
	    {
	        summary: '-- 2.1 [[Wookieepedia:Speedy deletions|CSD]]',
	        label: 'SD'
	    },
	    {
	        summary: '-- 1.2a Redundant to higher-quality file (obsolete/superseded)',
	        label: 'OB'
	    },
	    {
	        summary: ' ',
	        label: 'nr'
	    },
	];
	
	importArticles({
	    type: 'script',
	    articles: [
	        'u:dev:MediaWiki:FastDelete/code.js',
	    ]
	});
});