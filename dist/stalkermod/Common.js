/* Any JavaScript here will be loaded for all users on every page load. */

 // **************************************************
 //  Automatically purge
 // **************************************************
 
importScriptPage( 'AjaxRC/code.js', 'dev' ); // AJAX-purge for some pages
var ajaxPages = ["Special:Watchlist","Special:Contributions","Special:WikiActivity","Special:RecentChanges"]; // 
var AjaxRCRefreshText = 'Auto purge'; //Name
var AjaxRCRefreshHoverText = 'Click here for purge this page!'; //Support