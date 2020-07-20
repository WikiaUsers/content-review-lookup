/* Any JavaScript here will be loaded for all users on every page load. */
// ============================================================
  // wikiSideheading
  // 
  // Function: Adds a counter
  // ============================================================
 
 
  $(function() {
  	if(skin == "oasis") {
  		var $sidebar = $('#RIGHT_SKYSCRAPER');
  		var comboString = "<div style='margin-top:5px; align:center'><table style='width:100%'><td style='*'><table style='width:100%; text-align:center; background:#9dd9a3'><tr><td style='font-size:85%; background:#9dd9a3'>Welcome to Currency Wiki!</a></td></tr></table></div>";
 
  		$sidebar.html($sidebar.html() + comboString);
  	} else if(skin == "monobook") {
  		var $sidebar = $('#p-wikicities-nav');
  		var comboString = "<div style='margin:5px'></div><h5>Messages</h5><div class='pBody'><div style='margin-top:2px; margin-bottom:5px'><table style='width:100%; text-align:center; background:#9dd9a3'><tr><td style='font-size:85%; background:#9dd9a3'>Currency Wiki looks better with oasis. Go to Special:Preferences to change to it.</a></td></tr></table></div></div>";
  		$sidebar.html($sidebar.html() + comboString);
  	}
  });