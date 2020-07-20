var SocialMediaButtons = { 
	position: 'top',
	colorScheme: 'color',
	buttonSize: '35px'
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