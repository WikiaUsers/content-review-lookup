/* <pre> */

// ============================================================
// Name: chat.js
// Author: Various
// Original by: Azliq7 runescape wiki
// Original script: MediaWiki:Common.js/sitemeter.js
// Function: Advertise Drive OT Month
// ============================================================
 
 
$(function() {
	if(skin == "oasis") {
		var $sidebar = $('.WikiaPagesOnWikiModule:first');
		var comboString = "<div style='margin-top:5px; align:center'><table style='width:100%'><td style='*'>This Month's Article Drive is: <a href='http://gnometown.wikia.com/wiki/Category:Characters'>Character Articles</a>Be sure to take part ,make suggestions and comments<br /></td><td style='text-align:right; padding-left:5px;'><a href='http://gnometown.wikia.com/wiki/Category:Characters' target='_top'><img src='https://images.wikia.nocookie.net/__cb20110823235240/gnometown/images/thumb/5/53/NeedHelpersTip.png/50px-NeedHelpersTip.png' alt='Drive of the Month' border=0 /></a></td></tr></table></div>";
 
		$sidebar.html($sidebar.html() + comboString);
	}
});

/* </pre> */