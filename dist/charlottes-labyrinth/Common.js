/* Any JavaScript here will be loade//AjaxRC
window.ajaxPages=["Special:Log","Special:NewFiles","Special:RecentChanges","Special:Watchlist","Special:WikiActivity"];
window.ajaxRefresh=60000;
window.AjaxRCRefreshText="Auto-Refresh";
window.AjaxRCRefreshHoverText="Automatically refresh the page";
 
//DisplayClock
window.DisplayClockJS="%{Sunday;Monday;Tuesday;Wednesday;Thursday;Friday;Saturday}w, %B %2d, %Y %2I:%2M:%2S %p";
 
//Import Scripts
importArticles({
type:"script",
articles:[
"u:dev:AjaxRC/code.js",
"u:dev:ChatTags/code.js",
"u:dev:DisplayClock/code.js",
"w:c:dev:RevealAnonIP/code.js"]
});d for all users on every page load. */