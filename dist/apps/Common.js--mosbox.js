/* Any JavaScript here will be loaded for all users on every page load. */

// ============================================================
// wikiSidething
// 
// Function: Adds a counter
// ============================================================
 

$(function() {
	if(skin == "oasis") {
		var $sidebar = $('.WikiaPagesOnWikiModule:first');
		var comboString = "<div style='margin-top:5px; align:center'><table style='width:100%'><td style='*'>Tired of seeing Ads? <a href='http://apps.wikia.com/wiki/Special:Signup'>Logged in</a>users don't see advertisements. Advertisements do not necessarily represent the views of Apps Wiki.<h2>Notifications</h2><br>Please remember when editing an article, do <u>NOT</u> contribute obscene/inappropriate content for App icons/galleries. Apps articles that exhibit inappropriate content <u>will be deleted immediately</u>. Articles must contain content suitable for everyone.</td></tr></table></div>";
 
		$sidebar.html($sidebar.html() + comboString);
	}
});