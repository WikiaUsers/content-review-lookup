//
// Any JavaScript here will be loaded for all users on every page load.
// A lot of this code has been taken from other Wikis, which follow the same copyright laws
//

// The options need to be set before the import! Otherwise they may not work.
importArticles({type:'script',articles:
[
	'u:dev:MediaWiki:AddArticleToCategory/code.js',
	'u:dev:MediaWiki:ClearSandbox/code.js',
	'u:dev:MediaWiki:CodeQuickLinks/code.js',
	'u:dev:MediaWiki:DecodeURI/code.js',
	'u:dev:MediaWiki:FloatingToc/code.js',
	'u:dev:MediaWiki:MassCategorization/code.js',
	'u:dev:MediaWiki:MultipleFileDelete/code.js',
	'u:dev:MediaWiki:QuickTitle/code.js',
	'u:dev:MediaWiki:Standard Edit Summary/code.js',
	'u:dev:MediaWiki:SupportedLanguages/code.js',
	'u:dev:MediaWiki:SyntaxHighlight.js',
	'u:dev:MediaWiki:Wikificator.js',
]});

// MassCategories settings
window.MassCategorizationGroups = ['sysop', 'content-moderator'];

window.dev = window.dev || {};
window.dev.editSummaries = {
	css: false
};
window.FloatingToc = {
    speed: 500,
    auto: false,
    enableKey: true
};