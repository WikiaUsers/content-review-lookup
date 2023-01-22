/* Any JavaScript here will be loaded for all users on every page load. */
mw.config.set('UMFBypassLicenseCheck', true);
// 1. AjaxRC configuration option
window.ajaxRefresh = 30000;

// 2. AjaxRC import statement
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:AjaxRC.js'
    ]
});
window.discussionsModuleEmbed = true;
window.MassRenameRevertGroups = ['sysop', 'content-moderator'];