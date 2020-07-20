/* Any JavaScript here will be loaded for all users on every page load. */

(window.dev = window.dev || {}).profileTags = { noHideTags: true };

window.ajaxPages = ["WikiActivity"];
window.ajaxSpecialPages = ["Recentchanges", "WikiActivity", "Watchlist", "Log", "Contributions"];
window.ajaxIndicator = 'https://images.wikia.nocookie.net/software/images/a/a9/Indicator.gif';
window.ajaxRefresh = 20000;
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Auto Refresh';

var MessageBlock = {
  title : 'YOU HAVE BEEN BANNED.',
  message : 'Greetings. I am an admin for the Minecraft Creepypasta Wiki. I am here to inform you that you have been banned for a duration of $2 for the following reason: "$1". <br /><b>Do not attempt to evade a ban.</b> Evading a ban, regardless of your intentions, is a punishable offence and will likely extend your block if you have not been permanently banned. If you feel like you have been blocked for an incorrect reason, you may contact an administrator for guidance.'
};

var username = wgUserName;
if (username) {$('.InsertUsername').text(username);}

if (mw.config.get("wgUserGroups").indexOf('sysop') > -1) {
  massCategorizationDelay = 1000;
  importScriptPage('MediaWiki:MassCategorization/code.js', 'dev');
}

window.railWAM = {
    logPage:"Project:WAM Log"
};