/* Any JavaScript here will be loaded for all users on every page load. */
// ============================================================
  // wikiSidething
  // 
  // Function: Adds a counter
  // ============================================================
   
  
  $(function() {
  	if(skin == "oasis") {
  		var $sidebar = $('.WikiaPagesOnWikiModule:first');
  		var comboString = "<div style='margin-top:5px; align:center'><table style='width:100%'><td style='*'>Welcome to the Ben 10 Wiki, edit a lot and have fun!</a></td></tr></table></div>";
   
  		$sidebar.html($sidebar.html() + comboString);
  	} else if(skin == "monobook") {
  		var $sidebar = $('#p-wikicities-nav');
  		var comboString = "<div style='margin:5px'></div><h5>A few Notes</h5><div class='pBody'><div style='margin-top:2px; margin-bottom:5px'><table style='width:100%; text-align:center'><tr><td style='font-size:85%'>Welcome to the Ben 10 Wiki, edit a lot and have fun!.</a></td></tr></table></div></div>";
  		$sidebar.html($sidebar.html() + comboString);
  	}
  });