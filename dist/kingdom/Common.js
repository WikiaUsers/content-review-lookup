/* Include Global Anime-Common.js Information */
importScriptURI('http://anime.wikia.com/index.php?title=MediaWiki:Anime-Common.js&action=raw&ctype=text/javascript&dontcountme=s&templates=expand');

/*importScriptPage('Countdown/code.js', 'dev');

<span class="countdown" style="display:none;">
Only <span class="countdowndate">July 23 2012 10:00:00 EST</span> until the next episode...
</span>
<span class="nocountdown">Javascript disabled.</span>
*/

/*Time*/
importArticle({type:'script', article:'w:c:dev:DisplayClock/code.js'});

/*File auto update*/
importScriptPage("FileUsageAuto-update/code.js", "dev");

/* custom edit buttons (ō, ū characters). */
if (mwCustomEditButtons) {
 
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/__cb20100821183407/bleach/en/images/e/e1/O_Accent_Button.png",
     "speedTip": "Add the ō character",
     "tagOpen": "ō",
     "tagClose": "",
     "sampleText": ""};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/__cb20100821183407/bleach/en/images/d/db/U_Accent_Button.png",
     "speedTip": "Add the ū character",
     "tagOpen": "ū",
     "tagClose": "",
     "sampleText": ""};
}


/*Spoilers*/
SpoilerAlert = {
    isSpoiler: function () {
        return -1 !== wgCategories.indexOf('SpoilerAlertPage');
    }
};
importScriptPage('SpoilerAlert/code.js', 'dev');


/* Editcount tag*/
importArticles({
    type: "script",
    articles: [
        "w:c:dev:EditcountTag/code.js"
    ]
});

/*List files*/
importArticles({
    type: "script",
    articles: [
        "u:dev:ListFiles/code.js" // ListFiles from Dev Wiki
    ]
});

/*dup images*/
importScriptPage('DupImageList/code.js', 'dev');


/* Auto Refresh */
AjaxRCRefreshText = 'Refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages = ["Special:RecentChanges", "Special:WikiActivity"];
importScriptPage('AjaxRC/code.js', 'dev');
importStylesheet("Template:Ambox/code.css");
importScriptPage('Project:JS/tabber.js', 'keroro');