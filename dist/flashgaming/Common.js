/* Any JavaScript here will be loaded for all users on every page load. */

// =======================
// Script configurations
// =======================

// Create Dev wiki namespace
window.dev = window.dev || {};

// AJAX Auto-Refresh
window.ajaxPages = new Array(
    "Special:MultipleActivity",
    "Special:RecentChanges",
    "Special:RecentChangesLinked",
    "Special:Watchlist",
    "Special:SocialActivity",
    "Special:Log",
    "Special:ListFiles",
    "Special:ListDuplicatedFiles",
    "Special:Contributions",
    "Special:NewPages",
    "Special:UncategorizedPages",
    "Special:DoubleRedirects",
    "Special:Categories",
    "Special:Videos",
    "Special:BrokenRedirects",
    "Special:BlockList",
    "Blog:Recent_posts");
    
window.ajaxRefresh = 30000;
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page over time';
window.ajaxIndicator = 'https://vignette.wikia.nocookie.net/dev/images/b/ba/Snake_throbber_dark-bg.gif/revision/latest?cb=20140519203615';

// Topic block log (to view bans on other Flash wikis)
window.TBL_GROUP = "flashgames-en";

// Spoilers (and potentially disturbing content)
window.SpoilerAlertJS = {
    question: "This section contains potential spoilers detailing the plot (or other elements) of a game or animation." + 
              " Do you want to read it? (To change your decision, you have to delete your browser's local storage)",
    yes: "Yes.",
    no: "No",
    fadeDelay: 625
};

(function() {
    var cats   = mw.config.get('wgCategories'),
        mature = $.inArray('Mature content', cats) !== -1;
    
    if (mature) {
    	window.SpoilerAlertJS = {
    		question: "This section contains content that may be inappropriate to younger or sensitive audiences, or might otherwise" +
    		          " be considered objectionable. Are you sure want to read it?" +
    		          " (To change your decision, you have to delete your browser's local storage)",
    		yes: "Yes.",
    		no: "No",
    		fadeDelay: 625
		};
    }
})();

// Prevent license check for multi-upload
mw.config.set('UMFBypassLicenseCheck', true); 

// ==============
// Staff tools
// ==============

// Auto-update links after renaming files
window.LIRoptions = {
    bottomMessage: '',
    editSummary: 'Updating file links after renaming of image (automatic)',
    singleButtonText: 'Rename and update',
    queueButtonText: 'Add to queue',
    delay: 2500
};

// Ajax rename
window.AjaxRename = {
	doKeyBind: false,
    
	check: {
		watch: false,
	},
};

// Mass rename revert
window.MassRenameRevertGroups = [
    'bot',
    'bureaucrat', 
    'content-moderator', 
    'rollback',
    'sysop'
];

// The imports themselves
if (/sysop|content-moderator|rollback/.test(mw.config.get('wgUserGroups').join())) {
	importArticles({
	    type: 'script',
	    articles: new Array(
	    	"u:dev:MediaWiki:AjaxRedirect/code.js",
	        "u:dev:MediaWiki:AjaxRename/code.js",
	        "u:dev:MediaWiki:BulkVideoUpload.js",
			"u:dev:MediaWiki:FileUsageAuto-update/code.js",
			"u:dev:MediaWiki:MarkForDeletion/code.js",
			"u:dev:MediaWiki:MassCategorization/code.js",
			"u:dev:MediaWiki:MassSetTemplateType.js",
			"u:dev:MediaWiki:QuickTemplate/code.js"
		)
	});	
}

// =======================================================
// Sort content on Special:WhatLinksHere alphabetically
// =======================================================
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

// ========================================================
// Load UserTags configuration from a JSON page instead
// ========================================================
mw.loader.using('mediawiki.api').then(function() {
    new mw.Api().get({
        action: 'query',
        formatversion: 2,
        titles: 'MediaWiki:Custom-UserTags.json',
        prop: 'revisions',
        rvprop: 'content',
        rvslots: 'main'
    }).then(function(data) {
    	window.UserTagsJS = JSON.parse(data.query.pages[0].revisions[0].slots.main.content);
    });
});

//=================================================================
// Adds links to Special:WhatLinksHere to edit pages linked on it.
// By OneTwoThreeFall
//=================================================================
if (mw.config.get('wgCanonicalSpecialPageName') === 'Whatlinkshere') {
    $('#mw-whatlinkshere-list > li').each(function (ignore, element) {
        var link = new mw.Uri($(element).children('a').attr('href'));
        link.extend({action: 'edit'});
        $(element).find('.mw-whatlinkshere-tools > a:last-child')
            .after(' | ', $('<a>').attr('href', link.toString()).text('edit'));
    });
}

// ========================================================================================
// Special tag for permabanned users
// - Unless you modify the script to check for tag text, this requires UserTags to run
// ========================================================================================
(function() {
    if (document.getElementById('userProfileApp') === null) 
        return;

    var blockTag = document.querySelector('.blocked-user');
    
    if (blockTag === null) 
        return;

    new mw.Api().get({
        action: 'query',
        list: 'blocks',
        bkprop: 'expiry',
        bktimestamp: new Date().getTime(),
        bkusers: mw.config.get('wgTitle')
    }).done(function(d) {
        if (d.query.blocks[0] && d.query.blocks[0].expiry == 'infinity') {
            blockTag.innerHTML = 'Permabanned';
        }
    });
})();

// ========================
// FlipContent templates
// ========================
$(".container").click(function() {
  $div = $(this).find("div");
  $($div).toggleClass("active");
});

// =======================================================================
// Creates a custom map on the page "The Enchanted Cave".
// - It replaces certain characters with coloured squares, in essence
//   allowing the map to be constructed with ASCII characters alone.
// =======================================================================
var allLvls = document.evaluate(
    '//pre[@class="cavelvl"]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null
);

for (var x = 0; x < allLvls.snapshotLength; x++) {
    var thisLvl = allLvls.snapshotItem(x);
    sRows = thisLvl.innerHTML;
    sRows = sRows.replace(/#/g, "<span style=\"color: #333; background-color: #333\">#</style>");
    sRows = sRows.replace(/\./g, "<span style=\"color: #CCC; background-color: #CCC\">.</style>");
    sRows = sRows.replace(/i/g, "<span style=\"color: #C96; background-color: #C96\">i</style>");
    sRows = sRows.replace(/m/g, "<span style=\"color: #F66; background-color: #F66\">m</style>");
    sRows = sRows.replace(/@/g, "<span style=\"color: #69C; background-color: #69C\">@</style>");
    sRows = sRows.replace(/\}/g, "<span style=\"color: #6C6; background-color: #6C6\">&gt;</style>");
    thisLvl.innerHTML = sRows;
    thisLvl.setAttribute("style", "line-height: 10px; letter-spacing: 1px;");
}