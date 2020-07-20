/* Any JavaScript here will be loaded for all users on every page load. */
// AJAX on other pages
var ajaxPages = [
    "Special:Watchlist",
    "Special:Contributions",
    "Special:WikiActivity",
    "Special:RecentChanges"
];
var AjaxRCRefreshText = 'Auto-Refresh';
 
var PurgeButtonText = 'Refresh';
 
/*Revealing IP of anons in commentaries to admins*/
window.RevealAnonIP = {
    permissions: ['rollback', 'sysop', 'bureaucrat'] };