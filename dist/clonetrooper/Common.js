/* Any JavaScript here will be loaded for all users on every page load. */
/* Insert username */
$(function() {
 if (wgAction === 'view' && wgUserName !== null) {
     $('.insertusername').text(wgUserName);
 }
});
/* END Insert username */

/* Refresh thingy */ 
importScriptPage('AjaxRC/code.js', 'dev');