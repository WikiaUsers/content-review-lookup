/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */
$(function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName === null) return;
    $("span.insertusername").html(wgUserName);
});
/* End of the {{USERNAME}} replacement */
 

/* Test if an element has a certain class **************************************
 *
 * Description: Uses regular expressions and caching for better performance.
 * Taken from Wikipedia's Common.js.
 */
 
var hasClass = (function() {
    var reCache = {};
    return function(element, className) {
        return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
    };
})();

/**
 * Floating TOC script from Wowwiki
 */
 importArticles({
    type: 'script',
    articles: [
        'u:wowwiki:FloatingToc/code.js'
    ]
});
 
/**** Category buttons ****/
if ($("#CategorySelectAdd").hasClass("wikia-button secondary add")) {
    $("#CategorySelectAdd").addClass("wds-is-squished wds-button");
    $("#CategorySelectCancel").addClass("wds-is-squished wds-button");
    $("#CategorySelectSave").addClass("wds-is-squished wds-button");
}
if ($('.categories').children('li').length >= 56) {
    document.getElementById('articleCategories').style.backgroundSize = "190%"; 
}

/**** UserTags ****/
window.UserTagsJS = {
	modules: {},
	tags: {
	    sysop: { u: 'Elder Moderator'},
        'content-moderator': { u:'Moderator'},
        chatmoderator: { u:'Moderator'},
        threadmoderator: { u:'Moderator'},
        blocked: {u:'Crashed'}
        }
};
 
UserTagsJS.modules.inactive = 30;
UserTagsJS.modules.newuser = true;
UserTagsJS.modules.autoconfirmed = true;
UserTagsJS.modules.mwGroups = [
    'bureaucrat',
    'chatmoderator',
    'patroller',
    'rollback',
    'sysop',
    'bannedfromchat',
    'bot',
    'bot-global'
];

UserTagsJS.modules.custom = {
	'Parkour2906': ['founder', 'bureaucrat'],
	'GD Protostar': ['bureaucrat'],
	'God-Serena17': ['bureaucrat']
};

/**** Less ****/
/** Wikia.css **/
window.lessOpts = window.lessOpts || [];
window.lessOpts.push( {
    target: 'MediaWiki:Wikia.css',
    source: 'MediaWiki:Custom-wikia.less',
    load: [
        'MediaWiki:Wikia.css',
        'MediaWiki:Custom-wikia.less'
    ],
    header: 'MediaWiki:Custom-Css-header/common'
} );
 
//DiscussionsRailModule
window.discussionsModuleLoaded = mw.config.get('wgCanonicalSpecialPageName') === 'WikiActivity';