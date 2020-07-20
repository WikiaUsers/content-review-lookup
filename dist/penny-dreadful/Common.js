/* Any JavaScript here will be loaded for all users on every page load. */

/* Auto updating recent changes  */
window.AjaxRCRefreshText = 'Auto-Refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';
window.ajaxPages = [
    "Special:RecentChanges",
    "Special:WikiActivity",
    "Special:UncategorizedPages",
    "Special:AllPages",
];

var SocialMediaButtons = { 
	position: "top",
	colorScheme: "dark",
	buttonSize: "25px"
};
importScriptPage('SocialIcons/code.js','dev');

/* Countdown Timer */
importScriptPage('Countdown/code.js', 'dev');