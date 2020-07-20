// ============================================================
// wikiSidething
// from Brickipedia
// Function: Adds a new sidebar element 
// ============================================================
 
 
$(function() {
	if(skin == "oasis") {
		var $sidebar = $('.WikiaPagesOnWikiModule:first');
		var comboString = "<div id='mosbox' style='margin-top:5px; align:center'><table style='width:100%'><td style='*'>So you want to join? EXCELLENT. Just press the add a page and create your Bey, Storie, or Character and your journey will begin. <br /></td><td style='text-align:right'><a href='http://bakugan.wikia.com/wiki/Special:Leaderboard' target='_top'><img src='https://images.wikia.nocookie.net/__cb92/beybladefanon/images/archive/8/89/Wiki-wordmark.png' alt='The only game on this wiki that has Rassilon's Great Seal of Approval' border=0 /></a></td></tr></table></div>";
 
		$sidebar.html($sidebar.html() + comboString);
	} else if(skin == "monobook") {
		var $sidebar = $('#p-wikicities-nav');
		var comboString = "<div id='mosbox' style='margin:5px'><h5>A few Notes</h5><div style='margin-top:5px; margin-bottom:5px;background-color:#ececec'><table style='width:100%'><td style='*'><a href='http://tardis.wikia.com/wiki/Game of Rassilon'><strong>The Game of Rassilon</strong></a> isn't available in this skin, but you <a href='http://tardis.wikia.com/wiki/Special:Leaderboard?useskin=wikia'>can check your score without leaving Monobook.</a><hr> Also, you can <strong>join the chat</strong> by <a href='http://tardis.wikia.com/wiki/Special:Chat?useskin=wikia'>clicking here.</a></a></td></table></div></div>";
		$sidebar.html($sidebar.html() + comboString);
	}
});