/* Any JavaScript here will be loaded for all users on every page load. */

// UserTags
window.UserTagsJS = {
	modules: {},
	tags: {}
};
UserTagsJS.modules.inactive = 90;
UserTagsJS.modules.newuser = true;
UserTagsJS.modules.autoconfirmed = true;
// NOTE: bannedfromchat displays in Oasis but is not a user-identity group so must be checked manually
UserTagsJS.modules.mwGroups = ['bureaucrat', 'chatmoderator', 'threadmoderator', 'patroller', 'content-moderator', 'rollback', 'sysop', 'bannedfromchat', 'blocked', 'bot', 'bot-global', 'staff', 'vstf', 'helper'];
UserTagsJS.modules.metafilter = {
	sysop: ['bot'],
	chatmoderator: ['threadmoderator', 'sysop', 'bureaucrat', 'vstf', 'bot'],
	threadmoderator: ['sysop', 'bureaucrat', 'bot'],
	rollback: ['content-moderator', 'sysop', 'bureaucrat', 'founder', 'bot'],
	'content-moderator': ['sysop', 'bureaucrat', 'founder', 'bot'],
	bot: ['bot-global']
};

// AjaxRC
AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refreshes the page when new edits occur.';
ajaxPages = ["Special:RecentChanges", "Special:WikiActivity", "Special:Log", "Special:Images", "Special:Videos", "Special:Contributions", "Special:AbuseLog"];

// AjaxBatchDelete
batchDeleteDelay = 1000;

// DynamicImages
DynamicImages = {
    gifImages: true,
    gifGalleryImages: false
};

// Standard Edit Summary
// Create the "dev" namespace if it doesn't exist already:
 
window.dev = window.dev || {};
 
// Create the sub-namespace for this addon and set some options:
 
window.dev.editSummaries = {
     css: '#stdSummaries { ... }',
     select: 'MediaWiki:StandardEditSummary'
};

// BackToTopButton default settings
var Speed = 600;
var Start = 800;

// RevealAnonIP
window.RevealAnonIP = {
    permissions : ['threadmoderator', 'rollback', 'content-moderator', 'sysop', 'bureaucrat', 'staff', 'vstf', 'helper']
};

function updatetimer(i) {
    var now = new Date();
    var then = timers[i].eventdate;
    var diff = count = Math.floor((then.getTime() - now.getTime()) / 1000);
 
    // catch bad date strings
    if (isNaN(diff)) {
        timers[i].firstChild.nodeValue = '** ' + timers[i].eventdate + ' **';
        return;
    }
 
    // determine plus/minus
    if (diff < 0) {
        diff = -diff;
    }
    var tpm = ' ';
 
    // calcuate the diff
    var left = (diff % 60) + ' seconds';
    diff = Math.floor(diff / 60);
    if (diff > 0) left = (diff % 60) + ' minutes ' + left;
    diff = Math.floor(diff / 60);
    if (diff > 0) left = (diff % 24) + ' hours ' + left;
    diff = Math.floor(diff / 24);
    if (diff > 0) left = diff + ' days ' + left;
    timers[i].firstChild.nodeValue = tpm + left;
 
    // a setInterval() is more efficient, but calling setTimeout()
    // makes errors break the script rather than infinitely recurse
    timeouts[i] = setTimeout('updatetimer(' + i + ')', 1000);
}
 
$(function checktimers() {
    //hide 'nocountdown' and show 'countdown'
    var nocountdowns = getElementsByClassName(document, 'span', 'nocountdown');
    for (var i in nocountdowns) nocountdowns[i].style.display = 'none';
    var countdowns = getElementsByClassName(document, 'span', 'countdown');
    for (i in countdowns) countdowns[i].style.display = 'inline';
 
    //set up global objects timers and timeouts.
    timers = getElementsByClassName(document, 'span', 'countdowndate'); //global
    timeouts = new Array(); // generic holder for the timeouts, global
    if (timers.length === 0) return;
    for (i in timers) {
        timers[i].eventdate = new Date(timers[i].firstChild.nodeValue);
        updatetimer(i); //start it up
    }
});
 
/* Add extra classes based on category
 * @author: UltimateSupreme (http://c.wikia.com/wiki/User:UltimateSupreme)
 */
(function ($, mw) {
    function categorycheck() {
        if ($(this).text() === ("Dreamworld levels" || "Dreamworld")) {
            $(".wikia-infobox").addClass("dreamworld");
            mw.log("Category found!");
            return;
        }
    }
    if (mw.config.get("skin") === "oasis") {
        $("li.category > span.name > a").each(categorycheck);
    } else {
        $(".mw-normal-catlinks a").each(categorycheck);
    }
}(jQuery, mediaWiki));
 
 
/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */
$(function() {
    if (window.disableUsernameReplace || mw.config.get('wgUserName') === null) return;
    $('span.insertusername').html(mw.config.get('wgUserName'));
});
 
/* End of the {{USERNAME}} replacement */


/* Imports that never affect Oasis Skin (Only monobook skins) */
$(function () {
    if (skin === 'oasis' || skin === 'wikia' ) {
        /* Nothing to import */}
    else {
    importArticles({
    type: 'script',
    articles: [
        'u:dev:UTCClock/code.js',
        'u:dev:LastEdited/code.js'
    ]
});
    }
});