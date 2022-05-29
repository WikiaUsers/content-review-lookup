/* Any JavaScript here will be loaded for all users on every page load. */

/*Imports - Full credits on imported pages*/

/* http://dev.wikia.com/wiki/RevealAnonIP This must be placed above all imports. */
window.RevealAnonIP = {
    permissions : ['user']
};
 
importArticles({
    type: "script",
    articles: [
        "MediaWiki:Common.js/masthead.js",
        "MediaWiki:Common.js/collapse.js"
    ]
});

/*End imports*/