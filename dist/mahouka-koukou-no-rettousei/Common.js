/* Any JavaScript here will be loaded for all users on every page load. */

/* Enables auto refresh on Recent Changes, Watchlist and Wiki Activity pages. Click the check mark if you want it. */
window.ajaxPages = ["Special:RecentChanges","Special:Watchlist","Special:WikiActivity"]
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';
importScriptPage('AjaxRC/code.js', 'dev');

/* Makes expand/collapse and hide/show work in comments
Thanks to camphalfbloodroleplay.wikia.com for the code */
$('#WikiaArticleComments').bind('DOMNodeInserted', function () {
    if ($('#WikiaArticleComments .mw-collapsible')) {
        console.log('Comment(s) loaded. Collapsing tables.');
        $('#WikiaArticleComments .mw-collapsible').makeCollapsible();
        $('#WikiaArticleComments .mw-collapsible-toggle').css('float', 'right');
    }
});

 
/****************************/
/* spoilers by User:Tierrie */
/****************************/
/* Changed by Rockmosis */

$(document).ready(function(){
  console.log("MKnRWiki: Spoilers script loaded");
 
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