/* Any JavaScript here will be loaded for all users on every page load. */
$(function() {
	if(skin == "oasis") {
		var $sidebar = $('.WikiaPagesOnWikiModule:first');
		var comboString = "<div id='mosbox' style='margin-top:5px; align:center'><table style='width:100%'><td style='*'>Help us make this number even bigger! We need <strong>you</strong> to help us edit articles about <a href='http://micronations.wikia.com/wiki/Micronation'>micronationalism!</a> <hr>Wondering what are the recent changes? Keep up by <a href='http://micronations.wikia.com/wiki/MediaWiki:Community-corner'>reading the community news.</a></table></div>";
 
		$sidebar.html($sidebar.html() + comboString);
	} else if(skin == "monobook") {
		var $sidebar = $('#n-wikicitieshome');
		var comboString = "";
		$sidebar.html($sidebar.html() + comboString);
	} else if(skin == "wikia") {
		var $sidebar = $('.WikiaPagesOnWikiModule:first');
		var comboString = "<div id='mosbox' style='margin-top:5px; align:center'><table style='width:100%'><td style='*'>Help us make this number even bigger! We need <strong>you</strong> to help us edit articles about <a href='http://micronations.wikia.com/wiki/Micronation'>micronationalism!</a> <hr>Wondering what are the recent changes? Keep up by <a href='http://micronations.wikia.com/wiki/MediaWiki:Community-corner'>reading the community news.</a>.</table></div>";
 
		$sidebar.html($sidebar.html() + comboString);
	}
});