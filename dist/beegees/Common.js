/* Any JavaScript here will be loaded for all users on every page load. */
window.UserTagsJS = {
	modules: {},
	tags: {
                 bureaucrat: { u:'Bureaucrat' },
                sysop: { u: 'Administrator' },
		rollback: { u: 'Rollback' }
 
	}         
};
UserTagsJS.modules.inactive = 60;
UserTagsJS.modules.newuser = false;
UserTagsJS.modules.autoconfirmed = true;
// NOTE: bannedfromchat displays in Oasis but is not a user-identity group so must be checked manually
UserTagsJS.modules.mwGroups = ['bureaucrat', 'chatmoderator', 'patroller', 'rollback', 'sysop', 'bannedfromchat', 'bot', 'bot-global'];
UserTagsJS.modules.metafilter = {
	sysop: ['bot'],
	bureaucrat: ['bot'],
	chatmoderator: ['sysop', 'bureaucrat']
};
// Display 12 hour time followed by day, month (English, full name)
// and year with "(UTC)" at the end
window.DisplayClockJS = {
    format: '%2H:%2M:%2S %2d/%{01;02;03;04;05;06;07;08;09;10;11;12}m/%y',
    location: 'global',
    hoverText: 'Purge this Page',
    interval: 500, /* How often the timer updates in milliseconds (1000=1second) */
    monofonts: 'Consolas, monospace' /* The font the clock uses by default */
};
var ArchiveToolConfig = { 
   archiveListTemplate: 'Archive',
   archivePageTemplate: 'Archive',
   archiveSubpage: 'Archive',
   userLang: true
};
var SocialMediaButtons = { 
	position: "top",
	colorScheme: "light"
};
var ajaxPages = ["Special:RecentChanges","Special:Watchlist","Special:Log","Special:Contributions"];
importArticles({
    type: "script",
    articles: [
        // ...
        'w:c:dev:SocialIcons/code.js',
        'w:c:dev:Countdown/code.js',
        'w:c:dev:UserTags/code.js',
        'w:c:dev:DisplayClock/code.js',
        'w:c:dev:RevealAnonIP/code.js',
        'w:c:dev:SignatureCheck/code.js',
        'u:dev:EditIntroButton/code.js',
        'u:dev:PurgeButton/code.js',
        'u:dev:AjaxRC/code.js',
        'u:dev:FixWantedFiles/code.js',
        'u:dev:ArchiveTool/code.js',
        // ...
    ]
});