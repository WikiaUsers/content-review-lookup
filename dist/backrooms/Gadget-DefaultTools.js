window.ecpButton = true;
window.EditBasePageText = 'Edit parent page';
window.PurgeButtonText = 'Purge page cache';
window.aceCustomSettings = {
    theme: 'nord_dark', // best dark theme tbh (idk light theme, 'tomorrow' is nice though)
    wrap: true,
    showInvisibles: false,
    showPrintMargin: false,
    autoScrollEditorIntoView: true
};
window.AjaxRename = {
	renameReasons: {
		'Fixing title' : 'Fixing title'
	},
	check: {
        ignorewarnings: false,
        leaveredirect: false,
        deletetargets: false,
        movesubpages: true,
        movetalk: true,
        watch: false
    }
};

importDevCodes = function() {
	function getCodePages() {
		return [
		'u:dev:MediaWiki:MassNullEdit/code.js',
		'u:dev:MediaWiki:ClearSandbox/code.js',
		'u:dev:MediaWiki:EditorColorPicker.js',
		'u:dev:MediaWiki:View_Source/code.js',
        'u:dev:MediaWiki:AjaxRename/code.js',
        'u:dev:MediaWiki:ParentPageEdit.js',
        'u:dev:MediaWiki:AjaxUndo/code.js',
        'u:dev:MediaWiki:CodeSelectAll.js',
        'u:dev:MediaWiki:CustomizeAce.js',
        'u:dev:MediaWiki:MaximizeAce.js',
        'u:dev:MediaWiki:PurgeButton.js',
        'u:dev:MediaWiki:Stella.js'
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