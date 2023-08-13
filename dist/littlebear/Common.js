/* Any JavaScript here will be loaded for all users on every page load. */

/* Format list sections */

$('h2:contains("Appearances and references")+ol').wrap('<div class="collapsible-list"/>');

$('h2:contains("Little Bear filmography")+ol').wrap('<div class="collapsible-list"/>');

$('h2:contains("Little Bear bibliography")+ol').wrap('<div class="collapsible-list"/>');

var listItems = $('div.collapsible-list > ol > li > ol > li');

var subLists = $('div.collapsible-list > ol > li > ol');

function button(){
  var buttonOne = $('<a>').html('Show/Hide').css('cursor','pointer').click(function(){
    if (subLists.css('display') == 'none'){
      subLists.css('display', 'block');
    } else {
      subLists.css('display', 'none');
    }
  });

  return buttonOne;
}

if (listItems.length < 10){
  subLists.css('display', 'block');
} else {
  subLists.css('display', 'none');
}

$('div.collapsible-list').prepend('<span class="collapsible-list-desc">This list includes '+listItems.length+' items.</span>');

$('span.collapsible-list-desc').append(' (').append(button()).append(')');

/* Hide link returning to base page on subpages in the main namespace */

if(mw.config.get('wgNamespaceNumber') === 0){
  $('div.page-header__page-subtitle').css('display','none');
}