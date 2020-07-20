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
 

window.railWAM = {
    logPage:"Project:WAM Log"
};

/* Configuration for [[w:c:dev:AddRailModule]] */
window.AddRailModule = [{
    // {{DiscordRailModule}}
    page: 'Template:DiscordRailModule',
    prepend: true,
    maxAge: 86400,
}];
mw.hook('wikipage.content').add(function ($elem) {
    $elem.filter('section.railModule.rail-module')
         .find('span.wds-button>a:only-child')
         .attr('class', 'wds-button')
         .unwrap();
});

/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */
 
$(function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
 });
 
/* End of the {{USERNAME}} replacement */

// **********************************************
// User Tags - http://dev.wikia.com/wiki/UserTags
// **********************************************

window.UserTagsJS = {
	modules: {},
	tags: {
        blocked: { u: 'Curse'},
        newuser: { u: 'Newborn Sin'},
        'bot-global': { u: 'Legendary Virtue'},
        'content-moderator': { u: 'Unrestrained Sin'},
        chatmoderator: { u: 'Unrestrained Sin'},
        rollback: { u: 'Sinner'},
        bureaucrat: { u: 'Senior Sin'},
        sysop: { u: 'Junior Sin'}
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
           'Lastia'         : 'Senior Sin',
           'Aivoz'          : 'Senior Sin',
           'AbusoRugio'     : 'Senior Sin',
           'Dadar_Gulung'   : 'Senior Sin',
           'ConclusionWolf' : 'Sinner',
           'Eryn09-10'      : 'Master of Codebreaker',
           'Amaryllis27'    : 'Senior Sin',
           'Frostnyan'      : 'Proofreader'
       }
    };

window.MassCategorizationGroups = ['sysop', 'content-moderator'];