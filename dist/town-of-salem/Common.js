window.UserTagsJS = {
	modules: {},
	tags: {
		// groupname: { u:'Displayname', link:'TOS-Page', order:number}
		// status
		blocked: {u:'Jailed', link:'https://town-of-salem.fandom.com/wiki/MediaWiki%3AForum-policies-and-faq', order: 1/0},
		inactive: {u:'in the Graveyard', order: 1/0},
		townieofthemonth: {u:'Townie of the Month', order: -1},
		notautoconfirmed: {u:'Amnesiac', order:0},
		// ranks
		founder: {u:'Host', link:'Town of Salem Wiki Staff', order:-1},
		bureaucrat: {u:'Mayor', link:'Town of Salem Wiki Staff', order:-1},
		sysop: {u:'Potion Master', link:'Town of Salem Wiki Staff', order:1},
		'content-moderator': {u: 'Trapper', link:'Town of Salem Wiki Staff', order:-1},
		threadmoderator: {u:'Transporter', link:'Town of Salem Wiki Staff', order:-1},
		rollback: {u:'Retributionist', link:'Town of Salem Wiki Staff', order:1},
		chatmoderator: {u:'Spy', link:'Town of Salem Wiki Staff', order:1},
		autoconfirmed: {u:'Confirmed Townie', order:-1},
		bot: {u: 'Catalyst', order:-1/0},
		'wiki-specialist': {u: 'Archmage', order:-1/0},
		soap: {u: 'Janitor', order:-1},
		staff: {u: 'Death, Horseman of the Apocalypse', order:-1/0},
		'fandom-star': {u: 'Starspawn', order:-1},
		// suspicious people
		bannedfromchat: { u:'blackmailed', order:-1},
		jester: { u:'Jester', order:-1},
		forger: { u:'Forger', order:-1},
		serialkiller: { u:'Serial Killer', order:-1},
		executioner: { u:'Executioner', order:-1},
		arsonist: { u:'Arsonist', order:-1}
	},
	oasisPlaceBefore: ''
};

UserTagsJS.modules.mwGroups = [ // ability to CSS these tags
    'townieofthemonth', 'autoconfirmed', 'notautoconfirmed', 'inactive','blocked', 'staff', 
    'founder', 'bureaucrat', 'sysop', 'threadmoderator', 'chatmoderator', 'rollback', 'content-moderator', 'bot', 'wiki-specialist', 
    'bannedfromchat', 'jester', 'forger', 'serialkiller', 'executioner', 'arsonist', 'soap', 'fandom-star'];
    
UserTagsJS.modules.metafilter = { // Remove lower-rank tags from higher-rank users
	'staff': ['founder'],
	'wiki-specialist': ['staff', 'founder'],
	'fandom-star': ['wiki-specialist', 'staff', 'founder'],
	'soap': ['fandom-star', 'wiki-specialist', 'staff', 'founder'],
	'sysop': ['bot', 'bureaucrat', 'founder'],
	"content-moderator": ['bot', 'sysop', 'bureaucrat', 'founder'],
	'threadmoderator': ['bot', 'wiki-specialist', "content-moderator", 'sysop', 'bureaucrat', 'founder'],
	'chatmoderator': ['bot', 'wiki-specialist', 'threadmoderator', "content-moderator", 'sysop', 'bureaucrat', 'founder'],
	'rollback': ['bot', 'soap', 'wiki-specialist', 'chatmoderator', 'threadmoderator',"content-moderator", 'sysop', 'bureaucrat', 'founder'],
	'autoconfirmed': ['bot', 'soap', 'fandom-star', 'wiki-specialist', 'staff', 'townieofthemonth', 'rollback', 'chatmoderator', 'threadmoderator', "content-moderator", 'sysop', 'bureaucrat', 'founder'],
	'newuser': ['bot', 'soap', 'fandom-star', 'wiki-specialist', 'staff', 'autoconfirmed', 'townieofthemonth', 'rollback', 'chatmoderator', 'threadmoderator', "content-moderator", 'sysop', 'bureaucrat', 'founder'],
	'inactive': ['bot']
};

UserTagsJS.modules.newuser = {
	days: 2, // Must have been on the Wiki for 2 days
	edits: 5, // Must have at least 5 total edits
	namespace: 0 // Edits were mistakenly being applied to the Talk namespace, not the Main one
};

UserTagsJS.modules.inactive = 60;

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

window.LockForums = {
    expiryDays: 60,
    expiryMessage: "This thread has been automatically archived because its most recent response is over <expiryDays> days old.",
    warningDays: 20,
    warningMessage: "This thread is now <actualDays> days old. To stay courteous with your fellow Townies, please make sure you need to respond to this thread, otherwise, please take your discussion to another thread. This thread will automatically become archived when it turns <expiryDays> old.",
    banners: true,
    warningPopup: true,
    warningPopupMessage: "By posting on this thread you may be sending unnecessary emails to those who are still following this thread. Are you sure you want to do this?",
};