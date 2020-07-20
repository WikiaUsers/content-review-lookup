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

// ===========================================
// Message Wall Tags (Part 1)
// ===========================================
window.MessageWallUserTags = {
    tagColor: 'DeepPink',
    glow: true,
    glowSize: '15px',
    glowColor: '#ff89b8',
    users: { '---': 'Bureaucrat' }
};

// ================================================================
// Username tags additions/filters (Working as intended)
// Be careful dum dum, this breaks easily. 
// ================================================================

window.UserTagsJS = {
    modules: {},
    tags: {
        bureaucrat: { u: 'Bureaucrat' },
        newuser: { u: 'Trainee' },
        founder: { u: 'Owner' },
        retired: { u: 'Retired Founder' },
        bacon: { u: 'Overlord of Bacon' },
        moose: { u: 'Moose' },
        princess: {u: 'Pretty Princess' },
        magi: {u: 'Magical Warrior' },
        seaharse: {u: 'Pidove Trainer' },
    }
};

UserTagsJS.modules.custom = {
    'Vernanonix': ['retired'],
    'Jillips Entertainment': ['bacon'],
};

UserTagsJS.modules.mwGroups = ['bureaucrat', 'chatmoderator', 'patroller', 'rollback', 'sysop', 'bannedfromchat', 'bot', 'bot-global', 'newuser'];
UserTagsJS.modules.metafilter = {
    sysop: ['bureaucrat', 'founder'],
    chatmoderator: ['sysop', 'bureaucrat', 'rollback'],
    rollback: ['sysop'],
    newuser: ['chatmoderator', 'bannedfromchat']
};
UserTagsJS.modules.autoconfirmed = false;
UserTagsJS.modules.isblocked = true;
UserTagsJS.modules.inactive = 30; // 30 days
UserTagsJS.modules.newuser = {
    days: 3, // Must have been on the Wiki for 3 days
    edits: 10, // And have at least 10 edits to remove the tag
    namespace: 0 // Edits must be made to articles to count
};

UserTagsJS.modules.userfilter = {
    'Vernanonix': ['founder'], // Remove the founder group
};

// ===================
// Icons (Part 2)
// ===================
// Message wall icons
// By [[User:AnimatedCartoons]]
$('.comments li.message blockquote .MiniEditorWrapper .edited-by a:not(.subtle)').each(function () {
    var $user = $(this).text();
    if ($user.match(/Jillips Entertainment/g)) {
        $(this).addClass('bacon');
    }
    if ($user.match(/NULLUSERNAME/g)) {
        $(this).addClass('admin');
    }
});

// MessageWallUserTags config
window.MessageWallUserTags = {
    tagColor: 'Ghostwhite', //Tag color – The color of the tag's text
    glow: true, //Glow effect toggle – Value of 'true' turns on the glow effect, 'false' turns it off
    glowSize: '20px', //Glow size – The default radius of the text-shadow glow effect
    glowColor: 'Indigo', //Glow color
    users: {
        'Jillips_Entertainment': 'Bureaucrat',
        'Santademon': 'Bureaucrat',
        'Vernanonix': 'Bureaucrat',
        'GJ-Lewis X': 'Admin'
    }
};

// Mass Categorization Usage //
window.MassCategorizationGroups = ['sysop', 'content-moderator'];

//===================================================================