/***********************************************************************/
/************************ Import Configurations ************************/
/***********************************************************************/
/* Mass Effect Configs */
batchDeleteDelay = 250;
massCategorizationDelay = 500;
massProtectDelay = 500;
massRedirectDelay = 500;
massRenameDelay = 500;
massRenameSummary = "Renaming Pages";
nullEditDelay = 250;
WHAMDelay = 500;
//End MEC*/
 
/***********************************************************************/
/******************************* Imports *******************************/
/***********************************************************************/
importArticles({
    type: 'script',
    articles: [
        'u:dev:AjaxBatchDelete/code.2.js',
        'u:dev:AjaxBathUndelete.js',
        'u:dev:RedirectManagement/code.js',
        'u:dev:MassCreate/code.js'
        "u:dev:MediaWiki:MultipleFileDelete/code.js",
        'u:dev:MediaWiki:Nuke/code.js',
        'u:dev:CategoryRenameAuto-update/code.js',
        'u:dev:AutoEditPages/code.js',
        'u:dev:CleanWantedFiles/code.js',
        'u:dev:Linksweeper/code.js',
        'u:dev:MassCategorization/code.js',
        'u:dev:MassEdit/code.js',
        "u:dev:MediaWiki:MassPatrol/code.js"
        'u:dev:MultiUpload/code.js',
        'u:dev:MassNullEdit/code.js',
        'u:dev:MassProtect/code.js',
        'u:dev:MassRedirect/code.1.js',
        'u:dev:MassRename/code.js',
        'u:dev:MassRenameRevert/code.js',
        'u:dev:WHAM/code.2.js',
    ]
});//End Imports*/