/* Any JavaScript here will be loaded for all users on every page load. */
/* Auto Refresh */
AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages = ["Special:RecentChanges","Special:WikiActivity"];
importScriptPage('AjaxRC/code.js', 'dev');

// ============================================================
//                       Imports
// ============================================================
importArticles({
	type: 'script',
	articles: [
		'w:c:dev:SignatureCheck/code.js',
		'w:c:dev:RevealAnonIP/code.js',
		'w:c:dev:EditIntroButton/code.js',
		'w:c:dev:Thread Inspection/code.js',
		'w:c:dev:FixWantedFiles/code.js',
		'w:c:dev:ReferencePopups/code.js',
		'w:c:dev:CacheCheck/code.js',
        'w:c:dev:WallGreetingButton/code.js',
		'w:c:dev:MiniComplete/code.js',
		'w:c:dev:AjaxRC/code.js',
		'w:c:dev:Less/code.js',
		'w:c:dev:DupImageList/code.js',
		'w:c:onepiece:MediaWiki:Common.js/togglers.js',
                'MediaWiki:Common.js/Clock.js',
                'MediaWiki:Common.js/Other.js',
                'MediaWiki:Common.js/IRC.js',
                'MediaWiki:Common.js/NaviΒars.js',
                'MediaWiki:Common.js/MulitiTabs.js',
                'MediaWiki:Common.js/CustomEditButtons.js'
    ]
});