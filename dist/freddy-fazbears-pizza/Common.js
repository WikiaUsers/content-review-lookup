/* Any JavaScript here will be loaded for all users on every page load. */

// ==============================
// Config scripts, list what each is used for.
// Most any config must go above the import statements.
// Unless stated otherwise.
// ==============================

// RevealAnonIP

window.RevealAnonIP = {
    permissions: ['rollback', 'sysop', 'bureaucrat']
};

// DynamicImages Config
DynamicImages = {
    gifImages: true,
    gifGalleryImages: false
};

// Auto-refresh
window.ajaxPages = [
    "Special:RecentChanges",
    "Special:Watchlist",
    "Special:Log",
    "Special:Contributions",
    "Special:WikiActivity"
];
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';

//Clock Config
// Display 24 hour time followed by day, month (English, full name)
// and year with "(UTC)" at the end
window.DisplayClockJS = '%2H:%2M:%2S - %2d %{January;February;March;April;May;June;July;August;September;October;November;December}m %Y (UTC)';

//Last Edited Config
window.lastEdited = {
    avatar: false
};

//Link Sweeper Cleans images from Wanted Files
linkSweepConfirmation = true;
LinkSweeperDelay = 1000;

// ================================================================
// BEGIN - Username replace function ([[Template:USERNAME]])
// * Description: Inserts user name into <span class="insertusername"></span>
// * Maintainers: [[User:Splarka]] (original), [[User:Spang]] (current)
// ================================================================

$(function () {
    if (typeof (disableUsernameReplace) !== 'undefined' && disableUsernameReplace || wgUserName === null) return;
    $('span.insertusername').each(function () {
        $(this).text(wgUserName);
    });
});

// ================================================================
// END - Username replace function ([[Template:USERNAME]])
// ================================================================
// ================================================================
// Username tags additions/filters (Working as intended)
// Be careful dum dum, this breaks easily. 
// ================================================================

// ===================
// Icons (Part 2)
// ===================
// Message wall icons
// By [[User:AnimatedCartoons]]

// Mass Categorization Usage //
window.MassCategorizationGroups = ['sysop', 'content-moderator'];

//===================================================================