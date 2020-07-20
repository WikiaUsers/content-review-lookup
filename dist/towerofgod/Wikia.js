// ===========================================================
// EDIT-INTRO FIX for articles
//
// This script is modified from English Wikipedia 
// Source: http://en.wikipedia.org/wiki/User:RockMFR/disambigeditintro.js
// Source: http://runescape.wikia.com/wiki/MediaWiki:Common.js/updateintro.js
// Function: Adds EditIntro to all mainspace pages 
//           when "edit this page" link is clicked
// ===========================================================
 
$(function() {
	if (wgNamespaceNumber == '0') {
		$editLinks = $('a#ca-edit,#ca-edit a,#WikiaPageHeader .wikia-menu-button > li > a');
		$editLinks.attr('href', $editLinks.attr('href') + '&editintro=Template:SpoilWarning');
	}
});

var SocialMediaButtonsNamespaces = [0, 6, 14, 500, 502, 1201];
var SocialMediaButtons = { 
	position: "bottom",
	colorScheme: "color",
	buttonSize: "default",
};

// ToG Discord
window.DiscordIntegratorConfig = {
    siderail: {
        title: "Tower of God Discord",
        id: "191901830526009344",
        theme: "dark"
    }
};

importArticles({
    type: "script",
    articles: [
        'u:dev:Countdown/code.js',
        'u:dev:AjaxBatchDelete/code.js',
        'u:dev:DisplayClock/code.js',
//      'l:MediaWiki:Snow.js',
        'u:dev:SocialIcons/code.js' ]
});