/* Any JavaScript here will be loaded for all users on every page load. */

// ============================================================
// wikiStatCounter
// 
// Function: Adds a counter from http://statcounter.com/
// ============================================================
 
$(function() {
	if(skin == "oasis") {
		var $sidebar = $('.WikiaRail');
		var comboString = "<div style='margin-top:5px; align:center'><table style='width:100%'><td style='*'><h4>Ilość wizyt od 17 lipca 2012:</h4></td><td style='text-align:right'><a href='http://statcounter.com/p8447316/summary/?guest=1' target='_top'><img src='https://c.statcounter.com/8447316/0/b325be35/0/' alt='StatCounter' border=0 /></a></td></tr></table></div>";
 
		$sidebar.html($sidebar.html() + comboString);
	} else if(skin == "monobook") {
		var $sidebar = $('#p-tb');
		var comboString = "<div style='margin:5px'></div><h5>licznik wizyt</h5><div class='pBody'><div style='margin-top:2px; margin-bottom:5px'><table style='width:100%; text-align:center'><tr><td style='font-size:85%'>Ilość wizyt od<br />17 lipca 2012</td></tr><tr><td><a href='http://statcounter.com/p8447316/summary/?guest=1' target='_top'><img src='https://c.statcounter.com/8447316/0/b325be35/0/' alt='StatCounter' border=0 /></a></td></tr></table></div></div>";
		$sidebar.html($sidebar.html() + comboString);
	}
});