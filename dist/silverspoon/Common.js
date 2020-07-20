/********************************************************************************/
/***** Any JavaScript Here Will Be Loaded For Users Using The MonoBook Skin *****/
/********************************************************************************/
 
/*******************/
/***** Imports *****/
/*******************/
 
/* Auto Refresh */
importScriptPage('AjaxRC/code.js', 'dev');
AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages = ["Special:RecentChanges","Special:WikiActivity"];
 
/* Collapsible */
importScriptPage('ShowHide/code.js', 'dev');
 
/* Reveal Anonymous IP */
importScriptPage('RevealAnonIP/code.js', 'dev');
 
/* Reference Pop Ups */
importScriptPage('ReferencePopups/code.js', 'dev');
 
/* InactiveUsers */
importScriptPage('InactiveUsers/code.js', 'dev');
 
/*****************/
/***** Local *****/
/*****************/
 
/* DisplayTimer */
importScriptPage('MediaWiki:DisplayTimer.js');
 
/* Toggle */
importScriptPage('MediaWiki:Toggle.js');
 
/* Preload */
importScriptPage('MediaWiki:Preload.js');

/******************/
/***** Custom *****/
/******************/

/* CustomButton */
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