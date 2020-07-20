/* Any JavaScript here will be loaded for all users on every page load. */
 

/* importScriptPages-start */

PurgeButtonText = 'Purge';
importScriptPage('PurgeButton/code.js', 'dev');

importScriptPage('ExternalImageLoader/code.js', 'dev');
importScriptPage('ReferencePopups/code.js', 'dev');
importScriptPage('Countdown/code.js', 'dev');
importScriptPage('AutoEditDropdown/code.js', 'dev');
importScriptPage('OasisToolbarButtons/code.js', 'dev');
importScriptPage('BackToTopButton/code.js', 'dev');
importScriptPage('PortableCSSPad/code.js', 'dev');
importScriptPage('SexyUserPage/code.js', 'dev');
importScriptPage('SignatureCheck/code.js', 'dev');
importScriptPage('AllPagesHideRedirect/code.js', 'dev');
importScriptPage('Highlight/code.css', 'dev');
importScriptPage('Countdown/code.js', 'dev');
importScriptPage('ShowHide/code.js', 'dev');

/* importScriptPages-end */

AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page'; 
ajaxPages = ["Special:RecentChanges","Special:WikiActivity"]; 
importScriptPage('AjaxRC/code.js', 'dev'); 

/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */

function UserNameReplace() {
    if (typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").text(wgUserName);
}
addOnloadHook(UserNameReplace);

/* End of the {{USERNAME}} replacement */



/****************************/
/* spoilers by User:Tierrie */
/****************************/
//Testing by Rockmosis
//Modify by Macho44    

$(document).ready(function(){
  console.log("AlderaminWiki: Spoilers script loaded");
 
  $('.sp_banner').click( function() {
    var id = $(this).parent().attr('class').match(/sp_id_[\d\w]+/)[0].split('sp_id_')[1];
 
    if( $('.sp_id_'+id+' .sp_wrn').css('display') == 'none') {
      $('.sp_id_'+id+' .sp_wrn').fadeIn(200, function() {
        $(this).show(200);
      });
      $('.sp_id_'+id+' .sp_txt').hide(0);
    } else {
      $('.sp_id_'+id+' .sp_wrn').fadeOut(200, function() {
        $(this).hide(200);
      });
      $('.sp_id_'+id+' .sp_txt').delay(200).show(0);
    }
  });
 
  var sp_on_page = {};
  $('.sp').each( function() {
    var id = $(this).attr('class').match(/sp_id_[\d\w]+/)[0].split('sp_id_')[1];
    sp_on_page[id] = undefined;
  });
  console.log(id);
  for (var id in sp_on_page) {
    //Starts hidden every time
    $('.sp_id_'+id+' .sp_wrn').show(0);
    $('.sp_id_'+id+' .sp_txt').hide(0);
  }
});