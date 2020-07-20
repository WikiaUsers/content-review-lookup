/* Any JavaScript here will be loaded for all users on every page load. */

/* Auto-Refresh for Wiki Activity */
AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
importScriptPage('AjaxRC/code.js', 'dev');
var ajaxPages =["Special:WikiActivity"];

/* Custom edit buttons */ 
importScript('MediaWiki:Common.js/CEB.js');
 
/* Back to top button */
importScriptPage('BackToTopButton/code.js', 'dev');

/* Countdown timers on the wiki */
importScriptPage('Countdown/code.js', 'dev');

/* Collapsible Tables */
importScriptPage('ShowHide/code.js', 'dev');

/* Adds Purge button */
var PurgeButtonText = 'Purge';
importScriptPage('PurgeButton/code.js', 'dev');