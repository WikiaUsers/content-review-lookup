// 01:44, August 21, 2011 (UTC)
 
// <source lang="JavaScript">
 
// FastDelete Buttons for Administrators
 
importScriptPage('FastDelete/code.js', 'dev');
var fdButtons = [];
fdButtons[fdButtons.length] = {
  'summary': '[[ATW:V|spam]]',
  'label': 'spam'};
fdButtons[fdButtons.length] = {
  'summary': '[[ATW:V|vandalism]]',
  'label': 'vandal'};
 
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