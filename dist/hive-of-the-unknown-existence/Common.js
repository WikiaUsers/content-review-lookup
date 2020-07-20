///////////////////////////////////////////////////////////////////////////
/*************************************************************************/
/***************************** Miscellaneous *****************************/
/*************************************************************************/
///////////////////////////////////////////////////////////////////////////
/* Rail Priority */
$(function() {
    mw.hook('DiscordIntegrator.added').add(function() {
        $('.DiscordIntegratorModule').appendTo('#WikiaRail');
    });
});//End RP*/

/* Replaces {{USERNAME}} with the name of the user browsing the page */
function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
}
addOnloadHook(UserNameReplace);//End {{USERNAME}} replacement*/

///////////////////////////////////////////////////////////////////////////
/*************************************************************************/
/****************************** User Tags ********************************/
/*************************************************************************/
///////////////////////////////////////////////////////////////////////////
/* Tag Creation */
window.UserTagsJS = {
	modules: {},
	tags: {
        /** Global Wikia Staff **/
        staff: { link: 'http://community.wikia.com/wiki/Help:User_rights#Staff' },
        vstf: { link : 'http://community.wikia.com/wiki/Help:User_rights#VSTF' },
        helper: { link: 'http://community.wikia.com/wiki/Help:User_rights#Helpers' },
        voldev: { link: 'http://community.wikia.com/wiki/Help:User_rights#Volunteer_Developers' },
        vanguard: { link: 'http://community.wikia.com/wiki/Help:User_rights#Vanguard' },
		
        /** Other Global Groups **/
        council: { link: 'http://community.wikia.com/wiki/Help:Community_Council' },
        authenticated: { link: 'http://community.wikia.com/wiki/Help:User_rights#Authenticated' },
        'bot-global': { link: 'http://community.wikia.com/wiki/Help:Bots' },
        bot: { u: 'Bot Account', order: 300, link: 'http://community.wikia.com/wiki/Help:Bots' },
        roguebot: { u: 'Rogue Bot', order: 300, link: 'http://community.wikia.com/wiki/Help:Bots' },
        'check-user': { link: 'http://community.wikia.com/wiki/Help:User_rights#CheckUsers' },
		
        /** Local Wiki Staff **/
        bureaucrat: { u: 'Bureaucrat', order: 100, link: 'http://http://hive-of-the-unknown-existence.wikia.com/wiki/Project:Staff' },
        admin: { u: 'Administrator', order: 200, link: 'http://hive-of-the-unknown-existence.wikia.com/wiki/Project:Staff' },
        contmod: { u: 'Content Mod', order: 210, link: 'http://hive-of-the-unknown-existence.wikia.com/wiki/Project:Staff' },
        discmod: { u: 'Discussion Mod', order: 220, link: 'http://hive-of-the-unknown-existence.wikia.com/wiki/Project:Staff' },
        sentinel: { u: 'Sentinel', order: 230, link: 'http://hive-of-the-unknown-existence.wikia.com/wiki/Project:Staff' },
        inactiveadmin: { u: 'Inactive Adminstrator', order: 200, link: 'http://hive-of-the-unknown-existence.wikia.com/wiki/Project:Staff' },
        inactivecontmod: { u: 'Inactive Content Mod', order: 210, link: 'http://hive-of-the-unknown-existence.wikia.com/wiki/Project:Staff' },
        inactivediscmod: { u: 'Inactive Discussion Mod', order: 220, link: 'http://hive-of-the-unknown-existence.wikia.com/wiki/Project:Staff' },
        inactivesent: { u: 'Inactive Sentinel', order: 230, link: 'http://hive-of-the-unknown-existence.wikia.com/wiki/Project:Staff' },
        formerstaff: { u: 'Former Staff', order: 280, link: 'http://hive-of-the-unknown-existence.wikia.com/wiki/Project:Staff' },
		
        /** Other Local Groups **/
        founder: { order: 100, link: 'http://community.wikia.com/wiki/Help:Founders' },
		
        /** Utility/Non-Sense Groups **/
        blocked: { u: 'Banned From Hive', order: 120 },
        bannedfromchat: { u: 'Barred From Chat', order: 130 },
        inactive: { U: 'Inactive User', order: 320 },
        nonuser: { u: 'Non-User', order: 340, },
        toleratedalt: { u: 'Legal Clone', order: 400, },
        forum: { u: 'Forum Hub', order: 160, link: 'http://hive-of-the-unknown-existence.wikia.com/wiki/Project:Franken_Forum' },
        gelly: { u: 'Mind of the Hive', order: 90},

    },
    //oasisPlaceBefore: '> h2' // Place tags before the H2
};//End TC*/


/* Functionality Modules */
UserTagsJS.modules.inactive = 30;
UserTagsJS.modules.nonuser = true;
UserTagsJS.modules.isblocked = false;
UserTagsJS.modules.stopblocked = false;
UserTagsJS.modules.autoconfirmed = false;
UserTagsJS.modules.newuser = {//Only Autoconfirmed users have newuser tag
	days: 14,//To remove tag, must have been on the Wiki for two weeks
	edits: 10,//And have at least 10 edits
	namespace: 0//Said edits must be made on articles to count
};//Once NewUser is gone, Verified Tag replaces it (Inactive Tag replaces Verified)
UserTagsJS.modules.mwGroups = ['bureaucrat', 'chatmoderator', 'patroller', 'rollback', 'sysop', 'content-moderator', 'threadmoderator', 'bannedfromchat', 'bot', 'bot-global', 'founder', 'council', 'staff', 'vstf', 'helper', 'voldev', 'vanguard', 'authenticated', 'blocked', 'inactive', 'checkuser-global', 'checkuser', 'user', 'emailconfirmed', 'autoconfirmed', 'notautoconfirmed', 'nonuser'];//End FM*/


/* Custom Tags */
UserTagsJS.modules.custom = {
	/*** GellyPop is so lonely ;-; ***/
	'GellyPop': ['gelly', 'bureaucrat'],

};//End CT*/


/* Meta Filter */
UserTagsJS.modules.metafilter = {

	/** Officials **/
	stafftrigger: ['stafftrigger', 'formerstaff', 'autocrat', 'user', 'autoconfirmed', 'notautoconfirmed'],
	official1: ['autocrat', 'inactiveofficial1', 'inactiveofficial2', 'inactiveofficial3', 'inactiveofficial4', 'king', 'autocrat', 'hiatus', 'forum', 'bot', 'bot-global', 'blocked'],
	official2: ['autocrat', 'official1', 'inactiveofficial1', 'inactiveofficial2', 'inactiveofficial3', 'inactiveofficial4', 'king', 'hiatus', 'forum', 'bot', 'bot-global', 'blocked'],
	official3: ['autocrat', 'official1', 'official2', 'inactiveofficial1', 'inactiveofficial2', 'inactiveofficial3', 'inactiveofficial4', 'king', 'hiatus', 'forum', 'bot', 'bot-global', 'blocked'],
	official4: ['autocrat', 'official1', 'official2', 'official3', 'inactiveofficial1', 'inactiveofficial2', 'inactiveofficial3', 'inactiveofficial4', 'king', 'hiatus', 'forum', 'bot', 'bot-global', 'blocked'],
	inactiveofficial1: ['autocrat', 'king', 'forum', 'bot', 'bot-global', 'blocked'],
	inactiveofficial2: ['autocrat', 'inactiveofficial1', 'king', 'forum', 'bot', 'bot-global', 'blocked'],
	inactiveofficial3: ['autocrat', 'inactiveofficial1', 'inactiveofficial2', 'king', 'forum', 'bot', 'bot-global', 'blocked'],
	inactiveofficial4: ['autocrat', 'inactiveofficial1', 'inactiveofficial2', 'inactiveofficial3', 'king', 'forum', 'bot', 'bot-global', 'blocked'],
	help: ['hiatus', 'blocked', 'inactive'],
	news: ['newscap', 'blocked', 'hiatus', 'bot', 'bot-global', 'sysop'],
	newscap: ['blocked', 'hiatus', 'bot', 'bot-global', 'sysop'],
	newuser: ['autocrat', 'inactiveofficial1', 'inactiveofficial2', 'inactiveofficial3', 'inactiveofficial4', 'king', 'chatmoderator', 'rollback', 'contentmoderator', 'content-moderator', 'threadmoderator', 'sysop', 'bureaucrat', 'staff', 'vstf', 'helper', 'voldev', 'vanguard', 'council', 'authenticated', 'bot-global', 'bot', 'official', 'official1', 'official2', 'official3', 'official4', 'founder', 'hiatus', 'nonuser', 'notautoconfirmed', 'formerstaff', 'bannedfromchat', 'toleratedalt', 'vipThe0warrier', 'vipZollo757347', 'vipCreatorMan2006', 'vipPerlaSweety8', 'vipPolarSalvaje', 'vipFounderRuss', 'vipMrCat1234', 'vipPolandSoma', 'vipDorKDandazx', 'vipC00KIEB0YY'/* Mark*/, 'vipArcadeMrC', 'vipJustLitoprobka', 'vipDelfikPlatinum', 'vipWhert', 'vipDesz22', 'vipDeVito77', 'vipAndresini05', 'vipQuestionator', 'vipQwertyjustio', 'vip123YA', 'vipAdasba', 'vipShyguymask', 'vipdiscord'/*End Mark*/, 'medalartist', 'formerstaff', 'hiatus', 'farmer', 'forum', 'bot', 'bot-global', 'help', 'blocked', 'month'],
	user: ['sysop', 'bureaucrat', 'threadmoderator', 'chatmoderator', 'rollback', 'content-moderator', 'king', 'autocrat', 'newuser', 'autoconfirmed', 'nonuser', 'notautoconfirmed', 'bannedfromchat', 'staff', 'vstf', 'helper', 'voldev', 'vanguard', 'council', 'authenticated', 'formerstaff', 'toleratedalt', 'vipThe0warrier', 'vipZollo757347', 'vipCreatorMan2006', 'vipPerlaSweety8', 'vipPolarSalvaje', 'vipFounderRuss', 'vipMrCat1234', 'vipPolandSoma', 'vipDorKDandazx', 'vipArcadeMrC', 'vipJustLitoprobka', 'vipDelfikPlatinum', 'vipWhert', 'vipDesz22', 'vipDeVito77', 'vipAndresini05', 'vipQuestionator', 'vipQwertyjustio', 'vip123YA', 'vipC00KIEB0YY', 'medalartist', 'vipAdasba', 'vipShyguymask', , 'vipdiscord', 'formerstaff', 'hiatus', 'farmer', 'forum', 'news', 'newscap', 'bot', 'bot-global', 'help', 'blocked', 'month'],
	bannedfromchat: ['blocked', 'founder', 'king', 'autocrat', 'sysop', 'bureaucrat', 'chatmoderator', 'threadmoderator', 'official', 'official1', 'official2', 'official3', 'official4', 'staff', 'vstf', 'helper', 'voldev', 'vanguard', 'council', 'authenticated', 'vipThe0warrier', 'vipZollo757347', 'vipCreatorMan2006', 'vipPerlaSweety8', 'vipPolarSalvaje', 'vipFounderRuss', 'vipMrCat1234', 'vipPolandSoma', 'vipDorKDandazx', 'vipArcadeMrC', 'vipJustLitoprobka', 'vipDelfikPlatinum', 'vipWhert', 'vipDesz22', 'vipDeVito77', 'vipAndresini05', 'vipQuestionator', 'vipQwertyjustio', 'vip123YA', 'vipC00KIEB0YY', 'medalartist', 'vipAdasba', 'vipShyguymask', , 'vipdiscord', 'formerstaff', 'hiatus', 'forum', 'bot', 'bot-global', 'blocked', 'month'],
	nonuser: ['bureaucrat', 'founder', 'king', 'autocrat', 'sysop', 'chatmoderator', 'threadmoderator', 'official', 'official1', 'official2', 'official3', 'official4', 'staff', 'vstf', 'helper', 'voldev', 'vanguard', 'council', 'authenticated', 'notautoconfirmed', 'formerstaff', 'bannedfromchat', 'toleratedalt', 'vipC00KIEB0YY', 'vipThe0warrier', 'vipZollo757347', 'vipCreatorMan2006', 'vipPerlaSweety8', 'vipPolarSalvaje', 'vipFounderRuss', 'vipMrCat1234', 'vipPolandSoma', 'vipDorKDandazx', 'medalartist', 'vipAdasba', 'vipShyguymask', , 'vipdiscord', 'formerstaff', 'hiatus', 'farmer', 'forum', 'news', 'newscap', 'bot', 'bot-global', 'blocked', 'month'],
	medalartist: ['blocked', 'hiatus', 'bot', 'bot-global', 'help'],
	month: ['blocked'],
	farmer: ['blocked']
};//End MF*/


/* User Filter */
UserTagsJS.modules.userfilter = {
	'MrMewshmallow': ['bureaucrat', 'sysop', 'content-moderator', 'threadmoderator', 'chatmoderator', 'rollback', 'inactive', 'official1', 'official2', 'official3', 'official4', 'inactiveofficial1', 'inactiveofficial2', 'inactiveofficial3', 'inactiveofficial4', 'newuser', 'nonuser', 'autoconfirmed', 'notautoconfirmed', 'bannedfromchat', 'user'],
	'ZathusTheMageV': ['bureaucrat', 'inactive', 'blocked', 'official1', 'official2', 'official3', 'official4', 'inactiveofficial1', 'inactiveofficial2', 'inactiveofficial3', 'inactiveofficial4', 'newuser', 'nonuser', 'autoconfirmed', 'notautoconfirmed', 'bannedfromchat', 'user'],
	'Ursuul': ['inactiveadmin', 'inactiveboss', 'inactivemother', 'inactiveguardian', 'inactivedominator', 'inactive', 'sysop', 'bureaucrat', 'official1', 'official2', 'official3', 'official4', 'inactiveofficial1', 'inactiveofficial2', 'inactiveofficial3', 'inactiveofficial4', 'founder', 'newuser', 'nonuser', 'autoconfirmed', 'notautoconfirmed', 'bannedfromchat', 'user'],
};//End UF*/

/* Implode */
UserTagsJS.modules.implode = {
	'roguebot': ['bot', 'blocked'],
	'inactiveofficial1': ['sysop', 'stafftrigger', 'inactive'],
	'inactiveofficial2': ['content-moderator', 'stafftrigger', 'inactive'],
	'inactiveofficial3': ['threadmoderator', 'stafftrigger', 'inactive'],
	'inactiveofficial4': ['chatmoderator', 'stafftrigger', 'inactive'],
	'official1': ['sysop', 'stafftrigger'],
	'official2': ['content-moderator', 'stafftrigger'],
	'official3': ['threadmoderator', 'stafftrigger'],
	'official4': ['chatmoderator', 'stafftrigger'],
	'inactiveadmin': ['sysop', 'inactive'],
	'inactiveboss': ['content-moderator', 'inactive'],
	'inactivemother': ['threadmoderator', 'inactive'],
	'inactivedominator': ['chatmoderator', 'inactive'],
	'inactiveguardian': ['rollback', 'inactive']
};//End Implode*/

///////////////////////////////////////////////////////////////////////////
/*************************************************************************/
/************************* Import Configurations *************************/
/*************************************************************************/
///////////////////////////////////////////////////////////////////////////
/* Banners */
window.BNnamespaces = [0, 1200, 1201, 2001, 2000, 14, 12, 2002];
window.BNusergroups = ['autoconfirmed'];
window.BNcookieExpiration = 4;
//End BN*/

/* Signature Check */
window.SignatureCheckJS = {
    preamble: 'There are a few potential problems with your edit:\n\n',
    epilogue: '\nAre you sure you want to post this anyway?',
    noSignature: 'It looks like you forgot to sign your post. Use \~\~\~\~ to sign your post so that we know who’s talking!\n',
    forumheader: false,
    checkSignature: true
};//End SC*/

/* Lock Old Blogs */
window.LockOldBlogs = {
    expiryDays: 60,
    expiryMessage: 'This blog hasn’t been commented on for over 60 days. There is no need to comment.',
    nonexpiryCategory: 'Weekly Updates',
};//End LOB*/

/* Lock Forums */
window.LockForums = {
    //disableOn: ["12345", "67890"],//Admins may use this field to unlock specific threads if necessary.
    expiryDays: 60,
    expiryMessage: "This thread hasn’t been commented on for <actualDays> days. The discussion is over — there is no need to comment.",
    warningDays: 30,
    warningMessage: "This thread is now <actualDays> days old. Please reply ONLY if a response is seriously needed.",
    ignoreDeletes: true,
    banners: true,
    expiryBannerMessage: "This topic has been unedited for <actualDays> days. It is considered archived — the discussion is over. If you feel this thread needs additional information, contact an administrator so they may unlock it if necessary.",
    warningBannerMessage: "This topic has been unedited for <actualDays> days. It is considered archived — the discussion is over. Do not add to it unless it really needs a response.",
    expiryBannerStyle: "stylesheet",
    warningBannerStyle: "stylesheet",
    warningPopup: true,
    warningPopupMessage: "By posting on an old thread you may be filling up the e-mail boxes of many people who are still following this topic. Are you sure you want to do this?",
    boxHeight: 50
};//End LF*/

/* Message Wall Tags */
window.MessageWallUserTags = {
    tagColor: 'cyan',
    txtSize: '12px',
    glow: true,
    glowSize: '20px',
    glowColor: '#AB9D72',
    users: {
        'GellyPop': 'Mind of the Hive',
    }
};//End MWT*/

/* Skin Switch */
window.monoBookText = "Switch to Monobook";
window.oasisText = "Switch to Oasis";
window.mobileText = "Show Mobile View";//End SS*/

/* Ajax Refresh Configs */
window.ajaxSpecialPages = ["Recentchanges", "WikiActivity", "Watchlist", "Log", "Contributions", "Special:UncategorizedPages", "Special:AllPages"];
window.ajaxRefresh = 90000;
window.AjaxRCRefreshText = 'Auto Refresh';
window.AjaxRCRefreshHoverText = 'Automatically refreshes the page';
//End ARC*/

/* Disabled Bot Message Walls Exempt */
window.DisableBotMessageWalls = {
    exceptions: ['Rappy 4187', 'WikiaBot']
};//End DBMWE*/

/* Reference Popups */
((window.dev = window.dev || {}).ReferencePopups = dev.ReferencePopups || {}).lockdown = true;//End RP*/

/* Ajax Delete */
window.AjaxDelete = {
    deleteReasons: {
        'Housekeeping': 'Housekeeping',
        '[[Help:Vandalism]]': 'Vandalism',
        '[[Help:Spam]]': 'Spam',
        'Marked for deletion': 'Marked for deletion',
        'Empty page': 'Empty',
        'Author request': 'Author request',
        'Irrelevant to Diep.io': 'Irrelevant',
        'Broken Redirect': 'Broken Redirect',
        'Other': 'Other'
    },
    imageDeleteReasons: {
        'Innapropiate': 'Innapropiate',
        'Harassment': 'Harassment',
        'Housekeeping/Unused': 'Housekeeping',
        'Copyright infringement': 'Copyright',
        'Author request': 'Author request',
        'Refuse Image': 'Refuse Image'
    },
    autoCheckWatch: true,
    noUndelete: false
};//End AD*/

/* Mass Effect Configs */
massBlockDelay = 1000;
massRenameDelay = 1000;
massRenameSummary = 'automated';
massRedirectDelay = 1000;
//End MEC*/

///////////////////////////////////////////////////////////////////////////
/*************************************************************************/
/******************************** Imports ********************************/
/*************************************************************************/
///////////////////////////////////////////////////////////////////////////
/* Bot Tools */
if (mw.config.get("wgUserGroups").indexOf('bot') > -1) {
    importArticles({
        type: 'script',
        articles: [
            'u:dev:MassRename/code.js',
            'u:dev:MassRedirect/code.1.js',
            'u:dev:MassCategorization/code.js',
            'u:dev:MassProtect/code.js',
            'u:dev:MassEdit/code.js',
            'u:dev:AutoEditPages/code.js',
            'u:dev:PageRenameAuto-update/code.js',
            'u:dev:Nuke/code.js'
        ]
    });
}//End BT*/

/* Admin Tools */
if (mw.config.get("wgUserGroups").indexOf('sysop') > -1) {
    importArticles({
        type: 'script',
        articles: [
            'u:dev:AnchoredRollback/code.js',
            'u:dev:MassBlock/code.js',
            'u:dev:MassRenameRevert/code.js',
            'u:dev:AjaxDelete/code.js'
        ]
    });
}//End AT*/

/* Rollback Tools */
if (mw.config.get("wgUserGroups").indexOf('rollback') > -1) {
    importArticles({
        type: 'script',
        articles: [
            'u:dev:FindAndReplace/code.js',
            'u:dev:AnchoredRollback/code.js',
            'u:dev:WallGreetingButton/code.js'
        ]
    });
}//End AT*/

/* Autoconfirmed User Tools */
if (mw.config.get("wgUserGroups").indexOf('autoconfirmed') > -1) {
    importArticles({
        type: 'script',
        articles: [
            'u:dev:LastEdited/code.js'
        ]
    });
}//End AUT*/

/* Universal Imports */
importArticles({
    type: 'script',
    articles: [
        'u:runescape:MediaWiki:Common.js/calc.js'
    ]
});//End UI*/
/* Other */
importArticles({
    type: 'script',
    articles: [
        //other scripts,
        'u:dev:MessageWallUserTags/code.js',
        'u:dev:DisplayClock/code.js',
        'u:dev:WallGreetingButton/code.js',
        "w:c:dev:MediaWiki:Countdown/code.js",
        'u:dev:YoutubePlayer/code.js'
    ]
});//End Other//


/**************************************************************************/
/**************************************************************************/
/**************************Nothing to see here*****************************/
/**************************************************************************/
/**************************************************************************/