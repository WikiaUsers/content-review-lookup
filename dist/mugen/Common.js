/* Any JavaScript here will be loaded for all users on every page load. */
if (mwCustomEditButtons) {
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://vignette.wikia.nocookie.net/mugen-arcade/images/9/94/Underline_button.png",
        "speedTip": "Underlined text",
        "tagOpen": "<u>",
        "tagClose": "</u>",
        "sampleText": "Underlined text"};
        
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://vignette.wikia.nocookie.net/mugen-arcade/images/c/c6/Internal_Link.png",
        "speedTip": "Internal link",
        "tagOpen": "[[",
        "tagClose": "]]",
        "sampleText": "Link title"};
        
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://vignette.wikia.nocookie.net/mugen-arcade/images/a/a5/External_Link.png",
        "speedTip": "External link (remember http:// prefix)",
        "tagOpen": "[",
        "tagClose": "]",
        "sampleText": "http://www.example.com Link title"};
        
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://vignette.wikia.nocookie.net/central/images/c/c8/Button_redirect.png",
        "speedTip": "Redirect",
        "tagOpen": "#REDIRECT [[",
        "tagClose": "]]",
        "sampleText": "Link title"};
        
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://vignette.wikia.nocookie.net/mugen-arcade/images/5/55/Header_Level1.png",
        "speedTip": "Level 1 headline",
        "tagOpen": "=",
        "tagClose": "=",
        "sampleText": "Headline text"};
        
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://vignette.wikia.nocookie.net/mugen-arcade/images/3/39/Header_Level2.png",
        "speedTip": "Level 2 headline",
        "tagOpen": "==",
        "tagClose": "==",
        "sampleText": "Headline text"};
        
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://vignette.wikia.nocookie.net/mugen-arcade/images/d/d6/Header_Level3.png",
        "speedTip": "Level 3 headline",
        "tagOpen": "===<u>'''",
        "tagClose": "'''</u>===",
        "sampleText": "Headline text"};

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://vignette.wikia.nocookie.net/mugen-arcade/images/d/d1/Header_Level4.png",
        "speedTip": "Level 4 headline",
        "tagOpen": "====<u>'''",
        "tagClose": "'''</u>====",
        "sampleText": "Headline text"};
        
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://vignette.wikia.nocookie.net/mugen-arcade/images/9/99/Header_Level5.png",
        "speedTip": "Level 5 headline",
        "tagOpen": "=====<u>'''",
        "tagClose": "'''</u>=====",
        "sampleText": "Headline text"};
        
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://vignette.wikia.nocookie.net/mugen-arcade/images/4/4e/Nowiki_button.png",
        "speedTip": "Ignore wiki formatting",
        "tagOpen": "<nowiki>",
        "tagClose": "</nowiki>",
        "sampleText": "Non-formatted text"};
        
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://vignette.wikia.nocookie.net/mugen-arcade/images/f/fc/Gallery_button.png",
        "speedTip": "Gallery",
        "tagOpen": "<gallery>\n",
        "tagClose": "\n</gallery>",
        "sampleText": "Gallery contents"};
        
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://vignette.wikia.nocookie.net/mugen-arcade/images/e/e1/Quote_button.png",
        "speedTip": "Quote",
        "tagOpen": "{{Quote|",
        "tagClose": "}}",
        "sampleText": "Quote text"};
      
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://vignette.wikia.nocookie.net/mugen-arcade/images/6/62/Stats_button.png",
        "speedTip": "Character stats",
        "tagOpen": "===<u>'''Stats'''</u>===\n{{Stats\n|Life = 1000\n|Power = 3000\n|Attack = 100\n|Defence = 100}}",
        "tagClose": "",
        "sampleText": ""};
    
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://vignette.wikia.nocookie.net/mugen-arcade/images/5/5f/Command_List.png",
        "speedTip": "Command template",
        "tagOpen": "{{CommandList|",
        "tagClose": "|||}}",
        "sampleText": ""};
        
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://vignette.wikia.nocookie.net/mugen-arcade/images/7/7c/Image_Handler.png",
        "speedTip": "External image handler",
        "tagOpen": "{{ImageHandler|",
        "tagClose": "|type=regular|link=http://}}",
        "sampleText": ""};
}

window.SignatureCheckJS = {
	// Parts of the confirm prompt
	preamble: "Where do you think you're going?\n\n",
	epilogue: "\nClick Cancel to add a signature to your post, and try again.",
	noForumheader: "This will appear in the middle of the preamble and epilogue if the forumheader template is missing on a forum page\n",
	noSignature: "You post appears to have been left unsigned. Use four tildes or the signature button to sign your posts.\n",
 
	// Other stuff
	forumheader: '', // The name of the Forumheader template, can be set to an empty string or false to disable
	checkSignature: true // Enable the signature check function
};

/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */

$(function() {
    if (window.disableUsernameReplace || mw.config.get('wgUserName') === null) return;
    $('span.insertusername').html(mw.config.get('wgUserName'));
});

/* End of the {{USERNAME}} replacement */

/* Auto-refresh Recent Wiki Activity and other pages */
var ajaxRefresh = 30000;
var AjaxRCRefreshText = 'Auto-update current page';
var AjaxRCRefreshHoverText = 'Click to automatically update the current page every 30 seconds';
var ajaxPages = [
    "Special:RecentChanges",
    "Special:Watchlist",
    "Special:Log",
    "Special:Contributions",
    "Special:WikiActivity",
    "Special:NewFiles"
];

/* Automatically disable comments on old blogs */
window.LockOldBlogs = {
    expiryDays: 365,
    expiryMessage: "This blog hasn\'t been commented on in over a year and is now archived.",
    nonexpiryCategory: "Permanent blogs"
};

importArticles({
    type: 'script',
    articles: [
        'MediaWiki:Common.js/profileRedesign.js',
        'MediaWiki:MPC.js',
        'u:dev:MediaWiki:AjaxRC/code.js',
        'u:dev:MediaWiki:CacheCheck/code.js',
        'u:dev:MediaWiki:DiscordIntegrator/code.js',
        'u:dev:MediaWiki:DisplayClock/code.js',
        'u:dev:MediaWiki:DisableBotMessageWalls/code.js',
        'u:dev:MediaWiki:LockOldBlogs/code.js',
        'u:dev:MediaWiki:RevealAnonIP/code.js',
        'u:dev:MediaWiki:SearchSuggest/code.js',
        'u:dev:MediaWiki:SignatureCheck/code.js',
        'u:dev:MediaWiki:Toggler.js',
        'u:dev:MediaWiki:WallGreetingButton/code.js'
    ]
});

/************* General functions *************/
 
 /* Test if an element has a certain class **************************************
 *
 * Description: Uses regular expressions and caching for better performance.
 * Maintainers: User:Mike Dillon, User:R. Koot, User:SG
 */
 
var hasClass = (function () {
    var reCache = {};
    return function (element, className) {
        return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
    };
 })();
 
 
function getElementsByClass (node, className, tagName) {
	if (node.getElementsByClassName && (tagName === undefined || tagName === null || tagName == '*')) return node.getElementsByClassName(className);
	var list = node.getElementsByTagName(tagName?tagName:'*');
	var array = new Array();
	var i = 0;
	for (i in list) {
		if (hasClass(list[i], className))
			array.push(list[i]);
    }
	return array;
 }
 
/* Creates the method getElementsByClass, if unsupported from the browser */
if(!document.getElementsByClass) document.getElementsByClass = function(className) {
	return getElementsByClass(document, className, '*');
};
 
 
function getElementsByName (name, root) {
 if (root === undefined) root = document;
 var e = root.getElementsByTagName('*');
 var r = new Array();
 for (var i = 0; i < e.length; i++) {
	if (e[i].getAttribute('name') == name) r[r.length] = e[i];
 }
 return r;
}