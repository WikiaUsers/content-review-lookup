/* Any JavaScript here will be loaded for sysops only */
// Ajax Batch Delete

batchDeleteDelay = 1000;

// END Ajax Batch Delete

// File Usage Auto-update

LIRoptions = {
    bottomMessage: '',
    editSummary: 'Updating file links (automatic)',
    singleButtonText: 'Rename and update',
    queueButtonText: 'Add to queue',
    delay: 1000
}

// END File Usage Auto-update

// Mass Categorization
if (mw.config.get("wgUserGroups").indexOf('sysop') > -1) {
  massCategorizationDelay = 1000;
}
// END Mass Categorization

// Mass Rename
if (mw.config.get("wgUserGroups").indexOf('sysop') > -1) {
  massRenameDelay = 1000;
  massRenameSummary = 'automatic';
}

// END Mass Rename

importArticles({
    type: "script",
    articles: [
        "u:dev:CategoryRenameAuto-update/code.js",
        "u:dev:PageRenameAuto-update/code.js",
        "u:dev:MassNullEdit/code.js",
        "u:dev:AjaxBatchDelete/code.2.js",
        "u:dev:FileUsageAuto-update/code.js",
        "u:dev:MassCategorization/code.js",
        "u:dev:MassRename/code.js"
    ]
});