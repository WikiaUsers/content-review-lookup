/* ANY JAVASCRIPT HERE WILL BE LOADED FOR ALL USERS ON EVERY PAGE LOAD */

importArticles({
   type: "script",
   articles: [
      "w:dev:ShowHide/code.js", /* Show/Hide function */
      "w:dev:InactiveUsers/code.js", /* Inactive users label */
      "w:dev:FixWantedFiles/code.js", /* Fix red links to files */
      "w:dev:DisableArchiveEdit/code.js", /* Disable talk page archive editing */
      "w:dev:DupImageList/code.js", /* Duplicate image list */
      "w:c:dev:ReferencePopups/code.js", /* Reference popups */
      "w:runescape:MediaWiki:Common.js/countdowntimer.js", /* Countdown timer */
      "w:c:runescape:MediaWiki:Common.js/preload.js", /* Template preloads */
      "w:deadisland:User:Jgjake2/js/DISPLAYTITLE.js", /* DisplayTitle function */
      "MediaWiki:Common.js/PurgeButton.js", /* "Purge" button */
      "MediaWiki:Common.js/DisplayTimer.js", /* Display wiki header clock */
      "MediaWiki:Common.js/BackToTopButton.js", /* "Back to top" button */
      "MediaWikI:Common.js/userRightsIcons.js", /* Custom user profile icons */
      "MediaWiki:Common.js/AddNavLinks.js", /* Add "About Us" link to "On the Wiki" menu */
      "MediaWiki:Common.js/Stdsummaries.js", /* Summary filler */
      "MediaWiki:Chat-headline", /* Custom chat headline */
    ]
});

/* Ajax refresh script + variables */
importScriptPage('AjaxRC/code.js', 'dev');
ajaxPages = ["Special:RecentChanges", "Special:WikiActivity", "Special:WikiActivity/activity", "Special:WikiActivity/watchlist", "Special:Log", "Special:Contributions", "Special:NewFiles", "Special:Statistics", "Special:NewPages", "Special:ListFiles"];
AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refreshes the page';

/* Inactive users list */
InactiveUsers = { 
   days: 30,
   gone: ['Bigmanrob'],
};

/* Chat variables
 * Modifications by User:Spottedstar @ w:c:kungfupanda:User:Spottedstar
 */
function changeChatDesc() {
try {
if ($('section.ChatModule').size() > 0 && $('p.chat-name').html() != chatDesc){
$('p.chat-name').html(''+chatDesc+'');
setTimeout("changeChatDesc()", 200);
}
 
}catch (err){
setTimeout("changeChatDesc()", 200);
}
};
 
$(document).ready(function (){changeChatDesc()});

/* Automatic filler for the summary field in upload form
 * Obtained from Avatar Wiki @ w:c:avatar:MediaWiki:Imagebox.js
 * Original code by User:Xiao Qiao @ w:c:avatar:User:Xiao Qiao
 * Modifications by User:Spottedstar @ w:c:kungfupanda:User:Spottedstar
 */
if ( wgCanonicalSpecialPageName == "Upload" ) {
	document.write('<script type="text/javascript" src="/index.php?title=MediaWiki:Filesummary.js&action=raw&ctype=text/javascript&dontcountme=s"></script>');
}
 
if ( wgCanonicalSpecialPageName == "MultipleUpload" ) {
	document.write('<script type="text/javascript" src="/index.php?title=MediaWiki:Filesummary.js&action=raw&ctype=text/javascript&dontcountme=s"></script>');
}

/* Share buttons on blogs
 * Originally obtained from Avatar Wiki @ w:c:avatar:MediaWiki:Common.js
 * Original code by The 888th Avatar @ w:c:avatar:User:The 888th Avatar
 * Additions and modifications by Spottedstar @ w:c:kungfupanda:User:Spottedstar
 */
function BlogLike() {
	if (wgCanonicalNamespace == 'User_blog') {
		$('#WikiaUserPagesHeader .author-details').prepend('<div style="float:right;"><table><tr><td><a class="addthis_button_facebook_like" fb:like:layout="box_count"></a></td><td><a class="addthis_button_tweet" tw:count="vertical" tw:via="KFPWikiOfficial" tw:related="KungFuPanda" tw:text="Check this out:"></a></td><td><a class="addthis_button_google_plusone" g:plusone:size="tall"></a></td><td><a class="addthis_counter"></a></td></tr></table></div>');
	}
}
addOnloadHook(BlogLike);

importScriptURI('http://apis.google.com/js/plusone.js');

$(window).load(function() {
    $('#SharingToolbar').prepend('<div class="g-plusone" data-size="tall"></div>');
});

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