/* Any JavaScript here will be loaded for all users on every page load. */

/* Format list sections */

$('h2:contains("Appearances and references")+ul').wrap('<div class="mw-collapsible" id="mw-customcollapsible-list"/>');

$('h2:contains("Credits")+ul').wrap('<div class="mw-collapsible" id="mw-customcollapsible-list"/>');

$('h2:contains("Contents")+ul').wrap('<div class="mw-collapsible" id="mw-customcollapsible-list"/>');

var listItems = $('div#mw-customcollapsible-list > ul > li > ul > li');

if (listItems.length > 10){
  $('div#mw-customcollapsible-list').addClass('mw-collapsed');
}

$('div#mw-customcollapsible-list').before('<span>This list includes '+listItems.length+' items. <small id="show-hide-button">(<a class="mw-customtoggle-list">show / hide</a>)</small></span>');

/* Hide link returning to base page on subpages in the main namespace */

if(mw.config.get('wgNamespaceNumber') === 0){
  $('div.page-header__page-subtitle').css('display', 'none');
}

/* Fix red talk links */

$('a.new#ca-talk').attr('href', function(i, origValue){
  return origValue+'&section=new';
});

/* Customizing text of auto-created user and user talk pages */

window.AutoCreateUserPagesConfig = {
  content: {
    2: '{{Placeholder}}',
    3: '{{Welcome}}'
  },
  summary: 'auto creating user and user talk pages',
  notify: '<a href="/wiki/User_talk:$2">Welcome to the Little Bear Wiki!</a>'
};