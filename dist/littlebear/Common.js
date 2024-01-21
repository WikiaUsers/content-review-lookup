/* Any JavaScript here will be loaded for all users on every page load. */

/* Fix reference popups on iPads */

mw.loader.load('//en.wikipedia.org/wiki/MediaWiki:Gadget-ReferenceTooltips.js?oldid=1006234032&action=raw&ctype=text/javascript');
mw.loader.load('//en.wikipedia.org/wiki/MediaWiki:Gadget-ReferenceTooltips.css?oldid=1162041707&action=raw&ctype=text/css');

/* Format list sections */

$('h2:contains("Appearances and references")+ul').wrap('<div class="mw-collapsible" id="mw-customcollapsible-list">');

$('h2:contains("Credits")+ul').wrap('<div class="mw-collapsible" id="mw-customcollapsible-list">');

$('h2:contains("Contents")+ul').wrap('<div class="mw-collapsible" id="mw-customcollapsible-list">');

var listItems = $('div#mw-customcollapsible-list > ul > li > ul > li');

if (listItems.length > 10){
  $('div#mw-customcollapsible-list').addClass('mw-collapsed');
}

$('div#mw-customcollapsible-list').before('<span>This list includes '+listItems.length+' items. <small id="show-hide-button">(<a class="mw-customtoggle-list">show / hide</a>)</small></span>');

/* Fix red talk links */

$('a.new#ca-talk').attr('href', '/wiki/'+mw.config.get("wgCanonicalNamespace")+' talk:'+mw.config.get("wgTitle"));

/* Customizing text of auto-created user and user talk pages */

window.AutoCreateUserPagesConfig = {
  content: {
    2: '{{Placeholder}}',
    3: '== Welcome ==\n\n{{Welcome}}'
  },
  summary: 'auto creating user and user talk pages',
  notify: '<a href="/wiki/User_talk:$2">Welcome to the Little Bear Wiki!</a>'
};

/* Addition to the copyright footer */

$('.license-description').append('For more information, see the <a href="/wiki/Copyright_Policy">Copyright Policy</a>.');

/* KayleighMJ avatar */

$('#KayleighMJ-image img').wrap('<a href="/wiki/User:KayleighMJ">');