// ============================================================
// wikiSidething
// 
// Function: Adds a counter
// ============================================================
 

$(function() {
	if(skin == "oasis") {
		var $sidebar = $('.WikiaPagesOnWikiModule:first');
		var comboString = "<div id='mosbox' style='margin-top:5px; align:center'><table style='width:100%'><td style='*'>You can now <a href='http://legocritics.wikia.com/wiki/Special:Chat'>chat</a>with other editors! Feel free to stop by and try it out.<br /></td><td style='text-align:right'><a href='http://legocritics.wikia.com/wiki/Special:Chat' target='_top'><img src='https://images.wikia.nocookie.net/mylegonetwork/images/2/2c/MLNredbrick.PNG' alt='Brick' border=0 /></a></td></tr></table></div>";
 
		$sidebar.html($sidebar.html() + comboString);
	} else if(skin == "monobook") {
		var $sidebar = $('#p-wikicities-nav');
		var comboString = "<div id='mosbox' style='margin:5px'></div><h5>A few Notes</h5><div class='pBody'><div style='margin-top:2px; margin-bottom:5px'><table style='width:100%; text-align:center'><tr><td style='font-size:85%'>Go on the new <a href='http://legocritics.wikia.com/wiki/Special:Chat?useskin=wikia'>Chat.</a><br /></td></tr><tr><td><a href='http://legocritics.wikia.com/wiki/Special:Chat?useskin=wikia' target='_top'><img src='https://images.wikia.nocookie.net/mylegonetwork/images/2/2c/MLNredbrick.PNG' alt='Brick' border=0 /></a></td></tr></table></div></div>";
		$sidebar.html($sidebar.html() + comboString);
	}
});