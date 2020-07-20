/* jQuery Import */
importScriptPage('http://code.jquery.com/jquery-1.11.1.min.js');

// ================================================================== //
// Social Icons
// ================================================================== //
 
var SocialMediaButtonsNamespaces = [0, 6, 14, 500, 1201];
var SocialMediaButtons = { 
	position: "bottom",
	colorScheme: "color",
	buttonSize: "35px",
	wikiTwitterAccount: "stargateworld"
};
importScriptPage('SocialIcons/code.js','dev');

// ================================================================== //
// Schneescript
// ================================================================== //
 
var date = new Date();
var month = date.getMonth();
if (month == 11 || month == 0) {
    importArticle({
        type: "script",
        article: "w:c:de.fringe:MediaWiki:Snow.js"
    });
}

// ================================================================== //
// Toggle-Boxen
// ================================================================== //
$('.toggle-box').click(function (ev) {
    $(ev.currentTarget).children('.box-content').toggle();
});