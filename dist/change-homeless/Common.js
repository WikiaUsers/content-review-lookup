/* Any JavaScript here will be loaded for all users on every page load. */

  /***********************/
 /* Mass Categorization */
/***********************/
/* Locks MassCategorization to admins and content mods */
if (mw.config.get("wgUserGroups").indexOf('sysop') > -1 ||
    mw.config.get("wgUserGroups").indexOf('content-moderator') > -1 ||
    mw.config.get("wgUserGroups").indexOf('rollback') > -1
) {
  massCategorizationDelay = 1000;
  importScriptPage('MediaWiki:MassCategorization/code.js', 'dev');
}