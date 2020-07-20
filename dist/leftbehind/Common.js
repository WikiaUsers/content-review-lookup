/* Any JavaScript here will be loaded for all users on every page load. */

/* ANY JAVASCRIPT HERE WILL BE LOADED FOR ALL USERS ON EVERY PAGE LOAD */
      
importArticles({
   type: 'script',
   articles: [
      "u:dev:AjaxRC/code.js", /* Ajax refresh */
      "u:dev:ShowHide/code.js", /* Show/Hide function */
      "u:dev:InactiveUsers/code.js", /* Inactive users label */
      "u:dev:FixWantedFiles/code.js", /* Fix red links to files */
      "u:dev:DupImageList/code.js", /* Duplicate image list */
      "u:dev:ReferencePopups/code.js", /* Reference popups */
      "u:dev:Countdown/code.js", /* Countdown timer */
      "u:dev:MessageWallUserTags/code.js", /* User tags on forum threads */
      "u:dev:WallGreetingButton/code.js", /* Message Wall greeting button */
      "u:dev:BackToTopButton/code.js", /* "Back to top" button */
      "u:dev:DisplayClock/code.js", /* Display clock in wiki header */
      "u:runescape:MediaWiki:Common.js/preload.js", /* Template preloads */
      "u:deadisland:User:Jgjake2/js/DISPLAYTITLE.js", /* DisplayTitle function */
      "u:scripts:Content/SpoilersToggle.js", /* Spoilers by User:Tierre; from Dragon Age Wiki @ w:c:dragonage:Help:Spoilers */
      "MediaWiki:Common.js/PurgeButton.js", /* "Purge" button */
      "MediaWiki:Common.js/userRightsIcons.js", /* Custom user profile icons */
      "MediaWiki:Common.js/Stdsummaries.js", /* Summary filler */
      "MediaWiki:GooglePlus.js", /* Google+ config */
      "MediaWiki:Common.js/slider.js" /* "Slider" header for main page */
    ]
});

/* 'Ajax refresh' variables */
ajaxPages = ["Special:RecentChanges", "Special:WikiActivity", "Special:WikiActivity/activity", "Special:WikiActivity/watchlist", "Special:Log", "Special:Contributions", "Special:NewFiles", "Special:Statistics", "Special:NewPages", "Special:ListFiles"];
AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refreshes the page';

/* 'User tags' variables */
window.MessageWallUserTags = {
    tagColor: 'red',
    glow: true,
    glowSize: '15px',
    glowColor: '#f77',
    users: {
        'Spottedstar': 'Administrator',
        'VaporMist': 'Administrator',
        'Zaralith': 'Administrator',
        'HopelessCreator': 'Rollback',
        'Yuzura': 'Rollback',
        'Wraithldr13': 'Chat Mod',
        'Spaza': 'Chat Mod'
    }
};

/* '"Back to top" button' variables */
var Speed = 600;
var Start = 600;
var ToggleFading = 0;

/* 'Page spoiler marker' variables */
SpoilerAlert = {
  'class': "spoiler",
};
importArticles({
    type: "script",
    articles: [
        "MediaWiki:Common.js/SpoilerAlertV2.js"
    ]
});

/* 'Display clock' variables */
window.DisplayClockJS = '%2I:%2M:%2S %p %2d %{January;February;March;April;May;June;July;August;September;October;November;December}m %Y (UTC)';

/* Inactive users list */
InactiveUsers = { 
   days: 30,
   gone: ['Bigmanrob'],
};

/* Automatic filler for the summary field in upload form
 * Obtained from Avatar Wiki @ w:c:avatar:MediaWiki:Imagebox.js
 * Original code by Xiao Qiao @ w:c:avatar:User:Xiao Qiao
 * Modifications by Spottedstar @ w:c:kungfupanda:User:Spottedstar
 */
if ( wgCanonicalSpecialPageName == "Upload" ) {
	document.write('<script type="text/javascript" src="/index.php?title=MediaWiki:Filesummary.js&action=raw&ctype=text/javascript&dontcountme=s"></script>');
}
 
if ( wgCanonicalSpecialPageName == "MultipleUpload" ) {
	document.write('<script type="text/javascript" src="/index.php?title=MediaWiki:Filesummary.js&action=raw&ctype=text/javascript&dontcountme=s"></script>');
}

/* Add icons to page header bottom border
 * Obtained from Avatar Wiki @ w:c:avatar:MediaWiki:Common.js
 * Code by The 888th Avatar @ w:c:avatar:User:The 888th Avatar
 */
$(document).ready(function() {
	if (skin == "oasis" || skin == "wikia") {
		$('.WikiaPageHeader').append($('#icons'));
		$('#icons').css({'position' : 'absolute', 'right' : '0', 'bottom' : '-1.2em'});
	}
});

/* Add link to the Kung Fu Panda Answers Wiki on the bottom toolbar
 * Obtained from Pacific Rim Wiki @ w:c:pacificrim:MediaWiki:Common.js
 */
//test
$('ul.tools li:first-child').after('<li><a href="http://www.leftbehind.com/">View the Official Site</a></li>');

/* Custom chat headline */
if ($('section.ChatModule').length > 0){
	$.get("/wiki/MediaWiki:Chat-headline?action=raw", function(result){
		if ($('p.chat-name').length > 0){
			$('p.chat-name').html(result);
		}else{
			var chatDescInt = setInterval(function() {
				if ($('p.chat-name').length > 0){
					$('p.chat-name').html(result);
					clearInterval(chatDescInt);
				}
			}, 50);
		}
	});
}

/* Refresh homepage "Quotes" content
 * Obtained from Wikia Community Forums @ w:c:community
 * Written by User:Cafeinlove
 */
$(function(){
	$('.refresh').click(function(){
		var source = "Template:Featured_Quote";
		var container = $("#quotes");
 
		$.ajax({url: "http://kungfupanda.wikia.com/wiki/" + source + "?action=render"})
			.done(function(data) {
				container.html(data);
		});
	});
});

/* Embed Twitter tweets */
window.twttr = (function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0],
    t = window.twttr || {};
  if (d.getElementById(id)) return t;
  js = d.createElement(s);
  js.id = id;
  js.src = "https://platform.twitter.com/widgets.js";
  fjs.parentNode.insertBefore(js, fjs);
 
  t._e = [];
  t.ready = function(f) {
    t._e.push(f);
  };
 
  return t;
}(document, "script", "twitter-wjs"));

var WikiaNotificationMessage = "<a href='/wiki/Category:Policy'>Please view the Left Behind Wiki's policies. By continuing to use this wiki, you agree to our policies' terms.</a>";
var WikiaNotificationexpiry = 10000;
importScriptPage('WikiaNotification/code.js', 'dev');