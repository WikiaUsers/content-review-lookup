/* Any JavaScript here will be loaded for all users on every page load. */

/* Auto Refresh Recent Activity & Watchlist Tick Box*/
ajaxPages = ["Special:RecentChanges","Special:WikiActivity"];
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';
importScriptPage('AjaxRC/code.js', 'dev');

/* Allows images from external sites to be loaded like imgur, imageshack etc*/
/* White-listed sites: http://community.wikia.com/wiki/MediaWiki:External_image_whitelist */
importScriptPage('ExternalImageLoader/code.js', 'dev');