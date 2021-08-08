/** Any JavaScript here will be loaded for junior administrators (junior sysops) only **/

/* Begin Removing the autofill delete reason */
if (mw.config.get('wgAction') === 'delete') {
    $('#wpReason').removeAttr('value');
}
/* End Removing the autofill delete reason */

/////////////////////////////////////////////////////////////////////////
/***********************************************************************/
/************************ Import Configurations ************************/
/***********************************************************************/
/////////////////////////////////////////////////////////////////////////

/* Begin Mass Effect Configs  */
batchDeleteDelay = 500;
batchUndeleteDelay = 500;
massCategorizationDelay = 500;
massProtectDelay = 500;
massRenameDelay = 500;
massRenameSummary = 'Automatic process';

window.nukeDeleteReason = "Cleanup";
window.nukeDelay = 500;
window.nukeTitle = "Mass delete all pages created by this user";
/* End Mass Effect Configs */

/////////////////////////////////////////////////////////////////////////
/***********************************************************************/
/******************************* Imports *******************************/
/***********************************************************************/
/////////////////////////////////////////////////////////////////////////

/* Begin Universal Imports */
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:AjaxBatchDelete/code.js',
        'u:dev:MediaWiki:AjaxBatchUndelete.js',
        'u:dev:MediaWiki:AnchoredRollback/code.js',
        'u:dev:MediaWiki:CacheCheck/code.js',
        'u:dev:MediaWiki:MassCategorization/code.js',
        'u:dev:MediaWiki:MassProtect/code.js',
        'u:dev:MediaWiki:MassRename/code.js',
        'u:dev:MediaWiki:MassRenameRevert/code.js',
        'u:dev:MediaWiki:MassRollback.js',
        'u:dev:MediaWiki:MultipleFileDelete/code.js',
        'u:dev:MediaWiki:Nuke/code.js',
        'u:dev:MediaWiki:PatrolPanel.js',
        'u:dev:MediaWiki:RedirectManagement/code.js',
    ]
});
/* End Universal Imports */