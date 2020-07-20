// ============================================================
// wikiSiteMeter
// 
// Function: Adds a counter from http://www.sitemeter.com/
// ============================================================
 
$(function() {
	if(skin == "oasis") {
		var $sidebar = $('.WikiaPagesOnWikiModule:first');
		var comboString = "<div style='margin-top:5px; align:center'><table style='width:100%'><td style='*'>Pageviews<br /></td><td style='text-align:right'><a href='http://www.e-zeeinternet.com/'><img src='http://www.e-zeeinternet.com/count.php?page=713741&style=blushdw&nbdigits=5&reloads=1" alt="Free Hit Counter" border="0' /></a><br><a href='http://www.e-zeeinternet.com/' title="Free Hit Counter" target="_blank" style="font-family: Geneva, Arial, Helvetica, sans-serif; font-size: 10px; color: #000000; text-decoration: none;">Free Hit Counter</a></td></tr></table></div>";
 
		$sidebar.html($sidebar.html() + comboString);
	} else if(skin == "monobook") {
		var $sidebar = $('#p-wikicities-nav');
		var comboString = "<div style='margin:5px'></div><h5>sitemeter</h5><div class='pBody'><div style='margin-top:2px; margin-bottom:5px'><table style='width:100%; text-align:center'><tr><td style='font-size:85%'>Wiki Stats<br /></td></tr><tr><td><a href='http://www.e-zeeinternet.com/' target='_top'><img src='http://www.e-zeeinternet.com/count.php?page=713741&style=blushdw&nbdigits=5&reloads=1" alt="Free Hit Counter" border="0" /></a></td></tr></table></div></div>";
		$sidebar.html($sidebar.html() + comboString);
	}
});