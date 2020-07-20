// ============================================================
// wikiSidething
// 
// Function: Adds a counter
// ============================================================
 

$(function() {
	if(skin == "oasis") {
		var $sidebar = $('.WikiaPagesOnWikiModule:first');
		var comboString = "<div style='margin-top:5px; border-top:1px solid black; align:center'><table style='width:100%'><td style='*'>Participate on daily tasks in our <a href='http://songpedia.wikia.com/wiki/Ideas:To Do List'>To-Do List!</a></td></tr></table></div>";
 
		$sidebar.html($sidebar.html() + comboString);
	} else if(skin == "monobook") {
		var $sidebar = $('#p-wikicities-nav');
		var comboString = "<div style='margin:5px'></div><h5>Featured Contents</h5><div class='pBody'><div style='margin-top:2px; margin-bottom:5px'>Queen are a british rock bnad formed in london in 1971.<a href='http://songpedia.wikia.com/wiki/Queen'>(Read more...)</a><table style='width:100%; text-align:center'><tr><td style='font-size:85%'></td></tr></table></div></div>";
		$sidebar.html($sidebar.html() + comboString);
	}
});