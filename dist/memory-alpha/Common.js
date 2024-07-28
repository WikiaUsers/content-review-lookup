// <pre>

// Configuration for [[MediaWiki:ImportJS]]

window.AutoCreateUserPagesConfig = {
  content: {
    2: '{{subst:newuser}}',
    3: '{{subst:welcome}}',
  },
  summary: 'Script: Creating user+talkpage on first edit'
};

/*
// Tooltips and access keys

ta = new Object();
ta['pt-userpage'] = new Array('.','My user page'); 
ta['pt-anonuserpage'] = new Array('.','The user page for the ip you\'re editing as'); 
ta['pt-mytalk'] = new Array('n','My talk page'); 
ta['pt-anontalk'] = new Array('n','Discussion about edits from this ip address'); 
ta['pt-preferences'] = new Array('','My preferences'); 
ta['pt-watchlist'] = new Array('l','List of pages I\'m monitoring for changes'); 
ta['pt-mycontris'] = new Array('y','List of my contributions'); 
ta['pt-login'] = new Array('o','You are encouraged to log in; it is not mandatory, however'); 
ta['pt-anonlogin'] = new Array('o','You are encouraged to log in; it is not mandatory, however'); 
ta['pt-logout'] = new Array('o','Log out'); 
ta['ca-talk'] = new Array('t','Discussion about the content page'); 
ta['ca-edit'] = new Array('e','You can edit this page; please use the preview button before saving'); 
ta['ca-addsection'] = new Array('+','Add a comment to this discussion'); 
ta['ca-viewsource'] = new Array('e','This page is protected; you can view its source'); 
ta['ca-history'] = new Array('h','Past versions of this page'); 
ta['ca-protect'] = new Array('=','Protect this page'); 
ta['ca-delete'] = new Array('d','Delete this page'); 
ta['ca-undelete'] = new Array('d','Restore the edits done to this page before it was deleted'); 
ta['ca-move'] = new Array('m','Move this page'); 
ta['ca-nomove'] = new Array('','You don\'t have the permissions to move this page'); 
ta['ca-watch'] = new Array('w','Add this page to your watchlist'); 
ta['ca-unwatch'] = new Array('w','Remove this page from your watchlist'); 
ta['search'] = new Array('','Search Memory Alpha'); 
ta['p-logo'] = new Array('z','Main Page'); 
ta['n-mainpage'] = new Array('z','Visit the Main Page'); 
ta['n-Main-page'] = new Array('z','Visit the Main Page'); 
ta['n-portal'] = new Array('','About the project, what you can do, where to find things'); 
ta['n-Chat'] = new Array('','IRC, the place to chat');
ta['n-currentevents'] = new Array('','Find background information on current events'); 
ta['n-recentchanges'] = new Array('r','The list of recent changes in the wiki'); 
ta['n-randompage'] = new Array('x','Load a random page'); 
ta['n-help'] = new Array('/','The place to find out information'); 
ta['n-sitesupport'] = new Array('','Support us'); 
ta['t-whatlinkshere'] = new Array('j','List of all wiki pages that link here'); 
ta['t-recentchangeslinked'] = new Array('k','Recent changes in pages linking to this page'); 
ta['feed-rss'] = new Array('','RSS feed for this page'); 
ta['feed-atom'] = new Array('','Atom feed for this page'); 
ta['t-contributions'] = new Array('','View the list of contributions of this user'); 
ta['t-emailuser'] = new Array('','Send a mail to this user'); 
ta['t-upload'] = new Array('u','Upload images or media files'); 
ta['t-specialpages'] = new Array('q','List of all special pages'); 
ta['ca-nstab-main'] = new Array('c','View the content page'); 
ta['ca-nstab-user'] = new Array('c','View the user page'); 
ta['ca-nstab-media'] = new Array('c','View the media page'); 
ta['ca-nstab-special'] = new Array('','This is a special page; you can\'t edit the page itself.'); 
ta['ca-nstab-wp'] = new Array('c','View the project page'); 
ta['ca-nstab-image'] = new Array('c','View the image page'); 
ta['ca-nstab-mediawiki'] = new Array('c','View the system message'); 
ta['ca-nstab-template'] = new Array('c','View the template'); 
ta['ca-nstab-help'] = new Array('c','View the help page'); 
ta['ca-nstab-category'] = new Array('c','View the category page');

*/

// Personalized MA copyright notice

$(function(){
  $('.license-description').append('See <a href="/wiki/Memory_Alpha:Copyrights">Memory Alpha\'s copyright information</a> for full details.');
});

// Re-add proper namespace prefix to titles where it has been removed "by design"

$.getJSON('/api.php?action=query&prop=info&titles='+mw.config.get('wgPageName')+'&inprop=displaytitle&format=json', function(json){
  $('#firstHeading').html(json.query.pages[mw.config.get('wgArticleId')].displaytitle);
});

// Tabs in sidebars

var localImageHeights = [];

$('.pi-item.wds-tabber').each(function(){
  const localImages = $(this).find('.pi-image-thumbnail');

  localImages.each(function(){
    localImageHeights.push($(this).attr('height'));
  });

  const height = Math.min.apply(this, localImageHeights);

  localImages.each(function(){
    $(this).css({'height':height, 'width':'auto'});
  });

  localImageHeights = [];
});

// Correcting link behavior

$(function(){
  $('.internal-external-link [href^="https://memory-alpha.fandom.com/"]').removeAttr('target rel class');
});

// Remove "talk" link from forums

$(function(){
  const talkLink = $('.ns-110 #ca-talk');

  if (talkLink.length === 0){
    return;
  }

  talkLink.parent().remove();
});

// Number of MA users

$(function(){
  new mw.Api().get({
    action:'listuserssearchuser',
    contributed:'1',
    limit:'0',
    order:'ts_edit',
    sort:'desc',
    offset:'0',
  }).done(function(result){
    $('.number-of-users').text(result.listuserssearchuser.result_count);
  });
});

// </pre>