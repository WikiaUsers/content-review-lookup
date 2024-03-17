/**-----------------------**/
/** Script configurations **/
/**-----------------------**/

jQuery.extend(true, window, {
    
    //RailWAM Module
    railWAM: {logPage: "Project:WAM Log"},
    
    //Message Wall User Tags
    MessageWallUserTags: {
        tagColor: 'grey',
        glow: true,
        glowSize: '15px',
        glowColor: 'lightgrey',
        users: {
            'CriticizerHere': 'Bureaucrat',
            'Likemea': 'Admin',
            'Black Bullet235': 'Admin',
            'IllBeYourFriend': 'Moderator',
            'LavenderLowd': 'Rollback',
    }},
    
    //Spoiler alert
    SpoilerAlertJS: {
        question: 'Warning! This area contains spoilers for a creepypasta or\
                    fanfiction. Do you want to see them?',
        yes: 'Yes',
        no: 'No',
        fadeDelay: 625
    },
    
    //AjaxRC
    
    ajaxPages: Array(
        "Special:WikiActivity",
        "Special:Log",
        "Special:Contributions",
        "Special:WikiActivity/watchlist",
        "Special:Images",
        "Special:ListFiles",
        "Blog:Recent_posts"
    ), ajaxRCRefreshText: "Auto-refresh",
    ajaxRCRefreshHoverText: "Auto-refresh page over time",
    ajaxRefresh: 20000,
    ajaxIndicator: 'https://images.wikia.nocookie.net/software/images/a/a9/Indicator.gif',
    
    //Edit Intro Button
    
    EditIntroButtonText: String("Edit intro section")
});

/**---------------------------------------------------------------------**/
/** Allow CSS to target all pages with a certain parameter in {{Topic}} **/
/**---------------------------------------------------------------------**/

$('body').attr(
    'data-topic', $('#mw-content-text .article-topic').attr('data-topic')
);

/**-------------------------------**/
/** Makes the site perform better **/
/**-------------------------------**/

var hasClass = (function () {
    var reCache = {};
    return function (element, className) {
        return (reCache[className] ? reCache[className] : (reCache[className] = 
        new RegExp("(?:\\s|^)" + className + "(?:\\s|$)")))
        .test(element.className);};
})();
 
 /**------------------------------------------------------**/
 /** Sort content on Special:WhatLinksHere alphabetically **/
 /**------------------------------------------------------**/
 
 ! function($) {
    if (wgCanonicalSpecialPageName !== 'Whatlinkshere') {return}
    var sorted_list, $list = $('#mw-whatlinkshere-list');
    sorted_list = $list.children('li').sort(function (a, b) {
        return ($(a).find('a:first').attr('title') > 
        $(b).find('a:first').attr('title')) ? 1 : -1});
    $list.children('li').remove(); $list.append(sorted_list);
}(jQuery);

/** ----------------- **/
/** Auto ban messages **/
/** ----------------- **/

var MessageBlock = {
  title: 'Your Account Has Been Blocked',
  message: 'Greetings. I am an admin for the Creepypasta Files Wiki. I am here \
  to inform you that you have been banned for a duration of $2 for the \
  following reason: $1. <br /><b>Do not attempt to evade a ban.</b> \
  Evading a ban, regardless of your intentions, is a punishable offence \
  and will likely extend your block if you have not been permanently \
  banned. If you feel like you have been blocked for an incorrect reason, \
  you may contact an administrator for guidance. If you want to discuss \
  your block, reply to this message. If you cannot reply to this message \
  , it means that your block is inevitable.',
  autocheck: Boolean
};

/** ----- **/
/** Misc. **/
/** ----- **/

if (jQuery(String("#ca-edit")).length || 
    jQuery(String("a[data-id='editprofile']")).length) {
       importWikiaScriptPages(Array(
          "external:dev:NullEditButton/code.js",
          "external:dev:EditIntroButton/code.js"
       ));
}

window.UserTagsJS = {
	modules: {},
	tags: {
		bureaucrat: { u:'Bureaucrat Tag', link:'Project:Bureaucrats', order:0 },
		sysop: {u:'Administrator Tag', link:'Project:Administrators', order:1 },
		contentmoderator: { u:'Content-Moderator Tag', link:'Project:Moderators', order:2 },
		rollback: { u:'Rollback Tag', link:'Project:Rollback', order:3 },
		inactive: { u: 'Has not edited recently', order:4 }
	}
};

UserTagsJS.modules.inactive = {
	days: 30,
	zeroIsInactive: true
	namespaces: [0, 'Talk', 'User talk', 'Forum']
	}
};

	// Locking comments (6 months or older), might be broken code
window.lockOldComments = (window.lockOldComments || {});
window.lockOldComments.limit = 182;
window.lockOldComments.addNoteAbove = true;