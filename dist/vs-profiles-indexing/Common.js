/* Any JavaScript here will be loaded for all users on every page load. */

/** Allows CSS to target pages with a specific template.
    Made by KockaAdmiralac upon request. ~
        Works in tandem with the Topic template. **/
 
$('body').attr('data-topic', 
            $('#mw-content-text .article-topic').attr('data-topic')
);

// AjaxRC Configuration
 
window.ajaxPages = [
    "Special:RecentChanges",
    "Special:RecentChangesLinked",
    "Special:WikiActivity",
    "Special:MultipleActivity",
    "Special:SocialActivity",
    "Special:DoscussionsActivity",
    "Special:Images",
    "Special:Log",
    "Special:Contributions", 
    "Special:NewPages",
    "Special:Watchlist",
    "Blog:Recent_posts"
];

window.ajaxRefresh = 30000;
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';
window.ajaxIndicator = 'https://vignette.wikia.nocookie.net/dev/images/b/ba/Snake_throbber_dark-bg.gif/revision/latest?cb=20140519203615';

/* =============================================================================
******************************* User Tags **********************************
============================================================================ */
 
// Core Configuration
 
window.UserTagsJS = {
    modules: {},
    tags: {
        ontrial: {
            u: 'On Repent Trial',
            link: 'VS Profiles Indexing Wiki:Repent Trials',
            title: 'Ths user used to be banned, but is considered to be forgiven and allowed back into the community. They are therefore on a trial to prove that they are worthy of it and have truly changed for the better.'
        },
       'wiki_coder': {
           u: 'Wiki Coder',
           title: "This user manages the wiki's CSS and JavaScript."
       },
       'founder' : {
           u: 'Founder',
           title: 'This user created the wiki.',
           order: -1/0
       },
       'blocked': {
           u: 'Kicked Out',
           title: "This user misbehaved on this wiki, didn't follow its rules, policies and guidelines or is a sockpuppet of a user who did one of the aforementioned. They have therefore been kicked out and reduced to usage of a read-only mode.",
           order: -1/0
       },
       'bannedfromchat': {
           u: 'Expelled from Chat',
           title: "This user misbehaved in this wiki's chatroom and didn't follow its rules. They are now denied access to it, but can still contribute to the wiki. This tag also appears when a user is blocked from the wiki in general without being chatbanned first.",
           order: 1
       },
       'autoconfirmed': {
           title: "This user has been on FANDOM / Wikia for at least four days and have therefore been bestowed the full toolbox and privileges of the registered user group.",
           order: 1/0,
       }
	}
};
 
// Add tags to users
 
UserTagsJS.modules.custom = {
	'Withersoul 235': ['wiki_coder'],
	'Paleomario66': ['founder']
};
 
// Remove / override certain existing tags
 
UserTagsJS.modules.userfilter = {
	// Currently empty
};
 
UserTagsJS.modules.metafilter = {
    // Remove tags like "Inactive" and "New Editor" from blocked users
    'inactive': ['blocked'],
    'neweditor': ['blocked'],
    // Make autoconfirmed tag not appear unless otherwise stated
    'autoconfirmed': ['autoconfirmed']
};
 
/* Automatically add global tags to users in question + download
text and data for some other tags. */
 
UserTagsJS.modules.mwGroups = [
    // Append bot rank + global ranks to accounts in question
    'authenticated',
    'bot',
    'bot-global',
    'checkuser-global',
    'council',
    'helper',
    'soap',
    'util',
    'voldev',
    'vanguard',
    'vstf'
];
 
// Tag users with zero edits in Oasis
 
UserTagsJS.modules.nonuser = true;
 
// Tag users with brand-new accounts
 
UserTagsJS.modules.autoconfirmed = true;
 
// Tag New Users
 
UserTagsJS.modules.newuser = {
    days: 7, // Must have been on the Wiki for one week (7 days)
    edits: 20, // And have at least 20 edits to remove the tag
};
 
// Determines if users are blocked or not
 
UserTagsJS.modules.isblocked = true;
 
// Add tags to all users within a group without touching their other tags
 
UserTagsJS.modules.explode = {
    // Currently empty
};
 
// Inactive Users Tag Configuration
 
UserTagsJS.modules.inactive = 90;

/* If a user has not contributed at all for 
3 months, they will be marked as Inactive. */
 
// Keep most tags of blocked users
 
UserTagsJS.modules.stopblocked = false;

/* =============================================================================
******************************* End of User Tags *******************************
============================================================================ */

/**------------------------------**/
/** Make the site perform better **/
/**------------------------------**/
 
var hasClass = (function() {
    var reCache = {};
    return function(element, className) {
        return (reCache[className] ? reCache[className] : (reCache[className] = 
        new RegExp("(?:\\s|^)" + className + "(?:\\s|$)")))
        .test(element.className);
}})( );