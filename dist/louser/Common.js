importArticles({
	type: "script",
	articles: [
		"w:dev:ShowHide/code.js", /* Collapsible elements and tables */
		"MediaWiki:Common.js/insertusername.js", /* User name replace for Template:USERNAME */
		"MediaWiki:Common.js/displaytitle.js", /* Ability to change full page title */
		"MediaWiki:Common.js/icons.js", /* Adds icons to page header bottom border */
		"MediaWiki:Common.js/addnavlinks.js", /* Add "about us" and IRC links to "On the Wiki" menu */
	]
});

/* Custom edit buttons for source mode
 * by: [[User:Louser|Louser]]
 */
 
if ((wgAction == 'submit' || wgAction == 'edit') && mwCustomEditButtons) {
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/marvel_dc/images/2/29/Character_Button.png",
		"speedTip": "Insert character infobox avatar template",
		"tagOpen": "\{\{Character avatar infobox\r| nation         = ",
		"tagClose": "\r| image          = \r| name           = \r| nationality    = \r| age            = \r| gender         = \r| hair           = \r| skincolor      = \r| skintype       = \r| allies         = \r| enemies        = \r| weapon         = \r| fightingstyle  = \r| profession     = \r| position       = \r| affiliation    = \r| appearance     = \r| lastappearance = \r| voice          = \r| more           = \r\}\}",
		"sampleText": ""};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/avatar/images/0/0c/LoK_Button.png",
		"speedTip": "Insert an appearances section for Legend of Korra characters",
		"tagOpen": "=== ''The Legend of Korra'' ===\r==== Book One: Air (气) ====\r{{Appear|2|",
		"tagClose": "}}",
		"sampleText": ""};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/__cb20120415191112/avatar/images/2/25/Cite_ep_Button.png",
		"speedTip": "Episode/issue reference tag",
		"tagOpen": "<ref name=>{{Cite episode|2|1",
		"tagClose": "}}</ref>",
		"sampleText": "number"};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/avatar/images/d/dc/Image_Button.png",
		"speedTip": "Insert Imagebox template",
		"tagOpen": "\{\{Imagebox\r| description = ",
		"tagClose": "\r| film        = \r| series      = \r| season      = \r| episode     = \r| source      = \r| origin      = \r| cats        = \r| license     = \r\}\}",
		"sampleText": ""};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/avatar/images/1/1d/Copyrights_needed_Button.png",
		"speedTip": "Uncredited image tag",
		"tagOpen": "\{\{subst:Unknown/ukn|",
		"tagClose": "}}",
		"sampleText": "both"};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/avatar/images/4/4d/Support_Button.png",
		"speedTip": "Support",
		"tagOpen": "{{Support}} ",
		"tagClose": "",
		"sampleText": ""};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/avatar/images/9/9f/Oppose_Button.png",
		"speedTip": "Oppose",
		"tagOpen": "{{Oppose}} ",
		"tagClose": "",
		"sampleText": ""};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/avatar/images/7/7e/Neutral_Button.png",
		"speedTip": "Neutral",
		"tagOpen": "{{Neutral}} ",
		"tagClose": "",
		"sampleText": ""};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/avatar/images/a/a5/Keep_Button.png",
		"speedTip": "Vote to keep",
		"tagOpen": "{{Vote keep}} ",
		"tagClose": "",
		"sampleText": ""};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/avatar/images/3/3c/Delete_Button.png",
		"speedTip": "Vote to delete",
		"tagOpen": "{{Vote delete}} ",
		"tagClose": "",
		"sampleText": ""};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/avatar/images/4/4d/Merge_Button.png",
		"speedTip": "Vote to merge",
		"tagOpen": "{{Vote merge}} ",
		"tagClose": "",
		"sampleText": ""};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/avatar/images/b/b3/Done_Button.png",
		"speedTip": "Done",
		"tagOpen": "{{Done}} ",
		"tagClose": "",
		"sampleText": ""};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/avatar/images/f/fd/Not_Done_Button.png",
		"speedTip": "Not done",
		"tagOpen": "{{Not done}} ",
		"tagClose": "",
		"sampleText": ""};

	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/__cb20100821183407/bleach/en/images/d/db/U_Accent_Button.png",
		"speedTip": "Add the ū character",
		"tagOpen": "ū",
		"tagClose": "",
		"sampleText": ""};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/__cb20100821183407/bleach/en/images/e/e1/O_Accent_Button.png",
		"speedTip": "Add the ō character",
		"tagOpen": "ō",
		"tagClose": "",
		"sampleText": ""};

	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/naruto/images/7/79/Button_reflink.png",
		"speedTip": "Add a Chapter Reference",
		"tagOpen": "<ref>",
		"tagClose": "</ref>",
		"sampleText": "''Naruto'' chapter 0, page 0"};

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