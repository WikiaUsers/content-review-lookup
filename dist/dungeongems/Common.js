/* Any JavaScript here will be loaded for all users on every page load. */

var wgPageName = mw.config.get('wgPageName');
if (wgPageName == 'Character_Viewer' || wgPageName == 'Team_Viewer' || document.getElementById('TEAM_COMBO')) {
  importScript('MediaWiki:Common.js/CharacterViewer.js');
}