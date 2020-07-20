/* Any JavaScript here will be loaded for all users on every page load. */

//=========================
// AJAX Auto-Refresh
//=========================
 
window.ajaxPages = [
    "Special:WikiActivity",
    "Special:RecentChanges",
    "Special:RecentChangesLinked",
    "Special:Log",
    "Special:Images",
    "Special:ListFiles",
    "Special:Contributions",
    "Special:NewPages",
    "Special:UncategorizedPages",
    "Special:DoubleRedirects",
    "Special:Watchlist",
    "Special:LonelyPages",
    "Special:BrokenRedirects",
    "Special:DeadendPages",
    "Special:Disambiguation",
    "Special:Withoutimages",
    "Blog:Recent posts"];
window.ajaxRefresh = 30000;
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page over time';
window.ajaxIndicator = 'https://vignette.wikia.nocookie.net/dev/images/b/ba/Snake_throbber_dark-bg.gif/revision/latest?cb=20140519203615';

//===========================================
// Test if an element has a certain class.
// Increases general performance.
//===========================================
 
var hasClass = (function() {
    var reCache = {};
    return function(element, className) {
        return (reCache[className] ? reCache[className] : (reCache[className] = 
        new RegExp("(?:\\s|^)" + className + "(?:\\s|$)")))
        .test(element.className);
};})();

//=========================================================
// Makes {{Username}} display the username of the vistor
// Requires copying of Template:Username
//=========================================================
 
$(function UserNameReplace() {
    if (typeof(disableUsernameReplace) != 'undefined' && 
    disableUsernameReplace || wgUserName === null) return;
    $("span.insertusername").text(wgUserName);
});
 
//==============================================================================
// Allows text to be hidden in other text and revealed with a click
// Requires copying of Template:FlipText, Template:FlipContent and some CSS
//==============================================================================
 
$(".container").click(function() {
  $div = $(this).find("div");
  $($div).toggleClass("active");
});

//================================================================================
/* Fixes a bug caused by undoing an edit and leaving no summary if 
"Prompt me when entering a blank edit summary" is checked in one's Preferences */
//================================================================================
 
$(function () {
    if (document.location.search.indexOf("undo=") != -1 && 
    document.getElementsByName('wpAutoSummary')[0]) {
        document.getElementsByName('wpAutoSummary')[0].value='1';}
});

//=========================================================================
/* Automatically displays the Edit dropdown menu on userpages upon hover 
rather than click */
//=========================================================================
 
$('.UserProfileActionButton .drop').hover(function() {
 $('.UserProfileActionButton .wikia-menu-button').addClass('active'); 
});