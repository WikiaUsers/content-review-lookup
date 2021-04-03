/* Any JavaScript here will be loaded for all users on every page load. */
// 01:44, August 21, 2011 (UTC)

// <source lang="JavaScript">

// FastDelete Buttons for Administrators

importScriptPage('FastDelete/code.js', 'dev');
var fdButtons = [ ];
fdButtons[fdButtons.length] = {
  'summary': 'spam',
  'label': 'spam'};
fdButtons[fdButtons.length] = {
  'summary': 'vandalism',
  'label': 'vandal'};
fdButtons[fdButtons.length] = {
  'summary': 'Housekeeping',
  'label': 'Fast Housekeeping'};

// End FastDelete Buttons for Administrators

// </source>