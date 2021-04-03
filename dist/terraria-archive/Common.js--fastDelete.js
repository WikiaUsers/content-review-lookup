// <source lang="JavaScript">

// FastDelete Buttons for Administrators

importScriptPage('FastDelete/code.js', 'dev');
var fdButtons = [];
fdButtons[fdButtons.length] = {
  'summary': '[[Help:Spam]]',
  'label': 'Spam'};
fdButtons[fdButtons.length] = {
  'summary': '[[Help:Vandalism]]',
  'label': 'Vandalism'};
fdButtons[fdButtons.length] = {
  'summary': 'Housekeeping',
  'label': 'Housekeeping'};

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