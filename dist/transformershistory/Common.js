/* Any JavaScript here will be loaded for all users on every page load. */
/* UserTags */
window.UserTagsJS = {
	modules: {},
	tags: {
                decepticon: ' Decepticon ',
                autobot: 'Autobot',
                maximal: 'Maximal',
                predacon: 'Predacon'
	}
};
// Add custom groups to several users
UserTagsJS.modules.custom = {
	'Captainthundertron': ['decepticon'],
	'Captbot': ['bot']
};
UserTagsJS.modules.inactive = 30;
UserTagsJS.modules.newuser = true;
UserTagsJS.modules.autoconfirmed = false;
UserTagsJS.modules.nonuser = true;
UserTagsJS.modules.mwGroups = ['bureaucrat', 'chatmoderator', 'patroller', 'rollback', 'sysop', 'bannedfromchat', 'bot', 'bot-global'];
UserTagsJS.modules.metafilter = {
	sysop: ['bureaucrat', 'founder'],
	bureaucrat: ['founder'],
	chatmoderator: ['sysop', 'bureaucrat']
};
UserTagsJS.modules.userfilter = {
	'Captainthundertron': ['inactive']
};
/* Imports */
importArticles({
    type: "script",
    articles: [
        'MediaWiki:Common.js/displayTimer.js',
        'MediaWiki:Common.js/Toggle.js',
        'w:c:dev:ShowHide/code.js',
        'w:c:dev:UserTags/code.js',
        "w:c:dev:Countdown/code.js"
    ]
});
/* Username */
function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
 }
 addOnloadHook(UserNameReplace);