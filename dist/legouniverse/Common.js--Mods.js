/* Any JavaScript here will be loaded for all users on every page load. */
/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */

function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
 }
 addOnloadHook(UserNameReplace);

/* End of the {{USERNAME}} replacement */

/* AJAX */
importScriptPage('MediaWiki:AjaxRC/code.js', 'legouniverse');
ajaxPages = ["Special:RecentChanges","Special:WikiActivity","Special:NewPages","LEGO_Universe_Wiki:Mod_Tools/Recent_Changes"];

/* displayTimer */
importScriptPage('MediaWiki:Common.js/displayTimer.js', 'legouniverse');

/* MOS */
$('ul.tools li:first-child').after('<li><a style="color:white" href="/index.php?title=LEGO Universe Wiki:Manual of Style">Please view the Manual of Style</a></li>');
importScriptPage('MediaWiki:Common.js/MOS.js', 'legouniverse');

/* PlusOne */
$('ul.commentslikes li:first-child').after('<script type="text/javascript" src="https://apis.google.com/js/plusone.js"></script><li class=plusone><g:plusone href="http://legouniverse.wikia.com/" size="small"></g:plusone></li>');

/* EditorTemplates */
importScriptPage('MediaWiki:Common.js/Mods.js/ET.js', 'legouniverse');

/* mpfriends */
$('body.page-LEGO_Universe_Wiki .mpfriends .external.text').attr( 'class', 'text' );