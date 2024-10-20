//=======================
// Script configurations
//=======================

// AJAX Auto-refresh
window.ajaxPages = new Array(
    "Special:WikiActivity",
    "Special:WikiActivity/watchlist",
    "Special:MultipleActivity",
    "Special:RecentChanges",
    "Special:RecentChangesLinked",
    "Special:Log",
    "Special:ListFiles",
    "Special:ListDuplicatedFiles",
    "Special:Contributions",
    "Special:NewPages",
    "Special:UncategorizedPages",
    "Special:DoubleRedirects",
    "Special:Categories",
    "Special:Videos",
    "Special:Watchlist",
    "Special:BrokenRedirects",
    "Special:BlockList",
    "Blog:Recent_posts");
window.ajaxRefresh = 30000;
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';
window.ajaxIndicator = 'https://vignette.wikia.nocookie.net/deathbattlefanon/images/d/de/Ajax-loader.gif/revision/latest?cb=20200828094018';

// Ajax Rename
window.AjaxRename = {
	doKeyBind: false,
	
    renameReasons: {
        "Convention": "Renamed to match naming conventions in use on the wiki",
        "Formatting": "Reformatting name",
        "Namespace": "Incorrect namespace",
        "Capitaliation": "Fixing capitalization",
    },
    
	check: {
		watch: false,
	},
};

// Abuse log
abuseLogRC_interval = 15;
abuseLogRC_entries = 30;
abuseLogRC_showTo = new Array('sysop', 'content-moderator', 'thread-moderator', 'rollback');
abuseLogRC_order = 'newer';
abuseLogRC_position = 'before';
abuseLogRC_collapsible = true;
abuseLogRC_userInfo = true;

// AddRailModule
window.AddRailModule = [
	"Template:SisterSites",
	"Template:HandyLinks",
	"Template:NewPagesModule"
];

// InactiveUsers
InactiveUsers = { 
    months: 6, // Users will be marked as gone after six months of zero edits
    text: 'Inactive'
};

// Other
window.massCategorizationDelay = 2500; // 2.5 second interval
mw.config.set('UMFBypassLicenseCheck', true); // Prevent license check for multi-upload
window.YoutubePlayerDisableAutoplay = true; // Disable autoplay for YouTube player

//=================================================================
// Adds a button to clear Deletion reasons
// By OneTwoThreeFall
//=================================================================
(function() {
	if (mw.config.get('wgAction') === 'delete') {
	    $('#wpReason').after(' <span id="wpClearReason" class="button" id="clearDeleteReason">\u232b</span>');
	    $('#wpClearReason').click(function() {
	        $('#wpReason').val('').focus();
	    });
	}
})();

//========================================================================
// Allows text to be hidden in other text and revealed with a click
//========================================================================
$(".container").click(function() {
  $div = $(this).find("div");
  $($div).toggleClass("active");
});

//========================================
// Wiki activity link in activity module
//========================================
(function() {
    var rwaLink = "<a class='wds-button RWA_Link' href='/wiki/Special:MultipleActivity'>More activity</a>";
    $(".WikiaRail .activity-module").append(rwaLink);
})();

//=======================================================
// Sort content on Special:WhatLinksHere alphabetically
//=======================================================
(function($) {
    if (mw.config.get('wgCanonicalSpecialPageName') !== 'Whatlinkshere') 
        return;

    var sortedList,
        list = $('#mw-whatlinkshere-list');

    sortedList = list.children('li').sort(function (a, b) {
        return (
            $(a).find('a:first').attr('title') > $(b).find('a:first').attr('title')
        ) ? 1: -1;
    });

    list.children('li').remove();
    list.append(sortedList);
})($);

//========================================== 
// Adds a "Logs" tab to User Mastheads
//==========================================
(function() {
    var olds = $("ul.user-profile-navigation").html();
    var address = "/wiki/Special:Log/" + mw.config.get("wgTitle");
    var adds = "<li class='user-profile-navigation__link' data-id='userLogs'><a href='" + address + "'>Logs</a></li>";
    var news = olds + adds;
    $("ul.user-profile-navigation").html(news);
})();

//================================================
// Makes ProfileTags not override InactiveUsers
//================================================
mw.hook('dev.profile-tags').add(function() {
    importScriptPage("MediaWiki:InactiveUsers/code.js", 'dev');
});

//================================================
// Import scripts for specific usergroups only 
//================================================
if (/sysop|content-moderator|rollback/.test(mw.config.get('wgUserGroups').join())) {
	importArticles({
	    type: 'script',
	    articles: new Array(
	    	"u:dev:MediaWiki:AjaxRedirect/code.js",
	        "u:dev:MediaWiki:AjaxRename/code.js",
	        "u:dev:MediaWiki:AjaxUndo/code.js",
			"u:dev:MediaWiki:FileUsageAuto-update/code.js",
			"u:dev:MediaWiki:MassCategorization/code.js",
			"u:dev:MediaWiki:MassRenameRevert/code.js",
			"u:dev:MediaWiki:PageRenameAuto-update/code.js",
			"u:dev:MediaWiki:QuickTemplate/code.js"
		)
	});	
}