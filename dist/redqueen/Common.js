importArticles({
	type: "script",
	articles: [
		"MediaWiki:Common.js/imports.js", /* UserTags, AjaxRC, summaries */
		"MediaWiki:Common.js/disableforumedit.js", /* Disable editing on old forum archives */
		"u:dev:MediaWiki:PurgeButton/code.js", /* Add "purge" option to page controls */
		"u:dev:MediaWiki:BackToTopButton/code.js", /* Back to top button */
		"u:dev:MediaWiki:Countdown/code.js", /* Countdown clock */
		"u:dev:MediaWiki:ReferencePopups/code.js", /* Ref pop-up */
		"u:dev:MediaWiki:SpoilerAlert/code.js", /* Spoiler alert */
		"u:dev:MediaWiki:DupImageList/code.js" /* Lists dup images */
	]
});

/* CUSTOM EDIT BUTTONS */
if (mwCustomEditButtons) {

/*** wrappers *****/

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/central/images/c/c8/Button_redirect.png?1",
     "speedTip": "Redirect",
     "tagOpen": "#REDIRECT [[",
     "tagClose": "]]",
     "sampleText": ""};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://vignette.wikia.nocookie.net/americanmcgeesalice/images/8/8c/Button_RedX.png",
     "speedTip": "request delete",
     "tagOpen": "\{\{delete|",
     "tagClose": "\}\}",
     "sampleText": "your reason here"};
}
window.railWAM = {
    logPage:"Project:WAM Log"
};
// END