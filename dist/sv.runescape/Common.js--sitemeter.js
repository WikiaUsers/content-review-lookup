// ============================================================
// wikiSiteMeter
// 
// Function: Adds a counter from http://www.sitemeter.com/
// ============================================================

$(function() {
	if(skin == "oasis") {
		var $sidebar = $('.WikiaPagesOnWikiModule:first');
		var comboString = "<div style='margin-top:5px; align:center'><table style='width:100%'><td style='*'>PAGEVIEWS<br />SINCE JANUARY 2011</td><td style='text-align:right'><a href='http://sm6.sitemeter.com/stats.asp?site=sm6runescapewiki' target='_top'><img src='http://sm6.sitemeter.com/meter.asp?site=sm6runescapewiki' alt='SiteMeter' border=0 /></a></td></tr></table></div>";
 
		$sidebar.html($sidebar.html() + comboString);
	} else if(skin == "monobook") {
		var $sidebar = $('#p-wikicities-nav');
		var comboString = "<div style='margin:5px'></div><h5>sitemeter</h5><div class='pBody'><div style='margin-top:2px; margin-bottom:5px'><table style='width:100%; text-align:center'><tr><td style='font-size:85%'>Pageviews since<br />January 2011</td></tr><tr><td><a href='http://sm6.sitemeter.com/stats.asp?site=sm6runescapewiki' target='_top'><img src='http://sm6.sitemeter.com/meter.asp?site=sm6runescapewiki' alt='SiteMeter' border=0 /></a></td></tr></table></div></div>";
		$sidebar.html($sidebar.html() + comboString);
	}
});