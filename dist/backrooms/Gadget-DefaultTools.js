window.ecpButton = true;
window.EditBasePageText = 'Edit parent page';
window.PurgeButtonText = 'Purge page cache';
window.aceCustomSettings = {
    theme: 'dracula', // best dark theme tbh (idk light theme, 'tomorrow' is nice though)
    wrap: true,
    showInvisibles: false,
    showPrintMargin: false,
    autoScrollEditorIntoView: true,
};
window.AjaxRename = {
	renameReasons: {
		'Fixing title' : 'Fixing title',
	},
	check: {
        ignorewarnings: false,
        leaveredirect: false,
        deletetargets: false,
        movesubpages: true,
        movetalk: true,
        watch: false,
    },
},

importArticles({
    type: 'script',
    articles: [
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
        'u:dev:MediaWiki:Stella.js',
    ],
});