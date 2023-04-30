window.nukeDelay = 100;
window.nukeDeleteReason = 'Spam';
window.batchDeleteDelay = 100;
window.FastDeleteNoConfirm = true;
window.fdButtons = [
	{
        summary: '[[Rules|Rule 1]].',
        label: 'F'
    },
    {
        summary: 'Spam',
        label: 'S'
    }
];
window.AjaxDelete = {
	deleteReasons: {
		'Unfixable broken redirect' : 'Unfixable broken redirect',
		'Useless redirect' : 'Useless redirect',
		'Useless template' : 'Useless template'
	},
	autoCheckWatch: false,
	noUndelete: true,
	reload: true
};

importDevCodes = function() {
	function getCodePages() {
		return [
		'u:dev:MediaWiki:Discussions Delete All/code.js',
		'u:dev:MediaWiki:MultipleFileDelete/code.js',
		'u:dev:MediaWiki:AjaxBatchDelete/code.js',
		'u:dev:MediaWiki:FastDelete/code.js',
        'u:dev:MediaWiki:AjaxDelete/code.js',
        'u:dev:MediaWiki:AjaxUndo/code.js',
        'u:dev:MediaWiki:MassEdit/code.js',
        'u:dev:MediaWiki:Nuke/code.js',
        'u:dev:MediaWiki:JWB/load.js'
			];
	}

	function concatPages() {
		return getCodePages().join('|');
	}

	function getImportQuery() {
		return {
			mode: 'articles',
			only: 'scripts',
			articles: concatPages()
		};
	}

	function importCodes() {
		const devLoad = 'https://dev.fandom.com/load.php';
		const rlModules = [
			'mediawiki.Uri',
			'ext.fandom.ContentReview.legacyLoaders.js'
		];

		mw.loader.using( rlModules, function() {
			const devUri = new mw.Uri( devLoad );

			devUri.query = getImportQuery();
			mw.loader.load( devUri.toString() );
		} );
	}

	return importCodes();
};