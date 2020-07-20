/* Any JavaScript here will be loaded for all users on every page load. */
window.UserTagsJS = {
	modules: {},
	tags: {
		bureaucrat: { u:'Sergeant' },
                sysop: { u: 'Constable' },
		rollback: { u: 'Gamekeeper' }
	}
};
UserTagsJS.modules.inactive = 60;
UserTagsJS.modules.newuser = false;
UserTagsJS.modules.autoconfirmed = true;
// NOTE: bannedfromchat displays in Oasis but is not a user-identity group so must be checked manually
UserTagsJS.modules.mwGroups = ['bureaucrat', 'chatmoderator', 'patroller', 'rollback', 'sysop', 'bannedfromchat', 'bot', 'bot-global'];
UserTagsJS.modules.metafilter = {
	sysop: ['founder'],
	bureaucrat: ['founder'],
	chatmoderator: ['sysop', 'bureaucrat']
};
importArticles({
    type: "script",
    articles: [
        // ...
        "w:c:dev:Countdown/code.js",
        'w:c:dev:UserTags/code.js',
        "w:c:dev:DisplayClock/code.js"
        // ...
    ]
});
var ajaxPages = ["Special:RecentChanges","Special:Watchlist","Special:Log","Special:Contributions"];
importScriptPage('AjaxRC/code.js', 'dev');
importScriptPage('EditIntroButton/code.js', 'dev');
importScriptPage('PurgeButton/code.js', 'dev');