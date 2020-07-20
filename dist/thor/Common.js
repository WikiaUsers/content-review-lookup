/* Any JavaScript here will be loaded for all users on every page load. */
/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */

function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
 }
 addOnloadHook(UserNameReplace);

importScriptPage('ShowHide/code.js', 'dev');

/* End of the {{USERNAME}} replacement */

/* Add UTC clock above articles */
importScript('MediaWiki:Common.js/displayTimer.js');

importScriptPage('BackToTopButton/code.js', 'dev');

importScriptPage('CollapsibleEdittools/code.js', 'dev');

EditIntroButtonText = 'Intro';
importScriptPage('EditIntroButton/code.js', 'dev')

importScriptPage('Countdown/code.js', 'dev');

importScriptPage('AutoEditDropdown/code.js', 'dev');

function addPageBottom() {
        $("#WikiaArticle").append('<div style="clear:both"><hr style="border-bottom:1px solid #C3B599; margin-top:20px"><table align="center"><tr><td><div style="width:300px"><form id="WikiaSearch" class="WikiaSearch" action="index.php?title=Special:Search"><input name="search" placeholder="Search Thor Wiki" type="text"><input type="hidden" name="fulltext" value="0"><input type="submit"><button class="secondary" style="height:27px"><img src="data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAQAICTAEAOw%3D%3D" class="sprite search" height="17" width="21"></button></form></div></td></tr></table>');
}

$(addPageBottom);

importScriptPage('PurgeButton/code.js', 'dev');

// Disable the button to add images to existing galleries
$(function(){
	$('#bodyContent .wikia-gallery-add a').unbind('click').click(function(){return false;});
});

//break

/* Any JavaScript here will be loaded for all users on every page load. */

 
// Ajax auto-refresh
var ajaxPages = ['Special:RecentChanges','Special:WikiActivity','Special:Contributions'];
var AjaxRCRefreshText = 'Auto-refresh';
importScriptPage('AjaxRC/code.js', 'dev');
var ajaxRefresh = 30000;
// END of ajax auto-refresh
 
addOnloadHook(checktimers);
 
// Credit to Beyblade wiki.
// Adding "My Contributions" to user menu. 
// Function: Adds "My Contributions" to the UserDropdownMenu.
function UserContribsMenuItem() {
	$('ul.AccountNavigation li:first-child ul.subnav li:first-child').after('<li><a href="/wiki/Special:Contributions/'+ encodeURIComponent (wgUserName) +'">My contributions</a></li>');
}
 
addOnloadHook(UserContribsMenuItem);
 
function onloadhookcustom() {
  var replace = document.getElementById("OnlineChat");
if (null != replace) {
    var getvalue = replace.getAttribute("class");
    replace.innerHTML='<object width="600" height="650" id="obj_1334882127625"><param name="movie" value="http://beybladewiki.chatango.com/group"/><param name="wmode" value="transparent"/><param name="AllowScriptAccess" VALUE="always"/><param name="AllowNetworking" VALUE="all"/><param name="AllowFullScreen" VALUE="true"/><param name="flashvars" value="cid=1334882127625&v=0&w=0"/><embed id="emb_1334882127625" src="http://beybladewiki.chatango.com/group" width="600" height="650" wmode="transparent" allowScriptAccess="always" allowNetworking="all" type="application/x-shockwave-flash" allowFullScreen="true" flashvars="cid=1334882127625&v=0&w=0"></embed></object><br>[ <a href="http://beybladewiki.chatango.com/clonegroup?ts=1334882127625">Copy this</a> | <a href="http://chatango.com/creategroup?ts=1334882127625">Start New</a> | <a href="http://beybladewiki.chatango.com">Full Size</a> ]';
  }
}
 
 
if (window.addEventListener) {window.addEventListener("load",onloadhookcustom,false);}
else if (window.attachEvent) {window.attachEvent("onload",onloadhookcustom);}

// http://dev.wikia.com/wiki/RevealAnonIP
window.RevealAnonIP = {
    permissions : ['rollback', 'sysop', 'bureaucrat']
};
importScriptPage('RevealAnonIP/code.js', 'dev');

importScriptPage('HideRail/code.js', 'dev');

// Create if not exists
if (!window.BotoneraPopups) {
	window.BotoneraPopups = {};
}
// Change key binding for opening popup
window.BotoneraPopups.displayOnKey = $.extend(true, window.BotoneraPopups.displayOnKey, {ctrlKey: true, altKey: false, shiftKey: false});

// BEGIN BotoneraPopups
importScriptURI('http://dev.wikia.com/wiki/BotoneraPopups/Code/en.js?action=raw&ctype=text/javascript&templates=expand');
importStylesheetPage('BotoneraPopups/code.css', 'dev');
// END