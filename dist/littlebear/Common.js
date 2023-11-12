/* Any JavaScript here will be loaded for all users on every page load. */

/* Format list sections */

$('h2:contains("Appearances and references")+ol').wrap('<div class="mw-collapsible" id="mw-customcollapsible-list"/>');

$('h2:contains("Little Bear bibliography")+ol').wrap('<div class="mw-collapsible" id="mw-customcollapsible-list"/>');

$('h2:contains("Little Bear filmography")+ol').wrap('<div class="mw-collapsible" id="mw-customcollapsible-list"/>');

$('h2:contains("Little Bear bibliography and filmography")+ol').wrap('<div class="mw-collapsible" id="mw-customcollapsible-list"/>');

var listItems = $('div#mw-customcollapsible-list > ol > li > ol > li');

if (listItems.length > 10){
  $('div#mw-customcollapsible-list').addClass('mw-collapsed');
}

$('div#mw-customcollapsible-list').before('This list includes '+listItems.length+' items. <small>(<a class="mw-customtoggle-list" style="cursor:pointer;">show / hide</a>)</small>');

/* Hide link returning to base page on subpages in the main namespace */

if(mw.config.get('wgNamespaceNumber') === 0){
  $('div.page-header__page-subtitle').css('display','none');
}