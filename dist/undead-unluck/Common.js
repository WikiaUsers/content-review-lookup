/* Any JavaScript here will be loaded for all users on every page load. */
if (mw.config.get("wgUserGroups").indexOf('sysop') > -1) {
  massRenameDelay = 1000;
  massRenameSummary = 'automatic';
  importArticles({
      type: 'script',
      articles: [
          'u:dev:MediaWiki:MassEdit/code.js',
      ]
  });
}