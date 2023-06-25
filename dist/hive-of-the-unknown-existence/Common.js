///////////////////
/* Miscellaneous */
///////////////////

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

//////////////////////
/* User Tags Config */
//////////////////////

/* Tag Creation */
window.UserTagsJS = {
	modules: {},
	tags: {
		bureaucrat: { u:'Bureaucrat', title:'This user is a bureaucrat on this wiki.'},
		inactive: { u:'Inactive', title:'This user has not been active on this wiki for the past 30 days.'},
		
	}
};
UserTagsJS.modules.inactive = 30;
UserTagsJS.modules.newuser = true;
UserTagsJS.modules.autoconfirmed = true;
UserTagsJS.modules.isblocked = true;
UserTagsJS.modules.mwGroups = ['bureaucrat', 'threadmoderator', 'patroller', 'rollback', 'sysop', 'bot', 'bot-global'];
UserTagsJS.modules.metafilter = {
	sysop: ['bureaucrat', 'founder'],
	bureaucrat: ['founder'],
	threadmoderator: ['sysop', 'bureaucrat']
};

///////////////////////////
/* Import Configurations */
///////////////////////////

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
        'Irrelevant to HotUE': 'Irrelevant',
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

/////////////
/* Imports */
/////////////

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
            'u:dev:AnchoredRollback/code.js',
        ]
    });
}//End AT*/

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
        "u:dev:UTCClock/code.js",
    ]
});//End Other//