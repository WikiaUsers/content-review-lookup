// =======================
// Recent Wiki Activity
// =======================

window.rwaOptions = {
	autoInit: true,
	limit: 100 
};

////////////////////////////////////////////////////////////////////////////////
///////////////// START CODES TAKEN FROM ONETWOTHREEFALL'S GLOBAL JS ///////////
////////////////////////////////////////////////////////////////////////////////

//======================================================================
// Adds separate list of uncreated categories on Special:Categories.
//======================================================================

function unCats() {
    var $newCats = $('<div>').css('float', 'right').text('Uncreated categories:');
    var $newCatsList = $('<ul>').appendTo($newCats);
    $('.mw-spcontent > ul').before($newCats);
    $('.mw-spcontent > ul > li').has('.newcategory').clone().appendTo($newCatsList);
} 
 
if (mw.config.get('wgCanonicalSpecialPageName') === 'Categories') {
    unCats();
    mw.hook('wikipage.content').add(unCats);
}

//====================================================
// Adds a button to clear Deletion reasons
//====================================================

if (mw.config.get('wgAction') === 'delete') {
    $('#wpReason').after(' <span id="wpClearReason" class="button">\u232b</span>');
    $('#wpClearReason').click(function () {
        $('#wpReason').val('').focus();
    });
}

////////////////////////////////////////////////////////////////////////////////
///////////////// END CODES TAKEN FROM ONETWOTHREEFALL'S GLOBAL JS /////////////
////////////////////////////////////////////////////////////////////////////////

//========================
// AJAX Auto-Refresh
//========================

window.ajaxPages = new Array(
    "Special:WikiActivity",
    "Special:WikiActivity/watchlist",
    "Special:RecentChanges",
    "Special:RecentChangesLinked",
    "Special:Log",
    "Special:Images",
    "Special:ListFiles",
    "Special:Contributions",
    "Special:NewPages",
    "Special:UncategorizedPages",
    "Special:DoubleRedirects",
    "Special:WhatLinksHere",
    "Special:Categories",
    "Special:Videos",
    "Special:Watchlist",
    "Special:LonelyPages",
    "Special:BrokenRedirects",
    "Special:DeadendPages",
    "Special:Disambiguation",
    "Special:Withoutimages",
    "Special:BlockList",
    "Special:ChatBanList",
    "Blog:Recent_posts");
window.ajaxRefresh = 30000;
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';
window.ajaxIndicator = 'https://vignette.wikia.nocookie.net/deathbattlefanon/images/d/de/Ajax-loader.gif/revision/latest?cb=20200828094018';

//========================================================================
// Allows text to be hidden in other text and revealed with a click
//========================================================================

$(".container").click(function() {
  $div = $(this).find("div");
  $($div).toggleClass("active");
});

/*******************************************************************************             
 * Import scripts for specific usergroups only 
*******************************************************************************/

var // ResourceLoader has yet to support ES6, so no const or let yet

	groups = mw.config.get('wgUserGroups'),
	roll   = groups.includes('rollback'),
	cmod   = groups.includes('content-moderator'),
	sysop  = groups.includes('sysop'),
	bcrat  = groups.includes('bureaucrat');

if (roll || cmod || sysop) {
	importArticles({
		type: 'script',
		articles: new Array(
			"u:dev:MediaWiki:AddArticleToCategory/code.js",
			"u:dev:MediaWiki:AjaxRedirect/code.js",
			"u:dev:MediaWiki:AjaxRename/code.js",
			"u:dev:MediaWiki:AjaxUndo/code.js",
			"u:dev:MediaWiki:FileUsageAuto-update/code.js",
			"u:dev:MediaWiki:PageRenameAuto-update/code.js",
			"u:dev:MediaWiki:QuickTemplate/code.js",
			"u:dev:MediaWiki:QuickTitle/code.js",
			"u:dev:MediaWiki:MassCategorization/code.js",
			"u:dev:MediaWiki:MassRenameRevert/code.js",
			"u:dev:MediaWiki:MassSetTemplateType.js",
			"u:dev:MediaWiki:TemplateTypeButtons/code.js",
		)
	});
}

if (roll && !(cmod || sysop)) {
	importArticles({
		type: 'script',
		articles: ["u:dev:MediaWiki:MarkForDeletion/code.js"]
	});
}

if (bcrat) {
	importArticles({
		type: 'script',
		articles: new Array(
			"u:dev:MediaWiki:AjaxUserRights.js",
			"u:dev:MediaWiki:MassUserRights/code.js"	
		)
	});
}

/** Other scripts are Content Mod / Admin only by default and so don't require config
	here; they can go straight to ImportJS **/

// Script configs
 
window.massCategorizationDelay = 2500; // 2.5 second interval
mw.config.set('UMFBypassLicenseCheck', true); // Prevent license check for multi-upload

/*******************************************************************************             
 * End usergroup-specific scripts 
*******************************************************************************/

// -------------------------------------------
// Disable YouTube Player's autoplay feature
// -------------------------------------------

window.YoutubePlayerDisableAutoplay = true;