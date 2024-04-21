// Any JavaScript here will be loaded for all users on every page load.

// Collapsible lists

$('h2:contains("Appearances and references")+ul').wrap('<div class="collapsible-list">');
$('h2:contains("Bibliography")+ul').wrap('<div class="collapsible-list">');
$('h2:contains("Credits")+ul').wrap('<div class="collapsible-list">');
$('h2:contains("Contents")+ul').wrap('<div class="collapsible-list">');

var smallTreeCount = 5;

$('.collapsible-list').each(function(index, currentTree){
  const currentButtonID = 'mainButton-'+index;
  const numberOfSubLists = $(this).find('ul li ul').length;
  const total = $(this).find('ul li').length - numberOfSubLists;
  const buttonLabel = (total > smallTreeCount) ? 'show all' : 'hide all';
  const button = (numberOfSubLists === 0) ? '' : ' <small>(<a id="'+currentButtonID+'" class="show-hide-button">'+buttonLabel+'</a>)</small>';
  const desc = $('<div>This list includes '+total+' items'+button+'.</div>');

  $(this).prepend(desc);

  if (total > smallTreeCount){
    $(this).find('ul li ul').hide();
  }

  $('#'+currentButtonID).click(function(){
    if ($(this).text() === "show all"){
      $(currentTree).find('ul li ul').show();
    } else {
      $(currentTree).find('ul li ul').hide();
    }

    $(this).text(($(this).text() === "show all") ? "hide all" : "show all");
  });
});

$('.collapsible-list li ul').each(function(index, currentTree){
  const currentButtonID = 'pane-'+index++;
  const total = $(this).find('li').length - $(this).find('ul').length;
  const button = '<a id="'+currentButtonID+'" class="show-hide-button">'+total+'</a>';

  $(this).before('<small>('+button+')</small>');

  $('#'+currentButtonID).click(function(){
    $(currentTree).toggle();
  });
});

// Fix red talk links

$('a.new#ca-talk').attr('href', '/wiki/'+mw.config.get("wgCanonicalNamespace")+' talk:'+mw.config.get("wgTitle"));

// Customizing text of auto-created user and user talk pages

window.AutoCreateUserPagesConfig = {
  content: {
    2: '{{Placeholder}}',
    3: '== Welcome ==\n\n{{Welcome}}'
  },
  summary: 'auto creating user and user talk pages',
  notify: '<a href="/wiki/User_talk:$2">Welcome to the Little Bear Wiki!</a>'
};

// Addition to the copyright footer

$('.license-description').append('For more information, see the <a href="/wiki/Copyright_Policy">Copyright Policy</a>.');

// For [[Template:Administration]]

$.getJSON("/api.php?action=listuserssearchuser&groups=bot,rollback,threadmoderator,content-moderator,sysop&contributed=1&limit=100&order=ts_edit&sort=desc&offset=0&format=json", function(json){
  const now = new Date().getTime();

  for (var i = 0; i < json.listuserssearchuser.result_count; i++){
    const username = json['listuserssearchuser'][i]['username'];
    const roles = json['listuserssearchuser'][i]['groups'].replace('*, autoconfirmed, ', '').replace('emailconfirmed, ', '').replace('map-tester, ', '').replace(', user', '').replace('sysop', 'admin');
    const numberOfEdits = json['listuserssearchuser'][i]['edit_count'];
    const lastEdit = json['listuserssearchuser'][i]['last_edit_date'];
    const lastEditComp = lastEdit.split(/,* /);
    const lastEditDate = new Date(lastEditComp[1]+' '+lastEditComp[2]+' '+lastEditComp[3]+' '+lastEditComp[0]+' UTC').getTime();

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

// For [[Little Bear Wiki:FCC]]

if ($(location.hash).attr('class') === 'FCC-link'){
  for (var i = 0; i < 5; i++){
    setTimeout(function(){
      $(window).scrollTop(0);
    }, i * 1000);
  }

  $(location.hash).css('font-weight', 'bold');
}

// Signature

$.getJSON("/api.php?action=query&meta=userinfo&format=json", function(json){
  const username = json.query.userinfo.name;
  const signature = (json.query.userinfo.id === 0) ? '<a href="/wiki/Special:Contributions/'+username+'">'+username+'</a>' : '<a href="/wiki/User:'+username+'">'+username+'</a> (<a href="/wiki/User talk:'+username+'">talk</a>)';

  $('.signature').html(signature);
});

// Prevent default

$('[href="#"]').click(function(event){
  event.preventDefault();
});

$('[href^="#cite_note"]').click(function(event){
  event.preventDefault();
});