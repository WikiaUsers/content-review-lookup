/* Scripts from Avatar Wiki and One Direction Wiki */

importArticles({
	type: "script",
	articles: [
		'w:dev:ShowHide/code.js', /* Collapsible elements and tables */
		'w:dev:PurgeButton/code.js', /* Add "purge" option to page controls */
		'w:dev:Countdown/code.js', /* Countdown clock */
		'MediaWiki:Common.js/insertusername.js', /* User name replace for Template:USERNAME */
		'MediaWiki:Common.js/disablecommentsblogs.js', /* Disable blog comments on old blog posts */
		'MediaWiki:Common.js/wallgreetingbutton.js', /* Add a button to edit Message Wall Greeting */
		'MediaWiki:Common.js/mastheadBoxes.js', /* Masthead ranks ~ Cblair91 */
                'w:dev:TopEditors/code.js'
	]
});

//edit buttons
if (mwCustomEditButtons) {
  mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "https://images.wikia.nocookie.net/central/images/c/c8/Button_redirect.png",
    "speedTip": "Redirect",
    "tagOpen": "#REDIRECT [[",
    "tagClose": "]]",
    "sampleText": "Insert page"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/central/images/c/c9/Button_strike.png",
     "speedTip": "Strike",
     "tagOpen": "<s>",
     "tagClose": "</s>",
     "sampleText": "Strike-through text"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/central/images/1/13/Button_enter.png",
     "speedTip": "Line break",
     "tagOpen": "<br />",
     "tagClose": "",
     "sampleText": ""};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/central/images/7/74/Button_comment.png",
     "speedTip": "Comment visible only for editors",
     "tagOpen": "<!-- ",
     "tagClose": " -->",
     "sampleText": "Insert comment here"};
}