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

ta = {};
ta['pt-userpage'] = ['.','My user page']; 
ta['pt-anonuserpage'] = ['.','The user page for the ip you\'re editing as']; 
ta['pt-mytalk'] = ['n','My talk page']; 
ta['pt-anontalk'] = ['n','Discussion about edits from this ip address']; 
ta['pt-preferences'] = ['','My preferences']; 
ta['pt-watchlist'] = ['l','List of pages I\'m monitoring for changes']; 
ta['pt-mycontris'] = ['y','List of my contributions']; 
ta['pt-login'] = ['o','You are encouraged to log in; it is not mandatory, however']; 
ta['pt-anonlogin'] = ['o','You are encouraged to log in; it is not mandatory, however']; 
ta['pt-logout'] = ['o','Log out']; 
ta['ca-talk'] = ['t','Discussion about the content page']; 
ta['ca-edit'] = ['e','You can edit this page; please use the preview button before saving']; 
ta['ca-addsection'] = ['+','Add a comment to this discussion']; 
ta['ca-viewsource'] = ['e','This page is protected; you can view its source']; 
ta['ca-history'] = ['h','Past versions of this page']; 
ta['ca-protect'] = ['=','Protect this page']; 
ta['ca-delete'] = ['d','Delete this page']; 
ta['ca-undelete'] = ['d','Restore the edits done to this page before it was deleted']; 
ta['ca-move'] = ['m','Move this page']; 
ta['ca-nomove'] = ['','You don\'t have the permissions to move this page']; 
ta['ca-watch'] = ['w','Add this page to your watchlist']; 
ta['ca-unwatch'] = ['w','Remove this page from your watchlist']; 
ta['search'] = ['','Search Memory Alpha']; 
ta['p-logo'] = ['z','Main Page']; 
ta['n-mainpage'] = ['z','Visit the Main Page']; 
ta['n-Main-page'] = ['z','Visit the Main Page']; 
ta['n-portal'] = ['','About the project, what you can do, where to find things']; 
ta['n-Chat'] = ['','IRC, the place to chat'];
ta['n-currentevents'] = ['','Find background information on current events']; 
ta['n-recentchanges'] = ['r','The list of recent changes in the wiki']; 
ta['n-randompage'] = ['x','Load a random page']; 
ta['n-help'] = ['/','The place to find out information']; 
ta['n-sitesupport'] = ['','Support us']; 
ta['t-whatlinkshere'] = ['j','List of all wiki pages that link here']; 
ta['t-recentchangeslinked'] = ['k','Recent changes in pages linking to this page']; 
ta['feed-rss'] = ['','RSS feed for this page']; 
ta['feed-atom'] = ['','Atom feed for this page']; 
ta['t-contributions'] = ['','View the list of contributions of this user']; 
ta['t-emailuser'] = ['','Send a mail to this user']; 
ta['t-upload'] = ['u','Upload images or media files']; 
ta['t-specialpages'] = ['q','List of all special pages']; 
ta['ca-nstab-main'] = ['c','View the content page']; 
ta['ca-nstab-user'] = ['c','View the user page']; 
ta['ca-nstab-media'] = ['c','View the media page']; 
ta['ca-nstab-special'] = ['','This is a special page; you can\'t edit the page itself.']; 
ta['ca-nstab-wp'] = ['c','View the project page']; 
ta['ca-nstab-image'] = ['c','View the image page']; 
ta['ca-nstab-mediawiki'] = ['c','View the system message']; 
ta['ca-nstab-template'] = ['c','View the template']; 
ta['ca-nstab-help'] = ['c','View the help page']; 
ta['ca-nstab-category'] = ['c','View the category page'];
*/

/*
// Personalized MA copyright notice

$(function(){
  $('.license-description').append('See <a href="/wiki/Memory_Alpha:Copyrights">Memory Alpha\'s copyright information</a> for full details.');
});
*/

// Re-add proper namespace prefix to titles where it has been removed "by design"

$.getJSON('/api.php?action=query&prop=info&titles='+mw.config.get('wgPageName')+'&inprop=displaytitle&format=json', function(json){
  $('#firstHeading').html(json.query.pages[mw.config.get('wgArticleId')].displaytitle);
});

// Tabs in sidebars

var localImageHeights = [];

$('.pi-item.wds-tabber').each(function(){
  var localImages = $(this).find('.pi-image-thumbnail');

  localImages.each(function(){
    localImageHeights.push($(this).attr('height'));
  });

  var height = Math.min.apply(this, localImageHeights);

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
  var talkLink = $('.ns-110 #ca-talk');

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