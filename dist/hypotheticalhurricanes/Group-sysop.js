/** Any JavaScript here will be loaded for administrators (sysops) only **/
/* Removes the autofill delete reason */
if (mw.config.get('wgAction') === 'delete') {
    $('#wpReason').removeAttr('value');
}

/* Import configurations */
/** AjaxBlock **/
window.AjaxBlock = {
    unblockReasons: {
        'User successfully appealed their ban': 'Appealed',
        'Accidental ban/wrong user was banned': 'Error',
        'Covered by a bigger range Block': 'Range block'
    }
};

/** MessageBlock **/
window.MessageBlock = {
	title: 'Blocked',
	message: 'Your have been blocked from the Hypothetical Hurricanes Wiki. You are still able to view pages; you are merely prevented from creating or editing them. The block was made by $2 and $1 was the reason given. If you feel this block was unfair, please reply to this message.'
};

/** Mass Effect configs **/
window.batchDeleteDelay = 500;
window.batchUndeleteDelay = 500;
window.massBlockDelay = 500;
window.massCategorizationDelay = 500;
window.massProtectDelay = 500;
window.massRenameDelay = 500;
window.massRenameSummary = 'Automatic process';
window.WHAMDelay = 500;

window.nukeDeleteReason = "Cleanup";
window.nukeDelay = 500;

/* Import scripts */
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:AjaxBatchDelete.js',
        'u:dev:MediaWiki:AjaxBatchUndelete.js',
        'u:dev:MediaWiki:AjaxBlock/code.js',
        'u:dev:MediaWiki:AnchoredRollback/code.js',
        'u:dev:MediaWiki:CacheCheck/code.js',
        'u:dev:MediaWiki:MassBlock/code.js',
        'u:dev:MediaWiki:MassCategorization/code.js',
        'u:dev:MediaWiki:MassProtect/code.js',
        'u:dev:MediaWiki:MassRename/code.js',
        'u:dev:MediaWiki:MassRenameRevert/code.js',
        'u:dev:MediaWiki:MassRollback.js',
        'u:dev:MediaWiki:MessageBlock/code.js',
        'u:dev:MediaWiki:MultipleFileDelete/code.js',
        'u:dev:MediaWiki:Nuke/code.js',
        'u:dev:MediaWiki:PatrolPanel.js',
        'u:dev:MediaWiki:RedirectManagement/code.js',
        'u:dev:MediaWiki:WHAM/code.2.js'
    ]
});