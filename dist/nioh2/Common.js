/* Any JavaScript here will be loaded for all users on every page load. */
importArticles({
    type: 'script',
    articles: [
        'u:dev:MassProtect/code.js',
        'u:dev:WikiaNotification/code.js',
        'u:dev:HeaderLinks/code.js',
        'u:dev:ProfileTags.js',
    ]
});
 
if (mw.config.get("wgUserGroups").indexOf('sysop') > -1)
  importScriptPage('MediaWiki:AjaxRedirect/code.js', 'dev');