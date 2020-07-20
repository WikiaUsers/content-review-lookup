importScriptPage('MediaWiki:Wikia.js/cancelButton.js', 'admintools');
importScriptPage('InactiveUsers/code.js', 'dev');
importScriptPage('SpoilerAlert/code.js', 'dev');
importScriptPage('BackToTopButton/code.js', 'dev');
importScriptPage('ShowHide/code.js', 'dev');
importScriptPage('EditIntroButton/code.js', 'dev');
importScriptPage('AjaxRC/code.js', 'dev');
importScript('MediaWiki:Wikia.js/editCount.js');
importScript('MediaWiki:Wikia.js/Ticker.js');


ajaxPages = ["Special:WikiActivity","Special:RecentChanges","Special:Watchlist","Special:Log","Special:Contributions","Special:Forum"];
AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
importScriptPage('AjaxRC/code.js', 'dev');
 
if (!$('script[src*="title=User:'+wgUserName+'/wikia.js"]').length) {
    importScript('User:' + wgUserName + '/wikia.js');
}
 
if (!$('link[href*="title=User:'+wgUserName+'/wikia.css"]').length) {
    importStylesheet('User:' + wgUserName + '/wikia.css');
}
 
window.SpoilerAlert = {
    isSpoiler: function () {
        return -1 != $.inArray('Spoiler', wgCategories);
    }
};

/* Bye bye image popups */
window.wgEnableImageLightboxExt = false;
function changeimagelinks() {
	$('#WikiaArticle, .LatestPhotosModule, #article-comments').unbind('click.lightbox');

	var a = document.getElementsByTagName('a');
	for(var t = 0; t < a.length; ++t) {
		var a2 = a[t];
		var img = a2.getElementsByTagName('img');
		if(img[0] != null) {
			if (a2.href.indexOf('images.wikia.com') != -1) {
				var link = wgServer + '/wiki/File:' + a2.href.substring(a2.href.lastIndexOf('/') + 1);
				a2.setAttribute('href',link);
			}
		}
	}
}
addOnloadHook(changeimagelinks);

/* Code for custom edit buttons */
if (mwCustomEditButtons) {
 
/*** wrappers *****/
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/central/images/8/8c/Button_RedX.png?1",
     "speedTip": "request delete",
     "tagOpen": "\{\{delete|",
     "tagClose": "\}\}",
     "sampleText": "your reason here"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/gintama/images/1/11/Button_category.png",
     "speedTip": "Category",
     "tagOpen": "[[Category:",
     "tagClose": "]]",
     "sampleText": ""};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/__cb20100709220258/bleach/answers/images/e/e1/O_Accent_Button.png",
     "speedTip": "Add the ō character",
     "tagOpen": "ō",
     "tagClose": "",
     "sampleText": ""};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/__cb20100709220358/bleach/answers/images/d/db/U_Accent_Button.png",
     "speedTip": "Add the ū character",
     "tagOpen": "ū",
     "tagClose": "",
     "sampleText": ""};
}