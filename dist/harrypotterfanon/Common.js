/* Any JavaScript here will be loaded for all users on every page load. */

// AjaxRC
window.ajaxPages = ["Special:WikiActivity","Special:Log","Special:RecentChanges"];
window.ajaxIndicator = 'https://images.wikia.nocookie.net/__cb20100609110347/software/images/a/a9/Indicator.gif';
window.AjaxRCRefreshText = 'Auto Refresh';
window.AjaxRCRefreshHoverText = 'Silently refreshes the contents of this page every 60 seconds without requiring a full reload';
importScriptPage("MediaWiki:AjaxRC/code.js", "dev");