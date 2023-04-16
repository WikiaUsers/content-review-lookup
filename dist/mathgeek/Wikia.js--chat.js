// 21:24, September 9, 2011 (UTC)
 
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
		var comboString = "<div style='margin-top:5px; align:center'><table style='width:100%'><td style='*'>Welcome to Math Geek Network <a href='http://math.wikia.com/wiki/Special:Chat?useskin=oasis' id='chatjs'>Talk</a>. You can talk with the other mathematicians on the wiki!br /></td><td style='text-align:right; padding-left:5px;'><a href='http://mathgeek.wikia.com/wiki/Special:Chat?useskin=oasis' id='chatjs'><img src='https://images.wikia.nocookie.net/__cb20060602123347/tea/images/a/a9/Example.jpg' alt='Chat' border=0 height='34' width='47' /></a></td></tr></table></div>"; 
		$sidebar.html($sidebar.html() + comboString);
	}
 
        // [[User:Ohmyn0]]'s addition
        $("#chatjs").click(function() {
                window.open('/wiki/Special:Chat?useskin=oasis', 'wikiachat', 'width=600,height=600,menubar=yes,status=yes,location=yes,toolbar=yes,scrollbars=yes,resizable=yes');
 
                return false;
 
        });
 
});
 
// </source>