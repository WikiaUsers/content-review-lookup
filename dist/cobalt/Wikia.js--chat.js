// <source lang="JavaScript">
 
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
		var comboString = "<div style='margin-top:5px; align:center'><table style='width:100%'><td style='*'>You can now <a href='http://terraria.wikia.com/wiki/Special:Chat?useskin=oasis' id='chatjs'>chat</a>with other editors! Feel free to stop by and try it out.<br /></td><td style='text-align:right; padding-left:5px;'><a href='http://cobalt.wikia.com/wiki/Special:Chat?useskin=oasis' id='chatjs'><img src='' alt='Chat' border=0 /></a></td></tr></table></div>"; 
		$sidebar.html($sidebar.html() + comboString);
	}
 
        // [[User:Ohmyn0]]'s addition
        $("#chatjs").click(function() {
                window.open('/wiki/Special:Chat?useskin=oasis', 'wikiachat', 'width=600,height=600,menubar=no,status=no,location=no,toolbar=no,scrollbars=no,resizable=yes');
 
                return false;
 
        });
 
});
 
// </source>