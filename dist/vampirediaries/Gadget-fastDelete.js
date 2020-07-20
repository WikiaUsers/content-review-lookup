// 05:53, October 27, 2012 (UTC)
// <source lang="JavaScript">
 
// FastDelete Buttons for Administrators
 
/* Load related CSS */
$('head').append('<style type="text/css">.UserProfileActionButton .wikia-button { display: none; }</style>')
/* END Load related CSS */
 
importScriptPage('FastDelete/code.js', 'dev');
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
fdButtons[fdButtons.length] = {
  'summary': 'Unused Image',
  'label': 'Image'};
fdButtons[fdButtons.length] = {
  'summary': 'Unused Category',
  'label': 'Category'};
 
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