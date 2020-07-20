/////////////////////////////////////////////////////////////////////////
/****************************** User Tags ******************************/
/////////////////////////////////////////////////////////////////////////
/* Tag Creation */
window.UserTagsJS = {
    modules: {},
    tags: {
        /** Global FANDOM Groups **/
        staff: { link: 'https://community.wikia.com/wiki/Help:Community_Team' },
        helper: { link: 'https://community.wikia.com/wiki/Help:Volunteers_and_Helpers#Helpers' },
        vstf: { link: 'https://community.wikia.com/wiki/Help:VSTF' },
        'global-discussions-moderator': { link: 'https://community.wikia.com/wiki/Help:Global_Discussions_moderators' },
        voldev: { link: 'https://community.wikia.com/wiki/Help:Volunteer_Developers' },
        vanguard: { link: 'https://community.wikia.com/wiki/Help:Vanguard' },
        council: { link: 'https://community.wikia.com/wiki/Help:Community_Council' },
        authenticated: { link: 'https://community.wikia.com/wiki/Help:User_rights#Authenticated' },
        'bot-global': { link: 'https://community.wikia.com/wiki/Help:Bots' },


        /** Local Groups **/
        'check-user': { link: 'https://community.wikia.com/wiki/Help:CheckUser' },
        bot: { order: 100, link: 'https://community.wikia.com/wiki/Help:Bots' },
        rot: { u: 'Rogue Bot', order: 200, link: 'https://community.wikia.com/wiki/Help:Bots' },
        founder: { order: 300, link: 'https://community.wikia.com/wiki/Help:Founders' },
        bureaucrat: { order: 400, link: 'https://hordesio.wikia.com/w/Project:Staff' },
        sysop: { order: 500, link: 'https://hordesio.wikia.com/w/Project:Staff' },
        'content-moderator': { order: 625, link: 'https://hordesio.wikia.com/w/Project:Staff' },
        threadmoderator: { order: 650, link: 'https://hordesio.wikia.com/w/Project:Staff' },
        chatmoderator: { order: 675, link: 'https://hordesio.wikia.com/w/Project:Staff' },
        rollback: { order: 700, link: 'https://hordesio.wikia.com/w/Project:Staff' },
        blocked: { order: 300, link: 'https://hordesio.wikia.com/w/Special:Contact/blocked' }
    },
};//End TC*/


/* Functionality Modules */
UserTagsJS.modules.newuser = false;
UserTagsJS.modules.inactive = false;
UserTagsJS.modules.autoconfirmed = false;
UserTagsJS.modules.mwGroups = ['staff', 'helper', 'vstf', 'global-discussions-moderator', 'voldev', 'vanguard', 'council', 'authenticated', 'bot-global', 'bot', 'checkuser', 'founder', 'bureaucrat', 'sysop', 'content-moderator', 'threadmoderator', 'chatmoderator', 'rollback', 'blocked'];//End FM*/


/* Custom Tags */
UserTagsJS.modules.custom = {
    'LazyMelon': ['founder'], //In case his rights are lost
};//End CT*/


/* Meta Filter */
UserTagsJS.modules.metafilter = {
    bot: ['bot-global', 'blocked'],
    founder: ['blocked'],
    bureaucrat: ['bureaucrat'],
    sysop: ['bot', 'blocked', 'founder'],
    'content-moderator': ['bot', 'blocked', 'founder', 'bureaucrat', 'sysop'],
    threadmoderator: ['bot', 'blocked', 'founder', 'bureaucrat', 'sysop'],
    chatmoderator: ['bot', 'blocked', 'founder', 'bureaucrat', 'sysop', 'threadmoderator'],
    rollback: ['bot', 'blocked', 'founder', 'bureaucrat', 'sysop', 'content-moderator'],
};//End MF*/


/* Implode */
UserTagsJS.modules.implode = {
    'rot': ['bot', 'blocked']
};//End Implode*/

/////////////////////////////////////////////////////////////////////////
/************************ Import Configurations ************************/
/////////////////////////////////////////////////////////////////////////
/* Signature Check */
window.SignatureCheckJS = {
    preamble: 'There are a few potential problems with your edit:\n\n',
    epilogue: '\nAre you sure you want to post this anyway?',
    noSignature: 'It looks like you forgot to sign your post. Use \~\~\~\~ to sign your post so that we know who’s talking!\n',
    forumheader: false,
    checkSignature: true,
    extraNamespaces: [
        {
            namespace: 2,
            patterns:  [ '/Talk' ]
        }
    ]
};//End SC*/

/* Skin Switch */
window.oasisText = "Switch to Oasis";
window.mobileText = "Show Mobile View";
window.monoBookText = "Switch to Monobook";//End SS*/

/* Reference Popups */
((window.dev = window.dev || {}).ReferencePopups = dev.ReferencePopups || {}).lockdown = true;//End RP*/

/* BackToTop */
window.BackToTopStart = 400;
window.BackToTopSpeed = 1500;//End BTT*/

/* Reorder SUG */
function ShowUserGroups_sorter(a, b) {
    var PredeterminedOrder = {
        'staff':                       -100,
        'util':                         -99,
        'restricted-login':             -98,
        'restricted-login-auto':        -97,
        'restricted-login-exempt':      -96,
        'devboxpanel':                  -95,
        'translator':                   -94,
        'content-reviewer':             -93,
        'lookupuser':                   -92,
        'lookupcontribs':               -91,
        'helper':                       -80,
        'vstf':                         -70,
        'global-discussions-moderator': -60,
        'voldev':                       -50,
        'vanguard':                     -40,
        'council':                      -30,
        'authenticated':                -20,
        'fandom-editor':                -10,
        'bot-global':                     0,
        'bot':                           10,
        'codeadmin':                     20,
        'checkuser':                     30,
        'bureaucrat':                    40,
        'sysop':                         50,
        'content-moderator':             60,
        'threadmoderator':               70,
        'chatmoderator':                 80,
        'rollback':                      90,
        'poweruser':                    110,
        'autoconfirmed':                120
    };
 
    var sortA = typeof PredeterminedOrder[a] === "number"
        ? PredeterminedOrder[a]
        : 100;
    var sortB = typeof PredeterminedOrder[b] === "number"
        ? PredeterminedOrder[b]
        : 100;
 
    return sortA - sortB;
}//End RSUG*/

/////////////////////////////////////////////////////////////////////////
/******************************* Imports *******************************/
/////////////////////////////////////////////////////////////////////////
importArticles({
    type: 'script',
    articles: [
        'u:diepio:Miscellaneous.js',
        'u:tes:Common.js/DiscussionsLinks.js'
    ]
});//End SI*/