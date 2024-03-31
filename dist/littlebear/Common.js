/* Any JavaScript here will be loaded for all users on every page load. */

/* Prevent default for reference popups */

$('[href^="#cite_note"]').click(function(event){
  event.preventDefault();
});

/* Format list sections */

$('h2:contains("Appearances and references")+ul').wrap('<div class="mw-collapsible" id="mw-customcollapsible-list">');

$('h2:contains("Credits")+ul').wrap('<div class="mw-collapsible" id="mw-customcollapsible-list">');

$('h2:contains("Contents")+ul').wrap('<div class="mw-collapsible" id="mw-customcollapsible-list">');

const listItems = $('div#mw-customcollapsible-list > ul > li > ul > li');

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

$.getJSON("/api.php?action=listuserssearchuser&groups=bot,rollback,threadmoderator,content-moderator,sysop&contributed=1&limit=100&order=ts_edit&sort=desc&offset=0&format=json", function(json){
  const now = new Date().getTime();

  for (var i = 0; i < json.listuserssearchuser.result_count; i++){
    const username = json['listuserssearchuser'][i]['username'];
    const roles = json['listuserssearchuser'][i]['groups'].replace('*, autoconfirmed, ', '').replace('emailconfirmed, ', '').replace('map-tester, ', '').replace(', user', '').replace('sysop', 'admin');
    const numberOfEdits = json['listuserssearchuser'][i]['edit_count'];
    const lastEdit = json['listuserssearchuser'][i]['last_edit_date'];
    const lastEditComp = lastEdit.split(', ');
    const lastEditDate = new Date(lastEditComp[1]+' '+lastEditComp[0]+' UTC').getTime();

    $('.administration').append('<tr><td><a href="/wiki/User:'+username+'">'+username+'</a></td><td>'+roles+'</td><td>'+numberOfEdits+'</td><td><a href="/wiki/Special:Contributions/'+username+'">'+lastEdit+'</a></td><td class="status"></td></tr>');

    if (now - lastEditDate > 31556952000){
      $('.status:last').addClass('inactive').html('Inactive');
    } else if (now - lastEditDate > 2629746000){
      $('.status:last').addClass('semi-active').html('Semi-active');
    } else {
      $('.status:last').addClass('active').html('Active');
    }
  }
});

/* For [[Little Bear Wiki:FCC]] */

if ($(location.hash).attr('class') === 'FCC-link'){
  for (var i = 0; i < 5; i++){
    setTimeout(function(){
      $(window).scrollTop(0);
    }, i * 1000);
  }

  $(location.hash).css('font-weight', 'bold');
}