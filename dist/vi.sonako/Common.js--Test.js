;(function($, mw) {
var usergroups = mw.config.get('wgUserGroups').join(' '),
page = mw.config.get('wgPageName'),
specialpage = mw.config.get('wgCanonicalSpecialPageName'),
title = mw.config.get('wgTitle'),
action = mw.config.get('wgAction'),
sitename = mw.config.get('wgSiteName'),
href,
link;
  
/* IP lookup on contribs */
if (specialpage == "Contributions" && title.split('.').length == 4) {
  href = 'http://myip.ms/info/whois/' + page.split('/')[1],
  link = ' <a style="color:white" href="'+href+'">(lookup)</a>';
  $('.masthead-info').find('h2').html(link);
}
 
/* Create an edit link on [[Special:MovePage]] for easy redirecting */
if (specialpage == "Movepage") {
  href = $('fieldset').find('a').attr('href') + '?action=edit',
  link = ' <a href="'+href+'">(edit)</a>';
  $('#mw-movepage-table').find('a').first().after(link);
}
 
/* Unchecks redirects when moving files */
if (page.indexOf("Special:MovePage/File:") !== -1)
  $('#wpLeaveRedirect').removeAttr('checked'); 
 
/* Show abuse log entries in [[Special:Log/newusers]] */
if ("Special:Log/newusers".indexOf(page) !== -1) {
  $('li.mw-logline-newusers').each(function() {
    href = '/wiki/Special:AbuseLog?wpSearchUser=' + $(this).children('a.new.mw-userlink,a.mw-userlink').attr('href').substring(11),
    link = ' | <a href="'+href+'">abuse</a>';
    $(this).children('span.mw-usertoollinks').find('a:last-child').after(link);
  });
}
 
/* Create move link on [[Special:ListFiles]] for users' files listed */
if (specialpage == "ListFiles") {
  $('td.TablePager_col_img_name').each(function() {
    link = ' (<a href="/wiki/Special:MovePage/File:' + $(this).find('a').first().text() + '">move</a>)'; 
    $(this).append(link);
  });
}
 
/* Automatic broken redirect delete summary */
if (action == "delete" && $('#wpReason').val().slice(0,23) == 'content was: \"#REDIRECT' )
  $('#wpReason').val('[[Special:BrokenRedirects|Broken redirect]]');
 
/* Revision delete */
if (action == 'revisiondelete' || specialpage == 'Revisiondelete') {
  $('#wpHidePrimary,#wpHideComment,#wpHideUser').attr('checked','checked');
  $('#wpReason').val('[[w:Help:Spam|spam]]');
}
 
/* Thread history return to thread */
if (page.split(':')[0] == "Thread" && action == "history")
  $('.SortingBar').after('<a href="/wiki/'+page+'" style="font-size:14px">Back to thread</a>');
 
/* [[Special:WhatLinksHere]] to page dropdown menu */
$('#WikiaPageHeader > .wikia-menu-button > .WikiaMenuElement > li:last-child').after(
  $('<li/>').append('<a href="/wiki/Special:WhatLinksHere/'+page+'">What links here</a>')
);
 
/* Make Visual Editor links load the regular editor instead */
if ($.getUrlVar('veaction') == 'edit')
  location.replace(document.URL.replace('veaction','action'));
 
/* [[Special:WhatLinksHere]] on redirect page */
var h2header = $('#WikiaPageHeader').find('h2');
if (h2header.text().split('Redirected from').length == 2) {
  link = ' <a href="/wiki/Special:WhatLinksHere/'+h2header.children('a').attr('title')+'">(links)</a> <a href="/wiki/'+h2header.children('a').attr('title')+'?action=history">(history)</a>';
  h2header.append(link);
}
 
/* [[Special:SearchDigest]] better functionality */
if (specialpage == "SearchDigest") {
  $('#mw-content-text ul li').each(function() {
    link = $(this).children('a'),
    title = link.attr('title'),
    href = link.attr('href');
    if (title.split('(page does not exist)').length == 1)
      $(this).remove();
  });
}
 
/* Add history button to diffs */
if ($('strong:contains("Changes:")').length > 0)
  $('#WikiaPageHeader').find('p').children('a').after(' <a href="?action=history">(history)</a>');

 
}) (this.jQuery, this.mediaWiki);