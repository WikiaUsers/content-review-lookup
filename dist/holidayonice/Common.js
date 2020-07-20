/* //Removes upload image pop-up
$(document).ready(function() {
 $('a.wikia-button.upphotos').unbind('click',UploadPhotos.showDialog);
});
 
// Ajax auto-refresh
window.ajaxPages = ['Special:RecentChanges','Special:WikiActivity','Special:Contributions'];
window.AjaxRCRefreshText = 'Auto-refresh';
window.ajaxRefresh = 30000;
 
// Spoiler alert
SpoilerAlert = {
    isSpoiler: function () {
        return -1 !== wgCategories.indexOf('Spoiler');
    }
}; 
*/
// Import articles
importArticles({
	type: 'script',
	articles: [
		"w:dev:VisualSpellCheck/code.js",
		"w:dev:WallGreetingButton/code.js", /* Adds a button to the top of Message Walls that allows you to easily edit the top "greeting" area */
		"w:dev:SpoilerAlert/code.js",
		"w:dev:Countdown/code.js",
                "w:dev:AutoEditDropdown/code.js",
                "w:dev:FixMultipleUpload/code.js",
	/*	"w:dev:AjaxRC444/code.js", */
                "w:dev:View_Source/code.js", /* adds a "View source" link to the "Edit" menu */
                "w:dev:AntiUnicruft/code.js", /* Automatically repairs script (JS/CSS) pages that contain magic invisible bugs */
                "w:dev:DupImageList/code.js", /* Duplicate images */
                "w:dev:AjaxPatrol/code.js", /* Makes the patrol links on diffs and new pages ajax links so that you can patrol without leaving the current page */
                "w:dev:AjaxTemplate/code.js", /* Automatically adds templates to pages */
                "MediaWiki:Common.js/Userrights.js", /* Adds custom user right icons for profilemastheads */
	]
});