/***********************************************************************/
/****************************** User Tags ******************************/
/***********************************************************************/
// User Tags
$.get(mw.util.wikiScript('load'), {
    mode: 'articles',
    articles: 'MediaWiki:Custom-user-tags.json',
    only: 'styles'
}, function(d) {
    window.UserTagsJS = JSON.parse(d.replace(/\/\*.*\*\//g, ''));
});

/***********************************************************************/
/************************ Import Configurations ************************/
/***********************************************************************/
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

/* LockOldComments Config */
window.lockOldComments = (window.lockOldComments || {});
window.lockOldComments.limit = 90;
//End LOC */

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

/** WikiActivity **/
window.rwaOptions = {
	limit: 50,
	autoInit: true 
};/**/

/***********************************************************************/
/******************************* Imports *******************************/
/***********************************************************************/
importArticles({
    type: 'script',
    articles: [
        'u:diepio:ListUsers/code.js',
        'u:diepio:Miscellaneous/code.js',
        'u:tes:Common.js/DiscussionsLinks.js'
    ]
});//End SI*/