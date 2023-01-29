/* <pre> */
 
// ============================================================
// Name: chat.js
// Author: Various
// Original by: Azliq7
// Original script: MediaWiki:Common.js/sitemeter.js
// Function: Advertise [[Special:Chat]]
// ============================================================
 
 
$(function() {
	if(skin == "oasis") {
		var $sidebar = $('.WikiaPagesOnWikiModule:first');
		var comboString = "<div style='margin-top:5px; align:center'><table style='width:100%'><td style='*'>You can now <a href='http://buckstest.wikia.com/wiki/Special:Chat' id='chatjs'>chat</a>with other editors! Feel free to stop by and try it out.<br /></td><td style='text-align:right; padding-left:5px;'><a href='http://buckstest.wikia.com/wiki/Special:Chat' id='chatjs'><img src='https://images.wikia.nocookie.net/__cb20101110015943/runescape/images/7/7e/Windows_client_icon.png' alt='Chat' border=0 /></a></td></tr></table></div>";
 
		$sidebar.html($sidebar.html() + comboString);
	}
 
        // [[User:Ohmyn0]]'s addition
        $("#chatjs").click(function() {
                window.open('/wiki/Special:Chat', 'wikiachat', 'width=600,height=600,menubar=no,status=no,location=no,toolbar=no,scrollbars=no,resizable=yes');
 
                return false;
 
        });
 
});
 
/* </pre> */