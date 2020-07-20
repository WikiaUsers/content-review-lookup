/* Any JavaScript here will be loaded for all users on every page load. */

/* <pre> */
 
// ============================================================
// Name: chat.js
// Author: Various
// Original by: Azliq7 runescape wiki
// Original script: MediaWiki:Common.js/sitemeter.js
// Function: Advertise [[Forum:Chat Meeting Time Zones]]
// ============================================================
 
 
$(function() {
	if(skin == "oasis") {
		var $sidebar = $('.WikiaPagesOnWikiModule:first');
		var comboString = "<div style='margin-top:5px; align:center'><table style='width:100%'><td style='*'>Go to <a href='http://39clues.wikia.com/wiki/Forum:Chat_Meeting_Time_Zones'>this forum</a>to help start a meeting on <a href='http://39clues.wikia.com/wiki/Special:Chat' id='chatjs'>chat!</a><br /></td><td style='text-align:right; padding-left:5px;'></td></tr></table></div>";
 
		$sidebar.html($sidebar.html() + comboString);
	}
 
});
/* </pre> */