/*User Tags*/
window.UserTagsJS = {
	modules: {},
	tags: {
        /*** Global Groups ***/
        staff: { link: 'http://community.wikia.com/wiki/Community_Central:Staff' },
        vstf: { link : 'http://community.wikia.com/wiki/VSTF' },
        helper: { link: 'http://community.wikia.com/wiki/Help:Volunteers_and_Helpers#Helpers' },
        voldev: { link: 'http://community.wikia.com/wiki/User_blog:Grunny/Introducing_the_Volunteer_Developer_Program' },
        vanguard: { link: 'http://community.wikia.com/wiki/Help:Vanguard' },
        council: { link: 'http://community.wikia.com/wiki/Help:Community_Council' },
        bot: { u: 'Droid', link: 'http://community.wikia.com/wiki/Help:Bots' },
        globalbot: { u: 'Intergalactic Droid'},
        roguebot: { u: 'Droid Rioteer', link: 'http://community.wikia.com/wiki/Help:Bots' },
        
        /*** Local Groups ***/
        MOPE: { u: 'mope.io wiki founder' },
        DIEPDIEPDIEP: { u: 'Diep.io Wiki Representative' },
        DOBLONSIOOOO: { u: 'Doblons.io Wiki Representative' },
        illuminaticonfirmed: { u: 'The Wretched Illuminati Embodiment' },
        tagColor: 'gold',
        founder: {link: 'http://community.wikia.com/wiki/Help:Founders' },
        creator: { u: 'Creator of the TOTMGsRock Universe Account' },
        firstreward: { u: 'Acolyte'},
        secondreward: { u: 'Adept'},
        thirdreward: { u: 'Expert'},
        fourthreward: { u: 'Master'},
        fifthreward: { u: 'Omnipotent'},
        clone: {u: 'Clone (Alt) of TOTMGsRock'}
    },
};

/*Miscellaneous Modules*/
UserTagsJS.modules.inactive = 28;
UserTagsJS.modules.stopblocked = false;
UserTagsJS.modules.newuser = false;
UserTagsJS.modules.autoconfirmed = false;
UserTagsJS.modules.mwGroups = ['bureaucrat', 'chatmoderator', 'patroller', 'rollback', 'sysop', 'contentmoderator', 'threadmoderator', 'bannedfromchat', 'bot', 'bot-global', 'creator', 'blocked'];

/*Filter Modules*/

UserTagsJS.modules.metafilter = {
	bureaucrat: ['founder', 'hiatus'],
	sysop: ['bureaucrat' ,'blocked'],
	'content-moderator': ['sysop', 'bureaucrat', 'founder', 'hiatus', 'blocked'],
	threadmoderator: ['content-moderator', 'sysop', 'bureaucrat', 'hiatus'],
	chatmoderator: ['headdominator', 'sysop', 'bureaucrat', 'threadmoderator', 'content-moderator', 'hiatus', 'blocked'],
	rollback: ['sysop', 'bureaucrat', 'chatmoderator', 'threadmoderator', 'content-moderator', 'hiatus'],
	autoconfirmed: ['sysop', 'bureaucrat', 'threadmoderator', 'chatmoderator', 'rollback', 'content-moderator'],
	formerstaff: ['chatmoderator', 'rollback', 'threadmoderator', 'content-moderator', 'sysop', 'bureaucrat', 'blocked'],
	fourthreward: ['blocked'],
	thirdreward: ['fourthreward', 'blocked'],
	secondreward: ['thirdreward', 'fourthreward', 'blocked'],
	firstreward: ['secondreward', 'thirdreward', 'fourthreward', 'blocked',],
	inactive: ['bureaucrat', 'sysop', 'council', 'founder', 'staff', 'vstf', 'vanguard', 'voldev', 'bot', 'bot-global', 'helper'],
	blocked: ['visitor', 'council', 'bureaucrat', 'sysop', 'founder'],
	visitor: ['council']
};

UserTagsJS.modules.userfilter = {
	'TOTMGsRock': ['inactive', 'blocked'],
	'Ursuul': ['inactive', 'blocked', 'bureaucrat', 'sysop', 'chatmoderator', 'threadmoderator', 'content-moderator', 'rollback', 'newuser', 'notautoconfirmed', 'autoconfirmed', 'bureaucrat', 'sysop', 'content-moderator', 'threadmoderator', 'chatmoderator', 'rollback'],
	'NecroTheTank': ['inactive', 'blocked']
};

/*Move Thread Button Install*/
$(document).ready(function() {
	if (
		mw.config.get("wgNamespaceNumber") == 1201 &&
		$("#mw-content-text > .BreadCrumbs > a:first-of-type")
			.attr("href")
			.substr(0,(mw.config.get("wgServer") + "/wiki/Message_Wall:").length) == mw.config.get("wgServer") + "/wiki/Message_Wall:"
	) { // this is a thread from a message wall
		$(".message-main > .speech-bubble-message .buttons > nav > ul").append('<li><a href="#" data-id="5" class="move-thread">Move to forum</a></li>');
	}
});

/* Ajax Refresh Configs */
//window.ajaxPages = ["Some Frequently Updated Page"];
window.ajaxSpecialPages = ["Recentchanges", "WikiActivity", "Watchlist", "Log"/*, "Contributions"*/, "Special:UncategorizedPages", "Special:AllPages"];
//window.ajaxIndicator = 'https://images.wikia.nocookie.net/__cb20100609110347/software/images/a/a9/Indicator.gif';
window.ajaxRefresh = 90000;
window.AjaxRCRefreshText = 'Auto Refresh';
window.AjaxRCRefreshHoverText = 'Automatically refreshes the page';

/*Custom Tags*/
 
UserTagsJS.modules.custom = {
	/*Staff Ranks*/
	'TOTMGsRock': ['creator'],
	'Killer memestar24': ['illuminaticonfirmed'],
	'Rifleman2': ['illuminaticonfirmed'],
	'NecroTheTank': ['MOPE','fifthreward'],
	'ThugLife69': ['DOBLONSIOOOO'],
	'Oo1oo2oo3oo4' : ['DIEPDIEPDIEP'],
	'Stuffystuff109': ['clone']
};

/*Message Wall User Tags*/
window.MessageWallUserTags = {
    tagColor: 'gold',
    txtSize: '12px',
    glow: true,
    glowSize: '20px',
    glowColor: '#228B22',
    users: {
        'TOTMGsRock': 'The Ultimate Omnipotent',
        'NecroTheTank': 'Shrekker',
        'ThugLife69': 'MLG',
        'BestBMCplayer': 'Ultimate Admin'
    }
};

/* Imported Tools for Admins Only */
//Thank me later TOTM, these tools will help you keep Rifleman at bay*/
massRenameDelay = 1000; // Optional
massRenameSummary = 'automated'; // Optional
if (mw.config.get("wgUserGroups").indexOf('sysop') > -1) {
  massRedirectDelay = 1000;
  importArticles({
    type: 'script',
    articles: [
        'u:dev:MassProtect/code.js',//Found under “My Tools”
        'u:dev:MediaWiki:AnchoredRollback/code.js',//Easier Rollbacking
        'u:kocka:MediaWiki:VSTFReport/code.js'//Quickly Report Rifleman to VSTF: Go to the Contributions Page of new alts (same place with the Block Button), & a “Report to VSTF” button will appear. Use it to easily report Rifleman to VSTF & put him away when he shows up again.
    ]
});
}

/* Universal Script Imports */
importArticles({
    type: 'script',
    articles: [
        'u:dev:MessageWallUserTags/code.js',
        'u:dev:YouTubeModal/code.js'
    ]
});