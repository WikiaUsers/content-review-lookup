/* Any JavaScript here will be loaded for all users on every page load. */

importScriptPage('FixWantedFiles/code.js', 'dev');

importScriptPage('Countdown/code.js', 'dev');

importScriptPage('DisplayTimer/code.js', 'dev');

//BEGIN AutoEditDropdown
var AutoEditDropdownConfig = {
    expandedAreaContribute: true,
    expandedAreaEdit: true
}
importScriptPage('AutoEditDropdown/code.js', 'dev');
//END

// http://dev.wikia.com/wiki/RevealAnonIP
window.RevealAnonIP = {
    permissions : ['rollback', 'sysop', 'bureaucrat', 'staff']
};
importScriptPage('RevealAnonIP/code.js', 'dev');

// BEGIN InactiveUsers
importScriptPage('InactiveUsers/code.js', 'dev');
InactiveUsers = { months: 1 };
// END

// BEGIN BackToTopButton
importScriptPage('BackToTopButton/code.js', 'dev');
var Start = 5;
// END

importScriptPage('User:Phillycj/daynight.js', 'c');

// Extra user rights
$( function() { 
$('<span class="group">Manager</span>').insertAfter('.page-User_Werewolf333 .masthead-info hgroup h1');

// Auto-refreshing recent changes

importScriptPage('AjaxRC/code.js', 'dev');
AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages = ["Special:WikiActivity","Special:RecentChanges","Special:Watchlist","Special:Log","Special:Contributions"];
var ajaxRefresh = 30000;