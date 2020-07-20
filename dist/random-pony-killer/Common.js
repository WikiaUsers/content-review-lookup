/* Any JavaScript here will be loaded for all users on every page load. */

importScriptPage('Countdown/code.js', 'dev');

importScriptPage('ShowHide/code.js', 'dev');

window.UserTagsJS = {
	modules: {},
	tags: {
		// group: { associated tag data }
		powersmith: { u:'Powersmith' }
                eggy:  { u:'Eggy' }
                dave:  { u:'Dave' }
	}
};
UserTagsJS.modules.custom = {
	'SkipperThePenguin100': ['powersmith'], // Add Powersmith
        'Eggium': ['eggy'], //Add Eggy
	'ToonLinkMinions11': ['dave'], // Add Dave
};
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});

/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */

function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
 }
 addOnloadHook(UserNameReplace);

/* End of the {{USERNAME}} replacement */

// *************************************************
// Pagetitle rewrite
//
// Rewrites the page's title, used by Template:Title
// *************************************************
 
if (wgCanonicalNamespace == "User" || wgCanonicalNamespace == "User talk") {
$(function () {
    var newTitle = $("#title-meta").html();
    if (!newTitle) return;
    var edits = $("#user_masthead_since").text();
    $(".firstHeading,#WikiaUserPagesHeader h1,#WikiaPageHeader h1").html(newTitle);
    //$(".user_masthead_head h2").html(newTitle + "<small id='user_masthead_since'>" + edits + "</small>");
});
}
importArticles({
    type: "script",
    articles: [
        "w:c:dev:Countdown/code.js"
    ]
});

var countdownTimer.translations = { 
    en: {
        and: 'and',
        second: 'second',
        seconds: 'seconds',
        minute: 'minute',
        minutes: 'minutes',
        hour: 'hour',
        hours: 'hours',
        day: 'day',
        days: 'days'
    }
};