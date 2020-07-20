
// ==================================================================
// Insert username 
// ==================================================================
$(function() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").text(wgUserName);
});

window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';
window.ajaxPages =["Special:RecentChanges", "Special:WikiActivity"];
 
var PurgeButtonText = 'Refresh';

/* User Tags */
// User Tags
window.UserTagsJS = {
	modules: {
		inactive: 90,
		mwGroups: [
            'bureaucrat',
            'chatmoderator',
            'rollback',
            'sysop',
            'bannedfromchat',
            'bot',
            'bot-global'
        ],
		autoconfirmed: false,
		metafilter: {
			sysop: ['bureaucrat'],
			chatmoderator: ['sysop'],
			rollback: ['sysop'],
			contentmoderator: ['sysop'],
		},
		newuser: true,
	},
};

UserTagsJS.modules.customm = {
	"TerriblePlayer": ['znawca wiki'],
};

UserTagsJS.modules.mwGroups = ['bureaucrat,sysop']; 
UserTagsJS.modules.mwGroups = ['rollback'];
UserTagsJS.modules.mwGroups = ['contentmoderator'];


if (wgUserName != 'null') {
	$('.insertusername').text(wgUserName);
}