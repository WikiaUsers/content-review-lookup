/* Any JavaScript here will be loaded for all users on every page load. */
// 1. AjaxRC configuration option
window.ajaxRefresh = 30000;

// 2. AjaxRC import statement
importArticles({
    type: 'script',
    articles: ['u:dev:MediaWiki:AjaxRC/code.js']
});

window.AddRailModule = [{page:'Template:Links-Side',prepend: true,maxAge: 86400}]