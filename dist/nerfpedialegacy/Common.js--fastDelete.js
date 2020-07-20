// 19:32, August 2, 2013 (UTC)
// <source lang="JavaScript">
 
// FastDelete Buttons for Administrators
 
importScriptPage('MediaWiki:Common.js/fastDelete.js/main.js', 'admintools');
var fdButtons = [];
fdButtons[fdButtons.length] = {
  'summary': '[[Help:Spam|Spam]]',
  'label': 'Spam'};
fdButtons[fdButtons.length] = {
  'summary': '[[Help:Vandalism|Vandalism]]',
  'label': 'Vandalism'};
fdButtons[fdButtons.length] = {
  'summary': 'Housekeeping',
  'label': 'Clean-up'};
fdButtons[fdButtons.length] = {
  'summary': 'Inappropriate content',
  'label': 'Content'};
fdButtons[fdButtons.length] = {
  'summary': 'Copyright violation',
  'label': 'Copyright'}; 
fdButtons[fdButtons.length] = {
  'summary': 'Marked for deletion/speedy deletion',
  'label': 'Marked'};
fdButtons[fdButtons.length] = {
  'summary': 'Duplicate',
  'label': 'Duplicated page'};
fdButtons[fdButtons.length] = {
  'summary': 'Consensus',
  'label': 'Consensus'};
fdButtons[fdButtons.length] = {
  'summary': 'Plagiarized from another wiki, site or source',
  'label': 'Plagiarism'};
fdButtons[fdButtons.length] = {
  'summary': 'Requested by original author',
  'label': 'Request'};


$(window).load(function() {
  switch( wgCanonicalNamespace ) {
    case 'User':
    case 'User_talk':
      $('.UserProfileActionButton .wikia-menu-button').css('margin-left','24px').appendTo('.UserProfileActionButton');
      $('wikia-button.comments.secondary.talk').css('margin-left','24px').appendTo('.UserProfileActionButton');
      break;
  }
  $('a.wikia-button[data-id="fastdelete"]:first').before('<div>')
  $('.UserProfileActionButton .wikia-button').show();
});
 
// End FastDelete Buttons for Administrators
 
// </source>