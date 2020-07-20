/* JavaScript yang ada di sini akan diterapkan untuk semua kulit. */

/* Auto Refresh */
// Configure AjaxRC
	(window.ajaxPages = (window.ajaxPages || [])).push(
		"Istimewa:RecentChanges",
		"Istimewa:Watchlist",
		"Istimewa:Log",
		"Istimewa:Contributions",
		"Istimewa:Berkas_baru",
		"Istimewa:NewPages",
		"Istimewa:ListFiles",
		"Istimewa:WikiActivity"
	);
	window.AjaxRCRefreshText = 'Auto-Refresh';
	window.AjaxRCRefreshHoverText = 'Automatically refresh every 60secs';
	window.ajaxCallAgain = ($.isArray(window.ajaxCallAgain) && window.ajaxCallAgain) || [];
 

/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */
 
$(function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
 });
 
/* End of the {{USERNAME}} replacement */

window.UserTagsJS = {
	modules: {},
	tags: {
        blocked: { u: 'Curse'},
        newuser: { u: 'Newborn Virtue'},
        'bot-global': { u: 'Legendary Virtue'},
        'content-moderator': { u: 'Unrestrained Virtue'},
        chatmoderator: { u: 'Unrestrained Virtue'},
        rollback: { u: 'Saint'},
        bureaucrat: { u: 'Senior Virtue'},
        sysop: { u: 'Junior Virtue'}
	}
};

UserTagsJS.modules.inactive = 30;
UserTagsJS.modules.newuser = true;
UserTagsJS.modules.newuser = {
	days: 5, // Must have been on the Wiki for 5 days
	edits: 19 // And have at least 19 edits to remove the tag
};

UserTagsJS.modules.autoconfirmed = true;
UserTagsJS.modules.stopblocked = true; // Manually turn on/off


UserTagsJS.modules.metafilter = {
	sysop: ['bureaucrat'],
	'content-moderator': ['bureaucrat'],
	chatmoderator: ['bureaucrat'],
	rollback: ['bureaucrat'],
	newuser: ['staff', 'bot-global', 'bureaucrat', 'sysop', 'content-moderator']
};

// Message Wall Tags
    window.MessageWallUserTags = {
        tagColor: 'oranye',
        glow: true,
        glowSize: '15px',
        glowColor: '#F5FFFA',
        users: {
           'Lastia'         : 'Senior Virtue',
           '15 Foreverr'    : 'Senior Virtue',
           'Cute123Cute456' : 'Junior Virtue',
       }
    };

window.MassCategorizationGroups = ['sysop', 'content-moderator'];