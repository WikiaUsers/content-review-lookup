/* Any JavaScript here will be loaded for all users on every page load. */
/* Copied from nswtrains.wikia.com */
window.UserTagsJS = {
	modules: {},
	tags: {
                challenge: { u: 'Challenge Winner', order: -1/0, },
                 bureaucrat: { u:'Second-in-charge' },
                sysop: { u: 'MCC Master' },
		rollback: { u: 'Level 35!' }
 
	}         
};
UserTagsJS.modules.custom = {
};
UserTagsJS.modules.inactive = 1000;
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
importArticles({
    type: "script",
    articles: [
        // ...
        'w:c:dev:Countdown/code.js',
        'w:c:dev:UserTags/code.js',
        'w:c:dev:DisplayClock/code.js',
        'w:c:dev:RevealAnonIP/code.js',
        'w:c:dev:SignatureCheck/code.js',
        // ...
    ]
});
importScriptPage('EditIntroButton/code.js', 'dev');
importScriptPage('PurgeButton/code.js', 'dev');
importScriptPage('AjaxRC/code.js', 'dev');
importScriptPage('FixWantedFiles/code.js', 'dev');