/* Any JavaScript here will be loaded for all users on every page load. */
var username = wgUserName;
if (username) {$('.InsertUsername').text(username);}
 
if (mw.config.get("wgUserGroups").indexOf('sysop') > -1) {
  massCategorizationDelay = 1000;
  importScriptPage('MediaWiki:MassCategorization/code.js', 'dev');
}