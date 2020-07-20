/* Any JavaScript here will be loaded for all users on every page load. */

window.UserTagsJS = {
	modules: {},
	tags: {
		//Ranks
		rollback: { u:'Rollback', order:0 },
		chatmoderator: { u:'Chat Mod', order:0 },
		'content-moderator': { u:'Content Mod', order:0 },
		threadmoderator: { u:'Discussion Mod', order:0 },
		miniadmin: { u:'Mini-Admin', order:0 },
		sysop: { u:'Admin', order:0 },
		bureaucrat: { u:'Bureaucrat', order:0 },
		//Former
		'former-rollback': { u:'Former Rollback', order:-1/0 },
		'former-chatmod': { u:'Former Chat Mod', order:-1/0 },
		'former-contentmod': { u:'Former Content Mod', order:-1/0 },
		'former-discussionmod': { u:'Former Discussion Mod', order:-1/0 },
		'former-miniadmin': { u:'Former Mini-Admin', order:-1/0 },
		'former-admin': { u:'Former Admin', order:-1/0 },
		'former-bureaucrat': { u:'Former Bureaucrat', order:-1/0 },
		//Misc
		founder: { u:'Founder', order:100 },
		adopter: { u:'Adopter', order:100 },
	}
};
//Add Tags
UserTagsJS.modules.custom = {
    //Current Staff
    /* Bureaucrats */
    'JD4SURVIVOR': [],
    'Master Hydraffe': [],
    'CAMERAwMUSTACHE': [],
    /* Admins */
    'TheChibiKing': [],
    'Jackboog21': [],
    'FurryTrash23': [],
    /* Mini-Admins */
    'JDisbae': [],
    /* Content Mods */
    /* Discussion Mods */
    /* Rollbacks */
    'GetLuck': [],
    'Kafluffle101': [],
    'Saus the Seafish': [],
    'Will07498': [],
    /* Chat Mods */
    'JohnDotto': [],
    'MistyMelissa': [],
    'FalcoLombardi99': [],
    'DevDiego': [],
	
    //Former Staff
    /* Former Bureaucrats */
    '567hanna': ['former-bureaucrat'],
    'Justdancer30': ['former-bureaucrat', 'adopter'],
    'RegularCat': ['former-bureaucrat'],
    /* Former Admins */
    'Bunnylove14': ['former-admin'],
    'Kittygirl7878': ['former-admin'],
    'Blugo34': ['former-admin'],
    'ILoveHarley': ['former-admin'],
    'Stanley56': ['former-admin'],
    /* Former Mini-Admins */
    'ZodiacGiraffe': ['former-miniadmin'],
    /* Former Content Mods */
    /* Former Discussion Mods */
    /* Former Rollbacks */
    'Blv08': ['former-rollback'],
    /* Former Chat Mods */
    'TheSkyField': ['former-chatmod'],
    'AngelSasayaki': ['former-chatmod'],
    'Jamesnorky': ['former-chatmod'],
    'PewDieFern': ['former-chatmod'],
    'SatoTheScientist101': ['former-chatmod'],
    'Novophoenix': ['former-chatmod'],
};
UserTagsJS.modules.mwGroups = ['council', 'rollback', 'chatmoderator', 'threadmoderator', 'content-moderator', 'sysop', 'bureaucrat'];
//Remove tag if has any of the blacklisted tags
UserTagsJS.modules.metafilter = {
    //Ranks
	sysop: ['bureaucrat'],
	miniadmin: ['bureaucrat', 'sysop'],
	'content-moderator': ['bureaucrat', 'sysop', 'miniadmin'],
	threadmoderator: ['bureaucrat', 'sysop', 'miniadmin'],
	chatmoderator: ['bureaucrat', 'sysop', 'miniadmin', 'threadmoderator'],
	rollback: ['bureaucrat', 'sysop', 'miniadmin', 'content-moderator'],
};
//Add tag if all whitelisted tags are present, remove whitelisted tags
UserTagsJS.modules.implode = {
	miniadmin: ['threadmoderator', 'content-moderator'],
};
//Prevents existing tags from being hidden
(window.dev = window.dev || {}).profileTags = { noHideTags: true };

//MastHeadRightsBadge
window.MastheadRightsBadgeSettings = {
    iconSize: '25px',
};

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
//Import for all Staff
if (mw.config.get('wgUserGroups').includes('rollback') ||
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

jQuery('.achievementbox').mouseover(function() {
   jQuery("div", this).show();
});

jQuery('.achievementbox').mouseout(function() {
   jQuery("div", this).hide();
});

$(document).ready(function(){
	if( $('#control_form_edit').length )
	{
		$('#control_edit').remove();
	}
});

/* Credits to Avatar Wiki */
/* Adds icons to page header bottom border
 * by: [[User:The 888th Avatar]]
 */
 
$(document).ready(function() {
	if (skin == "oasis" || skin == "wikia") {
		$('.WikiaPageHeader').append($('#icons'));
		$('#icons').css({'position' : 'absolute', 'right' : '0', 'bottom' : '-1.2em'});
	}
});

/*
    Replaces {{USERNAME}} with the name of the user browsing the page.
    Requires copying Template:USERNAME.
*/
 
$(function() {
    if (window.disableUsernameReplace || mw.config.get('wgUserName') === null) { return; }
    $('span.insertusername').text(mw.config.get('wgUserName'));
});

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
  { boardName: 'questions-and-answers',
    boardDescription: 'Got a question about the wiki, or the topic? Ask your questions here!'
  },
  //News
  { boardName: 'news-and-announcements',
    boardDescription: 'Breaking news and information!'
  },
  { boardName: 'new-on-just-dance-wiki',
    boardDescription: "Want to share something posted on the wiki, or congratulate somebody?"
  },
  //Staff
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