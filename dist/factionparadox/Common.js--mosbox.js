// ============================================================
// wikiSidething
// from Brickipedia
// Function: Adds a new sidebar element 
// ============================================================
 
 
$(function() {
	if(skin == "oasis") {
		var $sidebar = $('.WikiaPagesOnWikiModule:first');
		var comboString = "<div id='mosbox' style='margin-top:5px; align:center'><table style='width:100%'><td style='*'>Help us make this number even bigger! We need <strong>you</strong> to help us edit articles about the <a href='http://factionparadox.wikia.com/wiki/Faction Paradox universe'>FPU.</a> <a href='http://factionparadox.wikia.com/wiki/Special:UserLogin'>Log on</a>and start <a href='http://factionparadox.wikia.com/wiki/Special:Leaderboard'><strong>earning badges</strong></a>today!<br /></td></tr></table><table style='width:100%'><hr>Wondering why things are changing around here? Keep up by <a href='http://factionparadox.wikia.com/wiki/MediaWiki:Community-corner'>reading the community news</a>or by <a href='http://factionparadox.wikia.com/wiki/Forum:Homeworld'>visiting the Homeworld.</a></table></div>";
 
		$sidebar.html($sidebar.html() + comboString);
	} else if(skin == "monobook") {
		var $sidebar = $('#n-wikicitieshome');
		var comboString = "<div id='mosbox' ><div style='background-color:transparent !important;line-height:100%'><hr><a href='http://factionparadox.wikia.com/wiki/Special:Leaderboard?useskin=wikia'>Check your score</a> in our editing game. <hr>Also, you can <strong>join the chat</strong> by <a href='http://factionparadox.wikia.com/wiki/Special:Chat?useskin=wikia'>clicking here.</a><hr>Wondering why things are changing around here? Keep up by <a href='http://factionparadox.wikia.com/wiki/MediaWiki:Community-corner'>reading the community news</a> or by <a href='http://factionparadox.wikia.com/wiki/Forum:Homeworld'>visiting the Homeworld</a>.</a></div></div>";
		$sidebar.html($sidebar.html() + comboString);
	}
});