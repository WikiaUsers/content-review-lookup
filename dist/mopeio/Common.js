/***********************************************************************/
/****************************** User Tags ******************************/
/***********************************************************************/
// User Tags
$.getJSON(mw.config.get('wgScriptPath') + '/api.php', {
	action: 'query',
	prop: 'revisions',
	titles: 'MediaWiki:Custom-user-tags.json',
	rvslots: '*',
	rvprop: 'content',
	format: 'json',
	formatversion: 2
}).then(function(data) {
	if (data.error) return;
	window.UserTagsJS = JSON.parse(data.query.pages[0].revisions[0].slots.main.content);
});

/***********************************************************************/
/************************ Import Configurations ************************/
/***********************************************************************/
/* PreloadFileDescription */
PFD_templates = [
    {
        label:   'Gameplay screenshot',
        desc:    '{{File\n| desc = \n| type = screenshot \n| uploader = \n}}',
    },
    'Group header',
    {
        label:   'Asset (game files)',
        desc:    '{{File\n| desc = \n| type = asset \n| source = \n| archive = \n}}\n',
    },
    {
        label:   'Reconstructed asset',
        desc:    '{{File\n| desc = \n| type = reconstructed \n| designer = \n| Author = \n|  Other versions = \n}}\n',
    },
    {
        label:   'Other',
        desc:    '{{File\n| desc = \n| type = \n}}\n',
    },
];
PFD_license = 'Nolicense';
PFD_requireLicense = true;

/* AutoCreateUserPages */
window.AutoCreateUserPagesConfig = {
    content: {
        2: '{{User}}'
    },
    summary: 'Welcome to the Mope.io Wiki!',
    notify: '<a href="/wiki/User:$2">Here is a link to your userpage, $1! Feel free to add as much info about yourself as you are comfortable with.</a>'
};// End AutoCreateUserPages */

/* WelcomeMessage configuration */
window.welcomeMessage = {
  enabled: true,
  adminUsername: 'Gaia94',  // $4
  adminNickname: '$4',  // $3
  messageTitle: 'Welcome to the Mope.io Wiki!',
  messageText: 'Hey there $1 — I\'m $4, an admin of the Mope.io Wiki. Welcome, and thank you for your contribution: We hope you continue editing with us! We are a wiki dedicated to documenting all things <a href="https://mopeio.fandom.com/wiki/Mope.io">Mope.io</a>. \n\n \n\nPlease be sure to read and follow the <a href="https://mopeio.fandom.com/wiki/Project:Rules">general rules</a> of the wiki. In addition, note the <a href="https://mopeio.fandom.com/wiki/Help:Manual_of_Style">Manual of Style</a> and <a href="https://mopeio.fandom.com/wiki/Help:Layout_Guide">Layout Guide</a> when editing, and the <a href="https://mopeio.fandom.com/wiki/Help:Files">file policy</a> when uploading images. A full list of local wiki policies can be viewed <a href="https://mopeio.fandom.com/wiki/Category:Policies">here</a>. \n\n \n\nVisit <a href="https://mopeio.fandom.com/wiki/Forum:Index">the forums</a> to stay up-to-date on wiki-related discussions, consensus, votes, and make suggestions. If you want to talk about Mope.io and share gameplay screenshots, fanart, or fanon ideas, check out <a href="https://mopeio.fandom.com/f">the discussions</a>! \n\n \n\nIf you have any questions or concerns, you can make a post in the <a href="https://mopeio.fandom.com/wiki/Forum:Help">help forum</a>, or reply to this message. Thanks, and once again, welcome to the Mope.io Wiki!',
  debug: false,
  testAllEdits: false,
  preferTalk: false,
};// End WelcomeMessage config */

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

/* Default NewCommentIndicator config */
window.newCommentIndicator = {
    newThreshold: 432000,
    hideViewed: false
};
//End NCI*/

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
        'u:diepio:Miscellaneous.js',
        'u:dev:MediaWiki:WelcomeMessage.js',
    ]
});//End SI*/