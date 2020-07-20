/* Any JavaScript here will be loaded for all users on every page load. */

/* Custom edit buttons */ 
importScript('MediaWiki:Common.js/CEB.js');
 
/* Back to top button */
importScriptPage('BackToTopButton/code.js', 'dev');
 
/* Auto edit dropdown */
importScriptPage('AutoEditDropdown/code.js', 'dev');
 
/* Show and Hide code by tables */
importScriptPage('ShowHide/code.js', 'dev');
 
/* Auto-refresh by wikiactivity */
importScriptPage('AjaxRC/code.js', 'dev');
var ajaxPages = ["Special:WikiActivity"];
var AjaxRCRefreshText = 'Auto-Refresh';
var ajaxRefresh = 30000;
 
/* Adds Purge button */
var PurgeButtonText = 'Purge';
importScriptPage('PurgeButton/code.js', 'dev');
 
/* Standard Edit Summaries */
importScript('MediaWiki:Common.js/standardeditsummaries.js');
 
/* Adds a button to edit Message Wall Greeting */
importScript('MediaWiki:Common.js/MessageWallGreeting.js');
 
/* Countdown timers on the wiki */
importScriptPage('Countdown/code.js', 'dev');