/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */

/* sliders using jquery by User:Tierrie */
/****************************************/
//wsl.loadScript("http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/jquery-ui.min.js");
//wsl.loadScript("http://ru.elderscrolls.wikia.com/index.php?title=MediaWiki:Jquery-ui.min.js&action=raw&ctype=text/javascript");
 
mw.loader.using( ['jquery.ui'], function() {
$(document).ready(function() {
$('.factions img').hide(); 	$('.factions img').removeAttr('width').removeAttr('height'); 	var l=$('.factions tr').eq(1).find('td').height(); 	$('.factions tr').eq(1).find('img').css('max-height', l); 	$('.factions img').show(); 	if ($('.factions tr').eq(1).find('td').width()>=$('.factions img').width()) { 		$('.factions tr').eq(1).find('td').width($('.factions img').width()); 	}
  $('.id_upper').each(function() { $(this).html($(this).html().toUpperCase()); });
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
} );