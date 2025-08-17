// ============================================================
// wikiSidething
// from Brickipedia
// Function: Adds a new sidebar element 
// ============================================================
 
 
		$sidebar.html($sidebar.html() + comboString);
	} else if(skin == "monobook") {
		var $sidebar = $('#p-wikicities-nav');
		var comboString = "<div id='mosbox' style='margin:5px'><h5>A few Notes</h5><div style='margin-top:5px; margin-bottom:5px;background-color:#ececec'><table style='width:100%'><td style='*'><a href='http://tardis.wikia.com/wiki/Game of Rassilon'><strong>The Game of Rassilon</strong></a> isn't available in this skin, but you <a href='http://tardis.wikia.com/wiki/Special:Leaderboard?useskin=wikia'>can check your score without leaving Monobook.</a><hr> Also, you can <strong>join the chat</strong> by <a href='http://tardis.wikia.com/wiki/Special:Chat?useskin=wikia'>clicking here.</a></a></td></table></div></div>";
		$sidebar.html($sidebar.html() + comboString);
	}
});