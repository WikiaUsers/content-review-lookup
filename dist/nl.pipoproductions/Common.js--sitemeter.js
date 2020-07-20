// ============================================================
// wikiSiteMeter
// 
// Function: Adds a counter from http://www.sitemeter.com/
// ============================================================
 
$(function() {
	if(skin == "oasis") {
		var $sidebar = $('.WikiaPagesOnWikiModule:first');
		var comboString = "<div style='margin-top:5px; align:center'><table style='width:100%'><td style='*'>Aantal Pagevieuws</td><td style='text-align:right'><iframe marginwidth="0px" marginheight="0px" scrolling="no" frameborder="0" height="370" width="722"  src="http://www.quantcast.com/profile/embed?img=http%3A//www.quantcast.com/profile/trafficGraph%3Fwunit%3Dwd%253Acom.wikia.avatar.nl%26drg%3D%26dty%3Dpp%26gl%3D6mo%26reachType%3Dperiod%26dtr%3Ddd%26width%3D722%26country%3DUK%26ggt%3Dlarge%26showDeleteButtons%3Dtrue&w=722&h=370&showDeleteButtons=false&wunit=Charts.Traffic.FrequencyGraph.8bG6eLqkH6Avk"></iframe></td></tr></table></div>";
 
		$sidebar.html($sidebar.html() + comboString);
	} else if(skin == "monobook") {
		var $sidebar = $('#p-wikicities-nav');
		var comboString = "<div style='margin:5px'></div><h5>sitemeter</h5><div class='pBody'><div style='margin-top:2px; margin-bottom:5px'><table style='width:100%; text-align:center'><tr><td style='font-size:85%'>Aantal Pageviews</td></tr><tr><td><iframe marginwidth="0px" marginheight="0px" scrolling="no" frameborder="0" height="370" width="722"  src="http://www.quantcast.com/profile/embed?img=http%3A//www.quantcast.com/profile/trafficGraph%3Fwunit%3Dwd%253Acom.wikia.avatar.nl%26drg%3D%26dty%3Dpp%26gl%3D6mo%26reachType%3Dperiod%26dtr%3Ddd%26width%3D722%26country%3DUK%26ggt%3Dlarge%26showDeleteButtons%3Dtrue&w=722&h=370&showDeleteButtons=false&wunit=Charts.Traffic.FrequencyGraph.8bG6eLqkH6Avk"></iframe></td></tr></table></div></div>";
		$sidebar.html($sidebar.html() + comboString);
	}
});