if (mw.config.get("wgUserGroups").indexOf('sysop') > -1) {
  massCategorizationDelay = 1000;
  importScriptPage('MediaWiki:MassCategorization/code.js', 'dev');
}