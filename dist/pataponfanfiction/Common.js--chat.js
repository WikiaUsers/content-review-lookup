/* <pre> */

// ============================================================
// Name: chat.js
// Original script: MediaWiki:Common.js/sitemeter.js
// Function: Advertise [[Special:Chat]]
// ============================================================
 
 
$(function() {
	if(skin == "oasis") {
		var $sidebar = $('.WikiaPagesOnWikiModule:first');
		var comboString = "<div style='margin-top:5px; align:center'><table style='width:100%'><td style='*'>You can now <a href='http://pataponfanfiction.wikia.com/wiki/Special:Chat' id='chatjs'>chat</a>with other editors! Feel free to stop by and try it out.<br /></td><td style='text-align:right; padding-left:5px;'><a href='http://pataponfanfiction.wikia.com/wiki/Special:Chat' id='chatjs'><img src='https://images.wikia.nocookie.net/patapon/images/d/d8/Character.png' alt='Chat' border=0 /></a></td></tr></table></div>";
 
		$sidebar.html($sidebar.html() + comboString);
	}

        // [[User:Rottenlee Ravenous]]'s addition
        $("#chatjs").click(function() {
                window.open('/wiki/Special:Chat', 'wikiachat', 'width=600,height=600,menubar=no,status=no,location=no,toolbar=no,scrollbars=no,resizable=yes');

                return false;

        });

});

/* </pre> */