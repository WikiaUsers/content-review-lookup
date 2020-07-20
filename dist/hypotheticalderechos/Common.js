/* Any JavaScript here will be loaded for all users on every page load. */

/* Auto updating recent changes opt-in.
 * See w:c:dev:AjaxRC for info & attribution.
 */
 
window.ajaxPages = ["Blog:Recent_posts", "Special:RecentChanges", "Special:WikiActivity", "Special:Chat", "Special:Watchlist", "Special:Log", "Special:Log/upload", "Special:Contributions"];
window.ajaxIndicator = 'https://vignette.wikia.nocookie.net/dev/images/8/82/Facebook_throbber.gif';
window.ajaxRefresh = 30000;
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';

/* Replaces {{USERNAME}} with the name of the user browsing the page.
 * Requires copying Template:USERNAME.
 */
 
$(function() {
    if (window.disableUsernameReplace || mw.config.get('wgUserName') === null) { return; }
    $('span.insertusername').html(mw.config.get('wgUserName'));
});

/* User tags script configuration.
 * See w:c:dev:UserTags for info & attribution.
 */ 
 
window.UserTagsJS = {
	modules: {},
	tags: {
        headbureaucrat: { u:'Head Bureaucrat' , order: -1/0 },
        bureaucrat: { order: 0 },
        bot: { u:'Bot' , order: 1 },
        headadmin: { u:'Head Administrator' , order: 2 },
        sysop: { u:'Administrator' , order: 3 },
        'content-moderator': { u:'Content Moderator' , order: 4 },
        threadmoderator: { u:'Discussion Moderator', order: 5 },
        rollback: { order: 6 },
        chatmoderator: { order: 7 },
        formeradmin: { u:'Former Administrator' },
        formerjradmin: { u:'Former Junior Administrator' },
        formerbcrat: { u:'Former Bureaucrat' },
        founder: { u:'Founder' },
        forbidden: { u:'Forbidden' }
               // A bunch of custom tags.
        }
};

UserTagsJS.modules.custom = { 
        'PuffleReturns': ['founder'],
        'Hurricane_Layten': ['headbureaucrat', 'bureaucrat', 'sysop'],
        'HurricanePatricia2015': ['bureaucrat', 'sysop'],
        'CycloneRyne94': ['bureaucrat', 'sysop'],
        'Sassmaster15': ['bureaucrat', 'sysop'],
        
        // Add the identifiers after the usernames.
};

UserTagsJS.modules.mwGroups = ['bureaucrat', 'bot', 'sysop', 'junioradmin', 'codeeditor', 'autopatroller', 'imagecontrol', 'rollback', 'chatmoderator', 'bannedfromchat'];
            // These are the rights groups that will be shown that already exist.
UserTagsJS.modules.autoconfirmed = false;
            // This prevents the "Autoconfirmed" tag from appearing. 
UserTagsJS.modules.newuser = { days: 10, edits: 20, namespaces: [0, 8] };
            // This defines who is a "New Editor" on the wiki. After 10 days on 
            // the wiki and 20 edits to the main (0) and/or MediaWiki (8) namespaces, 
            // the tag will disappear.
UserTagsJS.modules.inactive = { days: 30, namespaces: [0, 1, 'Thread', 'Board Thread'] };
            // This defines who is "Inactive" on the wiki. If a user hasn't edited 
            // the main (0), talk (1), Thread, and/or Board Thread namespaces in the 
            // last 30 days, they are labeled with the "Inactive" tag.
UserTagsJS.modules.metafilter = { bureaucrat: ['founder'], sysop: ['founder'] };
            // This removes the "Bureaucrat" and "Admin" tags from the user who is the "Founder".
UserTagsJS.modules.metafilter = { 'newuser': ['inactive', 'staff'] };
            // This removes the "New Editor" tag from those users who are "Inactive"
            // and/or "Staff."