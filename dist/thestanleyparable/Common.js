/**-------------------**/
/** AJAX Auto-Refresh **/
/**-------------------**/
 
window.ajaxPages = new Array(
    "Special:WikiActivity",
    "Special:RecentChanges",
    "Special:RecentChangesLinked",
    "Special:Log",
    "Special:Images",
    "Special:ListFiles",
    "Special:Contributions",
    "Special:NewPages",
    "Special:UncategorizedPages",
    "Special:DoubleRedirects",
    "Special:WhatLinksHere",
    "Special:Categories",
    "Special:Videos",
    "Special:Watchlist",
    "Special:LonelyPages",
    "Special:BrokenRedirects",
    "Special:DeadendPages",
    "Special:Disambiguation",
    "Special:Withoutimages",
    "Blog:Recent posts");
window.ajaxRefresh = 30000;
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page over time';
window.ajaxIndicator = 'https://vignette.wikia.nocookie.net/dev/images/b/ba/Snake_throbber_dark-bg.gif/revision/latest?cb=20140519203615';

/**---------------------------------------------------------
/** Allows CSS to target pages with a specific template. ~ 
    Made by KockaAdmiralac upon request.                  **/
/**-------------------------------------------------------**/
 
$('body').attr('data-topic', $('#mw-content-text .article-topic').attr('data-topic'));

/**------------------------------**/
/** Make the site perform better **/
/**------------------------------**/
 
var hasClass = (function() {
    var reCache = {};
    return function(element, className) {
        return (reCache[className] ? reCache[className] : (reCache[className] = 
        new RegExp("(?:\\s|^)" + className + "(?:\\s|$)")))
        .test(element.className);
};})();

/**----------------------------------------------**/
/** Insert the viewer's username where specified **/
/**----------------------------------------------**/

!function() {
    var username = mw.config.get('wgUserName');
    if (!!window.disableUsernameReplace || !username) {return}
    mw.hook('wikipage.content').add(function($content) {
        $content.find('.InputUsername, .insertusername' + 
        (window.UsernameReplaceSelector ? ',' + 
        window.UsernameReplaceSelector : '')).text(username);
    });
}();

/**-----------**/
/** User Tags **/
/**-----------**/
 
/** Core Configuration **/
 
window.UserTagsJS = {
    modules: {
        stopblocked: false,
        isblocked: true,
        autoconfirmed: true,
        nonuser: true,
        inactive: 40,
        newuser: {days: 6, edits: 15},
        explode: {'bannedfromchat': ['blocked']},
        metafilter: {
	        // Remove tags like "Inactive" and "New Editor" from blocked users
	        'inactive': ['blocked'],
	        'neweditor': ['blocked'],
	        // Make autoconfirmed tag not appear unless otherwise stated
	        'autoconfirmed': ['autoconfirmed']
        },
        // Custom tags
        custom: {
            'Withersoul 235': ['wiki-adopter', 'wikicoder'],
	    'Alex.sapre': ['fadmin'],
	    'Ghhghgh': ['founder']
        }
    }, tags: {
        ontrial: {
            u: 'On Repent Trial',
            link: 'The Stanley Parable Wiki:Repent Trials',
            title: 'Ths user used to be banned, but is considered to be forgiven and allowed back into the community. They are therefore on a trial to prove that they are worthy of it and have truly changed for the better.'
        },
        'headbureaucrat': { 
            u: 'Head Bureaucrat',
            title: 'This user is the head of the Stanley Parable Wiki.'
        },
        'headadmin': { 
            u: 'Head Admin',
            title: 'This user is the head of the Stanley Parable Wiki.'
        },
       'wiki-adopter': { 
            u: 'Wiki Adopter',
            title: 'This user gained bureaucrat rights on this wiki through the adoption process after the last active admin vanished.'
       },
       'wikicoder': {
           u: 'Wiki Coder',
           title: "This user manages the wiki's CSS and JavaScript."
       },
       'founder' : {
           u: 'Founder',
           title: 'This user started the Stanley Parable Wiki, all the way back in 2013.',
           order: -1/0
       },
       'blocked': {
           u: 'Warped to the Serious Room',
           title: "This user misbehaved on this wiki, didn't follow its rules, policies and guidelines or is a sockpuppet of a user who did one of the aforementioned. They have therefore been kicked out and reduced to usage of a read-only mode.",
           order: -1/0
       },
       'bannedfromchat': {
           u: 'Expelled from Chat',
           title: "This user misbehaved in this wiki's chatroom and didn't follow its rules. They are now denied access to it, but can still contribute to the wiki. This tag also appears when a user is blocked from the wiki in general without being chatbanned first.",
           order: 1
       },
       'autoconfirmed': {
           title: "This user has been on FANDOM / Wikia for at least four days and have therefore been bestowed the full toolbox and privileges of the registered user group.",
           order: 1/0,
       },
       /*'emailconfirmed': {
           title: "This user has confirmed their registration per e-mail and are therefore no longer affected by certain restrictions from non-emailconfirmed users.",
           order: 1/0
       },*/
       'fadmin': {
           u: 'Former Admin',
           title: 'This admin has lost their rights, due to inactivity, misbehaviour or user request.',
           order: 2
       },
       'narrator': {
           u: 'The Narrator'
       }}
};
 
/** Automatically add global tags to users in question + download
text and data for some other tags. **/
 
UserTagsJS.modules.mwGroups = [
    // Append bot rank + global ranks to accounts in question
    'authenticated',
    'bot',
    'bot-global',
    'checkuser-global',
    'council',
    'helper',
    'util',
    'voldev',
    'vanguard',
    'vstf',
    // Import some wikispecific tags
    'bannedfromchat',
    'autoconfirmed'
];

/**-----------------------**/
/** Username highlighting **/
/**-----------------------**/

window.highlightUsersConfig = {
    colors: {
        'bureaucrat': '#DC143C',
        'sysop': "#009E60"
    },
    styles: {
        'sysop': 'font-weight: bold;',
        'bureaucrat': "font-weight: bold"
    }
};

/**-------------**/
/**Spoiler areas**/
/**-------------**/

window.SpoilerAlertJS = {
    question: 'This area contains potential spoilers for endings, choices,\
               plot details or otherwise important information about The\
               Stanley Parable. Are you sure you want to see them?',
    yes: 'Yes',
    no: 'No',
    fadeDelay: 625
};

/**-------------------**/
/** Admin-only forums **/
/**-------------------**/

window.ArchiveBoards = {
    boards: ["Staff Discussion"],
    boardNotice: "Sorry, you may not create a new thread in this board.\
    Only admins, moderators, rollbacks and global users are allowed to post\
    here. Please go back to the <a href='/wiki/Special:Forum'>Forum Index</a>\
    to find an appropriate board.",
    threadNotice: "Sorry, you may not reply to this thread. It is open to \
    admins, rollbacks, moderators and global user only.",
    groupCustom: new Array(
        "content-moderator",
        "chatmoderator",
        "threadmoderator",
        "rollback",
        "checkuser",
        "checkuser-global",
        "global-discussions-moderator",
        "vstf",
        "content-volunteer",
        "voldev",
        "vanguard"
    )
};

/**----------------**/
/** Script imports **/
/**----------------**/

importArticles({
    type: 'script',
    articles: new Array(
        "u:dev:MediaWiki:HighlightUsers/code.js",
        "w:c:dev:SpoilerAlert/code.js",
        "u:dev:UserTags/code.js",
        "w:c:dev:MediaWiki:QuickIW/code.js",
        "u:dev:MediaWiki:AjaxRC/code.js",
        "u:dev:WallGreetingButton/code.js",
        "u:dev:MediaWiki:ArchiveBoards/code.js",
        'w:c:dev:MediaWiki:EditBoardDescription/code.js',
        'u:dev:MediaWiki:HeaderLinks/code.js',
        "w:c:dev:GlobalEditcount/code.js",
        "u:dev:AdminDashboard JS-Button/code.js"
    )
});

/**-------------------------------------------------------**/
/** Sort content on Special:WhatLinksHere alphabetically  **/
/**-------------------------------------------------------**/
 
~function($) {
    if (wgCanonicalSpecialPageName !== 'Whatlinkshere') return;
    var sorted_list, $list = $('#mw-whatlinkshere-list');
    sorted_list = $list.children('li').sort(function (a, b) {
        return ($(a).find('a:first').attr('title') > 
        $(b).find('a:first').attr('title')) ? 1 : -1;});
    $list.children('li').remove(); $list.append(sorted_list);}
(jQuery);