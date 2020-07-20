// 08:55, October 20, 2013 (UTC)
// <source lang="JavaScript">
 
// FastDelete Buttons for Administrators

/* Load related CSS */
$('head').append('<style type="text/css">.UserProfileActionButton .wikia-button { display: none; }</style>')
/* END Load related CSS */

importScriptPage('MediaWiki:Common.js/fastDelete.js/main.js', 'admintools');
var fdButtons = [];
fdButtons[fdButtons.length] = {
  'summary': '[[w:c:help:Help:Spam|Spam]]',
  'label': 'Spam'};
fdButtons[fdButtons.length] = {
  'summary': '[[w:c:help:Help:Vandalism|Vandalism]]',
  'label': 'Vandalism'};
fdButtons[fdButtons.length] = {
  'summary': 'Housekeeping',
  'label': 'Clean-up'};
fdButtons[fdButtons.length] = {
  'summary': 'Inappropriate content',
  'label': 'Content'};
 
$(window).load(function() {
  switch( wgCanonicalNamespace ) {
    case 'User':
    case 'User_talk':
      $('.UserProfileActionButton .wikia-menu-button').css('margin-left','24px').appendTo('.UserProfileActionButton');
      break;
  }
  $('.UserProfileActionButton .wikia-button').show();
});
 
// End FastDelete Buttons for Administrators
 
// </source>