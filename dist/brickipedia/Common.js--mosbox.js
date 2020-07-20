// ============================================================
// wikiSidething
// 
// Function: Adds a counter
// ============================================================
 

$(function() {
	if(skin == "oasis") {
		var $sidebar = $('.WikiaPagesOnWikiModule:first');
		var comboString = "<div id='mosbox' style='margin-top:5px; align:center'><table style='width:100%'><td style='*'>You can now <a href='http://lego.wikia.com/wiki/Special:Chat'>chat</a>with other editors! Feel free to stop by and try it out.<br /></td><td style='text-align:right'><a href='http://lego.wikia.com/wiki/Special:Chat' target='_top'><img src='https://images.wikia.nocookie.net/mylegonetwork/images/2/2c/MLNredbrick.PNG' alt='Brick' border=0 /></a></td></tr></table></div>";
 
		$sidebar.html($sidebar.html() + comboString);
	}
});