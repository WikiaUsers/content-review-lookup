/* Any JavaScript here will be loaded for all users on every page load. */

// ============================================================
// wikiSiteMeter
// 
// Function: Adds a counter from http://www.sitemeter.com/
// ============================================================
 
$(function() {
	if(skin == "oasis") {
		var $sidebar = $('.WikiaActivityModule h1.activity-heading, .WikiaActivityModule .WikiaRail .module h2.activity-heading, .WikiaRail .module .WikiaActivityModule h2.activity-heading, .WikiaActivityModule .WikiaRail #RIGHT_SKYSCRAPER h2.activity-heading, .WikiaRail #RIGHT_SKYSCRAPER .WikiaActivityModule h2.activity-heading');
		var comboString = "<div style='margin-top:5px; align:center'><table style='width:100%'><td style='*'><h6>Ilość wizyt od<br />30 maja 2011</h6></td><td style='text-align:right'><a href='http://s51.sitemeter.com/stats.asp?site=s51wiersze' target='_top'><img src='http://s51.sitemeter.com/meter.asp?site=s51wiersze' alt='SiteMeter' border=0 /></a></td></tr></table></div>";
 
		$sidebar.html($sidebar.html() + comboString);
	} else if(skin == "monobook") {
		var $sidebar = $('#p-tb');
		var comboString = "<div style='margin:5px'></div><h5>Licznik wizyt</h5><div class='pBody'><div style='margin-top:2px; margin-bottom:5px'><table style='width:100%; text-align:center'><tr><td style='font-size:85%'>Ilość wizyt od<br />30 maja 2011</td></tr><tr><td><a href='http://s51.sitemeter.com/stats.asp?site=s51wiersze' target='_top'><img src='http://s51.sitemeter.com/meter.asp?site=s51wiersze' alt='SiteMeter' border=0 /></a></td></tr></table></div></div>";
		$sidebar.html($sidebar.html() + comboString);
	}
});