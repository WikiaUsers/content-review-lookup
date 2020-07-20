// ============================================================
// wikiSidething
// from Brickipedia
// Function: Adds a new sidebar element 
// ============================================================
 
 
$(function() {
	if(skin == "oasis") {
		var $sidebar = $('.WikiaPagesOnWikiModule:first');
		var comboString = "<div id='mosbox' style='margin-top:5px; align:center'><table style='width:100%'><td style='*'>Help us add new articles each week, whether it can be a background pony, or a song. It's not all work, remember to enjoy yourself on this site!<br /></td><td style='text-align:right'><a href='http://tardis.wikia.com/wiki/Special:Leaderboard' target='_top'><img src='https://images.wikia.nocookie.net/mylittlebrony/images/4/4c/TSderpppp.png' alt='The only game on this wiki that has Rassilon's Great Seal of Approval' border=0 /></a></td></tr></table></div>";
 
		$sidebar.html($sidebar.html() + comboString);
	} else if(skin == "monobook") {
		var $sidebar = $('#p-wikicities-nav');
		var comboString = "<div id='mosbox' style='margin:5px'><h5>A few Notes</h5><div style='margin-top:5px; margin-bottom:5px;background-color:#ececec'><table style='width:100%'><td style='*'><a href='http://tardis.wikia.com/wiki/Game of Rassilon'><strong>The Game of Rassilon</strong></a> isn't available in this skin, but you <a href='http://tardis.wikia.com/wiki/Special:Leaderboard?useskin=wikia'>can check your score without leaving Monobook.</a><hr> Also, you can <strong>join the chat</strong> by <a href='http://tardis.wikia.com/wiki/Special:Chat?useskin=wikia'>clicking here.</a></a></td></table></div></div>";
		$sidebar.html($sidebar.html() + comboString);
	}
});