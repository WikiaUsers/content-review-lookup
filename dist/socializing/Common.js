/* Any JavaScript here will be loaded for all users on every page load. */

importScriptPage('MediaWiki:RailgunClient.js','railgunscript');

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

function onloadhookcustom() {
  var replace = document.getElementById("VisitorMap");
if (null != replace) {
    var getvalue = replace.getAttribute("class");
    replace.innerHTML='<a href="http://s06.flagcounter.com/more/xQI"><img src="http://s06.flagcounter.com/map/xQI/size_l/txt_000000/border_FF0000/pageviews_1/viewers_0/flags_1/" alt="free counters" border="0"></a>';
  }
}


if (window.addEventListener) {window.addEventListener("load",onloadhookcustom,false);}
else if (window.attachEvent) {window.attachEvent("onload",onloadhookcustom);}

function onloadhookcustom() {
  var replace = document.getElementById("VisitorList");
if (null != replace) {
    var getvalue = replace.getAttribute("class");
    replace.innerHTML='<a href="http://s06.flagcounter.com/more/iZiB"><img src="http://s06.flagcounter.com/count/iZiB/bg_ECECEC/txt_000000/border_FF0000/columns_3/maxflags_30/viewers_0/labels_1/pageviews_0/flags_0/" alt="free counters" border="0"></a>';
  }
}


if (window.addEventListener) {window.addEventListener("load",onloadhookcustom,false);}
else if (window.attachEvent) {window.attachEvent("onload",onloadhookcustom);}


/*** Auto-refreshing recent changes ***/

importScriptPage('AjaxRC/code.js', 'dev');
AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages = ["Special:WikiActivity","Special:RecentChanges","Special:Watchlist","Special:Log","Special:Contributions"];
var ajaxRefresh = 30000;