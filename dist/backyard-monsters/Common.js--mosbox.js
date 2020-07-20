 // ============================================================
 // wikiSidething
 // from Brickipedia
 // Function: Adds a new sidebar element 
 // ============================================================
  
  
 $(function() {
 	if(skin == "oasis") {
 		var $sidebar = $('.WikiaPagesOnWikiModule:first');
		var comboString = "<div id='mosbox' style='margin-top:5px; align:center'><table style='width:100%'><td style='*'>Hello Users! Remember, this Wiki relies on Info from the Kixeye Forums and the Almighty Drullkus Alpha.<br /></td><td style='text-align:right'><a href='http://backyard-monsters.wikia.com/wiki/Special:Leaderboard' target='_top'><img src='https://images.wikia.nocookie.net/__cb20111113060842/backyard-monsters/images/thumb/7/7c/Bandito.png/125px-Bandito.png' alt='The only game on this wiki that has Rassilon's Great Seal of Approval' border=0 /></a></td></tr></table></div>";
  
 		$sidebar.html($sidebar.html() + comboString);
 	} else if(skin == "monobook") {
 		var $sidebar = $('#p-wikicities-nav');
 		var comboString = "<div id='mosbox' style='margin-top:5px; align:center'><table style='width:100%'><td style='*'>Hello Users! Remember, this Wiki relies on Info from the Kixeye Forums and the Almighty Drullkus Alpha.<br /></td><td style='text-align:right'><a href='http://tardis.wikia.com/wiki/Special:Leaderboard' target='_top'><img src='https://images.wikia.nocookie.net/__cb20111113060842/backyard-monsters/images/thumb/7/7c/Bandito.png/125px-Bandito.png' alt='The only game on this wiki that has Rassilon's Great Seal of Approval' border=0 /></a></td></tr></table></div>";
 	}
 })