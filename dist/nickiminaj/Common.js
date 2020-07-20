importArticles({
	type: "script",
	articles: [
        // ...
        'w:c:dev:ReferencePopups/code.js',
        // ...
		"w:dev:ShowHide/code.js", /* Collapsible elements and tables */
		"w:dev:PurgeButton/code.js", /* Add "purge" option to page controls */
		"w:dev:Countdown/code.js", /* Countdown clock */
		"MediaWiki:Common.js/insertusername.js", /* User name replace for Template:USERNAME */
		"MediaWiki:Common.js/disablecommentsblogs.js", /* Disable blog comments on old blog posts */
		"MediaWiki:Common.js/disablecomments.js", /* Disable comments for specified pages at discretion */
		"MediaWiki:Common.js/wallgreetingbutton.js", /* Add a button to edit Message Wall Greeting */
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
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/central/images/5/58/Button_small.png",
     "speedTip": "Small text",
     "tagOpen": "<small>",
     "tagClose": "</small>",
     "sampleText": "Small text"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/central/images/5/56/Button_big.png",
     "speedTip": "Big text",
     "tagOpen": "<big>",
     "tagClose": "</big>",
     "sampleText": "Big text"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/central/images/5/5f/Button_center.png",
     "speedTip": "Center text",
     "tagOpen": "<center>",
     "tagClose": "</center>",
     "sampleText": "Centered text"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/__cb20080220213805/central/images/1/16/Button_reflink_alternate.png",
     "speedTip": "Add a reference",
     "tagOpen": "<ref>[",
     "tagClose": "] Retrieved date.</ref>",
     "sampleText": "Reference link"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/nickiminaj/images/9/90/Bottom_song.png",
     "speedTip": "Template for song pages",
     "tagOpen": "\{\{Song\r| image     = ",
     "tagClose": "\r| audio     = \r| type      = \r| artist    = \r| album     = \r| features  = \r| released  = \r| recorded  = \r| format    = \r| genre     = \r| length    = \r| label     = \r| writer    = \r| producer  = \r| Promo     = \r| Single    = \r| Video     = \r| Prev      = \r| PrevPromo = \r| Next      = \r| NextPromo = \r\}\}",
     "sampleText": " "};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/nickiminaj/images/5/5a/Bottom_lyrics.png",
     "speedTip": "Lyrics for songs",
     "tagOpen": "\{\{ShowHide\r|title= \"SONG NAME\" (PERFORMER) [Explicit or Clean]\r|body=<center><poem>",
     "tagClose": "</poem></center>\}\}",
     "sampleText": "Paste lyrics here"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/central/images/1/13/Button_delete.png",
     "speedTip": "Propose deletion of this article",
     "tagOpen": "\{\{delete\}\} ",
     "tagClose": " ",
     "sampleText": " "};
}