/* Any JavaScript here will be loaded for all users on every page load. */
window.UserTagsJS = {
	modules: {},
};
UserTagsJS.modules.custom = {
	'Jsteel7': ['unwikipediafy'],
	'Kerry Stapleton': ['unwikipediafy'],
	'Steamtrainfan': ['unwikipediafy'],
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
	colorScheme: "dark"
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
if ( mwCustomEditButtons ) {
		mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/__cb20080111185517/central/images/6/60/Button_support.png",
		"speedTip": "Support",
		"tagOpen": "{{Support}}",
		"tagClose": "",
		"sampleText": ""
	};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/__cb20080111185614/central/images/9/98/Button_oppose.png",
		"speedTip": "Oppose",
		"tagOpen": "{{Oppose}}",
		"tagClose": "",
		"sampleText": ""
	};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/__cb20080111185707/central/images/4/4f/Button_neutral.png",
		"speedTip": "Neutral",
		"tagOpen": "{{Neutral}}",
		"tagClose": "",
		"sampleText": ""
	};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/__cb20121024115027/central/images/3/3b/Google_Maps_Extension_Toolbar_Icon.gif",
		"speedTip": "Add A Map of A Train Station",
		"tagOpen": "{{Map|",
		"tagClose": "}}",
		"sampleText": "Name of the Train Station(do not include Railway Station)"
	};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/__cb20121024115027/central/images/3/3b/Google_Maps_Extension_Toolbar_Icon.gif",
		"speedTip": "Add A Map",
		"tagOpen": "{{#display_map:",
		"tagClose": "}}",
		"sampleText": "Exact name of the point you want or the coordinates"
	};
mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/__cb20130615091624/nswtrains/images/4/45/Wikipediarating.png",
		"speedTip": "Copied from Wikipedia",
		"tagOpen": "{{Unoriginal}}",
		"tagClose": "",
		"sampleText": ""
	};
mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/__cb20130615091624/nswtrains/images/5/5f/Stubrating.png",
		"speedTip": "Stub",
		"tagOpen": "{{Stubbox}}",
		"tagClose": "",
		"sampleText": ""
	};
mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/__cb20130615091624/nswtrains/images/6/68/Poorrating.png",
		"speedTip": "Poor Article",
		"tagOpen": "{{Poor}}",
		"tagClose": "",
		"sampleText": ""
	};
mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/__cb20130615091623/nswtrains/images/b/bc/Okrating.png",
		"speedTip": "OK Article",
		"tagOpen": "{{OK}}",
		"tagClose": "",
		"sampleText": ""
	};
mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/__cb20130615091622/nswtrains/images/8/8a/Brating.png",
		"speedTip": "B Grade Article",
		"tagOpen": "{{B}}",
		"tagClose": "",
		"sampleText": ""
	};
mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/__cb20130615091622/nswtrains/images/4/4a/Arating.png",
		"speedTip": "A Grade Article",
		"tagOpen": "{{A}}",
		"tagClose": "",
		"sampleText": ""
	};
mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/__cb20130615091622/nswtrains/images/1/11/Awesomerating.png",
		"speedTip": "Awesome Article",
		"tagOpen": "{{Awesome}}",
		"tagClose": "",
		"sampleText": ""
	};
mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/__cb20130615091623/nswtrains/images/a/a8/Perfectrating.png",
		"speedTip": "Perfect Article",
		"tagOpen": "{{Perfect}}",
		"tagClose": "",
		"sampleText": ""
	};
mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/nswtrains/images/8/80/T1ceb.png",
		"speedTip": "T1",
		"tagOpen": "{{T1S}}",
		"tagClose": "",
		"sampleText": ""
	};
mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/nswtrains/images/4/47/T2ceb.png",
		"speedTip": "T2",
		"tagOpen": "{{T2S}}",
		"tagClose": "",
		"sampleText": ""
	};
mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/nswtrains/images/2/21/T3ceb.png",
		"speedTip": "T3",
		"tagOpen": "{{T3S}}",
		"tagClose": "",
		"sampleText": ""
	};
mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/nswtrains/images/b/b3/T4ceb.png",
		"speedTip": "T4",
		"tagOpen": "{{T4S}}",
		"tagClose": "",
		"sampleText": ""
	};
mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/nswtrains/images/b/b8/T5ceb.png",
		"speedTip": "T5",
		"tagOpen": "{{T5S}}",
		"tagClose": "",
		"sampleText": ""
	};
mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/nswtrains/images/6/6b/T6ceb.png",
		"speedTip": "T6",
		"tagOpen": "{{T6S}}",
		"tagClose": "",
		"sampleText": ""
	};
mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/nswtrains/images/0/07/T7ceb.png",
		"speedTip": "T7",
		"tagOpen": "{{T7S}}",
		"tagClose": "",
		"sampleText": ""
	};
mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/nswtrains/images/4/4f/BLUEMOUNTAINS.png",
		"speedTip": "Blue Mountains Line",
		"tagOpen": "{{BMLS}}",
		"tagClose": "",
		"sampleText": ""
	};
mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/nswtrains/images/f/f8/NEWCASTLE.png",
		"speedTip": "Central Coast and Newcastle Line",
		"tagOpen": "{{NCCLS}}",
		"tagClose": "",
		"sampleText": ""
	};
mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/nswtrains/images/7/77/HUNTER.png",
		"speedTip": "Hunter Line",
		"tagOpen": "{{HLS}}",
		"tagClose": "",
		"sampleText": ""
	};
mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/nswtrains/images/7/76/SOUTHCOAST.png",
		"speedTip": "South Coast Line",
		"tagOpen": "{{SCLS}}",
		"tagClose": "",
		"sampleText": ""
	};
mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/nswtrains/images/2/27/SOUTHERNHIGHLANDS.png",
		"speedTip": "Southern Highlands Line",
		"tagOpen": "{{SHLS}}",
		"tagClose": "",
		"sampleText": ""
	};
mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/nswtrains/images/c/ca/NORTHCOAST.png",
		"speedTip": "CountryLink North Coast Line",
		"tagOpen": "{{CLNCLS}}",
		"tagClose": "",
		"sampleText": ""
	};
mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/nswtrains/images/d/d2/NORTHWESTERN.png",
		"speedTip": "CountryLink North Western Line",
		"tagOpen": "{{CLNWLS}}",
		"tagClose": "",
		"sampleText": ""
	};
mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/nswtrains/images/4/45/SOUTHERN.png",
		"speedTip": "CountryLink Southern Line",
		"tagOpen": "{{CLSLS}}",
		"tagClose": "",
		"sampleText": ""
	};
mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/nswtrains/images/5/58/CLWESTERN.png",
		"speedTip": "CountryLink Western Line",
		"tagOpen": "{{CLWLS}}",
		"tagClose": "",
		"sampleText": ""
	};
};