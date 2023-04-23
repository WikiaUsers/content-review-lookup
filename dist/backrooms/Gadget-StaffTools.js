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

importArticles({
    type: 'script',
    articles: [
		'u:dev:MediaWiki:Discussions Delete All/code.js',
		'u:dev:MediaWiki:MultipleFileDelete/code.js',
		'u:dev:MediaWiki:AjaxBatchDelete/code.js',
		'u:dev:MediaWiki:FastDelete/code.js',
        'u:dev:MediaWiki:AjaxDelete/code.js',
        'u:dev:MediaWiki:AjaxUndo/code.js',
        'u:dev:MediaWiki:MassEdit/code.js',
        'u:dev:MediaWiki:Nuke/code.js',
        'u:dev:MediaWiki:JWB/load.js'
    ]
});