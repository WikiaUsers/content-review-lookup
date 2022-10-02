//
// Any JavaScript here will be loaded for all users on every page load.
// A lot of this code has been taken from other Wikis, which follow the same copyright laws
//

// MassCategories settings
 window.MassCategorizationGroups = ['sysop', 'content-moderator'];

// Create the "dev" namespace if it doesn't exist already:
window.dev = window.dev || {};

// Create the sub-namespace for this addon and set some options:
window.dev.editSummaries = {
	css: '#stdSummaries { ... }',
	select: 'MediaWiki:Custom-StandardEditSummaries'
};

// The options need to be set before the import! Otherwise they may not work.
importArticles({ type: 'script', articles: [ 
	'u:dev:MediaWiki:Standard Edit Summary/code.js'
]});