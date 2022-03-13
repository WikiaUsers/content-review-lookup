/* Any JavaScript here will be loaded for all users on every page load. */

// =============
// Staff tools  
// =============

window.PRAoptions = {
    editSummary: 'Updating page links after rename (automatic)'
};

LIRoptions = {
    bottomMessage: '',
    editSummary: 'Updating file links after rename (automatic)',
    singleButtonText: 'Rename and update',
    queueButtonText: 'Add to queue',
    delay: 2000
};

var roll = wgUserGroups.includes("rollback");
var cmod = wgUserGroups.includes("content-moderator");
var admin = wgUserGroups.includes("sysop");

if (roll || cmod || admin) {
    importArticles({
        type: 'script',
        articles: [
            "u:dev:MediaWiki:AjaxRename/code.js",
            "u:dev:MediaWiki:CategoryRenameAuto-update/code.js",
            "u:dev:MediaWiki:FileUsageAuto-update/code.js",
            "u:dev:MediaWiki:AjaxUndo/code.js",
            "u:dev:MediaWiki:MassCategorization/code.js"
        ]
    });
}

// Mass Categorization
 
window.MassCategorizationGroups = [
    'bot',
    'bureaucrat', 
    'content-moderator', 
    'sysop'
];
 
window.massCategorizationDelay = 2500; // 2.5 second interval
 
// Mass Rename Revert
 
window.MassRenameRevertGroups = [
    'bot',
    'bureaucrat', 
    'content-moderator', 
    'sysop'
];

// ===================
// AJAX Auto-Refresh
// ===================

window.ajaxRefresh = 30000;
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page over time';
window.ajaxIndicator = 'https://vignette.wikia.nocookie.net/deathbattlefanon/images/d/de/Ajax-loader.gif/revision/latest?cb=20200828094018';
window.ajaxPages = Array(
    "Special:WikiActivity",
    "Special:WikiActivity/watchlist",
    "Special:Log",
    "Special:Contributions",
    "Special:Watchlist",
    "Special:RecentChanges",
    "Special:RecentChangesLinked",
    "Special:Images",
    "Special:ListFiles",
    "Special:Categories",
    "Special:NewPages",
    "Special:UncategorizedPages",
    "Blog:Recent_posts"
);

// ========
// RailWAM
// ========

window.railWAM = {
    logPage: "Project:WAM Log"
};

// ==================================================================
// Adds separate list of uncreated categories on Special:Categories.
// ==================================================================
 
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
 
// ==========================================
// Adds a button to clear Deletion reasons
// ==========================================
 
if (mw.config.get('wgAction') === 'delete') {
    $('#wpReason').after(' <span id = "wpClearReason" class = "button">\u232b</span>');
    $('#wpClearReason').click(function () {
        $('#wpReason').val('').focus();
    });
}

// ===================================================
// Adds a Block button to button dropdown on messages
// Author: Dorumin
// ===================================================
 
if ((wgNamespaceNumber === 1201 || wgNamespaceNumber === 1200) && 
    wgUserGroups.includes("sysop")) {
        for (var i in $('.msg-toolbar')) {
            var user = $('.msg-toolbar:eq('+i+')')
                .parent()
                .find('.edited-by a')
                .text();
            $('.msg-toolbar:eq('+i+')').find('.WikiaMenuElement li')
                .last().before(
                    '<li><a href="/wiki/Special:Block/' + user + '">Block</a></li>'
            );
        }
}

// =======================
// Recent Wiki Activity
// =======================

window.rwaOptions = {
	autoInit: true,
	limit: 100 
};