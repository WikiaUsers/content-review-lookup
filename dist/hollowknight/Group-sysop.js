/* Any JavaScript here will be loaded for sysops only */

importArticles({
	type: 'script',
	articles: [
		'u:dev:MediaWiki:AjaxBatchDelete.js',
		'u:dev:MediaWiki:AjaxBatchUndelete.js',
		'u:dev:MediaWiki:AjaxRedirect/code.js',
		'u:dev:MediaWiki:AjaxUndo/code.js',
		'u:dev:MediaWiki:AnchoredRollback/code.js',
		'u:dev:MediaWiki:BulkVideoUpload.js',
		'u:dev:MediaWiki:DupImageList/code.js',
		'u:dev:MediaWiki:FastFileDelete.js',
		'u:dev:MediaWiki:FileUsageAuto-update/code.js',
		'u:dev:MediaWiki:LastEdited/code.js',
		'u:dev:MediaWiki:MassCategorization/code.js',
		'u:dev:MediaWiki:MassProtect/code.js',
		'u:dev:MediaWiki:MassRename/code.js',
		'u:dev:MediaWiki:MassRenameRevert/code.js',
		'u:dev:MediaWiki:MassRollback.js',
		'u:dev:MediaWiki:MultipleFileDelete/code.js',
		'u:dev:MediaWiki:PageRenameAuto-update/code.js',
		'u:dev:MediaWiki:PowerDelete.js',
	]
});

// AjaxUndo config.
window.AjaxUndoMinor = true;
window.AjaxUndoSummary = 'Undone updates using [[:w:dev:AjaxJundo|AjaxUndo]].';

// LastEdited config.
window.lastEdited = {
	avatar: true,
	avatarsize: 20,
	size: true,
	diff: true,
	comment: true,
	newpage: true,
	mainpage: true,
	time: 'timestamp',
	timezone: 'UTC',
	lang: 'en',
	position: {
		element: document.getElementById('WikiaPageHeader'),
	method: 'append'
	},
	namespaces: {
		exclude: []
	},
	pages: []
};

// MassRollback config.
window.massRollback = {
	displayText: 'Mass Rollback',
	doneText: 'Reverted updates using [[:w:dev:MassRollback|MassRollback]].',
	placement: '.mw-contributions-list > li'
};