/* Any JavaScript here will be loaded for all users on every page load. */
if (mw.config.get("wgUserGroups").indexOf('sysop') > -1) {
  massCategorizationDelay = 2000;
  importScriptPage('MediaWiki:MassCategorization/code.js', 'dev');
}