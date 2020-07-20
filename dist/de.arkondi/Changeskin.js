/* Monobook Button */
var sfwMonobookSwitch = document.createElement("a"); 
sfwMonobookSwitch.className = "wikia-button";
sfwMonobookSwitch.id = "SFWMonobookSwitch"; 
sfwMonobookSwitch.href = "?useskin=monobook"; 
sfwMonobookSwitch.innerHTML = "Monobook"; 
document.getElementsByClassName('header-container')[0].appendChild(sfwMonobookSwitch);
 
mw.loader.using( ['jquery.ui.tabs'], function() {
$(document).ready(function() {
  var $tabs = $("#portal_slider").tabs({ fx: {opacity:'toggle', duration:100} } );
  $("[class^=portal_sliderlink]").click(function() { // bind click event to link
    var num = this.className.replace("portal_sliderlink_", "").replace(" jump","");    
    $tabs.tabs('select', num );
    $('.jump').text('·');
    $('.portal_sliderlink_' + num + '.jump').text('•');
    return false;
  });
  $('#portal_next').click(function() {
    var num = ($tabs.tabs('option', 'selected') == ($tabs.tabs('length'))-1) ? 0 : $tabs.tabs('option', 'selected') + 1;
    $tabs.tabs('select', num ); // switch to next tab
    $('.jump').text('·');
    $('.portal_sliderlink_' + (num+1) + '.jump').text('•');
    return false;
  });
  $('#portal_prev').click(function() { // bind click event to link
    var num = ($tabs.tabs('option', 'selected') == 0) ? ($tabs.tabs('length')-1) : $tabs.tabs('option', 'selected') - 1;
    $tabs.tabs('select', num ); // switch to previous tab
    $('.jump').text('·');
    $('.portal_sliderlink_' + (num+1) + '.jump').text('•');
    return false;
  });
});
} );

/* Wikiamobile Button */
var sfwWikiamobileSwitch = document.createElement("a"); 
sfwWikiamobileSwitch.className = "wikia-button";
sfwWikiamobileSwitch.id = "SFWWikiamobileSwitch"; 
sfwWikiamobileSwitch.href = "?useskin=wikiamobile"; 
sfwWikiamobileSwitch.innerHTML = "Wikiamobile"; 
document.getElementsByClassName('header-container')[0].appendChild(sfwWikiamobileSwitch);
 
mw.loader.using( ['jquery.ui.tabs'], function() {
$(document).ready(function() {
  var $tabs = $("#portal_slider").tabs({ fx: {opacity:'toggle', duration:100} } );
  $("[class^=portal_sliderlink]").click(function() { // bind click event to link
    var num = this.className.replace("portal_sliderlink_", "").replace(" jump","");    
    $tabs.tabs('select', num );
    $('.jump').text('·');
    $('.portal_sliderlink_' + num + '.jump').text('•');
    return false;
  });
  $('#portal_next').click(function() {
    var num = ($tabs.tabs('option', 'selected') == ($tabs.tabs('length'))-1) ? 0 : $tabs.tabs('option', 'selected') + 1;
    $tabs.tabs('select', num ); // switch to next tab
    $('.jump').text('·');
    $('.portal_sliderlink_' + (num+1) + '.jump').text('•');
    return false;
  });
  $('#portal_prev').click(function() { // bind click event to link
    var num = ($tabs.tabs('option', 'selected') == 0) ? ($tabs.tabs('length')-1) : $tabs.tabs('option', 'selected') - 1;
    $tabs.tabs('select', num ); // switch to previous tab
    $('.jump').text('·');
    $('.portal_sliderlink_' + (num+1) + '.jump').text('•');
    return false;
  });
});
} );