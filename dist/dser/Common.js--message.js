/* Any JavaScript here will be loaded for all users on every page load. */
// ============================================================
  // wikiSidething
  // 
  // Function: Adds a counter
  // ============================================================
 
 
  $(function() {
  	if(skin == "oasis") {
  		var $sidebar = $('.WikiaPagesOnWikiModule:first');
  		var comboString = "<div style='margin-top:5px; align:center'><table style='width:100%'><td style='*'><poll><b>Is this a successful test?</b>
Yes
No
</poll>
</a></td></tr></table></div>";
 
  		$sidebar.html($sidebar.html() + comboString);
  	} else if(skin == "monobook") {
  		var $sidebar = $('#p-wikicities-nav');
  		var comboString = "<div style='margin:5px'></div><h5>Messages</h5><div class='pBody'><div style='margin-top:2px; margin-bottom:5px'><table style='width:100%; text-align:center'><tr><td style='font-size:85%'></a></td></tr></table></div></div>";
  		$sidebar.html($sidebar.html() + comboString);
  	}
  });