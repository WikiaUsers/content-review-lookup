/* <nowiki> */
 
/* ######################################################################## */
/* ### JavaScript here is loaded for all users and all skins.           ### */
/* ######################################################################## */
 
/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */
 
function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
 }
 addOnloadHook(UserNameReplace);
 
/* End of the {{USERNAME}} replacement */


importScriptPage('AjaxRC/code.js', 'dev');
 
importScriptPage('CollapsibleEdittools/code.js', 'dev');
 
importScriptPage('AjaxBatchDelete/code.js', 'dev');
 
/* Auto updating recent changes opt-in
 * See w:c:dev:AjaxRC for info & attribution 
 */
 
AjaxRCRefreshText = 'Auto-Refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages = ["Special:RecentChanges","Special:WikiActivity","Special:Log","Special:Contributions"];
importScriptPage('AjaxRC/code.js', 'dev');
 
/**
 * Open chat in a new popup window
 */
$(".openchat a").click(function() {
   window.open('/wiki/Special:Chat', 'wikiachat', 'width=600,height=600,menubar=no,status=no,location=no,toolbar=no,scrollbars=no,resizable=yes');
   return false;
});
  
$(function() {
	if(skin == "oasis") {
		var $sidebar = $('.WikiaPagesOnWikiModule:first');
		var comboString = "<div style='margin-top:5px; align:center'><table style='width:100%'><td style='*'>You can now <a href='http://leagueoflegends.wikia.com/wiki/Special:Chat'>chat</a>with other editors! Feel free to stop by and try it out.<br /></td><td style='text-align:right'><a href='http://leagueoflegends.wikia.com/wiki/Special:Chat' target='_top'><img src='http://images4.wikia.nocookie.net/__cb20100916010650/leagueoflegends/images/5/5f/HymnofValor.jpg' alt='Brick' border=0 /></a></td></tr></table></div>";
 
		$sidebar.html($sidebar.html() + comboString);
	} else if(skin == "monobook") {
		var $sidebar = $('#p-wikicities-nav');
		var comboString = "<div style='margin:5px'></div><h5>Chat</h5><div class='pBody'><div style='margin-top:2px; margin-bottom:5px'><table style='width:100%; text-align:center'><tr><td style='font-size:85%'>Go on the new <a href='http://leagueoflegends.wikia.com/wiki/Special:Chat?useskin=wikia'>Chat.</a><br /></td></tr><tr><td><a href='http://leagueoflegends.wikia.com/wiki/Special:Chat?useskin=wikia' target='_top'><img src='http://images4.wikia.nocookie.net/__cb20100916010650/leagueoflegends/images/5/5f/HymnofValor.jpg' alt='Brick' border=0 /></a></td></tr></table></div></div>";
		$sidebar.html($sidebar.html() + comboString);
	}
})
 
/***********************************************************/
/* Sliders using jquery by User:Tierrie in Dragon Age Wiki */
/***********************************************************/
//wsl.loadScript("http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/jquery-ui.min.js");
wsl.loadScript("http://dragonage.wikia.com/index.php?title=MediaWiki:Jquery-ui.min.js&action=raw&ctype=text/javascript");
 
$(document).ready(function() {
  var $tabs = $("#portal_slider").tabs({ fx: {opacity:'toggle', duration:100} } );
  $("[class^=portal_sliderlink]").click(function() { // bind click event to link
    $tabs.tabs('select', this.className.replace("portal_sliderlink_", ""));
    return false;
  });
  $('#portal_next').click(function() {
    $tabs.tabs('select', ($tabs.tabs('option', 'selected') == ($tabs.tabs('length'))-1) ? 0 : $tabs.tabs('option', 'selected') + 1 ); // switch to next tab
    return false;
  });
  $('#portal_prev').click(function() { // bind click event to link
    $tabs.tabs('select', ($tabs.tabs('option', 'selected') == 0) ? ($tabs.tabs('length')-1) : $tabs.tabs('option', 'selected') - 1 ); // switch to previous tab
    return false;
  });
});
hookEvent( 'load', displayTimer );
 
function displayTimer ()
{
    if ( typeof( timerDisplay ) !== 'undefined' && timerDisplay === false )
        return;
 
    var date;
 
    if (skin == 'oasis')
    {
    var timerParent = document.getElementById( 'WikiHeader' ).getElementsByTagName( 'div' )[0];
    }
 
    if (skin == 'monobook')
    {
    var timerParent = document.getElementById( 'p-personal' ).getElementsByTagName( 'ul' )[0];
    }
 
    var timerLink   = document.createElement( 'a' );
    var timerObj    = document.createElement( 'li' );
    timerLink.href               = '/wiki/' + wgPageName + '?action=purge';
    timerLink.title              = 'Purge the server cache and update the contents of this page.'
    timerObj.id                  = 'displayTimer';
    timerObj.style.textTransform = 'none';
    timerObj.style.fontWeight    = 'bold';
    timerObj.style.fontSize      = '100%';
    timerObj.appendChild( timerLink );
    timerParent.insertBefore( timerObj, timerParent.firstChild );
 
    if (skin == 'oasis')
}
 
/* </nowiki> */