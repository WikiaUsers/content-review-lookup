/* Any JavaScript here will be loaded for all users on every page load. */
// Import scripts from Wikia Developers' wiki
importArticles({
    type: 'script',
    articles: [
        'u:dev:LastEdited/code.js',
        'u:dev:DisplayClock/code.js',
        'u:dev:AjaxRC/code.js',
        'u:dev:BackToTopButton/code.js',
        'u:dev:FindAndReplace/code.js',
        'u:dev:Countdown/code.js',
        'u:dev:Standard_Edit_Summary/code.js',
        'u:dev:MessageWallUserTags/code.js',
        'u:dev:Translator/code.js',
        'u:dev:SpoilerAlert/code.js',
    ]
});
/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */
 
$(function() {
    if (window.disableUsernameReplace || mw.config.get('wgUserName') === null) return;
    $('span.insertusername').html(mw.config.get('wgUserName'));
});
 
/* End of the {{USERNAME}} replacement */
// Create the "dev" namespace if it doesn't exist already:
 
window.dev = window.dev || {};
 
// Create the sub-namespace for this addon and set some options:
 
window.dev.editSummaries = {
     css: '#stdSummaries { ... }',
     select: 'MediaWiki:StandardEditSummary'
};
 
// The options need to be set before the import! Otherwise they may not work.