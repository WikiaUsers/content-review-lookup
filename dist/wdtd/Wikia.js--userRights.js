// <source lang="JavaScript">
 
// BEGIN CREATING ADDITIONAL USER RIGHTS //
var QuickToolsAdvancedtop = false;

if (mw.config.get('wgUserGroups').indexOf('content-moderator', 'sysop', 'bureaucrat') > -1) {
  massRenameDelay = 1000;
  massRenameSummary = 'automatic';
  importArticles({
    type: 'script',
    articles: [
        'u:dev:AjaxBatchDelete/code.2.js',
        'MediaWiki:localScript.js',
        'u:wikiname:page1.js',
        'u:wikiname:page2.js',
        'u:dev:CategoryRenameAuto-update/code.js',
        'u:dev:FileUsageAuto-update/code.js',
        'u:dev:MassEdit/code.js',
        'u:dev:MassProtect/code.js',
        'u:dev:MassCategorization/code.js',
        'u:dev:MediaWiki:QuickToolsv2/code.js'
    ]
});
}

// END CREATING ADDITIONAL USER RIGHTS //
 
// </source>