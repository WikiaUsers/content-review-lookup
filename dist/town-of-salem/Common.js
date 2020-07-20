window.UserTagsJS = {
	modules: {},
	tags: {
		// groupname: { u:'Displayname', link:'TOS-Page', order:number }
		// status
		blocked: {u:'Jailed', order: 1/0},
		inactive: {u:'in Graveyard', order: 1/0},
		townieofthemonth: { u:'Townie of the Month', order: -1 },
		notautoconfirmed: { u:'Amnesiac', order:0 },
		// ranks
		founder: { u:'Host', link:'Town of Salem Wiki Staff', order:-1 },
		bureaucrat: { u:'Mayor', link:'Town of Salem Wiki Staff', order:-1 },
		sysop: { u:'Jailor', link:'Town of Salem Wiki Staff', order:1 },
		'content-moderator': { u: 'Trapper', link:'Town of Salem Wiki Staff', order:-1 },
		threadmoderator: { u:'Transporter', link:'Town of Salem Wiki Staff', order:-1 },
		rollback: { u:'Retributionist', link:'Town of Salem Wiki Staff', order:1 },
		chatmoderator: { u:'Spy', link:'Town of Salem Wiki Staff', order:1 },
		autoconfirmed: { u:'Confirmed Townie', order:-1 },
		// suspicious people
		bannedfromchat: { u:'blackmailed', order:-1},
		jester: { u:'Jester', order:-1 },
		forger: { u:'Forger', order:-1 },
		serialkiller: { u:'Serial Killer', order:-1 },
		executioner: { u:'Executioner', order:-1 },
		arsonist: { u:'Arsonist', order:-1 }
	},
	oasisPlaceBefore: ''
};

UserTagsJS.modules.mwGroups = [ // ability to CSS these tags
    'townieofthemonth', 'autoconfirmed', 'notautoconfirmed', 'inactive','blocked',
    'founder', 'bureaucrat', 'sysop', 'threadmoderator', 'chatmoderator', 'rollback', "content-moderator",
    'bannedfromchat', 'jester', 'forger', 'serialkiller', 'executioner', 'arsonist'];
    
UserTagsJS.modules.metafilter = { // Remove lower-rank tags from higher-rank users
	'sysop': ['bureaucrat', 'founder'],
	"content-moderator": ['sysop', 'bureaucrat', 'founder'],
	'threadmoderator': ["content-moderator", 'sysop', 'bureaucrat', 'founder'],
	'chatmoderator': ['threadmoderator', "content-moderator", 'sysop', 'bureaucrat', 'founder'],
	'rollback': ['chatmoderator', 'threadmoderator',"content-moderator", 'sysop', 'bureaucrat', 'founder'],
	'autoconfirmed': ['townieofthemonth', 'rollback', 'chatmoderator', 'threadmoderator', "content-moderator", 'sysop', 'bureaucrat', 'founder'],
};

UserTagsJS.modules.newuser = {
	days: 2, // Must have been on the Wiki for 2 days
	edits: 5, // Must have at least 5 total edits
	namespace: 1 // Edits must be made to articles to count
};                  // These all apply to remove the tag

importArticles({
    type: "script",
    articles: [
         "w:c:dev:RevealAnonIP/code.js",
         "w:dev:ShowHide/code.js", /* Show and Hide code by tables */
         "w:dev:BackToTopButton/code.js", /* Back to top button */
         "w:dev:Countdown/code.js", /* Countdown timers on the wiki */
         "w:dev:DupImageList/code.js", /* Duplicate images */
         "w:dev:SearchGoButton/code.js", /* Search go button */
         "w:c:dev:UserTags/code.js", /* Custom user tags */
         "w:dev:AutoEditDropdown/code.js", /* Auto edit dropdown */
         "w:dev:Standard Edit Summary/code.js", /*Standard edit summary */
         "w:dev:FixMultipleUpload/code.js", /* Fixes the broken Edit Tools template on Special:MultipleUpload */
         "w:dev:WallGreetingButton/code.js", /* Adds a button to Message Wall pages that allows a user to easily edit their wall greeting */
         "w:dev:FileUsageAuto-update/code.js", /* Automatically updates file links throughout the wiki upon renaming */
         "MediaWiki:Common.js/Imports.js", /* Auto-refresh, Inactive users, AdvancedOasis, Anons */ 
         "MediaWiki:Common.js/blocklock.js", /* Lock blogs that haven't been commented on for more than 30 days */
         "w:dev:ExternalImageLoader/code.js", /* Allows usage of ExternalImageLoader */
 
    ]
});

window.railWAM = {
    logPage:"Project:WAM Log"
};