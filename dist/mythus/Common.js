/* Any JavaScript here will be loaded for all users on every page load. */

importArticles({
    type: 'script',
    articles: [
'u:dev:CategoryRenameAuto-update/code.js'
    ]
});

// Custom edit buttons

if (mwCustomEditButtons) {
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/__cb20081020115943/central/images/c/cb/Button_wikipedia.png",
     "speedTip": "Link to Wikipedia",
     "tagOpen": "[[wikipedia:",
     "tagClose": "]]",
     "sampleText": "Insert text"}
}

if (mwCustomEditButtons) {
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/central/images/6/60/Button_support.png",
     "speedTip": "Support",
     "tagOpen": ":{{",
     "tagClose": "}}:",
     "sampleText": "support"}
}
 
 
 if (mwCustomEditButtons) {
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/central/images/4/4f/Button_neutral.png",
     "speedTip": "Neutral",
     "tagOpen": ":{{",
     "tagClose": "}}:",
     "sampleText": "neutral"}
}
 
 
 if (mwCustomEditButtons) {
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/central/images/9/98/Button_oppose.png",
     "speedTip": "Oppose",
     "tagOpen": ":{{",
     "tagClose": "}}:",
     "sampleText": "oppose"}
}

// Auto-refresh


AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages = ["Special:RecentChanges", "Special:WikiActivity"];
importScriptPage('AjaxRC/code.js', 'dev');

// ArchiveTool

importScriptPage('ArchiveTool/code.js', 'dev');

// Purge Button

PurgeButtonText = 'Purge';
importScriptPage('PurgeButton/code.js', 'dev');

// Back to top arrow


// DISPlAYTITLE

importScriptPage('User:Jgjake2/js/DISPLAYTITLE.js', 'deadisland');

// USERNAME

if (wgUserName != 'null') {
	$('.insertusername').html(wgUserName);
}

// Eraicons

function showEras(className) {
	if( skin == 'oasis' ) {
		return;
	}
 
	if( typeof( SKIP_ERAS ) != 'undefined' && SKIP_ERAS )
		return;
 
	var titleDiv = document.getElementById( className );
 
	if( titleDiv == null || titleDiv == undefined )
		return;
 
	var cloneNode = titleDiv.cloneNode(true);
	var firstHeading = getFirstHeading();
	firstHeading.insertBefore(cloneNode, firstHeading.childNodes[0]);
	cloneNode.style.display = "block";
}

// ShowHide

importScriptPage('ShowHide/code.js', 'dev');

// Reveal AnonIP

// http://dev.wikia.com/wiki/RevealAnonIP
window.RevealAnonIP = {
    permissions : ['rollback', 'sysop', 'bureaucrat']
};
 
 
importArticles({
    type: "script",
    articles: [
        "w:c:dev:RevealAnonIP/code.js"
    ]
});


// Mass Redirects

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:MassRedirect/code.1.js',
    ]
});

// Quick Redirects

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:Quick redirect/code.js',
    ]
});

//RedirectMaker
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:RedirectMaker/code.js',
    ]
});

/* Falling snow effect for the Christmas skin, courtesy of Community Central */
//importScriptPage('MediaWiki:Snow.js','c');