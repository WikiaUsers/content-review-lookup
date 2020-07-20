// ============================================================
// wikiSidething
// 
// Function: Adds a counter
// ============================================================
 
$(function() {
	if(skin == "oasis") {
		var $sidebar = $('.WikiaPagesOnWikiModule:first');
		var comboString = "<div style='margin-top:5px; align:center'><table style='width:100%'><td style='*'><a href='http://legocritics.wikia.com/wiki/Brick_Critics:Manual_of_Style'>Please view our Manual of Style</a><br /></td><td style='text-align:right'><a href='http://legocritics.wikia.com/wiki/Brick_Critics:Manual_of_Style' target='_top'><img src='https://images.wikia.nocookie.net/legocritics/images/2/23/CriticsBIGHUGEC.png' alt='Brick Critics' border=0 /></a></td></tr></table></div>";
 
		$sidebar.html($sidebar.html() + comboString);
	} else if(skin == "monobook") {
		var $sidebar = $('#p-wikicities-nav');
		var comboString = "<div style='margin:5px'></div><h5>sitemeter</h5><div class='pBody'><div style='margin-top:2px; margin-bottom:5px'><table style='width:100%; text-align:center'><tr><td style='font-size:85%'><a href='http://legocritics.wikia.com/wiki/Brick_Critics:Manual_of_Style'>Please view our Manual of Style</a><br /></td></tr><tr><td><a href='http://legocritics.wikia.com/wiki/Brick_Critics:Manual_of_Style' target='_top'><img src='https://images.wikia.nocookie.net/legocritics/images/2/23/CriticsBIGHUGEC.png' alt='Brick Critics' border=0 /></a></td></tr></table></div></div>";
		$sidebar.html($sidebar.html() + comboString);
	}
});