/* Brizingr5: WeaponInfobox. Modificated by Wildream */
var Infobox_x = false;
 
$('.Infobox_Parent').mouseenter(function () {
    if (Infobox_x == false) {
        $('.Infobox_Collapsible').fadeIn(300);
    }
});
 
$('.Infobox_Parent').mouseleave(function () {
    if (Infobox_x == false) {
        $('.Infobox_Collapsible').fadeOut(300);
    }
});
 
$('.Infobox_Parent').click(function () {
    if (Infobox_x == false) {
        Infobox_x = true;
        $('.Infobox_Glow').css('box-shadow', '0 0 10px 4px none');
        return;
    }
    if (Infobox_x == true) {
        Infobox_x = false;
        $('.Infobox_Glow').css('box-shadow', '3px 3px 2px 0px black');
        return;
    }
});

/* Кнопка Вверх */
importScriptPage('MediaWiki:Common.js/BackToTopButton.js', 'ru.terraria');

/****************************************/
/* sliders using jquery by User:Tierrie */
/****************************************/
//wsl.loadScript("http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/jquery-ui.min.js");
//wsl.loadScript("http://ru.elderscrolls.wikia.com/index.php?title=MediaWiki:Jquery-ui.min.js&action=raw&ctype=text/javascript");
 
mw.loader.using( ['jquery.ui.tabs'], function() {
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