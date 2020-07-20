// ============================================================
// wikiSiteMeter
// 
// Function: Adds a counter from http://www.sitemeter.com/
// ============================================================
 
$(function() {
	if(skin == "oasis") {
		var $sidebar = $('.WikiaPagesOnWikiModule:first');
		var comboString = "<div style='margin-top:5px; align:left'><table style='width:100%'><td style='text-align:left'><a href='http://s51.sitemeter.com/stats.asp?site=s51Orderandchaosonline' target='_top'><img src='http://s51.sitemeter.com/meter.asp?site=s51Orderandchaosonline' alt='SiteMeter' border=0 /></a>VISITORS SINCE MAY 2011<br /></td></tr></table></div>";
 
		$sidebar.html($sidebar.html() + comboString);
	} else if(skin == "monobook") {
		var $sidebar = $('#p-wikicities-nav');
		var comboString = "<div style='margin:5px'></div><h5>sitemeter</h5><div class='pBody'><div style='margin-top:2px; margin-bottom:5px'><table style='width:100%; text-align:center'><tr><td style='font-size:85%'>Visitors<br />Since May 2011</td></tr><tr><td><a href='http://s51.sitemeter.com/stats.asp?site=s51Orderandchaosonline' target='_top'><img src='http://s51.sitemeter.com/meter.asp?site=s51Orderandchaosonline' alt='SiteMeter' border=0 /></a></td></tr></table></div></div>";
		$sidebar.html($sidebar.html() + comboString);
	}
});