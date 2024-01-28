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

/* For [[Template:Administration]] */

$.getJSON("/api.php?action=listuserssearchuser&groups=sysop&contributed=0&limit=10&order=ts_edit&sort=desc&offset=0&format=json", function(json){
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
  const currentDate = new Date().getDate();

  var usernameOne = json['listuserssearchuser']['0']['username'];
  var rolesOne = json['listuserssearchuser']['0']['groups'].replace('*, autoconfirmed, ', '').replace('emailconfirmed, ', '').replace('map-tester, ', '').replace(', user', '').replace('sysop', 'admin');
  var numberOfEditsOne = json['listuserssearchuser']['0']['edit_count'];
  var lastEditOne = json['listuserssearchuser']['0']['last_edit_date'];
  var lastEditDateOne = new Date(lastEditOne.split(', ')[1]);
  var lastEditDiffOne = json['listuserssearchuser']['0']['diff_edit_url'];

  var usernameTwo = json['listuserssearchuser']['1']['username'];
  var rolesTwo = json['listuserssearchuser']['1']['groups'].replace('*, autoconfirmed, ', '').replace('emailconfirmed, ', '').replace('map-tester, ', '').replace(', user', '').replace('sysop', 'admin');
  var numberOfEditsTwo = json['listuserssearchuser']['1']['edit_count'];
  var lastEditTwo = json['listuserssearchuser']['1']['last_edit_date'];
  var lastEditDateTwo = new Date(lastEditOne.split(', ')[1]);
  var lastEditDiffTwo = json['listuserssearchuser']['1']['diff_edit_url'];

  $('.administration').append('<tr><td><a href="/wiki/User:'+usernameOne+'">'+usernameOne+'</a></td><td>'+rolesOne+'</td><td>'+numberOfEditsOne+'</td><td><a href="'+lastEditDiffOne+'">'+lastEditOne+'</a></td><td class="statusOne"></td></tr><tr><td><a href="/wiki/User:'+usernameTwo+'">'+usernameTwo+'</a></td><td>'+rolesTwo+'</td><td>'+numberOfEditsTwo+'</td><td><a href="'+lastEditDiffTwo+'">'+lastEditTwo+'</a></td><td class="statusTwo"></td></tr>');

  if (lastEditDateOne.getFullYear() < currentYear && lastEditDateOne.getMonth() < currentMonth && lastEditDateOne.getDate() < currentDate){
    $('.statusOne').attr('id', 'inactive').html('Inactive');
  } else if (lastEditDateOne.getMonth() < currentMonth){
    $('.statusOne').attr('id', 'semi-active').html('Semi-active');
  } else {
    $('.statusOne').attr('id', 'active').html('Active');
  }

  if (lastEditDateTwo.getFullYear() < currentYear && lastEditDateTwo.getMonth() < currentMonth && lastEditDateTwo.getDate() < currentDate){
    $('.statusTwo').attr('id', 'inactive').html('Inactive');
  } else if (lastEditDateTwo.getMonth() < currentMonth){
    $('.statusTwo').attr('id', 'semi-active').html('Semi-active');
  } else {
    $('.statusTwo').attr('id', 'active').html('Active');
  }
});