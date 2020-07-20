/* ANY JAVASCRIPT HERE WILL BE LOADED FOR ALL USERS ON EVERY PAGE LOAD */
      
importArticles({
   type: 'script',
   articles: [
      "u:dev:MediaWiki:AjaxRC/code.js", /* Ajax refresh */
      "u:dev:MediaWiki:InactiveUsers/code.js", /* Inactive users label */
      "u:dev:MediaWiki:FixWantedFiles/code.js", /* Fix red links to files */
      "u:dev:MediaWiki:DupImageList/code.js", /* Duplicate image list */
      "u:dev:MediaWiki:ReferencePopups/code.js", /* Reference popups */
      "u:dev:MediaWiki:Countdown/code.js", /* Countdown timer */
      "u:dev:MediaWiki:WallGreetingButton/code.js", /* Message Wall greeting button */
      "u:dev:MediaWiki:BackToTopButton/code.js", /* "Back to top" button */
      "u:dev:MediaWiki:RailWAM/code.js", /* WAM display on rail */
      "u:dev:MediaWiki:DiscussionsRailModule/code.js", /* DiscussionsRailModule */
      "u:dev:MediaWiki:PurgeButton/code.js", /* Purge button */
      "u:dev:MediaWiki:ModernProfile/EditButton.js", /* ModernProfiles */
      "u:avatar:MediaWiki:Common.js/icons.js", /* Add icons to page header bottom border */
      "MediaWiki:Common.js/MessageWallUserTags.js", /* User tags on forum threads */
      "MediaWiki:Common.js/userRightsIcons.js", /* Custom user profile icons */
      "MediaWiki:Common.js/Stdsummaries.js", /* Summary filler */
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
    glow: false,
    glowSize: '15px',
    glowColor: '#f77',
    users: {
        'Spottedstar': 'ADMINISTRATOR'
    }
};

/* '"Back to top" button' variables */
window.BackToTopModern = true;

/* 'RailWAM' variables */
window.railWAM = {
    logPage:"Project:WAM Log"
};

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

/* Wiki message pop-up box
 * Obtained from Wikia Developers Wiki @ w:c:dev:WikiaNotification
 * STATUS: INACTIVE as of June 18, 2015
var WikiaNotificationMessage = "We have a special announcement to our community regarding the recently released Chinese teaser trailer for Kung Fu Panda 3. Please read through our new procedures to help us keep our wiki spoiler-free. Thanks!<br /><br /><a href='/wiki/Thread:23352'>View announcement</a>";
var WikiaNotificationexpiry = 5;
importScriptPage('WikiaNotification/code.js', 'dev');
 */