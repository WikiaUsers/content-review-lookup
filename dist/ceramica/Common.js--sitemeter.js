/* Any JavaScript here will be loaded for all users on every page load. */
// ============================================================
// wikiSiteMeter
// 
// Function: Adds a counter from http://www.sitemeter.com/
// ============================================================

$(function() {
	if(skin == "oasis") {
		var $sidebar = $('.WikiaPagesOnWikiModule:first');
		var comboString = "<div style='margin-top:5px; align:center'><table style='width:100%'><td style='*'>Visitas<br />desde 17 de abril de 2011</td><td style='text-align:right'><a href='http://www.sitemeter.com/?a=stats&s=s501080270' target='_top'><img src='http://s50.sitemeter.com/meter.asp?site=s501080270' alt='SiteMeter' border=0 /></a></td></tr></table></div>";
 
		$sidebar.html($sidebar.html() + comboString);
	} else if(skin == "monobook") {
		var $sidebar = $('#p-wikicities-nav');
		var comboString = "<div style='margin:5px'></div><h5>sitemeter</h5><div class='pBody'><div style='margin-top:2px; margin-bottom:5px'><table style='width:100%; text-align:center'><tr><td style='font-size:85%'>Visitas<br />Abril de 2011</td></tr><tr><td><a href='http://s50.sitemeter.com/stats.asp?site=s501080270' target='_top'><img src='http://s50.sitemeter.com/meter.asp?site=s501080270' alt='SiteMeter' border=0 /></a></td></tr></table></div></div>";
		$sidebar.html($sidebar.html() + comboString);
	}
});