/* Any JavaScript here will be loaded for sysops only */
if (mw.config.get("wgUserGroups").indexOf('sysop') > -1) {
  massRenameDelay = 1000;
  massRenameSummary = 'renomeado automaticamente com MassRename';
  importScriptPage('MediaWiki:MassRename/code.js', 'dev');
}