/* Any JavaScript here will be loaded for all users on every page load. */

// *****************
// Template:Username
// *****************
 
$(document).ready(function(){
  if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace === null || wgUserName === null) {return;}
  $(".insertusername").each(function(){
    $(this).html(wgUserName);
  });
});
 
importArticle({type:'script', article:'w:c:dev:UserBadges/code.js'});

importScriptPage('ShowHide/code.js', 'dev');
 
window.UserBadgesJS = {
	inactive: 30, // Inactive if no edits in this many days, 365=Enabled
	gone: {}, // List of users who have formally left but it hasn't been 'inactive' days yet
	groups: { bureaucrat:0, patroller:0, rollback:0, chatmoderator:1 },
	stopBlocked: true, // Don't display any non-custom badges for blocked users
	newusers: true, // Tag non-autoconfirmed users (MW1.19 only)
	nonusers: true, // Tag global Wikia accounts that have never edited anything
	custom: { '900bv': ['The Dark Soul'], 'TheAmazingBBP': ['ITS A WELL'], 'PraYer;-;7': ['The Anarchist'], 'DeadRaiser': ['Game Over'], 'Section': ['Not Good at Rping' , 'Doesnt do shit'], 'My Wunderwaffle iz missin': ['The Old One'], 'Hk 4sixteen': ['Not Good at Rping' , 'Wrong about pretty much everything']  },
	names: {} // Badge display names
}

// Countdown
importArticles({
    type: "script",
    articles: [
        "w:c:dev:Countdown/code.js"
    ]
});

$(function () {
    // Enable collapsible behavior
    $(".mw-collapsible").each(function () {
        var $collapsible = $(this);
        if ($collapsible.hasClass("mw-collapsed")) {
            $collapsible.find(".mw-collapsible-content").hide();
        }
        $collapsible.find(".mw-collapsible-header").click(function () {
            $collapsible.find(".mw-collapsible-content").toggle();
        });
    });
});

$(function () {
    $(".mw-collapsible .mw-collapsible-header").click(function() {
        var content = $(this).next();
        content.toggle();  // Toggle visibility
        $(this).parent().toggleClass("mw-collapsed"); // Toggle the collapsed class
    });
});