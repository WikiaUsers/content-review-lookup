/********************************************************************************/
/***** Any JavaScript here will be loaded for users using the MonoBook skin *****/
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
 
/* Skin Switch Button */
importScriptPage('SkinSwitchButton/code.js', 'dev');
var monoBookText = 'Monobook',
    oasisText = 'Wikia';
 
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

/* CustomButton */
if (mwCustomEditButtons) {
 
    mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/central/images/8/8c/Button_RedX.png?1",
     "speedTip": "request delete",
     "tagOpen": "\{\{delete|",
     "tagClose": "\}\}",
     "sampleText": "your reason here"};
 
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
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/naruto/images/7/79/Button_reflink.png",
     "speedTip": "Add a Reference",
     "tagOpen": "<ref>",
     "tagClose": "</ref>",
     "sampleText": ""};
}