/* Any JavaScript here will be loaded for all users on every page load. */
 
/* Auto Refresh */
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';
window.ajaxPages = [
        'Special:WikiActivity',
        'Special:RecentChanges',
        'Special:Contributions',
        'Special:Log',
        'Special:Log/move',
        'Special:AbuseLog',
        'Special:NewFiles',
        'Special:NewPages',
        'Special:Watchlist',
        'Special:Statistics',
        'Special:ListFiles'
];

window.AddRailModule = [{prepend: false}];
 
/* UserTags from Dev Wikia */
window.UserTagsJS = {
	modules: {},
	tags: {
		bureaucrat: { u:'Wiki Kingpin', link:'w:Special:Random', linktext:'This is a test... did it work ?'},
		poweruser: { u:'Power User'}
	}
};
 
UserTagsJS.modules.inactive = 30;
UserTagsJS.modules.newuser = true;
UserTagsJS.modules.autoconfirmed = true;
UserTagsJS.modules.stopblocked = true; // Manually turn on/off
UserTagsJS.modules.mwGroups = [
    'bureaucrat',
    'content-moderator',
    'chatmoderator',
    'threadmoderator',
    'patroller',
    'rollback',
    'sysop',
    'bot',
    'bot-global',
    'blocked',
    'founder',
    'poweruser'
];
 
/* importArticles-start */
window.DisplayClockJS = {
	hoverText: 'Click here to demotivate the page... and the cache...'
};

window.SpoilerAlertJS = {
    question: 'SPOILER ALERT!',
    yes: 'Yé',
    no: 'Nay',
    fadeDelay: 1200
};
 
/*
////////////////////////////////////////////////////////
// Facebook box on every page
////////////////////////////////////////////////////////
*/
 
$(window).load(function(){
    $('#WikiaRail').append('<section class="module" id="facebookmodule"><iframe marginheight="0" marginwidth="0" src="http://www.facebook.com/connect/connect.php?id=168388583236874&amp;connections=8" align="top" frameborder="0" width="270" height="280" scrolling="no" /></section>');
});
 
/*
////////////////////////////////////////////////////////
// END Facebook box on every page
////////////////////////////////////////////////////////
*/
 
$(function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName === null) return;
    $("span.insertusername").html(wgUserName);
});