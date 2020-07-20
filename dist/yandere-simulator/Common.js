/* Any JavaScript here will be loaded for all users on every page load. */

window.UserTagsJS = {
	modules: {},
	tags: {
		//Ranks
		intern: { u:'Intern', order:0 },
		helpers: { u:'Helper', order:0 },
		rollback: { u:'Rollback', order:0 },
		chatmoderator: { u:'Chat Mod', order:0 },
		'content-moderator': { u:'Content Mod', order:0 },
		threadmoderator: { u:'Discussion Mod', order:0 },
		miniadmin: { u:'Mini-Admin', order:0 },
		sysop: { u:'Admin', order:0 },
		bureaucrat: { u:'Bureaucrat', order:0 },
		//Heads
		head: { u:'Head', order:-1/0 },
		'head-helper': { u:'Head Helper', order:-1/0 },
		'head-rollback': { u:'Head Rollback', order:-1/0 },
		'head-chatmod': { u:'Head Chat Mod', order:-1/0 },
		'head-contentmod': { u:'Head Content Mod', order:-1/0 },
		'head-discussionmod': { u:'Head Discussion Mod', order:-1/0 },
		'head-miniadmin': { u:'Head Mini-Admin', order:-1/0 },
		'head-admin': { u:'Head Admin', order:-1/0 },
		'head-bureaucrat': { u:'Head Bureaucrat', order:-1/0 },
		//Head Pro tempore
		'headpro-helper': { u:'Head Helper Pro tempore', order:1 },
		'headpro-rollback': { u:'Head Rollback Pro tempore', order:1 },
		'headpro-chatmod': { u:'Head Chat Mod Pro tempore', order:1 },
		'headpro-contentmod': { u:'Head Content Mod Pro tempore', order:1 },
		'headpro-discussionmod': { u:'Head Discussion Mod Pro tempore', order:1 },
		'headpro-miniadmin': { u:'Head Mini-Admin Pro tempore', order:1 },
		'headpro-admin': { u:'Head Admin Pro tempore', order:1 },
		//Interim Heads
		interim: { u:'Interim Head', order:-1/0 },
		'headint-helper': { u:'Interim Head Helper', order:-1/0 },
		'headint-rollback': { u:'Interim Head Rollback', order:-1/0 },
		'headint-chatmod': { u:'Interim Head Chat Mod', order:-1/0 },
		'headint-contentmod': { u:'Interim Head Content Mod', order:-1/0 },
		'headint-discussionmod': { u:'Interim Head Discussion Mod', order:-1/0 },
		'headint-miniadmin': { u:'Interim Head Mini-Admin', order:-1/0 },
		'headint-admin': { u:'Interim Head Admin', order:-1/0 },
		'headint-bureaucrat': { u:'Interim Head Bureaucrat', order:-1/0 },
		//Head Pro tempore elect
		'headpro-elect-helper': { u:'Head Helper Pro tempore elect', order:1 },
		'headpro-elect-rollback': { u:'Head Rollback Pro tempore elect', order:1 },
		'headpro-elect-chatmod': { u:'Head Chat Mod Pro tempore elect', order:1 },
		'headpro-elect-contentmod': { u:'Head Content Mod Pro tempore elect', order:1 },
		'headpro-elect-discussionmod': { u:'Head Discussion Mod Pro tempore elect', order:1 },
		'headpro-elect-miniadmin': { u:'Head Mini-Admin Pro tempore elect', order:1 },
		'headpro-elect-admin': { u:'Head Admin Pro tempore elect', order:1 },
		//Deputies
		deputy: { u:'Deputy', order:-1/0 },
		'deputy-helper': { u:'Deputy Helper', order:-1/0 },
		'deputy-rollback': { u:'Deputy Rollback', order:-1/0 },
		'deputy-chatmod': { u:'Deputy Chat Mod', order:-1/0 },
		'deputy-contentmod': { u:'Deputy Content Mod', order:-1/0 },
		'deputy-discussionmod': { u:'Deputy Discussion Mod', order:-1/0 },
		'deputy-miniadmin': { u:'Deputy Mini-Admin', order:-1/0 },
		'deputy-admin': { u:'Deputy Admin', order:-1/0 },
		'deputy-bureaucrat': { u:'Deputy Bureaucrat', order:-1/0 },
		//Chairmen
		'hc-sc': { u:'Historical Cmte (Sr Chmn)', order:2 },
		'hc-jc': { u:'Historical Cmte (Jr Chmn)', order:2 },
		'vc-sc': { u:'Volunteer Cmte (Sr Chmn)', order:2 },
		'vc-jc': { u:'Volunteer Cmte (Jr Chmn)', order:2 },
		'ec-sc': { u:'Events Cmte (Sr Chmn)', order:2 },
		'ec-jc': { u:'Events Cmte (Jr Chmn)', order:2 },
		//Committees
		'hc-member': { u:'Historical Cmte', order:3 },
		'vc-member': { u:'Volunteer Cmte', order:3 },
		'ec-member': { u:'Events Cmte', order:3 },
		//Former
		'former-intern': { u:'Former Intern', order:-1/0 },
		'former-helper': { u:'Former Helper', order:-1/0 },
		'former-rollback': { u:'Former Rollback', order:-1/0 },
		'former-chatmod': { u:'Former Chat Mod', order:-1/0 },
		'former-contentmod': { u:'Former Content Mod', order:-1/0 },
		'former-discussionmod': { u:'Former Discussion Mod', order:-1/0 },
		'former-miniadmin': { u:'Former Mini-Admin', order:-1/0 },
		'former-admin': { u:'Former Admin', order:-1/0 },
		'former-bureaucrat': { u:'Former Bureaucrat', order:-1/0 },
		//Misc
		internpro: { u:'Intern Pro tempore', order:0 },
		founder: { u:'Founder', order:100 },
	}
};
UserTagsJS.modules.mwGroups = ['sysop', 'council', 'rollback', 'chatmoderator', 'threadmoderator', 'content-moderator', 'bureaucrat'];
//Add Tags
UserTagsJS.modules.custom = {
    //Current Staff
    /* Bureaucrats */
	'Jackboog21': ['head', 'hc-sc', 'vc-sc'],
	/* Admins */
	/* Mini-Admins */
	/* Content Mods */
	/* Discussion Mods */
	'KawaiiKunWolf': ['head', 'ec-sc', 'vc-jc', 'hc-member'],
	'A random student': ['hc-jc', 'ec-member'],
	/* Rollbacks */
	'GalaxE': ['head'],
	'Tsuzuro Yamazaki': ['ec-jc', 'hc-member'],
	/* Chat Mods */
	'AoiRyugokuTSFG1': ['head', 'ec-member' ],
	/* Helpers and Intern */
	'Shadow Bonnie202': ['helpers', 'head', 'ec-member' ],
	'Littleslinky': ['helpers'],
	'MrCheeseTiger1234': ['helpers', 'ec-member'],
	'RedLightningStrike': ['helpers', 'ec-member'],
	'SeiShii': ['intern', 'ec-member'],
	
	//Former Staff
	/* Former Bureaucrats */
	'Ekhinyu': ['former-bureaucrat'],
	/* Former Admins */
	/* Former Mini-Admins */
	/* Former Content Mods */
	'Travid117': ['former-contentmod'],
	/* Former Rollbacks */
	'DezertFokx': ['former-rollback'],
	'Third-Impact-is-Coming': ['former-rollback'],
	'TheMoonPortal': ['former-rollback'],
	'Redandsymmetry': ['former-rollback'],
	'Tatsuya420': ['former-rollback'],
	/* Former Discussion Mods */
	'Grapeleaf Skeletonizer': ['former-discussionmod'],
	/* Former Chat Mods */
	'Rgis': ['former-chatmod'],
	'EwImTrash': ['former-chatmod'],
	'Chief Fenrir': ['former-chatmod'],
	/* Former Helpers */
	'Merrimilk': ['former-helper'],
	"It'smeClara": ['former-helper'],
	'LunathuThePotato': ['former-helper'],
	'Ariariariari :P': ['former-helper'],
	'XyoKiwii': ['former-helper'],
	//'SeiShii': ['former-helper', 'ec-member'],
	'BrianBanana': ['former-helper', 'ec-member'],
	'Takriiiia': ['former-helper'],
	/* Former Interns */
	'EmotionlessKuu': ['former-intern'],
	'SonrisitasPF': ['former-intern'],
	'Ironslab': ['former-intern'],
	'Nightmaric Pixels': ['former-intern', 'hc-member', 'vc-member'],
	'Queen of Idiots': ['former-intern', 'vc-member'],
	'AwesomeEvan61': ['former-intern', 'vc-member'],
	'Batison': ['former-intern'],
	'MeGUMMYsaikoBEAR': ['former-intern'],
	'EchoPrince': ['former-intern'],
	'Erin Hideko': ['former-intern'],
};
//Remove tag if has any of the blacklisted tags
UserTagsJS.modules.metafilter = {
    //Ranks
	sysop: ['bureaucrat'],
	miniadmin: ['bureaucrat', 'sysop', 'head-miniadmin'],
	'content-moderator': ['bureaucrat', 'sysop', 'miniadmin'],
	threadmoderator: ['bureaucrat', 'sysop', 'miniadmin'],
	chatmoderator: ['bureaucrat', 'sysop', 'miniadmin', 'threadmoderator'],
	rollback: ['bureaucrat', 'sysop', 'miniadmin', 'content-moderator'],
	helpers: ['bureaucrat', 'sysop', 'miniadmin', 'content-moderator', 'threadmoderator', 'rollback', 'chatmoderator'],
	intern: ['bureaucrat', 'sysop', 'miniadmin', 'content-moderator', 'threadmoderator', 'rollback', 'chatmoderator', 'helpers'],
	'former-intern': ['intern', 'internpro'],
	//Heads
	'head-admin': ['bureaucrat'],
	'head-miniadmin': ['bureaucrat', 'sysop'],
	'head-discussionmod': ['bureaucrat', 'sysop', 'miniadmin'],
	'head-contentmod': ['bureaucrat', 'sysop', 'miniadmin'],
	'head-chatmod': ['bureaucrat', 'sysop', 'miniadmin', 'threadmoderator'],
	'head-rollback': ['bureaucrat', 'sysop', 'miniadmin', 'content-moderator'],
	'head-helper': ['bureaucrat', 'sysop', 'miniadmin', 'content-moderator', 'threadmoderator', 'rollback', 'chatmoderator'],
	//Interim Heads
	'headint-admin': ['bureaucrat'],
	'headint-miniadmin': ['bureaucrat', 'sysop'],
	'headint-discussionmod': ['bureaucrat', 'sysop', 'miniadmin'],
	'headint-contentmod': ['bureaucrat', 'sysop', 'miniadmin'],
	'headint-chatmod': ['bureaucrat', 'sysop', 'miniadmin', 'threadmoderator'],
	'headint-rollback': ['bureaucrat', 'sysop', 'miniadmin', 'content-moderator'],
	'headint-helper': ['bureaucrat', 'sysop', 'miniadmin', 'content-moderator', 'threadmoderator', 'rollback', 'chatmoderator'],
	//Deputies
	'deputy-admin': ['bureaucrat', 'interim'],
	'deputy-miniadmin': ['bureaucrat', 'sysop', 'interim'],
	'deputy-discussionmod': ['bureaucrat', 'sysop', 'miniadmin', 'interim'],
	'deputy-contentmod': ['bureaucrat', 'sysop', 'miniadmin', 'interim'],
	'deputy-chatmod': ['bureaucrat', 'sysop', 'miniadmin', 'threadmoderator', 'interim'],
	'deputy-rollback': ['bureaucrat', 'sysop', 'miniadmin', 'content-moderator', 'interim'],
	'deputy-helper': ['bureaucrat', 'sysop', 'miniadmin', 'content-moderator', 'threadmoderator', 'rollback', 'chatmoderator', 'interim'],
};
//Add tag if all whitelisted tags are present, remove whitelisted tags
UserTagsJS.modules.implode = {
	miniadmin: ['threadmoderator', 'content-moderator'],
	//Heads
	'head-helper': ['helpers', 'head'],
	'head-rollback': ['rollback', 'head'],
	'head-chatmod': ['chatmoderator', 'head'],
	'head-contentmod': ['content-moderator', 'head'],
	'head-discussionmod': ['threadmoderator', 'head'],
	'head-miniadmin': ['threadmoderator', 'content-moderator', 'head'],
	'head-admin': ['sysop', 'head'],
	'head-bureaucrat': ['bureaucrat', 'head'],
	//Interim Heads
	'headint-helper': ['helpers', 'interim'],
	'headint-rollback': ['rollback', 'interim'],
	'headint-chatmod': ['chatmoderator', 'interim'],
	'headint-contentmod': ['content-moderator', 'interim'],
	'headint-discussionmod': ['threadmoderator', 'interim'],
	'headint-miniadmin': ['threadmoderator', 'content-moderator', 'interim'],
	'headint-admin': ['sysop', 'interim'],
	'headint-bureaucrat': ['bureaucrat', 'interim'],
	//Deputies
	'deputy-helper': ['helpers', 'deputy'],
	'deputy-rollback': ['rollback', 'deputy'],
	'deputy-chatmod': ['chatmoderator', 'deputy'],
	'deputy-contentmod': ['content-moderator', 'deputy'],
	'deputy-discussionmod': ['threadmoderator', 'deputy'],
	'deputy-miniadmin': ['threadmoderator', 'content-moderator', 'deputy'],
	'deputy-admin': ['sysop', 'deputy'],
	'deputy-bureaucrat': ['bureaucrat', 'deputy'],
};

//Prevents existing tags from being hidden
(window.dev = window.dev || {}).profileTags = { noHideTags: true };

//MastHeadRightsBadge
window.MastheadRightsBadgeSettings = {
    iconSize: '25px',
};

//TopicBlockList
TBL_WIKIS = [ "community", "yandere-simulator", "yandere-simulator-fan"];
 
//AbuseLogRC
abuseLogRC_showTo = [ 'content-moderator', 'rollback' ];

//MarkForDeletion
window.MarkForDeletion = {
    promptedDeleteReason: "Vandalism/Spam",
    replace: true
};

//RailWAM
window.railWAM = {
     logPage: 'Project:WAM Log',
     loadOnPage: ['Special:WikiActivity', 'Project:WAM Log'],
     showToAnons: 'false',
     loadOnNamespace: 4
};

//Import for Content Staff
if (mw.config.get('wgUserGroups').includes('rollback') || 
    mw.config.get('wgUserGroups').includes('content-moderator') || 
    mw.config.get('wgUserGroups').includes('sysop')) 
    {
    importArticles({
        type: 'script',
        articles: [
            'u:dev:MediaWiki:MarkForDeletion/code.js',
            'u:dev:MediaWiki:CategoryRenameAuto-update/code.js',
        ]
    });
}
//Import for Social Staff
if (mw.config.get('wgUserGroups').includes('threadmoderator') || 
    mw.config.get('wgUserGroups').includes('sysop')) 
    {
    importArticles({
        type: 'script',
        articles: [
            'u:dev:MediaWiki:ArchiveTool/code.js',
        ]
    });
}
//Import for all Staff
if (mw.config.get('wgUserName').includes('SeiShii') /*Intern*/ || 
    mw.config.get('wgUserName').includes('VacantHelper1') /*Placeholder*/ || 
    mw.config.get('wgUserName').includes('VacantHelper2') /*Placeholder*/ || 
    mw.config.get('wgUserName').includes('VacantHelper3') /*Placeholder*/ || 
    mw.config.get('wgUserName').includes('MrCheeseTiger123') /*Placeholder*/ || 
    mw.config.get('wgUserName').includes('Littleslinky') || 
    mw.config.get('wgUserName').includes('Shadow Bonnie202') || 
    mw.config.get('wgUserGroups').includes('rollback') ||
    mw.config.get('wgUserGroups').includes('chatmoderator') || 
    mw.config.get('wgUserGroups').includes('content-moderator') ||
    mw.config.get('wgUserGroups').includes('threadmoderator') || 
    mw.config.get('wgUserGroups').includes('sysop')) 
    {
    importArticles({
        type: 'script',
        articles: [
            'u:dev:MediaWiki:RCStats.js',
            'u:dev:MediaWiki:RailWAM/code.js',
        ]
    });
}

//AjaxRC
window.ajaxSpecialPages = [
    "Recentchanges", 
    "WikiActivity", 
    "Watchlist", 
    "Log", 
    "Contributions"
    ];
window.ajaxRefresh = 60000;

//BackToTopButton
window.BackToTopModern = true;

//Refresh Live! Chat every 30 seconds
window.chatReloadTime = 30000;

//DPLforums
window.dplforumBoards = [
   //General
  { boardName: 'general-discussion',
    boardDescription: 'This board is for general conversations about the wiki.'
  },
  { boardName: 'fun-and-games',
    boardDescription: 'This board is for off-topic conversation - a place to hang out.'
  },
  //HelpCenter
  { boardName: 'questions-and-answers',
    boardDescription: 'Got a question about the wiki, or the topic? Ask your questions here!'
  },
  { boardName: 'bug-reports',
    boardDescription: "Found a bug and don't want to annoy YandereDev? Maybe we can help."
  },
  //News
  { boardName: 'news-and-announcements',
    boardDescription: 'Breaking news and information!'
  },
  { boardName: 'new-on-yandere-simulator-wiki',
    boardDescription: "Want to share something posted on the wiki, or congratulate somebody?"
  },
  { boardName: 'game-updates',
    boardDescription: "Discuss the latest update and future updates."
  },
  //Staff
  { boardName: 'staff',
    boardDescription: 'Staff meetings and more.'
  },
  { boardName: 'applications',
    boardDescription: 'Apply for staff here.'
  },
  //Defaults
  { boardName: 'help-desk',
    boardDescription: 'Need help with the wiki?'
  },
  { boardName: 'watercooler',
    boardDescription: 'Looking to chat?'
  }
];
window.i = window.i || 0; //Required for SignatureCheck to work properly
window.SignatureCheckJS = {
	forumheader: 'Forum/Header',
};