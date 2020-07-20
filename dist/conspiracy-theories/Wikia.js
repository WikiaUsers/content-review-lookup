importScriptPage('InactiveUsers/code.js', 'dev');
importScriptPage('BackToTopButton/code.js', 'dev');
importScriptPage('FloatingToc/code.js', 'dev');
importScriptPage('ShowHide/code.js', 'dev');
importScriptPage('EditIntroButton/code.js', 'dev');
importScriptPage('AjaxRC/code.js', 'dev');
importScriptPage('SignatureCheck/code.js', 'dev');
importScriptPage('AutoEditDropdown/code.js', 'dev');
importScriptPage('PurgeButton/code.js', 'dev');
importScriptPage('RevealAnonIP/code.js', 'dev');
importScriptPage('ListFiles/code.js', 'dev');
importScriptPage('View_Source/code.js', 'dev');
importScriptPage('ReferencePopups/code.js', 'dev');
importScriptPage('ArchiveTool/code.js', 'dev');
importScriptPage('FastDelete/code.js', 'dev');
importScriptPage('AllPagesHideRedirect/code.js', 'dev');
importScriptPage('Highlight/code.css', 'dev');
importScriptPage('Countdown/code.js', 'dev');
importScriptPage('MediaWiki:Wikia.js/cancelButton.js', 'admintools');
importScriptPage('MediaWiki:Common.js/accountNavigation.js', 'runescape');
importScriptPage('MediaWiki:Common.js/StandardEditSummaries.js', 'terraria');
importScriptPage('MediaWiki:Wikia.js/editCount.js', 'rhf');
importScriptPage('MediaWiki:Wikia.js/Ticker.js', 'rhf');
importScriptPage('MediaWiki:Wikia.js/DisplayTimer.js', 'rhf');
importScriptPage('MediaWiki:Wikia.js/aboutus.js', 'rhf');
importScriptPage('MediaWiki:Wikia.js/userRightsIcons.js', 'conspiracy-theories');
importScriptPage('MediaWiki:Wikia.js/SubNav.js', 'conspiracy-theories');
importScriptPage('MediaWiki:Wikia.js/clock.js', 'conspiracy-theories');
importScriptPage('MediaWiki:Wikia.js/changeskin.js', 'conspiracy-theories');
importScriptPage('MediaWiki:Wikia.js/ajax.js', 'conspiracy-theories');
importScriptPage('MediaWiki:Wikia.js/wrappers.js', 'conspiracy-theories');
 
if (!$('script[src*="title=User:'+wgUserName+'/wikia.js"]').length) {
    importScript('User:' + wgUserName + '/wikia.js');
}
 
if (!$('link[href*="title=User:'+wgUserName+'/wikia.css"]').length) {
    importStylesheet('User:' + wgUserName + '/wikia.css');
}
 
/* Insert username for {{USERNAME}} */
$(function() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").text(wgUserName);
});
 
$(document).ready(function() {
    if ( skin == 'oasis' && $.inArray("staff", wgUserGroups) == -1) {
        $('.WikiHeader nav ul li.marked ul').append('<li><a class="subnav-2a" href="/wiki/Forum:Index">Forum</a></li>');
    }
});