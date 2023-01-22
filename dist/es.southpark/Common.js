batchDeleteDelay = 1000;
massCategorizationDelay = 1000;
massRedirectDelay = 1000;
massRenameDelay = 1000;
massRenameSummary = 'automatic';
nullEditDelay = 1000;
importArticles({
    type: 'script',
    articles: [
        "u:dev:AjaxBatchDelete/code.2.js",
        "u:dev:MassCategorization/code.js",
        "u:dev:MassRedirect/code.1.js",
        "u:dev:MassRename/code.js",
        "u:dev:MassNullEdit/code.js",
        "u:dev:AutoEditPages/code.js",
        "u:dev:NullEditButton/code.js",
        "u:dev:PowerPageMaker/code.js",
        "u:dev:CategoryRenameAuto-update/code.js",
        "u:dev:ListFiles/code.js",
        "u:dev:FixWantedFiles/code.js",
        "u:dev:DupImageList/code.js",
        "u:dev:RevealAnonIP/code.js",
        "u:dev:DynamicImages/code.js",
        "u:dev:BackToTopButton/code.js",
        "w:c:re-monster:MediaWiki:Common.js/InsertUsername.js",
        "w:c:re-monster:MediaWiki:Common.js/Usernames.js",
    ]
});