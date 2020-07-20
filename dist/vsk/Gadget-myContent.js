/*
  Hide any WikiPage widgets that cannot be found at the current wiki community. 
  See also: [[w:c:messaging:MediaWiki:Widgetwikipagemissing]]
 
$( function() {
     $('.WidgetWikiPage .widget-error-wikipage-missing').closest('dd').parent('dl').hide(); }); //  uses the new class
});
*/
 
$( function() {
    $('.WidgetWikiPage i:contains("failed to load")').closest('dd').parent('dl').hide(); //  == PERFECT == BEST == works at Dashboard also
});