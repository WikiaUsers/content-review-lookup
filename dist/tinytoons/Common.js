 
MediaWiki:Common.js
Last edited on August 4, 2014
by Thailog
Note: After saving, you have to bypass your browser's cache to see the changes.

Internet Explorer: hold down the Ctrl key and click the Refresh or Reload button, or press Ctrl+F5.
Firefox: hold down the Shift key while clicking Reload; alternatively press Ctrl+F5 or Ctrl-Shift-R.
Opera users have to clear their caches through Tools→Preferences
Konqueror and Safari users can just click the Reload button.
Chrome: press Ctrl+F5 or Shift+F5
importArticles({
	type: "script",
	articles: [
		"w:dev:ShowHide/code.js", /* Collapsible elements and tables */
		"w:dev:PurgeButton/code.js", /* Add "purge" option to page controls */
		"w:dev:DisableArchiveEdit/code.js", /* Discourage/disable the editing of talk page archives */
		"w:dev:Countdown/code.js", /* Countdown clock */
                "w:dev:ReferencePopups/code.js", /* Reference Popups */
		"MediaWiki:Common.js/imports.js", /* UserTags and AjaxRC */
                "MediaWiki:Common.js/parentpage.js", /* Parent page link appended to the "On the Wiki" navigation menu */
		"MediaWiki:Common.js/insertusername.js", /* User name replace for Template:USERNAME */
		"MediaWiki:Common.js/disableforumedit.js", /* Discourage/disable the editing of forum archives */
		"MediaWiki:Common.js/disablecommentsblogs.js", /* Disable blog comments on old blog posts */
		"MediaWiki:Common.js/disablecomments.js", /* Disable comments for specified pages at discretion */
		"MediaWiki:Common.js/wallgreetingbutton.js", /* Add a button to edit Message Wall Greeting */
		"MediaWiki:Common.js/socialmedia.js", /* Add social media buttons to blog posts */
//		"MediaWiki:Common.js/addnavlinks.js", /* Add "about us" and IRC links to "On the Wiki" menu */
		"MediaWiki:Common.js/icons.js", /* Adds icons to page header bottom border */
		"MediaWiki:Common.js/filluploadform.js", /* Fills the summary field in upload form with imagebox */
		"MediaWiki:Common.js/hubfix.js", /* Temporary fix for Wikia hubs: Gaming > Entertainment */
		"MediaWiki:Common.js/customizeforums.js", /* Wikia forum feature changes (possibly more to come) */
		"MediaWiki:Common.js/fanonmodule.js", /* Create WikiaRail element to advertise the fanon portal */
                "MediaWiki:Common.js/votesfordeletion.js", /* Javascript for the VfD page */
                "MediaWiki:Common.js/fanonsubscriptionmodule.js", /* Tool used to automate mass-posting on message walls with an easy UI. */
                "MediaWiki:Common.js/fanonwordmarklink.js", /* Wordmark in fanon namespace links to the fanon main page */
                "MediaWiki:Common.js/createfanonfix.js", /* Fixes problems with the "Create fanon main page" feature on [[Avatar Wiki:Create fanon page]] */
                "MediaWiki:Common.js/slider.js", /* "Slider" header for main page */
                "MediaWiki:Common.js/masterblogprepend.js", /* Trial system for prepending blogs on the listing for Avatar news */
                "MediaWiki:Common.js/JsTabs.js", /* Used for the function of [[Template:JsTabs]] */
                "MediaWiki:Common.js/Accordion.js", /* Used for the function of [[Template:Accordion]] */
	]
});
 
/* Custom edit buttons for source mode
 * by: [[User:Thailog|Thailog]]
 */
 
if ((wgAction == 'submit' || wgAction == 'edit') && mwCustomEditButtons) {
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "http://images3.wikia.nocookie.net/marvel_dc/images/2/29/Character_Button.png",
		"speedTip": "Insert character infobox template",
		"tagOpen": "\{\{Character infobox\r| nation         = ",
		"tagClose": "\r| image          = \r| name           = \r| nationality    = \r| age            = \r| gender         = \r| hair           = \r| skincolor      = \r| skintype       = \r| allies         = \r| enemies        = \r| weapon         = \r| fightingstyle  = \r| profession     = \r| position       = \r| affiliation    = \r| appearance     = \r| lastappearance = \r| voice          = \r| more           = \r\}\}",
		"sampleText": ""};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "http://images1.wikia.nocookie.net/avatar/images/0/0c/LoK_Button.png",
		"speedTip": "Insert an appearances section for Legend of Korra characters",
		"tagOpen": "=== ''The Legend of Korra'' ===\r==== Book Three: Change (易) ====\r{{Appear|2|",
		"tagClose": "}}",
		"sampleText": ""};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "http://images2.wikia.nocookie.net/__cb20120415191112/avatar/images/2/25/Cite_ep_Button.png",
		"speedTip": "Episode/issue reference tag",
		"tagOpen": "<ref name=\"\">{{Cite episode|2|3",
		"tagClose": "}}</ref>",
		"sampleText": "number"};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "http://images2.wikia.nocookie.net/avatar/images/d/dc/Image_Button.png",
		"speedTip": "Insert Imagebox template",
		"tagOpen": "\{\{Imagebox\r| description = ",
		"tagClose": "\r| film        = \r| series      = \r| season      = \r| episode     = \r| source      = \r| origin      = \r| cats        = \r| license     = \r\}\}",
		"sampleText": ""};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "http://images2.wikia.nocookie.net/avatar/images/1/1d/Copyrights_needed_Button.png",
		"speedTip": "Uncredited image tag",
		"tagOpen": "\{\{subst:Unknown/ukn|",
		"tagClose": "}}",
		"sampleText": "both"};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "http://images4.wikia.nocookie.net/avatar/images/4/4d/Support_Button.png",
		"speedTip": "Support",
		"tagOpen": "{{Support}} ",
		"tagClose": "",
		"sampleText": ""};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "http://images3.wikia.nocookie.net/avatar/images/9/9f/Oppose_Button.png",
		"speedTip": "Oppose",
		"tagOpen": "{{Oppose}} ",
		"tagClose": "",
		"sampleText": ""};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "http://images4.wikia.nocookie.net/avatar/images/7/7e/Neutral_Button.png",
		"speedTip": "Neutral",
		"tagOpen": "{{Neutral}} ",
		"tagClose": "",
		"sampleText": ""};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "http://images1.wikia.nocookie.net/avatar/images/a/a5/Keep_Button.png",
		"speedTip": "Vote to keep",
		"tagOpen": "{{Vote keep}} ",
		"tagClose": "",
		"sampleText": ""};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "http://images2.wikia.nocookie.net/avatar/images/3/3c/Delete_Button.png",
		"speedTip": "Vote to delete",
		"tagOpen": "{{Vote delete}} ",
		"tagClose": "",
		"sampleText": ""};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "http://images2.wikia.nocookie.net/avatar/images/4/4d/Merge_Button.png",
		"speedTip": "Vote to merge",
		"tagOpen": "{{Vote merge}} ",
		"tagClose": "",
		"sampleText": ""};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "http://images2.wikia.nocookie.net/avatar/images/b/b3/Done_Button.png",
		"speedTip": "Done",
		"tagOpen": "{{Done}} ",
		"tagClose": "",
		"sampleText": ""};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "http://images3.wikia.nocookie.net/avatar/images/f/fd/Not_Done_Button.png",
		"speedTip": "Not done",
		"tagOpen": "{{Not done}} ",
		"tagClose": "",
		"sampleText": ""};
}